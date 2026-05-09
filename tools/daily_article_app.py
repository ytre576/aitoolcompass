import argparse
import datetime as dt
import json
import os
import re
import subprocess
import sys
import tempfile
import shutil
import tkinter as tk
from pathlib import Path
from tkinter import messagebox, scrolledtext, ttk


APP_TITLE = "AI Tool Compass 每日文章助手"
DEFAULT_CODEX = r"C:\Users\Administrator\AppData\Roaming\npm\codex.ps1"
CATEGORY_OPTIONS = [
    ("chatbots", "Chatbots"),
    ("research", "Research"),
    ("image", "Image"),
    ("video", "Video"),
    ("design", "Design"),
    ("productivity", "Productivity"),
    ("writing", "Writing"),
    ("coding", "Coding"),
    ("audio", "Audio"),
    ("marketing", "Marketing"),
]
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


def now_stamp() -> str:
    return dt.datetime.now().strftime("%Y-%m-%d %H:%M:%S")


def slugify(value: str) -> str:
    value = value.lower().strip()
    value = re.sub(r"[^a-z0-9]+", "-", value)
    value = re.sub(r"-+", "-", value).strip("-")
    return value or f"ai-guide-{dt.datetime.now().strftime('%Y%m%d%H%M%S')}"


def read_json(path: Path, fallback):
    if not path.exists():
        return fallback
    return json.loads(path.read_text(encoding="utf-8"))


def write_json(path: Path, value) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


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
        if article_category not in dict(CATEGORY_OPTIONS):
            article_category = category
        tools = item.get("tools")
        if not isinstance(tools, list):
            tools = []
        tools = [str(tool).strip() for tool in tools if str(tool).strip()]
        if len(tools) < 3:
            tools = []
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


def codex_prompt(category: str, count: int, topic: str, article_type: str, existing: list[str]) -> str:
    category_label = dict(CATEGORY_OPTIONS).get(category, category)
    topic_line = topic.strip() or f"fresh {category_label} AI tool workflow topics for beginners"
    existing_text = ", ".join(existing[-80:])
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

JSON shape:
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


def run_command(command: list[str], cwd: Path, timeout: int = 300) -> tuple[int, str]:
    completed = subprocess.run(
        command,
        cwd=str(cwd),
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
            raise RuntimeError("无法找到 pwsh 或 powershell，无法执行 .ps1 形式的 Codex。")
        return [shell, "-ExecutionPolicy", "Bypass", "-File", path, *extra_args]
    if path.lower().endswith(".cmd") or path.lower().endswith(".bat"):
        shell = shutil.which("cmd.exe")
        if not shell:
            raise RuntimeError("无法找到 cmd.exe，无法执行批处理形式的 Codex。")
        return [shell, "/c", path, *extra_args]
    return [path, *extra_args]


def call_codex(codex_path: str, category: str, count: int, topic: str, article_type: str, model: str = "") -> str:
    used = sorted(existing_slugs())
    prompt = codex_prompt(category, count, topic, article_type, used)
    output_file = Path(tempfile.gettempdir()) / f"daily_articles_{dt.datetime.now().strftime('%Y%m%d%H%M%S')}.json"
    command = codex_invocation(
        codex_path,
        ["exec", "--skip-git-repo-check", "-C", str(ROOT), "-s", "workspace-write", "-a", "never", "-o", str(output_file)],
    )
    if model.strip():
        command.extend(["-m", model.strip()])
    command.append(prompt)
    code, output = run_command(command, ROOT, timeout=900)
    if code != 0:
        raise RuntimeError(f"Codex failed with exit code {code}.\n{output}")
    if output_file.exists():
        content = output_file.read_text(encoding="utf-8", errors="replace").strip()
        if content:
            return content
    return output.strip()


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


def append_articles(articles: list[dict]) -> None:
    current = read_json(CUSTOM_ARTICLES, [])
    if not isinstance(current, list):
        raise ValueError("data/custom-articles.json must be an array.")
    current.extend(articles)
    write_json(CUSTOM_ARTICLES, current)


def rebuild_and_validate() -> str:
    lines = []
    code, output = run_command(["node", "tools\\generate-site.js"], ROOT, timeout=300)
    lines.append(output)
    if code != 0:
        raise RuntimeError("generate-site.js failed:\n" + output)
    code, output = run_command(["node", "tools\\validate-site.js"], ROOT, timeout=300)
    lines.append(output)
    if code != 0:
        raise RuntimeError("validate-site.js failed:\n" + output)
    return "\n".join(lines)


class DailyArticleApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title(APP_TITLE)
        self.geometry("920x680")
        self.minsize(820, 600)
        self._build_ui()

    def _build_ui(self):
        frame = ttk.Frame(self, padding=16)
        frame.pack(fill=tk.BOTH, expand=True)

        settings = ttk.LabelFrame(frame, text="每日新增设置", padding=12)
        settings.pack(fill=tk.X)
        settings.columnconfigure(1, weight=1)

        ttk.Label(settings, text="Codex 路径").grid(row=0, column=0, sticky=tk.W, padx=(0, 8), pady=4)
        self.codex_var = tk.StringVar(value=DEFAULT_CODEX if Path(DEFAULT_CODEX).exists() else "codex")
        ttk.Entry(settings, textvariable=self.codex_var).grid(row=0, column=1, sticky=tk.EW, pady=4)

        ttk.Label(settings, text="分类").grid(row=1, column=0, sticky=tk.W, padx=(0, 8), pady=4)
        self.category_var = tk.StringVar(value="productivity")
        ttk.Combobox(settings, textvariable=self.category_var, values=[key for key, _ in CATEGORY_OPTIONS], state="readonly").grid(
            row=1, column=1, sticky=tk.W, pady=4
        )

        ttk.Label(settings, text="文章类型").grid(row=2, column=0, sticky=tk.W, padx=(0, 8), pady=4)
        self.type_var = tk.StringVar(value="Guide")
        ttk.Combobox(settings, textvariable=self.type_var, values=TYPE_OPTIONS, state="readonly").grid(row=2, column=1, sticky=tk.W, pady=4)

        ttk.Label(settings, text="数量").grid(row=3, column=0, sticky=tk.W, padx=(0, 8), pady=4)
        self.count_var = tk.IntVar(value=5)
        ttk.Spinbox(settings, from_=1, to=20, textvariable=self.count_var, width=8).grid(row=3, column=1, sticky=tk.W, pady=4)

        ttk.Label(settings, text="主题方向").grid(row=4, column=0, sticky=tk.W, padx=(0, 8), pady=4)
        self.topic_var = tk.StringVar(value="new AI tools and practical workflows for beginner traffic growth")
        ttk.Entry(settings, textvariable=self.topic_var).grid(row=4, column=1, sticky=tk.EW, pady=4)

        ttk.Label(settings, text="模型可选").grid(row=5, column=0, sticky=tk.W, padx=(0, 8), pady=4)
        self.model_var = tk.StringVar(value="")
        ttk.Entry(settings, textvariable=self.model_var).grid(row=5, column=1, sticky=tk.EW, pady=4)

        buttons = ttk.Frame(frame)
        buttons.pack(fill=tk.X, pady=12)
        ttk.Button(buttons, text="一键生成并添加 5 篇", command=self.generate_articles).pack(side=tk.LEFT, padx=(0, 8))
        ttk.Button(buttons, text="仅重建并验证网站", command=self.rebuild_site).pack(side=tk.LEFT, padx=(0, 8))
        ttk.Button(buttons, text="打开新增文章 JSON", command=self.open_json).pack(side=tk.LEFT)

        self.log = scrolledtext.ScrolledText(frame, wrap=tk.WORD, height=22)
        self.log.pack(fill=tk.BOTH, expand=True)
        self.write_log("准备就绪。建议每天选择一个分类方向，点击一键生成并添加 5 篇。")

    def write_log(self, text: str):
        self.log.insert(tk.END, f"[{now_stamp()}] {text}\n")
        self.log.see(tk.END)
        self.update_idletasks()

    def run_safely(self, action):
        try:
            action()
        except Exception as error:
            self.write_log(f"失败: {error}")
            messagebox.showerror(APP_TITLE, str(error))

    def generate_articles(self):
        def action():
            self.write_log("正在调用本地 Codex 生成文章数据...")
            raw = call_codex(
                self.codex_var.get().strip(),
                self.category_var.get().strip(),
                int(self.count_var.get()),
                self.topic_var.get().strip(),
                self.type_var.get().strip(),
                self.model_var.get().strip(),
            )
            LOG_DIR.mkdir(exist_ok=True)
            (LOG_DIR / f"codex-articles-{dt.datetime.now().strftime('%Y%m%d-%H%M%S')}.txt").write_text(raw, encoding="utf-8")
            articles = normalize_articles(parse_json_from_text(raw), self.category_var.get().strip(), self.type_var.get().strip())
            append_articles(articles)
            self.write_log(f"已追加 {len(articles)} 篇文章到 data/custom-articles.json。")
            for article in articles:
                self.write_log(f"- {article['slug']} | {article['title']}")
            self.write_log("正在重建并验证网站...")
            self.write_log(rebuild_and_validate().strip())
            messagebox.showinfo(APP_TITLE, f"完成：已新增 {len(articles)} 篇文章并通过验证。")

        self.run_safely(action)

    def rebuild_site(self):
        def action():
            self.write_log("正在重建并验证网站...")
            self.write_log(rebuild_and_validate().strip())
            messagebox.showinfo(APP_TITLE, "网站重建并验证通过。")

        self.run_safely(action)

    def open_json(self):
        CUSTOM_ARTICLES.parent.mkdir(parents=True, exist_ok=True)
        if not CUSTOM_ARTICLES.exists():
            write_json(CUSTOM_ARTICLES, [])
        os.startfile(str(CUSTOM_ARTICLES))


def cli_generate(args) -> int:
    raw = call_codex(args.codex, args.category, args.count, args.topic, args.article_type, args.model)
    articles = normalize_articles(parse_json_from_text(raw), args.category, args.article_type)
    append_articles(articles)
    print(f"Added {len(articles)} articles:")
    for article in articles:
        print(f"- {article['slug']} | {article['title']}")
    print(rebuild_and_validate())
    return 0


def main() -> int:
    parser = argparse.ArgumentParser(description=APP_TITLE)
    parser.add_argument("--cli", action="store_true", help="Run without GUI.")
    parser.add_argument("--codex", default=DEFAULT_CODEX if Path(DEFAULT_CODEX).exists() else "codex")
    parser.add_argument("--category", default="productivity", choices=[key for key, _ in CATEGORY_OPTIONS])
    parser.add_argument("--article-type", default="Guide", choices=TYPE_OPTIONS)
    parser.add_argument("--count", type=int, default=5)
    parser.add_argument("--topic", default="new AI tools and practical workflows for beginner traffic growth")
    parser.add_argument("--model", default="")
    args = parser.parse_args()
    if args.cli:
        return cli_generate(args)
    DailyArticleApp().mainloop()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
