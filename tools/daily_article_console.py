import argparse
import datetime as dt
import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path


APP_TITLE = "AI Tool Compass Daily Article Assistant"
DEFAULT_CODEX = r"C:\Users\Administrator\AppData\Roaming\npm\codex.ps1"
CATEGORY_OPTIONS = ["chatbots", "research", "image", "video", "design", "productivity", "writing", "coding", "audio", "marketing"]
TYPE_OPTIONS = ["Guide", "Tutorial", "Workflow", "Comparison", "Checklist", "Prompt Library", "Template", "Prompting"]


def project_root() -> Path:
    start = Path(sys.executable).resolve().parent if getattr(sys, "frozen", False) else Path(__file__).resolve().parent
    for current in [start, *start.parents]:
        if (current / "tools" / "generate-site.js").exists():
            return current
    return Path(__file__).resolve().parents[1]


ROOT = project_root()
DATA_DIR = ROOT / "data"
CUSTOM_ARTICLES = DATA_DIR / "custom-articles.json"
LOG_DIR = ROOT / "logs"


def read_json(path: Path, fallback):
    if not path.exists():
        return fallback
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value or f"ai-guide-{dt.datetime.now().strftime('%Y%m%d%H%M%S')}"


def existing_slugs() -> set[str]:
    slugs = set()
    generator = ROOT / "tools" / "generate-site.js"
    if generator.exists():
        text = generator.read_text(encoding="utf-8")
        for match in re.finditer(r'\["([^"]+)",\s*"[^"]+",\s*"[^"]+",\s*"[^"]+"\]', text):
            slugs.add(match.group(1))
    for article in read_json(CUSTOM_ARTICLES, []):
        if isinstance(article, dict) and article.get("slug"):
            slugs.add(article["slug"])
    return slugs


def unique_slug(title: str, used: set[str]) -> str:
    base = slugify(title)
    slug = base
    counter = 2
    while slug in used:
        slug = f"{base}-{counter}"
        counter += 1
    used.add(slug)
    return slug


def normalize_articles(raw, category: str, default_type: str) -> list[dict]:
    if isinstance(raw, dict) and isinstance(raw.get("articles"), list):
        raw = raw["articles"]
    if not isinstance(raw, list):
        raise ValueError("Codex output must be a JSON array or an object with an articles array.")
    used = existing_slugs()
    today = dt.date.today().isoformat()
    articles = []
    for item in raw:
        if not isinstance(item, dict):
            continue
        title = str(item.get("title", "")).strip()
        focus = str(item.get("focus", "")).strip()
        if not title or not focus:
            continue
        article_type = str(item.get("type") or default_type).strip()
        if article_type not in TYPE_OPTIONS:
            article_type = default_type
        article_category = str(item.get("cluster") or category).strip()
        if article_category not in CATEGORY_OPTIONS:
            article_category = category
        tools = item.get("tools")
        tools = [str(tool).strip() for tool in tools if str(tool).strip()] if isinstance(tools, list) else []
        articles.append(
            {
                "slug": unique_slug(str(item.get("slug") or title), used),
                "title": title[:90],
                "type": article_type,
                "focus": focus[:180],
                "cluster": article_category,
                "tools": tools[:4],
                "summary": str(item.get("summary", "")).strip()[:220],
                "keywords": [str(keyword).strip() for keyword in item.get("keywords", []) if str(keyword).strip()][:8]
                if isinstance(item.get("keywords"), list)
                else [],
                "createdAt": today,
            }
        )
    if not articles:
        raise ValueError("No usable articles were returned.")
    return articles


def parse_json_from_text(text: str):
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?", "", text, flags=re.I).strip()
        text = re.sub(r"```$", "", text).strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        start_candidates = [pos for pos in [text.find("["), text.find("{")] if pos >= 0]
        if not start_candidates:
            raise
        start = min(start_candidates)
        end = max(text.rfind("]"), text.rfind("}"))
        if end <= start:
            raise
        return json.loads(text[start : end + 1])


def codex_prompt(category: str, count: int, topic: str, article_type: str, existing: list[str]) -> str:
    existing_text = ", ".join(existing[-80:])
    topic_line = topic.strip() or f"fresh {category} AI tool workflow topics for beginners"
    return f"""You generate structured article ideas for a static AI tool guide website.
Return JSON only. Do not write markdown. Do not modify files.

Need exactly {count} new article records.
Category cluster: {category}
Article type default: {article_type}
Topic direction: {topic_line}

Each record must have:
- slug: lowercase English URL slug
- title: English title, 45-75 chars, practical and search-friendly
- type: one of Guide, Tutorial, Workflow, Comparison, Checklist, Prompt Library, Template, Prompting
- focus: one sentence explaining the reader task
- cluster: exactly "{category}"
- tools: 3-4 relevant AI tools or platforms
- summary: one sentence for editorial planning
- keywords: 4-8 practical English SEO phrases

Avoid duplicate slugs or near-duplicate titles from this existing list:
{existing_text}

Return only this JSON shape:
[
  {{
    "slug": "example-ai-workflow",
    "title": "Example AI Workflow for Beginners",
    "type": "Workflow",
    "focus": "complete a practical AI task with clear review steps",
    "cluster": "{category}",
    "tools": ["ChatGPT", "Claude", "Gemini"],
    "summary": "Short editorial summary.",
    "keywords": ["ai workflow", "beginner ai guide"]
  }}
]
"""


def run_command(command: list[str], timeout: int = 300) -> tuple[int, str]:
    completed = subprocess.run(
        command,
        cwd=str(ROOT),
        text=True,
        encoding="utf-8",
        errors="replace",
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        timeout=timeout,
    )
    return completed.returncode, completed.stdout


def codex_invocation(codex_path: str, extra_args: list[str]) -> list[str]:
    path = codex_path.strip()
    if path.lower().endswith(".ps1"):
        shell = shutil.which("pwsh") or shutil.which("powershell")
        if not shell:
            raise RuntimeError("Cannot find pwsh or powershell to run Codex .ps1.")
        return [shell, "-ExecutionPolicy", "Bypass", "-File", path, *extra_args]
    if path.lower().endswith(".cmd") or path.lower().endswith(".bat"):
        shell = shutil.which("cmd.exe")
        if not shell:
            raise RuntimeError("Cannot find cmd.exe to run Codex batch file.")
        return [shell, "/c", path, *extra_args]
    return [path, *extra_args]


def call_codex(codex_path: str, category: str, count: int, topic: str, article_type: str, model: str = "") -> str:
    output_file = Path(tempfile.gettempdir()) / f"daily_articles_{dt.datetime.now().strftime('%Y%m%d%H%M%S')}.json"
    command = codex_invocation(
        codex_path,
        ["exec", "--skip-git-repo-check", "-C", str(ROOT), "-s", "workspace-write", "-a", "never", "-o", str(output_file)],
    )
    if model.strip():
        command.extend(["-m", model.strip()])
    command.append(codex_prompt(category, count, topic, article_type, sorted(existing_slugs())))
    code, output = run_command(command, timeout=900)
    if code != 0:
        raise RuntimeError(f"Codex failed with exit code {code}.\n{output}")
    if output_file.exists():
        content = output_file.read_text(encoding="utf-8", errors="replace").strip()
        if content:
            return content
    return output.strip()


def append_articles(articles: list[dict]) -> None:
    current = read_json(CUSTOM_ARTICLES, [])
    if not isinstance(current, list):
        raise ValueError("data/custom-articles.json must be an array.")
    current.extend(articles)
    write_json(CUSTOM_ARTICLES, current)


def rebuild_and_validate() -> str:
    lines = []
    code, output = run_command(["node", "tools\\generate-site.js"], timeout=300)
    lines.append(output.strip())
    if code != 0:
        raise RuntimeError("generate-site.js failed:\n" + output)
    code, output = run_command(["node", "tools\\validate-site.js"], timeout=300)
    lines.append(output.strip())
    if code != 0:
        raise RuntimeError("validate-site.js failed:\n" + output)
    return "\n".join(line for line in lines if line)


def choose(prompt: str, options: list[str], default: str) -> str:
    print(f"{prompt} [{default}]")
    value = input("> ").strip()
    if not value:
        return default
    if value not in options:
        print(f"Invalid value, using {default}.")
        return default
    return value


def interactive_args(args):
    print(f"\n{APP_TITLE}")
    print(f"Project: {ROOT}")
    args.codex = input(f"Codex path [{args.codex}]\n> ").strip() or args.codex
    args.category = choose("Category", CATEGORY_OPTIONS, args.category)
    args.article_type = choose("Article type", TYPE_OPTIONS, args.article_type)
    raw_count = input(f"Article count [{args.count}]\n> ").strip()
    if raw_count:
        args.count = max(1, int(raw_count))
    args.topic = input(f"Topic direction [{args.topic}]\n> ").strip() or args.topic
    return args


def main() -> int:
    parser = argparse.ArgumentParser(description=APP_TITLE)
    parser.add_argument("--auto", action="store_true", help="Run with default options without prompts.")
    parser.add_argument("--rebuild-only", action="store_true", help="Only rebuild and validate the website.")
    parser.add_argument("--codex", default=DEFAULT_CODEX if Path(DEFAULT_CODEX).exists() else "codex")
    parser.add_argument("--category", default="productivity", choices=CATEGORY_OPTIONS)
    parser.add_argument("--article-type", default="Guide", choices=TYPE_OPTIONS)
    parser.add_argument("--count", type=int, default=5)
    parser.add_argument("--topic", default="new AI tools and practical workflows for beginner traffic growth")
    parser.add_argument("--model", default="")
    args = parser.parse_args()

    if args.rebuild_only:
        print(rebuild_and_validate())
        return 0

    if not args.auto:
        args = interactive_args(args)

    if args.count < 1:
        raise ValueError("Article count must be at least 1.")

    print("Calling local Codex...")
    raw = call_codex(args.codex, args.category, args.count, args.topic, args.article_type, args.model)
    LOG_DIR.mkdir(exist_ok=True)
    (LOG_DIR / f"codex-articles-{dt.datetime.now().strftime('%Y%m%d-%H%M%S')}.txt").write_text(raw, encoding="utf-8")
    articles = normalize_articles(parse_json_from_text(raw), args.category, args.article_type)
    append_articles(articles)
    print(f"Added {len(articles)} articles:")
    for article in articles:
        print(f"- {article['slug']} | {article['title']}")
    print(rebuild_and_validate())
    print("\nDone. Press Enter to exit.")
    if not args.auto:
        input()
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"\nERROR: {error}")
        print("Press Enter to exit.")
        try:
            input()
        except EOFError:
            pass
        raise SystemExit(1)
