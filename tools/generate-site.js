const fs = require("fs");
const path = require("path");

const root = process.cwd();

function readJsonOptional(file, fallback) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(fullPath, "utf8"));
  } catch (error) {
    throw new Error(`Invalid JSON in ${file}: ${error.message}`);
  }
}

const defaultSite = {
  name: "AI Tool Compass",
  url: "https://example.com",
  date: "2026-05-08",
  description:
    "Practical AI tool tutorials, comparisons, workflows, and beginner-friendly guides for choosing useful AI software without hype.",
};
const site = { ...defaultSite, ...readJsonOptional("data/site-config.json", {}) };

const clusters = [
  {
    slug: "chatbots",
    name: "AI Chatbots",
    tag: "Chatbots",
    color: "red",
    tools: ["ChatGPT", "Claude", "Gemini", "Microsoft Copilot"],
    intent: "writing, reasoning, file analysis, planning, and everyday assistant work",
    image: "article-chatbot-compare.svg",
    icon: "chat",
    articles: [
      ["chatgpt-vs-claude-vs-gemini", "ChatGPT vs Claude vs Gemini: Beginner Comparison", "Comparison", "choose between the three major chatbots for daily work"],
      ["best-ai-chatbot-for-writing", "Best AI Chatbot for Writing: Simple Decision Guide", "Guide", "pick a writing assistant for outlines, drafts, editing, and tone"],
      ["chatgpt-beginner-workflow", "ChatGPT Beginner Workflow: From Prompt to Finished Draft", "Tutorial", "turn rough ideas into a usable article or email"],
      ["claude-long-document-guide", "Claude Long Document Guide for Beginners", "Tutorial", "summarize and analyze long PDFs, notes, and reports"],
      ["gemini-google-workspace-guide", "Gemini for Google Workspace: Practical Beginner Guide", "Tutorial", "use AI inside Docs, Gmail, Sheets, and Drive-style workflows"],
      ["ai-chatbot-file-analysis", "How to Use AI Chatbots for File Analysis", "Workflow", "review spreadsheets, PDFs, contracts, and notes without getting lost"],
      ["chatbot-prompting-mistakes", "AI Chatbot Prompting Mistakes Beginners Should Avoid", "Checklist", "avoid vague prompts, missing context, and unverified answers"],
      ["chatbot-for-students-guide", "AI Chatbots for Students: Study Workflow Guide", "Guide", "build study plans, explain concepts, and quiz yourself responsibly"],
      ["chatbot-for-small-business", "AI Chatbots for Small Business: Practical Use Cases", "Guide", "handle customer replies, content drafts, SOPs, and planning"],
      ["chatbot-privacy-safety-basics", "AI Chatbot Privacy and Safety Basics", "Guide", "protect sensitive data while still using AI productively"],
    ],
  },
  {
    slug: "research",
    name: "AI Research",
    tag: "Research",
    color: "teal",
    tools: ["Perplexity", "Elicit", "Consensus", "NotebookLM"],
    intent: "source discovery, fact-checking, literature scans, and research briefs",
    image: "article-research-stack.svg",
    icon: "research",
    articles: [
      ["perplexity-ai-research-workflow", "Perplexity AI Research Workflow: Beginner Guide", "Workflow", "move from a question to a source-backed brief"],
      ["best-ai-research-tools", "Best AI Research Tools for Beginners", "Guide", "compare research assistants by source quality and workflow fit"],
      ["ai-fact-checking-workflow", "AI Fact-Checking Workflow: How to Verify Answers", "Tutorial", "check claims before publishing or making decisions"],
      ["notebooklm-beginner-guide", "NotebookLM Beginner Guide for Source-Based Notes", "Tutorial", "turn uploaded sources into summaries, outlines, and study aids"],
      ["ai-literature-review-workflow", "AI Literature Review Workflow for Non-Experts", "Workflow", "screen papers and organize findings without academic jargon"],
      ["perplexity-vs-chatgpt-research", "Perplexity vs ChatGPT for Research", "Comparison", "know when sources matter more than open-ended reasoning"],
      ["ai-citation-management-guide", "AI Citation Management: Beginner Workflow", "Guide", "collect, label, and verify links before writing"],
      ["research-prompt-templates", "Research Prompt Templates for Better AI Answers", "Prompt Library", "ask clearer questions and get usable evidence summaries"],
      ["ai-research-common-mistakes", "AI Research Mistakes That Cause Bad Decisions", "Checklist", "spot hallucinated sources, outdated facts, and weak summaries"],
      ["ai-market-research-workflow", "AI Market Research Workflow for Small Teams", "Workflow", "study competitors, customers, and positioning with a repeatable process"],
    ],
  },
  {
    slug: "image",
    name: "AI Image Generation",
    tag: "Image",
    color: "violet",
    tools: ["Midjourney", "DALL-E", "Ideogram", "Leonardo AI"],
    intent: "prompt design, thumbnails, product concepts, illustrations, and brand visuals",
    image: "article-image-prompts.svg",
    icon: "image",
    articles: [
      ["midjourney-prompt-guide", "Midjourney Prompt Guide for Beginners", "Prompting", "control subject, style, lighting, and composition"],
      ["best-ai-image-generators", "Best AI Image Generators: Beginner Comparison", "Comparison", "choose an image tool for different visual jobs"],
      ["ai-thumbnail-workflow", "AI Thumbnail Workflow for YouTube and Blogs", "Workflow", "plan clickable thumbnails without making them misleading"],
      ["ai-product-image-guide", "AI Product Image Guide for Small Shops", "Tutorial", "create concept product visuals and lifestyle mockups"],
      ["ai-image-style-prompts", "AI Image Style Prompts: Practical Examples", "Prompt Library", "write style prompts that beginners can reuse"],
      ["midjourney-vs-dalle-vs-ideogram", "Midjourney vs DALL-E vs Ideogram", "Comparison", "compare realism, text rendering, style control, and ease of use"],
      ["ai-image-commercial-use-basics", "AI Image Commercial Use Basics", "Guide", "understand rights, model terms, and safer publishing habits"],
      ["ai-image-editing-workflow", "AI Image Editing Workflow: Fix, Extend, Reframe", "Tutorial", "turn first drafts into usable images"],
      ["ai-image-prompt-mistakes", "AI Image Prompt Mistakes Beginners Make", "Checklist", "avoid cluttered prompts and inconsistent style instructions"],
      ["ai-blog-illustration-workflow", "AI Blog Illustration Workflow", "Workflow", "make article visuals that explain the content instead of decorating it"],
    ],
  },
  {
    slug: "video",
    name: "AI Video Generation",
    tag: "Video",
    color: "gold",
    tools: ["Runway", "Synthesia", "Pika", "Descript"],
    intent: "short clips, explainers, avatar videos, captions, and storyboard-led production",
    image: "article-video-storyboard.svg",
    icon: "video",
    articles: [
      ["runway-ai-video-guide", "Runway AI Video Guide for Beginners", "Tutorial", "create short clips with storyboard-first planning"],
      ["best-ai-video-generators", "Best AI Video Generators: Beginner Comparison", "Comparison", "choose video tools by clip type and budget"],
      ["ai-video-storyboard-workflow", "AI Video Storyboard Workflow", "Workflow", "plan shots before spending generation credits"],
      ["synthesia-training-video-guide", "Synthesia Training Video Guide", "Tutorial", "turn scripts into presenter-style training videos"],
      ["ai-video-broll-guide", "AI B-Roll Guide for Creators", "Guide", "generate supporting shots for tutorials, ads, and explainers"],
      ["runway-vs-pika-vs-synthesia", "Runway vs Pika vs Synthesia", "Comparison", "compare cinematic clips, quick motion, and avatar videos"],
      ["ai-video-script-prompts", "AI Video Script Prompts for Beginners", "Prompt Library", "write scripts that are easier to generate and edit"],
      ["ai-video-common-mistakes", "AI Video Mistakes That Waste Credits", "Checklist", "avoid vague motion, missing shot lists, and bad pacing"],
      ["ai-social-video-workflow", "AI Social Video Workflow", "Workflow", "make short-form videos from one idea to final caption"],
      ["ai-video-ads-beginner-guide", "AI Video Ads Beginner Guide", "Guide", "create simple ad concepts without overpromising results"],
    ],
  },
  {
    slug: "design",
    name: "AI Design",
    tag: "Design",
    color: "sage",
    tools: ["Canva AI", "Adobe Firefly", "Figma AI", "Microsoft Designer"],
    intent: "social posts, decks, landing graphics, brand kits, and non-designer production",
    image: "article-design-workflow.svg",
    icon: "design",
    articles: [
      ["canva-ai-design-workflow", "Canva AI Design Workflow for Beginners", "Workflow", "turn a short brief into polished practical assets"],
      ["best-ai-design-tools", "Best AI Design Tools for Non-Designers", "Guide", "choose tools for social posts, decks, and quick graphics"],
      ["canva-ai-social-post-guide", "Canva AI Social Post Guide", "Tutorial", "make reusable social graphics without starting from a blank page"],
      ["ai-presentation-design-guide", "AI Presentation Design Guide", "Tutorial", "build clear decks from messy notes"],
      ["figma-ai-beginner-workflow", "Figma AI Beginner Workflow", "Workflow", "move from idea to wireframe faster"],
      ["canva-vs-adobe-firefly", "Canva AI vs Adobe Firefly", "Comparison", "compare speed, control, brand safety, and asset workflows"],
      ["ai-brand-kit-guide", "AI Brand Kit Guide for Small Teams", "Guide", "keep generated designs consistent"],
      ["ai-design-layout-mistakes", "AI Design Layout Mistakes Beginners Make", "Checklist", "avoid crowded screens, weak hierarchy, and random styles"],
      ["ai-landing-page-visuals", "AI Landing Page Visual Workflow", "Workflow", "create visuals that support conversion-focused pages"],
      ["ai-design-prompt-templates", "AI Design Prompt Templates", "Prompt Library", "brief AI design tools with clearer constraints"],
    ],
  },
  {
    slug: "productivity",
    name: "AI Productivity",
    tag: "Productivity",
    color: "green",
    tools: ["Notion AI", "Zapier", "Microsoft Copilot", "Otter.ai"],
    intent: "notes, meetings, automations, task systems, and team operating workflows",
    image: "article-tool-map.svg",
    icon: "productivity",
    articles: [
      ["best-ai-tools-2026", "Best AI Tools in 2026: Practical Beginner Guide", "Guide", "choose a useful AI tool stack across chatbots, research, images, video, design, and productivity"],
      ["notion-ai-workspace-guide", "Notion AI Workspace Guide", "Tutorial", "build a practical AI-assisted workspace"],
      ["ai-meeting-notes-workflow", "AI Meeting Notes Workflow", "Workflow", "capture decisions, tasks, and summaries accurately"],
      ["zapier-ai-automation-guide", "Zapier AI Automation Guide for Beginners", "Tutorial", "connect apps and reduce repetitive work"],
      ["ai-email-productivity-guide", "AI Email Productivity Guide", "Guide", "draft, summarize, and prioritize email safely"],
      ["notion-ai-vs-copilot", "Notion AI vs Microsoft Copilot", "Comparison", "compare workspace AI and office-suite AI"],
      ["ai-task-management-workflow", "AI Task Management Workflow", "Workflow", "turn messy inputs into weekly plans"],
      ["ai-productivity-mistakes", "AI Productivity Mistakes That Waste Time", "Checklist", "avoid tool hopping and automation without a process"],
      ["ai-personal-knowledge-base", "AI Personal Knowledge Base Guide", "Guide", "organize notes so AI can help retrieve and synthesize them"],
      ["ai-workflow-audit-template", "AI Workflow Audit Template", "Template", "find the repetitive tasks worth automating first"],
    ],
  },
  {
    slug: "writing",
    name: "AI Writing",
    tag: "Writing",
    color: "red",
    tools: ["Jasper", "Grammarly", "Writesonic", "Copy.ai"],
    intent: "blog posts, newsletters, ads, editing, brand voice, and content planning",
    image: "article-tool-map.svg",
    icon: "writing",
    articles: [
      ["best-ai-writing-tools", "Best AI Writing Tools: Practical Beginner Guide", "Guide", "choose writing tools by content type and workflow"],
      ["ai-blog-post-workflow", "AI Blog Post Workflow from Outline to Draft", "Workflow", "write clearer articles with human editing checkpoints"],
      ["ai-newsletter-writing-guide", "AI Newsletter Writing Guide", "Tutorial", "turn notes into useful newsletter issues"],
      ["jasper-vs-copy-ai-vs-writesonic", "Jasper vs Copy.ai vs Writesonic", "Comparison", "compare marketing writing platforms"],
      ["ai-editing-checklist", "AI Editing Checklist for Better Drafts", "Checklist", "improve clarity, accuracy, and voice"],
      ["ai-brand-voice-guide", "AI Brand Voice Guide for Small Teams", "Guide", "make generated copy sound consistent"],
      ["ai-copywriting-prompts", "AI Copywriting Prompts for Beginners", "Prompt Library", "write ads, product pages, and landing copy"],
      ["ai-writing-seo-basics", "AI Writing SEO Basics Without Spam", "Guide", "write helpful content that targets search intent"],
      ["ai-writing-mistakes", "AI Writing Mistakes Beginners Make", "Checklist", "avoid generic copy, unsupported claims, and weak examples"],
      ["human-editing-ai-content", "Human Editing Workflow for AI Content", "Workflow", "turn AI drafts into publishable work"],
    ],
  },
  {
    slug: "coding",
    name: "AI Coding",
    tag: "Coding",
    color: "teal",
    tools: ["GitHub Copilot", "Cursor", "Replit AI", "Codeium"],
    intent: "coding help, debugging, code explanation, tests, and beginner programming workflows",
    image: "article-research-stack.svg",
    icon: "coding",
    articles: [
      ["best-ai-coding-tools", "Best AI Coding Tools for Beginners", "Guide", "choose coding assistants without getting overwhelmed"],
      ["github-copilot-beginner-guide", "GitHub Copilot Beginner Guide", "Tutorial", "use autocomplete and chat without blindly accepting code"],
      ["cursor-ai-workflow-guide", "Cursor AI Workflow Guide", "Workflow", "edit and understand projects with an AI coding editor"],
      ["ai-debugging-workflow", "AI Debugging Workflow for Beginners", "Tutorial", "explain errors and test fixes step by step"],
      ["ai-code-review-checklist", "AI Code Review Checklist", "Checklist", "use AI to find risks while keeping human judgment"],
      ["copilot-vs-cursor-vs-replit", "Copilot vs Cursor vs Replit AI", "Comparison", "compare assistant styles for different coding tasks"],
      ["ai-unit-test-generation", "AI Unit Test Generation Guide", "Tutorial", "ask AI for tests that cover behavior, not implementation trivia"],
      ["ai-code-explanation-prompts", "AI Code Explanation Prompts", "Prompt Library", "understand unfamiliar code faster"],
      ["ai-coding-mistakes", "AI Coding Mistakes Beginners Make", "Checklist", "avoid insecure snippets, missing tests, and dependency confusion"],
      ["ai-no-code-vs-code-guide", "AI No-Code vs Coding Guide", "Guide", "know when to use builders and when to write code"],
    ],
  },
  {
    slug: "audio",
    name: "AI Audio and Voice",
    tag: "Audio",
    color: "gold",
    tools: ["ElevenLabs", "Suno", "Descript", "Adobe Podcast"],
    intent: "voiceovers, transcription, podcasts, music sketches, and audio cleanup",
    image: "article-video-storyboard.svg",
    icon: "audio",
    articles: [
      ["best-ai-voice-tools", "Best AI Voice Tools: Beginner Guide", "Guide", "choose voice and audio tools by project type"],
      ["elevenlabs-voiceover-guide", "ElevenLabs Voiceover Guide for Beginners", "Tutorial", "create clearer voiceovers for videos and courses"],
      ["ai-podcast-workflow", "AI Podcast Workflow from Notes to Episode", "Workflow", "plan, record, transcribe, and edit with AI help"],
      ["ai-transcription-tools-guide", "AI Transcription Tools Guide", "Guide", "turn audio into searchable notes and summaries"],
      ["ai-music-generation-basics", "AI Music Generation Basics", "Tutorial", "create background ideas without overcomplicating rights"],
      ["elevenlabs-vs-descript-vs-adobe", "ElevenLabs vs Descript vs Adobe Podcast", "Comparison", "compare voice generation, editing, and cleanup"],
      ["ai-audio-cleanup-workflow", "AI Audio Cleanup Workflow", "Workflow", "improve noisy recordings before publishing"],
      ["ai-voice-commercial-use", "AI Voice Commercial Use Basics", "Guide", "handle consent, rights, and disclosure thoughtfully"],
      ["ai-audio-prompt-templates", "AI Audio Prompt Templates", "Prompt Library", "write better voice and music prompts"],
      ["ai-audio-mistakes", "AI Audio Mistakes Beginners Make", "Checklist", "avoid robotic delivery, bad pacing, and unclear rights"],
    ],
  },
  {
    slug: "marketing",
    name: "AI Marketing",
    tag: "Marketing",
    color: "green",
    tools: ["HubSpot AI", "Semrush", "Surfer", "Buffer AI"],
    intent: "SEO, social media, ads, funnels, analytics, and campaign planning",
    image: "article-design-workflow.svg",
    icon: "marketing",
    articles: [
      ["best-ai-marketing-tools", "Best AI Marketing Tools for Beginners", "Guide", "choose tools for SEO, social, ads, and email"],
      ["ai-seo-workflow-guide", "AI SEO Workflow Without Spam", "Workflow", "research search intent and write useful pages"],
      ["ai-social-media-calendar", "AI Social Media Calendar Workflow", "Template", "plan posts without sounding generic"],
      ["ai-ad-copy-guide", "AI Ad Copy Guide for Beginners", "Tutorial", "write testable ads with clear claims"],
      ["ai-content-repurposing-workflow", "AI Content Repurposing Workflow", "Workflow", "turn one idea into posts, emails, and scripts"],
      ["surfer-vs-semrush-vs-writesonic", "Surfer vs Semrush vs Writesonic", "Comparison", "compare SEO and content planning workflows"],
      ["ai-marketing-funnel-guide", "AI Marketing Funnel Guide", "Guide", "map content to awareness, evaluation, and conversion"],
      ["ai-customer-research-prompts", "AI Customer Research Prompts", "Prompt Library", "summarize reviews, objections, and customer language"],
      ["ai-marketing-mistakes", "AI Marketing Mistakes Beginners Make", "Checklist", "avoid false claims, bland posts, and keyword stuffing"],
      ["ai-affiliate-site-workflow", "AI Affiliate Site Workflow", "Workflow", "build helpful affiliate content with clear disclosure"],
    ],
  },
];

function ensureDir(dir) {
  fs.mkdirSync(path.join(root, dir), { recursive: true });
}

function cleanHtmlDir(dir) {
  const fullDir = path.join(root, dir);
  if (!fs.existsSync(fullDir)) return;
  for (const entry of fs.readdirSync(fullDir, { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith(".html")) {
      fs.unlinkSync(path.join(fullDir, entry.name));
    }
  }
}

function writeFile(file, content) {
  fs.writeFileSync(path.join(root, file), content, "utf8");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function titleCase(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function truncate(value, max) {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1).replace(/\s+\S*$/, "")}.`;
}

function metaTitle(value) {
  let title = value;
  if (title.length < 25) {
    title = `${title}: Practical Guide`;
  }
  return truncate(title, 70);
}

function metaDescription(value) {
  let description = value.replace(/\s+/g, " ").trim();
  if (description.length < 80) {
    description = `${description} This page includes beginner steps, examples, common mistakes, and a comparison table.`;
  }
  return truncate(description, 165);
}

function readingMinutes(text) {
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(6, Math.round(words / 210));
}

function rssAlternateLink() {
  return `<link rel="alternate" type="application/rss+xml" title="${escapeHtml(site.name)} RSS Feed" href="${site.url}/rss.xml">`;
}

function formatRfc822(value) {
  const date = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) {
    return new Date().toUTCString();
  }
  return date.toUTCString();
}

function articleDate(article) {
  return article.createdAt || site.date;
}

function articleCardCopy(article) {
  if (article.cardSummary) {
    return truncate(article.cardSummary, 138);
  }
  if (article.summary) {
    return truncate(article.summary, 138);
  }
  return truncate(`Learn how to ${article.focus} with a clear workflow, examples, and beginner mistakes to avoid.`, 138);
}

function articleStandfirst(article) {
  if (article.summary) {
    return article.summary;
  }
  return `This beginner-friendly guide shows how to ${article.focus} with practical context, original examples, and clear review points before you rely on the output.`;
}

function articleReaderLens(article) {
  if (article.readerLens) {
    return article.readerLens;
  }
  return `Translate this development into operating questions: what changes for workflow design, cost control, review burden, and the timing of adoption for your own stack?`;
}

function articleWatchlist(article) {
  if (Array.isArray(article.watchlist) && article.watchlist.length > 0) {
    return article.watchlist.slice(0, 3);
  }
  const notes = Array.isArray(article.sourceNotes) ? article.sourceNotes : [];
  return [
    notes[0] || `Check whether ${article.tools[0]} turns this signal into a real workflow improvement instead of headline value alone.`,
    notes[1] || `Track how this shifts cost, quality, or review risk for teams working on ${article.focus}.`,
    `Verify the claim against practical usage before changing tools, budgets, or publishing recommendations.`,
  ];
}

function articleQuestions(article) {
  if (Array.isArray(article.readerQuestions) && article.readerQuestions.length > 0) {
    return article.readerQuestions.slice(0, 3);
  }
  return [
    `What actually changed here beyond the product headline or research framing?`,
    `If this affects my workflow, is the main impact capability, pricing, or operational risk?`,
    `What evidence would I want before turning this signal into a purchase, build, or content decision?`,
  ];
}

function articleRecords() {
  const all = [];
  let globalIndex = 0;
  const seenSlugs = new Set();
  function pushArticle(article) {
    if (seenSlugs.has(article.slug)) {
      throw new Error(`Duplicate article slug: ${article.slug}`);
    }
    seenSlugs.add(article.slug);
    all.push(article);
    globalIndex += 1;
  }
  clusters.forEach((cluster) => {
    cluster.articles.forEach(([slug, title, type, focus], index) => {
      pushArticle({
        slug,
        title,
        type,
        focus,
        cluster: cluster.slug,
        category: cluster.name,
        tag: cluster.tag,
        color: cluster.color,
        tools: cluster.tools,
        intent: cluster.intent,
        image: cluster.image,
        index,
        globalIndex,
      });
    });
  });
  const customArticles = readJsonOptional("data/custom-articles.json", []);
  if (!Array.isArray(customArticles)) {
    throw new Error("data/custom-articles.json must contain an array of article records.");
  }
  customArticles.forEach((article) => {
    const cluster = clusters.find((item) => item.slug === article.cluster);
    if (!cluster) {
      throw new Error(`Unknown article cluster "${article.cluster}" for "${article.slug}".`);
    }
    if (!article.slug || !article.title || !article.type || !article.focus) {
      throw new Error("Each custom article needs slug, title, type, focus, and cluster.");
    }
    pushArticle({
      slug: article.slug,
      title: article.title,
      type: article.type,
      focus: article.focus,
      cluster: cluster.slug,
      category: cluster.name,
      tag: cluster.tag,
      color: cluster.color,
      tools: Array.isArray(article.tools) && article.tools.length >= 3 ? article.tools : cluster.tools,
      intent: article.intent || cluster.intent,
      image: cluster.image,
      index: all.filter((item) => item.cluster === cluster.slug).length,
      globalIndex,
      createdAt: article.createdAt || site.date,
      summary: article.summary || "",
      keywords: Array.isArray(article.keywords) ? article.keywords : [],
      sourceUrl: article.sourceUrl || "",
      sourceLabel: article.sourceLabel || "",
      sourceTitle: article.sourceTitle || "",
      sourceNotes: Array.isArray(article.sourceNotes) ? article.sourceNotes : [],
      cardSummary: article.cardSummary || "",
      readerLens: article.readerLens || "",
      watchlist: Array.isArray(article.watchlist) ? article.watchlist : [],
      readerQuestions: Array.isArray(article.readerQuestions) ? article.readerQuestions : [],
    });
  });
  return all;
}

const articles = articleRecords();

function articleArtPath(article) {
  return `assets/article-art/${article.slug}.svg`;
}

const aiSites = [
  {
    name: "ChatGPT",
    category: "Chatbot",
    color: "red",
    siteUrl: "https://chatgpt.com/",
    pricingUrl: "https://chatgpt.com/pricing/",
    intro: "A general-purpose AI assistant for writing, coding help, file analysis, search, and multimodal work.",
    price: "Free plan / Plus $20 per month",
    offer: "Free plan available",
    note: "Best if you want one default tool for everyday tasks.",
  },
  {
    name: "Claude",
    category: "Chatbot",
    color: "red",
    siteUrl: "https://claude.com/",
    pricingUrl: "https://claude.com/pricing",
    intro: "A strong writing and reasoning assistant with long-context workflows, coding support, and projects.",
    price: "Free / Pro $17 per month yearly or $20 monthly",
    offer: "Free plan available",
    note: "Good for long documents and careful drafting.",
  },
  {
    name: "Gemini",
    category: "Google AI",
    color: "teal",
    siteUrl: "https://gemini.google.com/",
    pricingUrl: "https://one.google.com/about/google-ai-plans/?hl=en",
    intro: "Google's AI plan ties Gemini into search, Gmail, Docs, Drive, and creative tools like Flow and Whisk.",
    price: "Google AI Pro from US$19.99 per month",
    offer: "Try Google AI Pro free for 1 month; student offer for 1 year",
    note: "Best for Google ecosystem users who want storage and AI together.",
  },
  {
    name: "Microsoft Copilot",
    category: "Office AI",
    color: "blue",
    siteUrl: "https://copilot.microsoft.com/",
    pricingUrl: "https://www.microsoft.com/en-us/store/b/copilotpro",
    intro: "Microsoft's consumer AI assistant with web, Windows, and Microsoft 365 workflow integration.",
    price: "Copilot Pro $20 per user per month",
    offer: "Free version available",
    note: "Best if you already work in Microsoft 365 apps.",
  },
  {
    name: "Perplexity",
    category: "Search AI",
    color: "teal",
    siteUrl: "https://www.perplexity.ai/",
    pricingUrl: "https://www.perplexity.ai/pro",
    intro: "A search-first assistant focused on sources, research, citations, and quick comparison work.",
    price: "Pricing on official plan page",
    offer: "Pro perks program for eligible US subscribers",
    note: "Best when you need sourced answers rather than a creative draft.",
  },
  {
    name: "Cursor",
    category: "AI Coding",
    color: "teal",
    siteUrl: "https://cursor.com/",
    pricingUrl: "https://www.cursor.com/pricing",
    intro: "An AI coding editor for spec-driven workflows, code changes, and agent-assisted development.",
    price: "Hobby free / Pro $20 per month",
    offer: "Free Hobby plan",
    note: "Best for beginners who want AI directly inside the editor.",
  },
  {
    name: "Midjourney",
    category: "Image AI",
    color: "violet",
    siteUrl: "https://www.midjourney.com/",
    pricingUrl: "https://docs.midjourney.com/hc/en-us/articles/27870484040333-Comparing-Midjourney-Plans",
    intro: "A leading image generator for stylized visuals, concept art, and controlled prompt variations.",
    price: "Basic $10, Standard $30, Pro $60, Mega $120 monthly",
    offer: "20% off annual billing",
    note: "Best if you want strong image style control and a mature community workflow.",
  },
  {
    name: "Runway",
    category: "Video AI",
    color: "gold",
    siteUrl: "https://runwayml.com/",
    pricingUrl: "https://runwayml.com/pricing",
    intro: "An AI video and image platform for short clips, storyboards, motion tests, and creator workflows.",
    price: "Free $0 / Standard $12 per user per month billed annually",
    offer: "Yearly plans show 20% off",
    note: "Best for creators who want both image and video generation in one place.",
  },
  {
    name: "ElevenLabs",
    category: "Voice AI",
    color: "gold",
    siteUrl: "https://elevenlabs.io/",
    pricingUrl: "https://elevenlabs.io/pricing",
    intro: "A popular voice and audio platform for narration, dubbing, transcription, and voice design.",
    price: "Free / Starter $6 per month / Creator $11 per month",
    offer: "Creator shows first month 50% off",
    note: "Best for creators who need natural-sounding narration or dubbing.",
  },
  {
    name: "Notion",
    category: "Productivity AI",
    color: "green",
    siteUrl: "https://www.notion.com/",
    pricingUrl: "https://www.notion.com/pricing",
    intro: "A workspace that combines notes, docs, tasks, and AI features for planning and team coordination.",
    price: "Free / Business $20 per member per month",
    offer: "Custom Agents free to try, then $10 per 1,000 credits",
    note: "Best when you want AI inside your workspace rather than a standalone chatbot.",
  },
  {
    name: "Canva",
    category: "Design AI",
    color: "sage",
    siteUrl: "https://www.canva.com/",
    pricingUrl: "https://www.canva.com/pro/",
    intro: "A design platform with AI tools for social graphics, brand kits, decks, and quick visual production.",
    price: "Free / Pro trial available",
    offer: "30-day Canva Pro trial",
    note: "Best for fast design work and lightweight AI image or layout tasks.",
  },
  {
    name: "Adobe Firefly",
    category: "Creative AI",
    color: "violet",
    siteUrl: "https://www.adobe.com/products/firefly.html",
    pricingUrl: "https://www.adobe.com/products/firefly.html",
    intro: "Adobe's creative AI suite for image generation, video, audio, and design workflows.",
    price: "Standard US$9.99 / Pro US$19.99 / Pro Plus US$49.99",
    offer: "Pro Plus has a limited-time 50% first-year offer",
    note: "Best for creators who already use Adobe tools and want AI inside that stack.",
  },
];

const promptSources = [
  {
    name: "OpenAI",
    url: "https://help.openai.com/en/articles/6654000-best-practices-for-prompt-engineering-with-the-openai-api",
    lesson:
      "Put instructions first, separate context with delimiters, specify format and style, use examples when needed, and ask for the behavior you want instead of only listing forbidden behavior.",
  },
  {
    name: "Anthropic",
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
    lesson:
      "Define success criteria before tuning prompts, use structured prompts, test outputs against evaluations, and split complex work into chained prompts when one prompt becomes overloaded.",
  },
  {
    name: "Google Gemini",
    url: "https://ai.google.dev/gemini-api/docs/prompting-strategies",
    lesson:
      "Use clear instructions, constraints, response formats, examples, grounding context, and prompt iteration. For complex work, break the task into components or chained steps.",
  },
  {
    name: "Microsoft Copilot",
    url: "https://support.microsoft.com/en-us/topic/learn-about-copilot-prompts-f6c3b467-f07c-4db1-ae54-ffac96184dd5",
    lesson:
      "A strong business prompt usually has a goal, context, expectations, and source material. Outputs should be reviewed and verified against trusted sources.",
  },
];

const promptPrinciples = [
  {
    title: "Start with the job, not the tool",
    detail:
      "Write the real task in one sentence before opening any model. If the task is unclear to you, the model will fill gaps with confident guesses.",
  },
  {
    title: "Separate facts from instructions",
    detail:
      "Use labeled sections such as Goal, Context, Inputs, Constraints, Output Format, and Verification so the model can tell what to follow and what to analyze.",
  },
  {
    title: "Show the target shape",
    detail:
      "If format matters, include a small example or schema. Few-shot examples are most useful when they demonstrate structure, tone, and level of detail.",
  },
  {
    title: "Force useful uncertainty",
    detail:
      "Ask the model to mark assumptions, missing inputs, and claims that need human verification. This reduces polished but unsupported answers.",
  },
  {
    title: "Chain high-risk work",
    detail:
      "Use one prompt to clarify, one to outline, one to draft, and one to check. Long single prompts are harder to inspect and easier to misunderstand.",
  },
  {
    title: "Save reusable briefs",
    detail:
      "Turn prompts that worked into small skills: purpose, inputs, steps, quality bar, and failure signs. This creates compounding value instead of one-off chats.",
  },
];

const aiSkillPlaybooks = [
  {
    title: "Research Brief Builder",
    color: "teal",
    bestFor: "turning a question into a source-backed research brief",
    useWhen: "Use this when you need a reliable overview before writing, buying, investing time, or making a business decision.",
    workflow: [
      "Define the decision the research must support.",
      "List claims that need current sources and claims that can be reasoned from supplied material.",
      "Ask for search queries, source criteria, and a brief outline before drafting.",
      "Require a final table with claim, source, confidence, and what a human should verify.",
    ],
    prompt:
      "Act as a research analyst.\nGoal: build a source-backed brief for [decision or question].\nContext: [audience, geography, date sensitivity, constraints].\nKnown information: [paste notes].\nTasks:\n1. Restate the research question.\n2. List the facts that require external verification.\n3. Suggest search queries and source types.\n4. Draft a brief with claim, evidence, confidence, and open questions.\nOutput format: executive summary, evidence table, risks, next actions.\nQuality bar: separate facts from assumptions and flag anything that may be outdated.",
    quality: "A good output makes it obvious which facts are verified, which are assumptions, and which next search would improve confidence.",
  },
  {
    title: "Source Verification Analyst",
    color: "teal",
    bestFor: "checking whether an AI answer can be trusted",
    useWhen: "Use this after any model produces factual claims, pricing notes, legal-adjacent guidance, product comparisons, or medical/financial context.",
    workflow: [
      "Extract atomic factual claims instead of checking whole paragraphs.",
      "Classify each claim as current, stable, subjective, or unsupported.",
      "Map every current claim to a primary or credible source.",
      "Rewrite the answer with unsupported claims removed or clearly marked.",
    ],
    prompt:
      "Act as a verification editor.\nInput answer: [paste AI answer].\nTask:\n1. Extract each factual claim as a separate line.\n2. Label each claim: stable, time-sensitive, subjective, or unsupported.\n3. For time-sensitive claims, state what source type is required.\n4. Identify claims that must be removed before publication.\n5. Rewrite the answer so it is cautious, useful, and source-aware.\nOutput format: claim audit table, verification plan, safer rewritten answer.\nQuality bar: do not treat fluent writing as evidence.",
    quality: "The audit should reduce risk. If it only says 'looks good' without claim-level checks, it failed.",
  },
  {
    title: "Prompt Refiner",
    color: "violet",
    bestFor: "turning vague requests into repeatable prompts",
    useWhen: "Use this when a prompt gives inconsistent results, ignores format, or produces generic advice.",
    workflow: [
      "Identify the missing role, audience, constraints, inputs, and output format.",
      "Ask the model to propose a stronger prompt, not just answer the weak prompt.",
      "Add a quality bar and failure conditions.",
      "Test the refined prompt on one real example and improve it once.",
    ],
    prompt:
      "Act as a prompt engineer.\nWeak prompt: [paste prompt].\nProblem with output: [what went wrong].\nTarget user: [who will use the answer].\nImprove the prompt by adding role, goal, context, inputs, constraints, output format, examples if useful, and a verification step.\nReturn:\n1. Diagnosis of missing context.\n2. Improved copy-ready prompt.\n3. Why each section was added.\n4. One test case and expected output shape.\nQuality bar: keep the prompt practical and avoid unnecessary complexity.",
    quality: "A refined prompt should be shorter than a process manual but specific enough that another person can reuse it.",
  },
  {
    title: "AI Coding Spec Writer",
    color: "teal",
    bestFor: "using AI coding tools without chaotic rewrites",
    useWhen: "Use this before asking Cursor, Copilot, Claude, or ChatGPT to edit an existing project.",
    workflow: [
      "Ask the assistant to inspect relevant files and explain current behavior.",
      "Convert the request into acceptance criteria and non-goals.",
      "Limit the first implementation to a small file or module set.",
      "Require tests or manual verification steps before calling the task done.",
    ],
    prompt:
      "Act as a senior software engineer preparing an implementation spec.\nGoal: [feature or bugfix].\nRepo context: [framework, key files, constraints].\nCurrent behavior: [what happens now].\nDesired behavior: [what should happen].\nNon-goals: [what not to change].\nTask:\n1. Ask clarifying questions only if essential.\n2. Identify likely files to inspect.\n3. Write acceptance criteria.\n4. Propose a minimal implementation plan.\n5. List tests or manual checks.\nQuality bar: prefer small, reviewable changes and do not rewrite unrelated code.",
    quality: "The spec is useful only if it prevents unnecessary edits and gives you a concrete way to verify the change.",
  },
  {
    title: "Code Review Assistant",
    color: "teal",
    bestFor: "finding real risks in generated or human-written code",
    useWhen: "Use this after AI changes code, before accepting a pull request, or before deploying a small tool.",
    workflow: [
      "Ask for bugs and regressions first, not style preferences.",
      "Require file and line references when available.",
      "Separate high-risk issues from cleanup suggestions.",
      "Ask for missing tests and edge cases.",
    ],
    prompt:
      "Act as a strict code reviewer.\nChange summary: [what changed].\nDiff or code: [paste relevant diff].\nReview priorities:\n1. Bugs and behavioral regressions.\n2. Security or privacy risks.\n3. Missing tests for changed behavior.\n4. Maintainability problems only if they can cause real issues.\nOutput format: findings ordered by severity, evidence, suggested fix, open questions.\nQuality bar: do not list generic style advice unless it affects correctness.",
    quality: "A useful review points to a concrete failure mode. A weak review lists broad preferences without evidence.",
  },
  {
    title: "SEO Content Editor",
    color: "green",
    bestFor: "making AI-assisted articles more useful and less generic",
    useWhen: "Use this after drafting content for search traffic, affiliate pages, tool directories, or tutorials.",
    workflow: [
      "Match the page to one search intent and one reader problem.",
      "Add original examples, comparison criteria, and beginner mistakes.",
      "Remove unsupported claims, filler intros, and repeated paragraphs.",
      "Add internal links, disclosure notes, and update checkpoints.",
    ],
    prompt:
      "Act as an SEO editor who prioritizes helpful content.\nDraft: [paste draft].\nTarget query: [search query].\nReader: [beginner, buyer, creator, developer].\nTask:\n1. Identify the search intent and missing sections.\n2. Remove low-value filler.\n3. Add practical examples, comparison criteria, and common mistakes.\n4. Suggest internal links and disclosure notes.\n5. Return a revised outline and a rewrite plan.\nQuality bar: every section must help the reader decide or do something.",
    quality: "If a paragraph could appear on any AI website, it should be replaced with a concrete example, checklist, or decision rule.",
  },
  {
    title: "Meeting Notes to Action Plan",
    color: "green",
    bestFor: "turning messy notes into decisions, owners, and next steps",
    useWhen: "Use this after calls, team discussions, voice transcripts, or client meetings.",
    workflow: [
      "Separate confirmed decisions from discussion ideas.",
      "Extract tasks with owner, due date, dependency, and ambiguity.",
      "Create a follow-up message that people can approve or correct.",
      "Ask the model to flag missing owners and unclear deadlines.",
    ],
    prompt:
      "Act as an operations assistant.\nMeeting transcript or notes: [paste notes].\nTask:\n1. Summarize the meeting in five bullets or fewer.\n2. Extract decisions that were clearly made.\n3. Create an action table with task, owner, deadline, dependency, and risk.\n4. List open questions that need confirmation.\n5. Draft a follow-up message.\nQuality bar: do not invent owners or deadlines; mark unknowns clearly.",
    quality: "The output should make follow-up faster and reduce ambiguity, not create a pretty summary with missing responsibility.",
  },
  {
    title: "Image Prompt Art Director",
    color: "violet",
    bestFor: "getting more controllable images from Midjourney, DALL-E, Firefly, or Ideogram",
    useWhen: "Use this before generating blog illustrations, thumbnails, product mockups, or brand visuals.",
    workflow: [
      "Define the job of the image: explain, sell, compare, decorate, or demonstrate.",
      "Specify subject, composition, lighting, camera, material, and text constraints.",
      "Generate three prompt variants instead of one overloaded prompt.",
      "Score outputs against readability, brand fit, and whether the image supports the page.",
    ],
    prompt:
      "Act as an art director for AI image generation.\nGoal of image: [what the image must help the reader understand].\nBrand mood: [professional, playful, technical, editorial, etc.].\nMust include: [subjects and objects].\nMust avoid: [cliches, text errors, unsafe content, clutter].\nCreate three prompts:\n1. Clean editorial version.\n2. High-contrast thumbnail version.\n3. Product-style version.\nFor each prompt, include composition, lighting, camera angle, style, and negative constraints.\nQuality bar: the image must support the content, not just look impressive.",
    quality: "Strong image prompts are visual briefs. They control composition and purpose, not only style words.",
  },
  {
    title: "Video Storyboard Planner",
    color: "gold",
    bestFor: "reducing wasted credits in AI video tools",
    useWhen: "Use this before generating Runway, Pika, Synthesia, or short social clips.",
    workflow: [
      "Write the message before generating shots.",
      "Break the video into scenes with duration, motion, subject, and transition.",
      "Generate only the hardest shot first as a test.",
      "Keep a fallback plan for still images, captions, or stock footage.",
    ],
    prompt:
      "Act as a video creative director.\nVideo goal: [educate, sell, explain, entertain].\nAudience: [who will watch].\nLength: [15s, 30s, 60s, etc.].\nCore message: [one sentence].\nTask:\n1. Write a scene-by-scene storyboard.\n2. For each scene, include visual prompt, motion, duration, narration, and editing note.\n3. Identify risky shots likely to fail in AI generation.\n4. Suggest cheaper fallback assets.\nQuality bar: every shot must support the core message.",
    quality: "A good storyboard saves credits because it tests the riskiest visual idea before generating the full video.",
  },
  {
    title: "Privacy Redaction Assistant",
    color: "red",
    bestFor: "cleaning inputs before pasting them into AI tools",
    useWhen: "Use this for emails, contracts, customer messages, HR notes, health context, financial records, and internal documents.",
    workflow: [
      "Identify personal, confidential, credential, payment, and business-sensitive data.",
      "Replace sensitive details with stable placeholders.",
      "Keep enough context for the model to perform the task.",
      "Review the redacted text before sending it to an external service.",
    ],
    prompt:
      "Act as a privacy redaction assistant.\nText to prepare for AI use: [paste text].\nTask:\n1. Identify personal data, credentials, financial details, private business information, and sensitive internal context.\n2. Replace each sensitive item with a clear placeholder such as [CUSTOMER_NAME] or [API_KEY].\n3. Preserve the meaning needed for the task.\n4. Return a redaction log listing what was removed by category.\nQuality bar: do not remove so much context that the remaining task becomes impossible.",
    quality: "The best redaction keeps task meaning while removing details that should not be sent to a third-party model.",
  },
];

const promptPlaybooks = [
  {
    title: "Universal Task Brief",
    label: "Foundation",
    useFor: "Most writing, analysis, planning, and business tasks",
    prompt:
      "Act as a [role].\nGoal: [specific task].\nAudience: [who will use the output].\nContext: [business goal, constraints, background].\nInputs: [paste source material].\nOutput format: [table, checklist, brief, JSON, step-by-step plan].\nQuality bar: separate facts from assumptions, flag uncertainty, and list what a human must verify before use.",
    check: "Use this when you need a reliable first version. Replace every bracket before running it.",
  },
  {
    title: "Clarifying Question Gate",
    label: "Control",
    useFor: "Avoiding bad answers when the request is vague",
    prompt:
      "Before answering, check whether the task has enough information.\nIf essential information is missing, ask up to three concise clarifying questions.\nIf the task is clear enough, state your assumptions in one short paragraph and proceed.\nTask: [paste request]\nQuality bar: do not ask questions for optional details that can be handled with reasonable assumptions.",
    check: "Best for complex or expensive work where a wrong first draft wastes time.",
  },
  {
    title: "Evidence-Based Answer",
    label: "Research",
    useFor: "Fact-heavy answers, product comparisons, and current topics",
    prompt:
      "Answer the question using evidence.\nQuestion: [question]\nKnown sources or notes: [paste sources if available]\nRequirements:\n1. Separate confirmed facts, reasonable inferences, and unknowns.\n2. Cite or name the source type for important claims.\n3. Flag time-sensitive claims that need current verification.\n4. End with a short confidence rating and what would improve it.\nOutput format: concise answer, evidence table, caveats, next checks.",
    check: "Use current web search for claims that may have changed. Do not rely on model memory for prices, policies, or dates.",
  },
  {
    title: "Rewrite Without Losing Meaning",
    label: "Writing",
    useFor: "Improving clarity, tone, and structure without adding fake facts",
    prompt:
      "Rewrite the text for clarity and usefulness.\nAudience: [reader type]\nDesired tone: [plain, expert, friendly, direct]\nText: [paste text]\nRules:\n1. Preserve the original meaning.\n2. Do not add unsupported facts.\n3. Remove repetition and vague claims.\n4. Improve headings, transitions, and examples where useful.\nReturn: revised text, major edits made, and facts that still need verification.",
    check: "Good for AI content editing because it asks for a fact-safety pass, not only nicer language.",
  },
  {
    title: "Comparison Table Builder",
    label: "Decision",
    useFor: "Choosing between AI tools, plans, workflows, or options",
    prompt:
      "Create a decision table for [options].\nUser profile: [beginner, creator, developer, small business, student].\nDecision criteria: [cost, speed, accuracy, ease, privacy, integrations, output quality].\nTask:\n1. Define each criterion in plain English.\n2. Score each option from 1 to 5 only where evidence is available.\n3. Explain trade-offs.\n4. Recommend the best option for three different user types.\nQuality bar: mark unknowns instead of inventing scores.",
    check: "The table should help a reader choose. If it only repeats marketing claims, revise it.",
  },
  {
    title: "Step-by-Step Tutorial Generator",
    label: "Teaching",
    useFor: "Beginner guides, how-to pages, and training material",
    prompt:
      "Create a beginner tutorial for [task].\nReader starting point: [what they know now].\nTools available: [tools or platform].\nConstraints: [budget, time, skill level].\nOutput:\n1. What this helps you do.\n2. Before you start checklist.\n3. Numbered steps with expected result after each step.\n4. Common mistakes and fixes.\n5. Final quality checklist.\nQuality bar: every step must be observable by the reader.",
    check: "Useful tutorials tell readers what they should see after each step.",
  },
  {
    title: "Debug My Output",
    label: "Iteration",
    useFor: "Fixing bad AI responses, images, code, or drafts",
    prompt:
      "Diagnose why this output failed.\nOriginal goal: [goal]\nPrompt used: [prompt]\nOutput received: [paste output]\nWhat is wrong: [accuracy, tone, format, missing detail, visual problem]\nTask:\n1. Identify likely causes.\n2. Rewrite the prompt.\n3. Suggest one small test before rerunning the full task.\n4. Provide a checklist for judging the next output.\nQuality bar: fix the prompt and the process, not just the final wording.",
    check: "This turns failures into reusable lessons instead of random trial and error.",
  },
  {
    title: "Human Review Checklist",
    label: "Quality",
    useFor: "Final checks before publishing AI-assisted work",
    prompt:
      "Review this AI-assisted output before publication.\nOutput: [paste content]\nPublication context: [blog, email, report, website, code, image, video]\nCheck for:\n1. Unsupported factual claims.\n2. Missing context or misleading certainty.\n3. Privacy or confidential information.\n4. Low-value filler.\n5. Tone mismatch for the audience.\n6. Actionability and next steps.\nReturn: pass/fail table, required fixes, optional improvements, and final publish risk.",
    check: "Use this as the last pass, especially for public website content.",
  },
  {
    title: "Reusable Skill Card Builder",
    label: "Systems",
    useFor: "Turning one good prompt into a repeatable operating procedure",
    prompt:
      "Turn this successful AI workflow into a reusable skill card.\nWorkflow or prompt: [paste]\nTask:\n1. Name the skill.\n2. Define when to use it and when not to use it.\n3. List required inputs.\n4. Write the copy-ready prompt.\n5. Define output quality checks.\n6. List failure signs and how to fix them.\nOutput format: skill card with sections that a beginner can follow.",
    check: "The goal is a small repeatable process, not a giant prompt collection.",
  },
];

const promptQualityChecks = [
  "Can a beginner understand the goal without extra explanation?",
  "Does the prompt include the actual input material or a clear placeholder for it?",
  "Does it specify the output format tightly enough to inspect the result?",
  "Does it say what to do when information is missing?",
  "Does it force source checks for claims that are current, financial, legal, medical, or product-specific?",
  "Does it include a human review step before publishing or spending money?",
  "Can the same prompt be reused next week with only the inputs changed?",
  "Would the output still be useful if the model refuses to guess?",
];

const promptComparisons = [
  {
    weak: "Write an article about AI tools.",
    better:
      "Write an article for beginners choosing their first AI tool stack. Compare one chatbot, one research tool, and one productivity tool by use case, cost risk, learning curve, and common mistakes. Include a disclosure note and a final decision table.",
    why: "The better version defines audience, scope, comparison criteria, required sections, and monetization transparency.",
  },
  {
    weak: "Make this better.",
    better:
      "Rewrite this landing page section for small business owners. Keep the meaning, remove vague claims, add one concrete example, and return a before/after table explaining each edit.",
    why: "The better version identifies what better means and prevents the model from inventing unsupported claims.",
  },
  {
    weak: "Check my code.",
    better:
      "Review this diff for bugs, regressions, missing tests, and security risks. Prioritize findings by severity and include the exact behavior that could fail. Ignore cosmetic style unless it affects correctness.",
    why: "The better version tells the model to review like an engineer, not like a generic formatter.",
  },
];

function nav(prefix = "") {
  return `<header class="site-header">
    <div class="nav-wrap">
      <a class="brand" href="${prefix}index.html" aria-label="${site.name} home"><span class="brand-mark"></span>${site.name}</a>
      <nav class="site-nav" aria-label="Primary navigation">
        <a href="${prefix}categories/chatbots.html">Chatbots</a>
        <a href="${prefix}categories/research.html">Research</a>
        <a href="${prefix}categories/image.html">Image</a>
        <a href="${prefix}categories/video.html">Video</a>
        <a href="${prefix}ai-sites.html">AI Sites</a>
        <a href="${prefix}ai-skills.html">AI Skills</a>
        <a href="${prefix}categories/coding.html">Coding</a>
        <a href="${prefix}affiliate-disclosure.html">Disclosure</a>
      </nav>
      <div class="nav-actions" aria-label="Reader tools">
        <div class="nav-visit-chip" aria-live="polite">
          <span>Total visits</span>
          <strong data-site-visit-count>Syncing</strong>
        </div>
        <a class="nav-action-link" href="${prefix}rss.xml">Subscribe</a>
        <button class="nav-action-button" type="button" data-bookmark-site>Save site</button>
        <button class="nav-action-button" type="button" data-share-page>Share</button>
      </div>
    </div>
  </header>`;
}

function footer(prefix = "") {
  return `<footer class="site-footer">
    <div class="footer-wrap">
      <div>
        <strong>${site.name}</strong>
        <p>Practical AI tool guides for readers who want workflows, examples, and honest selection criteria.</p>
      </div>
      <nav class="footer-links" aria-label="Footer navigation">
        <a href="${prefix}ai-skills.html">AI Skills</a>
        <a href="${prefix}ai-sites.html">AI Sites</a>
        <a href="${prefix}privacy.html">Privacy</a>
        <a href="${prefix}affiliate-disclosure.html">Affiliate Disclosure</a>
        <a href="${prefix}review-methodology.html">Review Methodology</a>
        <a href="${prefix}editorial-policy.html">Editorial Policy</a>
        <a href="${prefix}contact.html">Contact</a>
        <a href="${prefix}rss.xml">RSS</a>
        <a href="${prefix}sitemap.xml">Sitemap</a>
      </nav>
    </div>
  </footer>`;
}

function svgArtTech(cluster) {
  const palettes = {
    chat: ["#7dd3fc", "#38bdf8", "#2dd4bf"],
    research: ["#60a5fa", "#38bdf8", "#22d3ee"],
    image: ["#38bdf8", "#2563eb", "#2dd4bf"],
    video: ["#93c5fd", "#3b82f6", "#7dd3fc"],
    design: ["#67e8f9", "#0ea5e9", "#34d399"],
    productivity: ["#7dd3fc", "#2563eb", "#14b8a6"],
    writing: ["#60a5fa", "#0891b2", "#38bdf8"],
    coding: ["#38bdf8", "#1d4ed8", "#22d3ee"],
    audio: ["#93c5fd", "#0ea5e9", "#2dd4bf"],
    marketing: ["#7dd3fc", "#1d4ed8", "#38bdf8"],
  };
  const [accent, support, signal] = palettes[cluster.icon] || palettes.chat;
  const label = escapeHtml(cluster.name);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="680" viewBox="0 0 1200 680" role="img" aria-labelledby="title desc">
  <title id="title">${label} blue technology workflow map</title>
  <desc id="desc">Blue technology dashboard cover showing tool selection signals, workflow checks, and publishing gates for ${label}.</desc>
  <defs>
    <linearGradient id="catBg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0b2d55"/>
      <stop offset=".58" stop-color="#071a33"/>
      <stop offset="1" stop-color="#030712"/>
    </linearGradient>
    <linearGradient id="catPanel" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#123b6f"/>
      <stop offset="1" stop-color="#08182b"/>
    </linearGradient>
    <linearGradient id="catAccent" x1="0" x2="1">
      <stop offset="0" stop-color="${accent}"/>
      <stop offset="1" stop-color="${support}"/>
    </linearGradient>
    <filter id="catShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#020617" flood-opacity=".42"/>
    </filter>
  </defs>
  <rect width="1200" height="680" fill="url(#catBg)"/>
  <path d="M0 82h1200M0 202h1200M0 322h1200M0 442h1200M0 562h1200M120 0v680M300 0v680M480 0v680M660 0v680M840 0v680M1020 0v680" stroke="#7dd3fc" stroke-opacity=".10" stroke-width="2"/>
  <path d="M64 566C178 486 250 554 364 476s200-80 326-18s236-38 374-162" fill="none" stroke="${support}" stroke-width="3" stroke-opacity=".28"/>
  <g filter="url(#catShadow)">
    <rect x="70" y="54" width="1060" height="572" rx="28" fill="#061426" stroke="#7dd3fc" stroke-opacity=".34" stroke-width="2"/>
    <rect x="106" y="94" width="988" height="78" rx="18" fill="url(#catPanel)" stroke="#7dd3fc" stroke-opacity=".24"/>
    <text x="136" y="143" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="38" font-weight="800" fill="#eef7ff">${label}</text>
    <text x="814" y="143" font-family="Cascadia Mono,Consolas,monospace" font-size="17" fill="#a7b8cc">CATEGORY SIGNAL MAP</text>
    <g transform="translate(106 218)">
      <rect width="306" height="232" rx="20" fill="url(#catPanel)" stroke="#7dd3fc" stroke-opacity=".30" stroke-width="2"/>
      <text x="30" y="52" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="27" font-weight="800" fill="#eef7ff">Decision Core</text>
      <text x="30" y="90" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="18" fill="#a7b8cc">Pick tools by outcome, cost, and risk.</text>
      <rect x="30" y="126" width="230" height="14" rx="7" fill="#0f2745"/>
      <rect x="30" y="126" width="174" height="14" rx="7" fill="url(#catAccent)"/>
      <rect x="30" y="164" width="230" height="14" rx="7" fill="#0f2745"/>
      <rect x="30" y="164" width="126" height="14" rx="7" fill="${signal}"/>
      <text x="30" y="210" font-family="Cascadia Mono,Consolas,monospace" font-size="18" font-weight="800" fill="${accent}">VERIFY BEFORE BUYING</text>
    </g>
    <g transform="translate(466 226)">
      <rect width="256" height="216" rx="22" fill="#081f3a" stroke="#7dd3fc" stroke-opacity=".26" stroke-width="2"/>
      <circle cx="128" cy="108" r="78" fill="none" stroke="#7dd3fc" stroke-opacity=".18" stroke-width="18"/>
      <circle cx="128" cy="108" r="48" fill="#0f2745" stroke="${accent}" stroke-opacity=".72" stroke-width="4"/>
      <path d="M128 52v-48M128 212v-48M72 108H24M232 108h-48" stroke="${support}" stroke-width="4" stroke-linecap="round" stroke-opacity=".75"/>
      <path d="M86 148C112 94 152 93 174 70" fill="none" stroke="${signal}" stroke-width="8" stroke-linecap="round"/>
      <text x="86" y="116" font-family="Cascadia Mono,Consolas,monospace" font-size="26" font-weight="800" fill="#eef7ff">AI</text>
      <text x="122" y="116" font-family="Cascadia Mono,Consolas,monospace" font-size="26" font-weight="800" fill="${accent}">MAP</text>
    </g>
    <g transform="translate(774 218)">
      <rect width="320" height="232" rx="20" fill="url(#catPanel)" stroke="#7dd3fc" stroke-opacity=".30" stroke-width="2"/>
      <text x="28" y="52" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="27" font-weight="800" fill="#eef7ff">Workflow Gates</text>
      <g font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="20" font-weight="700">
        <rect x="28" y="78" width="264" height="38" rx="12" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".18"/>
        <text x="48" y="104" fill="#cfe8ff">01 Plan the job</text>
        <rect x="28" y="124" width="264" height="38" rx="12" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".18"/>
        <text x="48" y="150" fill="#cfe8ff">02 Compare options</text>
        <rect x="28" y="170" width="264" height="38" rx="12" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".18"/>
        <text x="48" y="196" fill="#cfe8ff">03 Check output</text>
      </g>
    </g>
    <g transform="translate(106 496)">
      <rect width="988" height="72" rx="18" fill="#081f3a" stroke="#7dd3fc" stroke-opacity=".24"/>
      <path d="M44 36h180M296 36h180M548 36h180M800 36h120" stroke="${accent}" stroke-width="7" stroke-linecap="round"/>
      <circle cx="44" cy="36" r="12" fill="${accent}"/>
      <circle cx="296" cy="36" r="12" fill="${support}"/>
      <circle cx="548" cy="36" r="12" fill="${signal}"/>
      <circle cx="800" cy="36" r="12" fill="${accent}"/>
      <text x="70" y="43" font-family="Cascadia Mono,Consolas,monospace" font-size="17" fill="#a7b8cc">PLAN</text>
      <text x="322" y="43" font-family="Cascadia Mono,Consolas,monospace" font-size="17" fill="#a7b8cc">COMPARE</text>
      <text x="574" y="43" font-family="Cascadia Mono,Consolas,monospace" font-size="17" fill="#a7b8cc">VERIFY</text>
      <text x="826" y="43" font-family="Cascadia Mono,Consolas,monospace" font-size="17" fill="#a7b8cc">SHIP</text>
    </g>
  </g>
</svg>`;
}

function paletteForArticleTech(article) {
  const palettes = [
    { accent: "#7dd3fc", support: "#38bdf8", signal: "#2dd4bf" },
    { accent: "#60a5fa", support: "#22d3ee", signal: "#38bdf8" },
    { accent: "#93c5fd", support: "#3b82f6", signal: "#67e8f9" },
    { accent: "#38bdf8", support: "#0ea5e9", signal: "#34d399" },
    { accent: "#7dd3fc", support: "#2563eb", signal: "#14b8a6" },
    { accent: "#60a5fa", support: "#0891b2", signal: "#22d3ee" },
  ];
  return palettes[article.globalIndex % palettes.length];
}

function articleSvgArtTech(article) {
  const { accent, support, signal } = paletteForArticleTech(article);
  const layout = article.globalIndex % 6;
  const title = escapeHtml(article.title);
  const tag = escapeHtml(article.tag);
  const shortFocus = escapeHtml(truncate(article.focus, 58));
  const toolA = escapeHtml(truncate(article.tools[0], 20));
  const toolB = escapeHtml(truncate(article.tools[1], 20));
  const toolC = escapeHtml(truncate(article.tools[2], 20));
  const label = escapeHtml(article.type);
  const subtitle = [
    "Decision route",
    "Tool comparison",
    "Prompt console",
    "Signal analysis",
    "Plan selection",
    "Workflow stack",
  ][layout];
  const variants = [
    `<g transform="translate(92 190)">
      <rect width="1016" height="326" rx="24" fill="#081f3a" stroke="#7dd3fc" stroke-opacity=".25" stroke-width="2"/>
      <path d="M70 196C158 96 256 252 342 142S516 82 600 174s188 72 282-54" fill="none" stroke="${support}" stroke-width="8" stroke-linecap="round"/>
      <g font-family="Segoe UI,Trebuchet MS,sans-serif">
        <rect x="54" y="54" width="206" height="100" rx="16" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".22"/>
        <text x="82" y="94" font-size="25" font-weight="800" fill="#eef7ff">Scope</text>
        <text x="82" y="126" font-size="17" fill="#a7b8cc">Define the job</text>
        <rect x="394" y="66" width="228" height="118" rx="16" fill="#0f2745" stroke="${accent}" stroke-opacity=".44"/>
        <text x="424" y="108" font-size="25" font-weight="800" fill="#eef7ff">Prompt</text>
        <text x="424" y="140" font-size="17" fill="#a7b8cc">Add constraints</text>
        <rect x="744" y="154" width="206" height="100" rx="16" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".22"/>
        <text x="772" y="194" font-size="25" font-weight="800" fill="#eef7ff">Verify</text>
        <text x="772" y="226" font-size="17" fill="#a7b8cc">Check output</text>
      </g>
      <circle cx="70" cy="196" r="13" fill="${accent}"/>
      <circle cx="342" cy="142" r="13" fill="${signal}"/>
      <circle cx="600" cy="174" r="13" fill="${accent}"/>
      <circle cx="882" cy="120" r="13" fill="${support}"/>
    </g>`,
    `<g transform="translate(94 174)">
      <rect width="1012" height="360" rx="24" fill="#081f3a" stroke="#7dd3fc" stroke-opacity=".25" stroke-width="2"/>
      <path d="M94 260h1012M94 350h1012M94 440h1012M347 174v360M600 174v360M853 174v360" stroke="#7dd3fc" stroke-width="2" stroke-opacity=".18"/>
      <g font-family="Segoe UI,Trebuchet MS,sans-serif" font-weight="800" font-size="27" fill="#eef7ff">
        <text x="136" y="230">Need</text>
        <text x="388" y="230">Tool</text>
        <text x="640" y="230">Check</text>
        <text x="892" y="230">Ship</text>
      </g>
      <g font-family="Cascadia Mono,Consolas,monospace" font-size="19" fill="#a7b8cc">
        <text x="136" y="318">CLEAR INPUT</text>
        <text x="388" y="318">FIT SCORE</text>
        <text x="640" y="318">SOURCE GATE</text>
        <text x="892" y="318">FINAL PASS</text>
      </g>
      <circle cx="185" cy="430" r="34" fill="${accent}"/>
      <circle cx="438" cy="430" r="34" fill="${support}"/>
      <circle cx="691" cy="430" r="34" fill="${signal}"/>
      <circle cx="944" cy="430" r="34" fill="${accent}"/>
      <path d="M219 430h185M472 430h185M725 430h185" stroke="#7dd3fc" stroke-width="5" stroke-opacity=".38"/>
    </g>`,
    `<g transform="translate(108 166)">
      <rect width="984" height="384" rx="24" fill="#081f3a" stroke="#7dd3fc" stroke-opacity=".25" stroke-width="2"/>
      <rect x="34" y="38" width="360" height="308" rx="18" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".24"/>
      <text x="64" y="88" font-family="Cascadia Mono,Consolas,monospace" font-size="22" font-weight="800" fill="${accent}">PROMPT CONSOLE</text>
      <path d="M66 132h254M66 182h204M66 232h286M66 282h176" stroke="#7dd3fc" stroke-width="10" stroke-linecap="round" stroke-opacity=".35"/>
      <path d="M66 132h176M66 182h126M66 232h216M66 282h116" stroke="${support}" stroke-width="10" stroke-linecap="round"/>
      <rect x="456" y="38" width="492" height="132" rx="18" fill="#0f2745" stroke="${accent}" stroke-opacity=".38"/>
      <text x="490" y="84" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="29" font-weight="800" fill="#eef7ff">Context engineering</text>
      <text x="490" y="122" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="19" fill="#a7b8cc">Goal, audience, rules, examples, and review gates.</text>
      <rect x="456" y="214" width="218" height="132" rx="18" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".24"/>
      <rect x="730" y="214" width="218" height="132" rx="18" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".24"/>
      <text x="490" y="280" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="24" font-weight="800" fill="#eef7ff">Sources</text>
      <text x="764" y="280" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="24" font-weight="800" fill="#eef7ff">Rules</text>
    </g>`,
    `<g transform="translate(94 156)">
      <rect width="1012" height="396" rx="24" fill="#081f3a" stroke="#7dd3fc" stroke-opacity=".25" stroke-width="2"/>
      <path d="M158 456C236 334 318 274 418 318C526 366 560 216 678 246C784 274 808 410 982 250" fill="none" stroke="${accent}" stroke-width="9" stroke-linecap="round"/>
      <path d="M158 456C236 334 318 274 418 318C526 366 560 216 678 246C784 274 808 410 982 250" fill="none" stroke="#e0f2fe" stroke-width="2" stroke-opacity=".55"/>
      <g font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="22" font-weight="800">
        <rect x="70" y="70" width="190" height="92" rx="16" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".24"/>
        <text x="112" y="125" fill="#eef7ff">Draft</text>
        <rect x="314" y="198" width="190" height="92" rx="16" fill="#0f2745" stroke="${signal}" stroke-opacity=".50"/>
        <text x="356" y="253" fill="#eef7ff">Review</text>
        <rect x="552" y="98" width="190" height="92" rx="16" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".24"/>
        <text x="594" y="153" fill="#eef7ff">Improve</text>
        <rect x="790" y="218" width="160" height="92" rx="16" fill="url(#articleAccent)" stroke="${accent}" stroke-opacity=".70"/>
        <text x="832" y="273" fill="#03101f">Ship</text>
      </g>
    </g>`,
    `<g transform="translate(104 168)">
      <rect width="300" height="350" rx="22" fill="#081f3a" stroke="#7dd3fc" stroke-opacity=".25" stroke-width="2"/>
      <text x="34" y="62" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="29" font-weight="800" fill="#eef7ff">Free tier</text>
      <text x="34" y="100" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="18" fill="#a7b8cc">Test with real work</text>
      <path d="M38 154h220M38 208h170M38 262h244" stroke="${support}" stroke-width="10" stroke-linecap="round"/>
    </g>
    <g transform="translate(462 132)">
      <rect width="330" height="422" rx="24" fill="#0b2444" stroke="${accent}" stroke-opacity=".56" stroke-width="2"/>
      <text x="36" y="68" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="31" font-weight="800" fill="#eef7ff">Paid plan</text>
      <text x="36" y="108" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="19" fill="#a7b8cc">Buy only after limits</text>
      <rect x="36" y="154" width="238" height="18" rx="9" fill="#061426"/>
      <rect x="36" y="154" width="172" height="18" rx="9" fill="url(#articleAccent)"/>
      <rect x="36" y="214" width="238" height="18" rx="9" fill="#061426"/>
      <rect x="36" y="214" width="126" height="18" rx="9" fill="${signal}"/>
      <text x="36" y="326" font-family="Cascadia Mono,Consolas,monospace" font-size="20" font-weight="800" fill="${accent}">UPGRADE GATE</text>
    </g>
    <g transform="translate(850 168)">
      <rect width="246" height="350" rx="22" fill="#081f3a" stroke="#7dd3fc" stroke-opacity=".25" stroke-width="2"/>
      <text x="32" y="62" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="29" font-weight="800" fill="#eef7ff">Keep</text>
      <text x="32" y="100" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="18" fill="#a7b8cc">Save the pattern</text>
      <circle cx="82" cy="214" r="36" fill="${support}"/>
      <circle cx="154" cy="266" r="36" fill="${accent}"/>
      <path d="M110 235l18 12" stroke="#e0f2fe" stroke-width="7" stroke-linecap="round"/>
    </g>`,
    `<g transform="translate(96 170)">
      <rect width="1008" height="356" rx="24" fill="#081f3a" stroke="#7dd3fc" stroke-opacity=".25" stroke-width="2"/>
      <g font-family="Segoe UI,Trebuchet MS,sans-serif">
        <rect x="54" y="60" width="244" height="238" rx="18" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".24"/>
        <text x="84" y="120" font-size="28" font-weight="800" fill="#eef7ff">${toolA}</text>
        <text x="84" y="160" font-size="18" fill="#a7b8cc">fit and constraints</text>
        <rect x="84" y="206" width="154" height="14" rx="7" fill="${accent}"/>
        <rect x="386" y="40" width="244" height="278" rx="20" fill="#0b2444" stroke="${accent}" stroke-opacity=".50"/>
        <text x="416" y="108" font-size="28" font-weight="800" fill="#eef7ff">${toolB}</text>
        <text x="416" y="148" font-size="18" fill="#a7b8cc">workflow engine</text>
        <rect x="416" y="206" width="184" height="14" rx="7" fill="${support}"/>
        <rect x="718" y="60" width="244" height="238" rx="18" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".24"/>
        <text x="748" y="120" font-size="28" font-weight="800" fill="#eef7ff">${toolC}</text>
        <text x="748" y="160" font-size="18" fill="#a7b8cc">review checkpoint</text>
        <rect x="748" y="206" width="132" height="14" rx="7" fill="${signal}"/>
      </g>
      <path d="M298 180h88M630 180h88" stroke="#7dd3fc" stroke-width="5" stroke-opacity=".34" stroke-linecap="round"/>
    </g>`,
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="680" viewBox="0 0 1200 680" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title>
  <desc id="desc">Blue technology editorial cover for ${title}, showing ${shortFocus}.</desc>
  <defs>
    <linearGradient id="articleBg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0b2d55"/>
      <stop offset=".56" stop-color="#071a33"/>
      <stop offset="1" stop-color="#030712"/>
    </linearGradient>
    <linearGradient id="articleAccent" x1="0" x2="1">
      <stop offset="0" stop-color="${accent}"/>
      <stop offset="1" stop-color="${support}"/>
    </linearGradient>
    <filter id="articleShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="22" stdDeviation="22" flood-color="#020617" flood-opacity=".42"/>
    </filter>
  </defs>
  <rect width="1200" height="680" fill="url(#articleBg)"/>
  <path d="M0 76h1200M0 188h1200M0 300h1200M0 412h1200M0 524h1200M90 0v680M246 0v680M402 0v680M558 0v680M714 0v680M870 0v680M1026 0v680" stroke="#7dd3fc" stroke-width="2" opacity=".10"/>
  <path d="M-24 120L1260 520M-40 404L1230 96" stroke="#7dd3fc" stroke-width="2" stroke-opacity=".08"/>
  <g filter="url(#articleShadow)">
    <rect x="54" y="46" width="1092" height="588" rx="28" fill="#061426" stroke="#7dd3fc" stroke-opacity=".34" stroke-width="2"/>
    <rect x="92" y="80" width="278" height="54" rx="999" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".26"/>
    <rect x="92" y="80" width="12" height="54" rx="6" fill="url(#articleAccent)"/>
    <text x="122" y="116" font-family="Cascadia Mono,Consolas,monospace" font-size="18" font-weight="800" fill="${accent}">${tag} / ${label}</text>
    <text x="846" y="116" font-family="Cascadia Mono,Consolas,monospace" font-size="17" fill="#a7b8cc">AI TOOL GUIDE</text>
    ${variants[layout]}
    <text x="92" y="598" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="34" font-weight="800" fill="#eef7ff">${escapeHtml(truncate(article.title, 48))}</text>
    <text x="92" y="636" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="20" fill="#a7b8cc">${escapeHtml(subtitle)}: ${shortFocus}</text>
  </g>
</svg>`;
}

function aiSitesSvgArt() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760" role="img" aria-labelledby="title desc">
  <title id="title">AI sites directory blue technology dashboard</title>
  <desc id="desc">A blue technology directory dashboard showing AI websites grouped by use case and pricing checkpoints.</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0b2d55"/>
      <stop offset=".55" stop-color="#071a33"/>
      <stop offset="1" stop-color="#030712"/>
    </linearGradient>
    <linearGradient id="panel" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#123b6f"/>
      <stop offset="1" stop-color="#08182b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="760" fill="url(#bg)"/>
  <path d="M0 96h1200M0 226h1200M0 356h1200M0 486h1200M0 616h1200M150 0v760M330 0v760M510 0v760M690 0v760M870 0v760M1050 0v760" stroke="#7dd3fc" stroke-width="2" opacity=".11"/>
  <rect x="70" y="58" width="1060" height="644" rx="28" fill="#061426" stroke="#7dd3fc" stroke-opacity=".36" stroke-width="2"/>
  <text x="108" y="132" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="54" font-weight="800" fill="#eef7ff">AI Sites Directory</text>
  <text x="108" y="176" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="23" fill="#a7b8cc">Official links, pricing notes, and practical use-case routing</text>
  <g transform="translate(108 240)">
    <rect width="246" height="146" rx="18" fill="url(#panel)" stroke="#7dd3fc" stroke-opacity=".26"/>
    <text x="28" y="56" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="32" font-weight="800" fill="#eef7ff">Chat</text>
    <text x="28" y="94" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="20" fill="#a7b8cc">ChatGPT, Claude</text>
  </g>
  <g transform="translate(392 240)">
    <rect width="246" height="146" rx="18" fill="url(#panel)" stroke="#7dd3fc" stroke-opacity=".26"/>
    <text x="28" y="56" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="32" font-weight="800" fill="#eef7ff">Search</text>
    <text x="28" y="94" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="20" fill="#a7b8cc">Gemini, Perplexity</text>
  </g>
  <g transform="translate(676 240)">
    <rect width="346" height="146" rx="18" fill="url(#panel)" stroke="#7dd3fc" stroke-opacity=".26"/>
    <text x="28" y="56" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="32" font-weight="800" fill="#eef7ff">Productivity</text>
    <text x="28" y="94" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="20" fill="#a7b8cc">Copilot, Notion, Canva</text>
  </g>
  <g transform="translate(108 430)">
    <rect width="246" height="146" rx="18" fill="url(#panel)" stroke="#7dd3fc" stroke-opacity=".26"/>
    <text x="28" y="56" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="32" font-weight="800" fill="#eef7ff">Image</text>
    <text x="28" y="94" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="20" fill="#a7b8cc">Midjourney, Firefly</text>
  </g>
  <g transform="translate(392 430)">
    <rect width="246" height="146" rx="18" fill="url(#panel)" stroke="#7dd3fc" stroke-opacity=".26"/>
    <text x="28" y="56" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="32" font-weight="800" fill="#eef7ff">Media</text>
    <text x="28" y="94" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="20" fill="#a7b8cc">Runway, ElevenLabs</text>
  </g>
  <g transform="translate(676 430)">
    <rect width="346" height="146" rx="18" fill="url(#panel)" stroke="#7dd3fc" stroke-opacity=".26"/>
    <text x="28" y="56" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="32" font-weight="800" fill="#eef7ff">Coding</text>
    <text x="28" y="94" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="20" fill="#a7b8cc">Cursor and coding assistants</text>
  </g>
  <rect x="108" y="620" width="914" height="44" rx="999" fill="#0f2745" stroke="#7dd3fc" stroke-opacity=".26"/>
  <text x="140" y="650" font-family="Cascadia Mono,Consolas,monospace" font-size="18" font-weight="700" fill="#7dd3fc">Verify offers on official pages before buying. Prices and trials change.</text>
</svg>`;
}

function aiSkillsSvgArt() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="760" viewBox="0 0 1200 760" role="img" aria-labelledby="title desc">
  <title id="title">AI skills blue technology dashboard</title>
  <desc id="desc">A blue technology dashboard showing reusable AI skills, prompt cards, source checks, and quality gates.</desc>
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0b2d55"/>
      <stop offset=".52" stop-color="#071a33"/>
      <stop offset="1" stop-color="#030712"/>
    </linearGradient>
    <linearGradient id="card" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#123b6f"/>
      <stop offset="1" stop-color="#08182b"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="760" fill="url(#bg)"/>
  <path d="M0 96h1200M0 226h1200M0 356h1200M0 486h1200M0 616h1200M150 0v760M330 0v760M510 0v760M690 0v760M870 0v760M1050 0v760" stroke="#7dd3fc" stroke-width="2" opacity=".12"/>
  <rect x="64" y="54" width="1072" height="652" rx="28" fill="#061426" stroke="#7dd3fc" stroke-opacity=".36" stroke-width="2"/>
  <text x="104" y="126" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="54" font-weight="800" fill="#eef7ff">AI Skills Library</text>
  <text x="104" y="170" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="23" fill="#a7b8cc">Copy-ready prompt systems, reusable workflows, and verification gates</text>
  <g transform="translate(104 226)">
    <rect width="286" height="168" rx="18" fill="url(#card)" stroke="#7dd3fc" stroke-opacity=".30" stroke-width="2"/>
    <text x="26" y="54" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="31" font-weight="800" fill="#eef7ff">Research</text>
    <text x="26" y="94" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="19" fill="#cfe8ff">Claim audit, source plan,</text>
    <text x="26" y="124" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="19" fill="#cfe8ff">confidence rating</text>
    <circle cx="236" cy="56" r="24" fill="#38bdf8" opacity=".9"/>
  </g>
  <g transform="translate(456 226)">
    <rect width="286" height="168" rx="18" fill="url(#card)" stroke="#7dd3fc" stroke-opacity=".30" stroke-width="2"/>
    <text x="26" y="54" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="31" font-weight="800" fill="#eef7ff">Prompt</text>
    <text x="26" y="94" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="19" fill="#cfe8ff">Role, goal, context,</text>
    <text x="26" y="124" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="19" fill="#cfe8ff">format, quality bar</text>
    <circle cx="236" cy="56" r="24" fill="#3b82f6" opacity=".9"/>
  </g>
  <g transform="translate(808 226)">
    <rect width="286" height="168" rx="18" fill="url(#card)" stroke="#7dd3fc" stroke-opacity=".30" stroke-width="2"/>
    <text x="26" y="54" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="31" font-weight="800" fill="#eef7ff">Verify</text>
    <text x="26" y="94" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="19" fill="#cfe8ff">Facts, privacy, risk,</text>
    <text x="26" y="124" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="19" fill="#cfe8ff">human review</text>
    <circle cx="236" cy="56" r="24" fill="#2dd4bf" opacity=".9"/>
  </g>
  <g transform="translate(104 458)">
    <rect width="990" height="142" rx="18" fill="#0b2444" stroke="#7dd3fc" stroke-opacity=".32" stroke-width="2"/>
    <text x="30" y="49" font-family="Cascadia Mono,Consolas,monospace" font-size="21" font-weight="800" fill="#7dd3fc">COPY-READY PROMPT STRUCTURE</text>
    <text x="30" y="92" font-family="Cascadia Mono,Consolas,monospace" font-size="22" fill="#eef7ff">ROLE -> GOAL -> CONTEXT -> INPUTS -> CONSTRAINTS -> OUTPUT -> CHECK</text>
  </g>
  <rect x="104" y="636" width="990" height="34" rx="999" fill="#38bdf8" opacity=".92"/>
  <text x="134" y="660" font-family="Segoe UI,Trebuchet MS,sans-serif" font-size="18" font-weight="800" fill="#03101f">Useful AI work is a repeatable operating system, not a bag of magic prompts.</text>
</svg>`;
}

function generateAssets() {
  ensureDir("assets");
  ensureDir("assets/article-art");
  writeFile("assets/hero-ai-sites.svg", aiSitesSvgArt());
  writeFile("assets/hero-ai-skills.svg", aiSkillsSvgArt());
  clusters.forEach((cluster) => {
    writeFile(`assets/generated-${cluster.slug}.svg`, svgArtTech(cluster));
  });
  articles.forEach((article) => {
    writeFile(articleArtPath(article), articleSvgArtTech(article));
  });
}

function guidanceFor(article) {
  const base = {
    angle:
      "Chinese AI builder communities often repeat the same practical lesson: do not let a model rush you into output. Make it clarify the task, write a small plan, then expand the work in controlled sections. That idea is translated here into a beginner-safe workflow for English readers.",
    deep:
      "The useful skill is context engineering, not magic prompting. Context engineering means collecting the goal, audience, examples, constraints, source material, and review rules before asking for final output. A simple prompt can work, but a prepared brief is more repeatable because the model has fewer gaps to invent.",
    scenario:
      "Imagine a beginner who wants a finished deliverable tonight. The weak approach is to open a tool and type a broad request. The stronger approach is to spend ten minutes writing the desired result, the audience, the facts that cannot change, and the checks that must pass before publishing.",
    mistakeA: "Skipping the clarification step and asking for a polished final answer too early.",
    mistakeB: "Treating a fluent answer as verified truth instead of a draft that needs human review.",
    mistakeC: "Saving no notes, which means every future task starts from zero again.",
    checkpoint: "Ask for a plan first, review the plan, then request one section or one asset at a time.",
    promptTerm: "step-by-step",
    stack: "free tier",
  };
  const byCluster = {
    coding: {
      angle:
        "A common theme in Chinese AI coding discussions is spec-driven development: use /ask to clarify the requirement, then /spec to turn it into requirements, design notes, and tasks before editing code. The beginner version is simple: talk through the change before letting the assistant touch files.",
      deep:
        "For coding work, the most valuable context is usually not a giant prompt. It is a small project memory file such as CLAUDE.md, a clear task list, the exact files involved, and a habit of asking for one interface or function at a time. This reduces random rewrites and makes review possible.",
      scenario:
        "Suppose you are using Cursor, Copilot, or another coding assistant. First ask it to inspect the relevant files and explain the current behavior. Next ask for a short plan. Only after you agree with the plan should it change code. After each change, run tests or at least manually verify the behavior.",
      mistakeA: "Letting the assistant rewrite large areas without a small spec or review point.",
      mistakeB: "Forgetting to update project memory after a design decision changes.",
      mistakeC: "Accepting generated tests that only check implementation details instead of behavior.",
      checkpoint: "Use /ask style clarification, create a small /spec, edit one unit, then run a focused test.",
      promptTerm: "CLAUDE.md",
      stack: "spec-driven",
    },
    productivity: {
      angle:
        "Builder communities often recommend a low-budget indie stack: start with free tiers, simple analytics, cheap hosting, and a workflow you can maintain alone. For productivity AI, that means automating one painful repeatable task instead of building a complicated system on day one.",
      deep:
        "Productivity improves when AI is attached to a stable operating routine. A meeting note tool, task system, or automation should have a clear input, an owner, a review time, and a place where decisions live. Without that structure, the AI produces summaries that nobody trusts or uses.",
      scenario:
        "A small team can begin by choosing one recurring task: weekly meeting summaries, email triage, or content planning. Keep the first workflow manual plus AI-assisted. When the output is reliable for two or three weeks, then add automation with tools such as Zapier or a workspace AI assistant.",
      mistakeA: "Automating a messy process before the team agrees what good output looks like.",
      mistakeB: "Connecting too many apps and making failures difficult to diagnose.",
      mistakeC: "Paying for tools before the free tier proves the workflow saves time.",
      checkpoint: "Start with a free tier pilot, write the review rule, then automate only the stable step.",
      promptTerm: "free tier",
      stack: "low-budget stack",
    },
    writing: {
      angle:
        "Experienced AI writers rarely ask for a final article in one shot. They use a sequence: clarify reader intent, produce an outline, expand one section, fact-check, then edit for voice. This mirrors the community habit of making AI a drafting assistant while the human remains the editor.",
      deep:
        "The quality of AI writing depends on source material and editorial judgment. Give the model examples of the audience, the promise of the page, the claims that need support, and the tone to avoid. Then inspect the draft for generic advice, unsupported numbers, and sentences that could appear on any site.",
      scenario:
        "For a blog post, begin with a reader problem and five concrete notes from your own research. Ask the model to create an outline, not a final post. Approve the outline, then expand each section with examples and warnings. Finish by cutting repetition and adding your own practical observations.",
      mistakeA: "Publishing a generic AI draft without examples, screenshots, or human editing.",
      mistakeB: "Asking for SEO keywords before understanding the reader's actual problem.",
      mistakeC: "Using few-shot examples that make every article sound mechanically identical.",
      checkpoint: "Outline first, expand section by section, then run a human review pass for originality.",
      promptTerm: "few-shot",
      stack: "human review",
    },
    research: {
      angle:
        "Community research workflows emphasize source-backed answers. The useful pattern is not asking an AI to sound smart; it is asking for claims, sources, confidence levels, and what remains uncertain. This keeps the reader from mistaking a summary for verified evidence.",
      deep:
        "Research tools are strongest when the question is narrow and the evidence standard is explicit. Ask what kind of source counts, how recent it must be, and whether you need direct quotes, official documentation, academic papers, or market examples. Then separate confirmed facts from interpretation.",
      scenario:
        "When researching an AI product or workflow, make a claim table: claim, source, date, why it matters, and what could make it outdated. This table becomes the spine of the article and protects you from building pages around stale or hallucinated facts.",
      mistakeA: "Using a chatbot answer as a source instead of checking the underlying page.",
      mistakeB: "Mixing old product details with current recommendations.",
      mistakeC: "Leaving uncertainty invisible when the evidence is weak or changing.",
      checkpoint: "Use source-backed notes, mark uncertainty, and verify current product details before publishing.",
      promptTerm: "source-backed",
      stack: "verification workflow",
    },
    image: {
      angle:
        "Visual AI discussions often come back to prompt structure: subject, composition, style, lighting, constraints, and edit notes. The practical lesson is to treat the prompt as an art direction brief, not a bag of attractive adjectives.",
      deep:
        "Image generation becomes easier when you separate concept, layout, and style. Start with a rough purpose for the image, decide where the viewer should look first, then add only the style details that support that purpose. Too many style tags make images less controllable.",
      scenario:
        "For a blog illustration, write the caption first. If the image needs to explain a workflow, request a diagram-like composition rather than a decorative scene. Generate a few options, choose the clearest one, then edit or regenerate only the weak part.",
      mistakeA: "Stacking many style references until the image has no clear purpose.",
      mistakeB: "Using visuals that look attractive but do not explain the article.",
      mistakeC: "Ignoring commercial-use terms, brand assets, or recognizable people.",
      checkpoint: "Write the image purpose first, then generate a composition that teaches one idea.",
      promptTerm: "zero-shot",
      stack: "style brief",
    },
    video: {
      angle:
        "Video AI builders often save credits by planning first. They write a storyboard, define shot length, motion, subject, and transition before generating clips. The beginner translation is simple: do not spend generation credits until the scene is clear.",
      deep:
        "AI video is expensive in time and credits because vague motion creates unusable output. A reliable workflow begins with the script, then a shot list, then a small test clip. Only after the visual language is stable should you generate the full sequence.",
      scenario:
        "If you are making a short explainer, write a three-shot storyboard: opening problem, process view, final result. Generate each shot separately. Check motion, text readability, and continuity before editing the clips together.",
      mistakeA: "Prompting a full video idea without shot boundaries.",
      mistakeB: "Regenerating large clips when only one shot needs correction.",
      mistakeC: "Forgetting captions, pacing, and platform aspect ratio until the end.",
      checkpoint: "Create the storyboard first, test one shot, then scale the sequence.",
      promptTerm: "storyboard",
      stack: "credit control",
    },
    design: {
      angle:
        "Design-focused AI workflows work best when the brief contains hierarchy, audience, and constraints. The community lesson is similar to coding: do not ask for random output; ask for options against a spec, then choose and refine.",
      deep:
        "A design tool can generate variations, but it cannot know your brand rules unless you provide them. Give it the goal, required text, visual priority, color limits, accessibility constraints, and export format. Then judge the result by hierarchy and clarity, not novelty.",
      scenario:
        "For a social graphic or landing visual, first list the one message the viewer must remember. Then generate two or three layout directions. Choose the clearest direction and refine spacing, contrast, and text length before exporting.",
      mistakeA: "Letting AI choose random styles that do not match the brand.",
      mistakeB: "Using too much text inside a small visual container.",
      mistakeC: "Judging a design by decoration instead of readability and hierarchy.",
      checkpoint: "Define hierarchy first, generate options, then refine the strongest layout.",
      promptTerm: "design spec",
      stack: "brand kit",
    },
    audio: {
      angle:
        "AI audio workflows are strongest when the script and rights are clear. The practical community pattern is to prepare the text, pronunciation notes, pacing, consent rules, and review checklist before generating a voiceover or music sketch.",
      deep:
        "Audio quality depends on writing and direction. A voice model cannot fix a confusing script, and cleanup tools cannot fully rescue poor source audio. Prepare short sentences, mark emphasis, test a small sample, then regenerate only the lines that sound unnatural.",
      scenario:
        "For a tutorial voiceover, write the script in spoken language, not essay language. Generate thirty seconds first. Listen for pacing, pronunciation, emotion, and background noise before creating the full track.",
      mistakeA: "Generating long audio before testing voice, pronunciation, and pacing.",
      mistakeB: "Using a voice without consent or unclear commercial rights.",
      mistakeC: "Letting background music compete with speech clarity.",
      checkpoint: "Test a short sample, review rights and consent, then produce the full audio.",
      promptTerm: "review checklist",
      stack: "sample pass",
    },
    marketing: {
      angle:
        "High-quality AI marketing communities warn against scaled low-value content. The practical lesson is to build pages around real search intent, proof, comparison logic, and clear disclosure, not just keyword volume.",
      deep:
        "Marketing AI is useful when it helps you structure research, map intent, and produce testable variants. It becomes risky when it invents claims or creates many thin pages. A durable page should explain who it helps, who should skip it, what to verify, and how recommendations are funded.",
      scenario:
        "For an affiliate or ad-supported article, begin with the reader's decision. Build a comparison table, list trade-offs, disclose affiliate relationships, and add a final checklist. This creates more value than repeating product descriptions from vendor pages.",
      mistakeA: "Writing for keywords while ignoring the reader's decision process.",
      mistakeB: "Making product claims without official or current verification.",
      mistakeC: "Hiding affiliate intent or placing ads where they interrupt comprehension.",
      checkpoint: "Map search intent, add original comparison logic, disclose monetization clearly.",
      promptTerm: "search intent",
      stack: "affiliate disclosure",
    },
    chatbots: {
      angle:
        "Chatbot power users often use a clarification loop before the final answer. Instead of a single giant prompt, they ask the model to restate the task, list assumptions, and propose a plan. This prevents many beginner failures.",
      deep:
        "A chatbot is not just an answer box. It is more useful as a thinking partner when you provide context and force review points. Ask it to identify missing information, explain trade-offs, and mark uncertain claims. Then you decide what is acceptable.",
      scenario:
        "When using ChatGPT, Claude, Gemini, or Copilot for a real task, start with the end format and audience. Ask for a plan. If the plan is wrong, fix the plan before generating. If the plan is good, expand one section and review it before moving on.",
      mistakeA: "Starting with a broad prompt and accepting the first confident answer.",
      mistakeB: "Forgetting to tell the model the audience and output format.",
      mistakeC: "Not asking the model to flag assumptions and uncertain points.",
      checkpoint: "Use a clarification loop, then generate in sections with human review.",
      promptTerm: "step-by-step",
      stack: "clarification loop",
    },
  };
  return { ...base, ...(byCluster[article.cluster] || {}) };
}

function typeAdvice(article) {
  const advice = {
    Comparison: {
      frame: "Because this is a comparison page, judge tools by the job they do best, not by brand popularity.",
      output: "A good comparison ends with a decision rule: choose one tool for speed, another for control, and another for collaboration or cost.",
    },
    Checklist: {
      frame: "Because this is a checklist page, the goal is to prevent predictable mistakes before they become expensive.",
      output: "A good checklist is short enough to use during work and specific enough to catch real failure points.",
    },
    "Prompt Library": {
      frame: "Because this is a prompt library, the examples should teach structure rather than encourage blind copying.",
      output: "A good prompt includes role, goal, inputs, constraints, output format, and a review standard.",
    },
    Template: {
      frame: "Because this is a template page, the reader should be able to reuse the structure immediately.",
      output: "A good template separates fixed rules from fields the reader must customize.",
    },
    Workflow: {
      frame: "Because this is a workflow page, sequence matters more than tool trivia.",
      output: "A good workflow shows what to do first, what to check next, and when to stop iterating.",
    },
    Tutorial: {
      frame: "Because this is a tutorial, each step should teach what to do and why it matters.",
      output: "A good tutorial gives a small practical example before introducing advanced options.",
    },
    Guide: {
      frame: "Because this is a guide, the page should help the reader choose a direction and avoid false starts.",
      output: "A good guide gives beginner context, trade-offs, and a repeatable next action.",
    },
    Prompting: {
      frame: "Because this is a prompting page, the reader needs a prompt anatomy they can adapt.",
      output: "A good prompt system is specific but not brittle; it leaves room for useful variation.",
    },
  };
  return advice[article.type] || advice.Guide;
}

function articleExampleRows(article, guidance) {
  const primary = escapeHtml(article.tools[0]);
  const secondary = escapeHtml(article.tools[1]);
  const third = escapeHtml(article.tools[2]);
  return [
    [primary, `Best when you need a flexible starting point for ${escapeHtml(article.intent)}.`, `Use it for planning, first drafts, and review questions; verify any current details.`],
    [secondary, "Best when the interface or workflow matches the specific job more closely.", `Test it with the same brief you gave ${primary}, then compare output quality and time saved.`],
    [third, `Best as a second opinion or specialist option after the basic ${escapeHtml(guidance.stack)} test.`, "Keep it only if it solves a repeated problem better than your current tool."],
  ];
}

function workflowSteps(article, guidance) {
  const primary = escapeHtml(article.tools[0]);
  const focus = escapeHtml(article.focus);
  return [
    ["Write the outcome", `Describe the final result in one sentence: "I need to ${focus} for a beginner audience." This prevents the tool from guessing the job.`],
    ["Collect context", `Gather notes, examples, links, screenshots, constraints, and facts that cannot change. For coding or research tasks, include exact files or source URLs.`],
    ["Run a clarification pass", `Ask ${primary} to list missing information and assumptions before producing the final output. This mirrors a /ask style workflow without needing a special tool.`],
    ["Create a small spec", `Turn the clarified answer into a short spec: audience, input, output format, quality bar, risks, and review checklist. For coding, this can live in CLAUDE.md or a task note.`],
    ["Generate one section", "Ask for one section, one image concept, one code function, one table, or one clip at a time. Smaller output is easier to check and revise."],
    ["Review like an editor", "Check accuracy, clarity, rights, privacy, tone, and whether the result actually solves the reader's task. Do not outsource judgment to the model."],
    ["Save the reusable pattern", `Keep the prompt, the accepted output, and the final edits. Over time this becomes a small personal ${escapeHtml(guidance.stack)} playbook.`],
  ];
}

function articleBody(article) {
  const tools = article.tools;
  const primary = tools[0];
  const secondary = tools[1];
  const third = tools[2];
  const isComparison = article.type === "Comparison";
  const isChecklist = article.type === "Checklist";
  const isPrompt = article.type === "Prompt Library";
  const isTemplate = article.type === "Template";
  const method = isComparison
    ? "comparison"
    : isChecklist
      ? "checklist"
      : isPrompt
        ? "prompt library"
        : isTemplate
          ? "template"
          : "workflow";
  const guidance = guidanceFor(article);
  const advice = typeAdvice(article);
  const rows = articleExampleRows(article, guidance);
  const steps = workflowSteps(article, guidance);
  const artPath = `../${articleArtPath(article)}`;
  const published = articleDate(article);
  const standfirst = articleStandfirst(article);
  const sourceSnapshot =
    standfirst || `This article tracks the development around ${article.focus} and translates it into an original English explainer for practical readers.`;
  const sourceNotes = Array.isArray(article.sourceNotes) ? article.sourceNotes : [];
  const watchItems = articleWatchlist(article);
  const questionItems = articleQuestions(article);
  const readerLens = articleReaderLens(article);
  const snapshotCards = [
    ["Signal", sourceSnapshot],
    ["Why it matters", sourceNotes[0] || `The practical question is what this changes for ${article.focus} once the headline is translated into a real workflow or buying decision.`],
    ["Reader lens", readerLens],
  ];
  const sourceNoteItems =
    sourceNotes.length > 0
      ? sourceNotes.map((note) => `<p>${escapeHtml(note)}</p>`).join("")
      : `<p>The original source signal was reviewed, then rewritten into an original English article structure with clear context, human review, and practical next-step checks.</p>`;
  const sourceLine =
    article.sourceUrl
      ? `<p class="article-meta-line"><strong>Published:</strong> ${escapeHtml(published)} | <a href="${article.sourceUrl}" rel="nofollow noopener" target="_blank">Source link</a>${article.sourceLabel ? ` | ${escapeHtml(article.sourceLabel)}` : ""}</p>`
      : `<p class="article-meta-line"><strong>Published:</strong> ${escapeHtml(published)}</p>`;
  const sourceTitleLine = article.sourceTitle ? `<p class="article-source-title">Based on topic: ${escapeHtml(article.sourceTitle)}</p>` : "";
  const articleDek = escapeHtml(standfirst);
  return `
        <header class="article-hero">
          <div class="article-hero-copy">
            <p class="eyebrow">${escapeHtml(article.type)}</p>
            <p class="article-kicker">Signal from ${escapeHtml(published)}</p>
            <h1>${escapeHtml(article.title)}</h1>
            <p class="article-dek">${articleDek}</p>
            <p class="disclosure-note">Disclosure: this page is independent editorial content. If affiliate links are added later, they should be clearly labeled beside the relevant recommendation.</p>
            ${sourceLine}
            ${sourceTitleLine}
            <div class="article-action-row">
              <button class="button secondary utility-button" type="button" data-save-article>Save article</button>
              <button class="button ghost utility-button" type="button" data-share-page>Share article</button>
            </div>
          </div>
          <aside class="article-hero-rail" aria-label="Editorial summary">
            <div class="hero-rail-block">
              <span>Reader lens</span>
              <p>${escapeHtml(readerLens)}</p>
            </div>
            <div class="hero-rail-block">
              <span>Watch next</span>
              <ul>${watchItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
            </div>
          </aside>
        </header>

        <figure class="article-figure">
          <img src="${artPath}" alt="${escapeHtml(article.title)} original workflow illustration with planning review and tool selection details" width="1200" height="680">
          <figcaption>Original article illustration: use the visual as a reminder to clarify, specify, generate, review, and save the reusable pattern.</figcaption>
        </figure>

        <div class="ad-slot">Reserved responsive ad placement</div>

        <section id="editorial-brief" class="compact-section">
          <h2>At a glance</h2>
          <div class="signal-grid">
            ${snapshotCards.map(([label, text]) => `<article class="signal-card"><span>${escapeHtml(label)}</span><p>${escapeHtml(text)}</p></article>`).join("")}
          </div>
          <div class="question-strip">
            <strong>Questions worth carrying through the rest of the page</strong>
            <ul>${questionItems.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          </div>
        </section>

        <section id="source-snapshot">
          <h2>Source snapshot</h2>
          <p>${escapeHtml(sourceSnapshot)}</p>
          <p>This page starts from a source-backed signal and then expands it into an original English explainer. The goal is not to mirror the original wording, but to help a reader understand why the development matters, what to verify next, and where the practical opportunity or risk sits.</p>
          ${sourceNoteItems}
          <div class="focus-box">
            <strong>Quick takeaway:</strong> use the original source as the signal, then apply context engineering, verification, and human review before turning the idea into a business decision or published recommendation.
          </div>
        </section>

        <section id="beginner-summary">
          <h2>Beginner summary</h2>
          <p>If you are new to ${escapeHtml(article.category.toLowerCase())}, start by naming the job in plain language. Do you need a draft, comparison, summary, image, video, transcript, code change, or repeatable business process? The tool only becomes useful after the task is clear.</p>
          <p>For this topic, the core goal is to ${escapeHtml(article.focus)}. A beginner should not start with every advanced feature. Start with one real example, compare the output against a requirement, and keep a small note of what worked so the workflow becomes repeatable.</p>
          <p>${escapeHtml(advice.frame)} ${escapeHtml(advice.output)} The best first win is not a perfect result; it is a repeatable process you can check.</p>
          <p>If you discovered this topic through a fast-moving AI digest, slow down before drawing conclusions. Read the signal, identify what changed, and decide whether the change affects product choice, workflow design, pricing risk, or content strategy for your own work.</p>
          <div class="focus-box">
            <strong>Important point:</strong> the biggest difference between a useful AI workflow and a frustrating one is specificity. Tell the tool the audience, format, constraints, source material, and quality bar before asking for output.
          </div>
        </section>

        <section id="community-field-note">
          <h2>Community-inspired field note</h2>
          <div class="field-note">
            <p><strong>Community-inspired field note:</strong> ${escapeHtml(guidance.angle)}</p>
            <p>This page uses that lesson as source inspiration only. It does not copy forum images or long passages. The translated idea is turned into an original English tutorial structure: clarify the job, create a small spec, generate in sections, and keep human review in the loop.</p>
          </div>
        </section>

        <section id="who-this-is-for">
          <h2>Who this is for</h2>
          <p>This guide is for creators, students, freelancers, small business owners, and knowledge workers who want a practical ${method} without needing technical background. It is also useful if you have tried ${escapeHtml(primary)} or ${escapeHtml(secondary)} once, got a mixed result, and want a calmer process.</p>
          <ul>
            <li>You want plain-English steps instead of buzzwords.</li>
            <li>You need to understand when ${escapeHtml(primary)} is enough and when another tool may fit better.</li>
            <li>You care about output quality, cost control, and avoiding common beginner mistakes.</li>
            <li>You want article-ready examples that can be reused in real work.</li>
          </ul>
        </section>

        <section id="step-by-step">
          <h2>Step-by-step workflow</h2>
          <ol>${steps.map(([title, text]) => `<li><strong>${escapeHtml(title)}.</strong> ${text}</li>`).join("")}</ol>
        </section>

        <section id="deep-dive">
          <h2>Why this workflow works</h2>
          <div class="depth-panel">
            <p>${escapeHtml(guidance.deep)}</p>
            <p>${escapeHtml(guidance.scenario)}</p>
            <p>The key detail is to keep decisions visible. Write down why you chose ${escapeHtml(primary)} over ${escapeHtml(secondary)}, what you asked it to do, and which checks passed. This creates original editorial value for a website because readers can see the reasoning, not just the final recommendation.</p>
          </div>
        </section>

        <section id="tool-comparison">
          <h2>Tool comparison</h2>
          <p>The table below is not a permanent ranking. AI products change quickly, so treat it as a selection framework. The practical question is not "which tool is famous?" but "which tool gives the clearest result for this exact job?"</p>
          <table>
            <thead><tr><th>Tool</th><th>Best beginner use</th><th>How to test it</th></tr></thead>
            <tbody>
              ${rows.map((row) => `<tr><td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td></tr>`).join("")}
            </tbody>
          </table>
        </section>

        <section id="mini-case-study">
          <h2>Mini case study</h2>
          <p>Assume you are building a small English guide site and this page is one article in the cluster. The weak version says: "Here are some AI tools." The stronger version gives a real workflow, a decision table, a reusable prompt, and a warning box that tells beginners where they are likely to fail.</p>
          <p>For ${escapeHtml(article.title)}, the article should answer one practical reader question: "How do I ${escapeHtml(article.focus)} without wasting time or trusting output blindly?" Every section should serve that question. If a paragraph does not help the reader decide, perform, verify, or avoid a mistake, cut it or rewrite it.</p>
          <p>When monetization is added later, keep the ad unit outside the explanation flow. A display ad can sit between major sections, but it should not interrupt the checklist or make an affiliate link look like an editorial verdict. Helpful structure is what makes the page eligible for long-term traffic.</p>
        </section>

        <section id="example-prompt">
          <h2>Example prompt or brief</h2>
          <p>Copy this structure and replace the bracketed details with your own. It works because it gives the AI a role, a task, constraints, and a checking standard.</p>
          <pre class="prompt-box"><code>Act as a practical ${escapeHtml(article.tag.toLowerCase())} assistant.
Goal: help me ${escapeHtml(article.focus)}.
Audience: beginner with no technical background.
Inputs: [paste notes, links, files, product details, or rough ideas].
Context method: use ${escapeHtml(guidance.promptTerm)} thinking, then produce a short spec before the final answer.
Output format: step-by-step guide with a short summary, a comparison table, common mistakes, and a final checklist.
Quality bar: explain trade-offs clearly, flag uncertain claims, avoid hype, and tell me what a human should verify.</code></pre>
          <div class="focus-box">
            <strong>Where beginners should focus:</strong> do not ask for the final answer first. Ask for a plan, inspect the plan, then ask the tool to expand one section at a time.
          </div>
        </section>

        <section id="common-mistakes">
          <h2>Common mistakes</h2>
          <div class="mistake-grid">
            <div><h3>Mistake 1</h3><p><strong>${escapeHtml(guidance.mistakeA)}</strong> Fix it by asking for missing requirements and a short plan before output.</p></div>
            <div><h3>Mistake 2</h3><p><strong>${escapeHtml(guidance.mistakeB)}</strong> Fix it by checking claims, links, calculations, rights, and anything that affects a real decision.</p></div>
            <div><h3>Mistake 3</h3><p><strong>${escapeHtml(guidance.mistakeC)}</strong> Fix it by saving the accepted prompt, final output, and your human edits.</p></div>
          </div>
          <ul>
            <li><strong>Using a vague request.</strong> "Make this better" gives the tool too much room. Explain what better means.</li>
            <li><strong>Skipping source checks.</strong> For facts, prices, policies, or current product features, verify with official pages before publishing.</li>
            <li><strong>Buying too early.</strong> Test the free tier or trial with your real task before committing to a paid plan.</li>
            <li><strong>Ignoring rights and privacy.</strong> Do not upload private customer data, confidential documents, or media you do not have permission to use.</li>
            <li><strong>Publishing generic output.</strong> Add your examples, screenshots, judgment, and final edits so the page has original value.</li>
          </ul>
        </section>

        <div class="ad-slot">Reserved in-article ad placement</div>

        <section id="quality-bar">
          <h2>Quality bar before publishing</h2>
          <p>${escapeHtml(guidance.checkpoint)} This is the minimum bar for a page that aims to win search traffic and qualify for monetization later. Search engines and ad networks both reward pages that provide clear value, not pages that merely repeat tool names.</p>
          <table>
            <thead><tr><th>Check</th><th>Pass condition</th><th>Beginner action</th></tr></thead>
            <tbody>
              <tr><td>Usefulness</td><td>The reader can complete one task after reading.</td><td>Add a concrete example, prompt, or checklist.</td></tr>
              <tr><td>Originality</td><td>The page adds judgment, structure, or field notes.</td><td>Include your own test result or decision rule.</td></tr>
              <tr><td>Trust</td><td>Claims are either verified or clearly marked as uncertain.</td><td>Check current facts against official pages before updating.</td></tr>
              <tr><td>Monetization</td><td>Ads and affiliate links are disclosed and separated from advice.</td><td>Keep recommendations useful even without commissions.</td></tr>
            </tbody>
          </table>
        </section>

        <section id="final-checklist">
          <h2>Final checklist</h2>
          <ul>
            <li>The task is written in one clear sentence.</li>
            <li>The prompt includes audience, constraints, and output format.</li>
            <li>Important facts and claims have been checked against reliable sources.</li>
            <li>The output has been edited by a human for clarity and usefulness.</li>
            <li>Any affiliate or sponsored recommendation is clearly disclosed near the link.</li>
            <li>The workflow includes a saved prompt pattern, a review rule, and a next-step note.</li>
          </ul>
        </section>

        <section id="faq">
          <h2>FAQ</h2>
          <h3>What is the easiest way to start?</h3>
          <p>Start with one real task you already need to finish. A small real example teaches more than testing random prompts.</p>
          <h3>Do I need paid AI tools?</h3>
          <p>Not at first. Paid plans are worth considering only when limits, quality, or collaboration features block repeated work.</p>
          <h3>Can I trust the output immediately?</h3>
          <p>No. Treat AI output as a draft or assistant result. Check facts, links, calculations, visual details, and any claim that could affect a decision.</p>
          <h3>Why include community-inspired field notes?</h3>
          <p>They turn broad tool advice into practical working habits. The goal is not to copy a forum post, but to translate useful patterns into original English guidance that helps a beginner avoid predictable mistakes.</p>
        </section>
`;
}

function articlePage(article) {
  const body = articleBody(article);
  const plain = body.replace(/<[^>]+>/g, " ");
  const mins = readingMinutes(plain);
  const title = metaTitle(article.title);
  const desc = metaDescription(
    article.summary ||
      `Beginner-friendly ${article.type.toLowerCase()} explaining how to ${article.focus}, with steps, examples, mistakes, comparison table, FAQ, and practical checks.`
  );
  const canonical = `${site.url}/articles/${article.slug}.html`;
  const imageUrl = `${site.url}/${articleArtPath(article)}`;
  const published = articleDate(article);
  const faqSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: desc,
        image: imageUrl,
        author: { "@type": "Organization", name: site.name },
        publisher: { "@type": "Organization", name: site.name },
        datePublished: published,
        dateModified: published,
        mainEntityOfPage: canonical,
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is the easiest way to start?",
            acceptedAnswer: { "@type": "Answer", text: "Start with one real task you already need to finish and keep the prompt specific." },
          },
          {
            "@type": "Question",
            name: "Do I need paid AI tools?",
            acceptedAnswer: { "@type": "Answer", text: "Not at first. Paid plans are useful only when limits, quality, or collaboration features block repeated work." },
          },
          {
            "@type": "Question",
            name: "Can I trust the output immediately?",
            acceptedAnswer: { "@type": "Answer", text: "No. Treat AI output as a draft and verify facts, links, calculations, and claims." },
          },
        ],
      },
    ],
  };

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:type" content="article">
  <meta property="og:image" content="${imageUrl}">
  ${rssAlternateLink()}
  <link rel="stylesheet" href="../assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(faqSchema)}</script>
</head>
<body data-page-type="article" data-article-slug="${escapeHtml(article.slug)}" data-article-title="${escapeHtml(article.title)}" data-article-url="${canonical}">
  <a class="skip-link" href="#main">Skip to content</a>
  ${nav("../")}
  <main id="main" class="article-shell">
    <div class="breadcrumb"><a href="../index.html">Home</a> / <a href="../categories/${article.cluster}.html">${escapeHtml(article.category)}</a> / ${escapeHtml(article.title)}</div>
    <article class="article-layout">
      <div class="article-content">
        ${body}
        <section class="related-block" aria-label="Related articles">
          <h2>Related guides</h2>
          ${relatedLinks(article).map((item) => `<a href="${item.slug}.html">${escapeHtml(item.title)}</a>`).join("")}
        </section>
      </div>
      <nav class="toc" aria-label="Table of contents">
        <strong>On this page</strong>
        <span>${mins} min read</span>
        <a href="#editorial-brief">At a glance</a>
        <a href="#source-snapshot">Source snapshot</a>
        <a href="#beginner-summary">Beginner summary</a>
        <a href="#community-field-note">Field note</a>
        <a href="#who-this-is-for">Who this is for</a>
        <a href="#step-by-step">Step-by-step</a>
        <a href="#deep-dive">Why it works</a>
        <a href="#tool-comparison">Tool comparison</a>
        <a href="#mini-case-study">Mini case study</a>
        <a href="#example-prompt">Example prompt</a>
        <a href="#common-mistakes">Common mistakes</a>
        <a href="#quality-bar">Quality bar</a>
        <a href="#final-checklist">Final checklist</a>
        <a href="#faq">FAQ</a>
      </nav>
    </article>
  </main>
  ${footer("../")}
  <script src="../assets/site.js" defer></script>
</body>
</html>
`;
}

function relatedLinks(article) {
  const sameCluster = articles.filter((item) => item.cluster === article.cluster && item.slug !== article.slug).slice(0, 3);
  const nearby = articles.filter((item) => item.cluster !== article.cluster).slice(article.index, article.index + 2);
  return [...sameCluster, ...nearby].slice(0, 5);
}

function articleCard(article, prefix = "") {
  const kicker = article.sourceTitle || article.category;
  return `<a class="article-card" href="${prefix}articles/${article.slug}.html">
    <img src="${prefix}${articleArtPath(article)}" alt="${escapeHtml(article.category)} visual guide for ${escapeHtml(article.focus)}" width="1200" height="680">
    <div class="article-card-body">
      <span class="tag ${article.color}">${escapeHtml(article.type)}</span>
      <span class="article-card-kicker">${escapeHtml(kicker)}</span>
      <h3>${escapeHtml(article.title)}</h3>
      <p class="article-card-meta">Published ${escapeHtml(articleDate(article))}</p>
      <p>${escapeHtml(articleCardCopy(article))}</p>
    </div>
  </a>`;
}

function categoryPage(cluster) {
  const clusterArticles = articles.filter((article) => article.cluster === cluster.slug);
  const title = `${cluster.name} Guides and Tutorials`;
  const desc = metaDescription(`Beginner-friendly ${cluster.name} tutorials, comparisons, workflows, prompt examples, and common mistake checklists for ${cluster.intent}.`);
  const canonical = `${site.url}/categories/${cluster.slug}.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: desc,
    url: canonical,
  };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(metaTitle(title))}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${site.url}/assets/generated-${cluster.slug}.svg">
  ${rssAlternateLink()}
  <link rel="stylesheet" href="../assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${nav("../")}
  <main id="main" class="page-shell">
    <section class="page-hero">
      <p class="eyebrow">Category</p>
      <h1>${escapeHtml(cluster.name)} Guides</h1>
      <p class="section-lead">Tutorials, comparisons, prompt examples, and beginner workflows for ${escapeHtml(cluster.intent)}.</p>
    </section>
    <section class="tool-row-list" aria-label="Category highlights">
      <div class="tool-row"><span class="tag ${cluster.color}">Start here</span><div><h3>Best for</h3><p>${escapeHtml(cluster.intent)}.</p></div><div class="score">${clusterArticles.length} guides</div></div>
      <div class="tool-row"><span class="tag ${cluster.color}">Tools</span><div><h3>${escapeHtml(cluster.tools.join(", "))}</h3><p>Use the comparison tables to decide which tool fits each job.</p></div><div class="score">4 tools</div></div>
    </section>
    <section class="section compact-section">
      <div class="section-header"><div><p class="eyebrow">Library</p><h2>All ${escapeHtml(cluster.name)} articles</h2></div></div>
      <div class="grid articles">${clusterArticles.map((article) => articleCard(article, "../")).join("")}</div>
    </section>
  </main>
  ${footer("../")}
  <script src="../assets/site.js" defer></script>
</body>
</html>
`;
}

function aiSitesPage() {
  const title = "AI Sites Directory: Official Links, Pricing, and Offers";
  const desc = metaDescription(
    `A curated directory of mainstream AI websites with official links, beginner use cases, pricing notes, current offers, and verification dates for ChatGPT, Claude, Gemini, Cursor, Midjourney, Runway, and more.`
  );
  const canonical = `${site.url}/ai-sites.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: desc,
    url: canonical,
    hasPart: aiSites.map((tool) => ({
      "@type": "WebSite",
      name: tool.name,
      url: tool.siteUrl,
      description: tool.intro,
    })),
  };
  const categories = [...new Set(aiSites.map((tool) => tool.category))];
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(metaTitle(title))}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${site.url}/assets/hero-ai-sites.svg">
  ${rssAlternateLink()}
  <link rel="stylesheet" href="assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${nav("")}
  <main id="main">
    <section class="hero directory-hero">
      <div class="hero-copy">
        <p class="eyebrow">AI website navigation</p>
        <h1>AI sites, official links, and offer notes.</h1>
        <p>Use this page as a practical navigation board for mainstream AI tools. Each card includes the official website, pricing page, beginner use case, and a short note on current free plans, trials, or visible discounts.</p>
        <div class="hero-actions">
          <a class="button" href="#ai-site-list">Browse AI sites</a>
          <a class="button secondary" href="#offer-notes">Check offer notes</a>
        </div>
      </div>
      <div class="hero-visual">
        <img src="assets/hero-ai-sites.svg" alt="AI websites directory dashboard grouped by use case and pricing notes" width="1200" height="760">
      </div>
    </section>

    <section class="stats-strip" aria-label="Directory highlights">
      <div class="stat"><strong>${aiSites.length}</strong>mainstream AI websites with official links</div>
      <div class="stat"><strong>${categories.length}</strong>use-case categories for faster browsing</div>
      <div class="stat"><strong>${site.date}</strong>last local verification date for offer notes</div>
      <div class="stat"><strong>Official</strong>pricing links beside every tool card</div>
    </section>

    <section class="section" id="offer-notes">
      <div class="section-header">
        <div>
          <p class="eyebrow">Buying safely</p>
          <h2>Verify every offer before paying.</h2>
        </div>
        <p class="section-lead">AI pricing changes often. The notes below are useful for discovery, but the official pricing page is the source to check before buying a plan or writing an affiliate recommendation.</p>
      </div>
      <div class="directory-note">
        <p><strong>Editorial rule:</strong> do not present a temporary discount as guaranteed. Mark trial periods, student deals, and annual-plan discounts clearly, and update this page when official pages change.</p>
      </div>
    </section>

    <section class="section" id="ai-site-list">
      <div class="section-header">
        <div>
          <p class="eyebrow">Directory</p>
          <h2>Mainstream AI websites.</h2>
        </div>
        <p class="section-lead">Each card links to the official site and official pricing page. This structure is useful for SEO because it combines navigation, comparison intent, and practical buying checks.</p>
      </div>
      <div class="site-directory-grid">
        ${aiSites
          .map(
            (tool) => `<article class="site-card">
              <div class="site-card-top">
                <span class="tag ${tool.color}">${escapeHtml(tool.category)}</span>
                <span class="offer-badge">${escapeHtml(tool.offer)}</span>
              </div>
              <h3>${escapeHtml(tool.name)}</h3>
              <p>${escapeHtml(tool.intro)}</p>
              <dl class="site-facts">
                <div><dt>Pricing note</dt><dd>${escapeHtml(tool.price)}</dd></div>
                <div><dt>Best for</dt><dd>${escapeHtml(tool.note)}</dd></div>
                <div><dt>Last checked</dt><dd>${site.date}</dd></div>
              </dl>
              <div class="site-actions">
                <a class="button small" href="${tool.siteUrl}" rel="nofollow noopener" target="_blank">Official site</a>
                <a class="button small secondary" href="${tool.pricingUrl}" rel="nofollow noopener" target="_blank">Pricing page</a>
              </div>
            </article>`
          )
          .join("")}
      </div>
      <div class="ad-slot">Reserved directory ad placement</div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <p class="eyebrow">How to use this directory</p>
          <h2>Turn navigation into useful content.</h2>
        </div>
      </div>
      <div class="grid two">
        <div class="policy-box">
          <h3>For readers</h3>
          <p>Start with the use case, not the famous name. Pick one tool, test the free plan or trial with a real task, then decide whether a paid plan removes a real limit.</p>
        </div>
        <div class="policy-box">
          <h3>For monetization</h3>
          <p>When affiliate links are added, keep official links and disclosure visible. A useful directory explains pricing uncertainty, who should skip a tool, and what to verify before buying.</p>
        </div>
      </div>
    </section>
  </main>
  ${footer("")}
  <script src="assets/site.js" defer></script>
</body>
</html>
`;
}

function aiSkillsPage() {
  const title = "AI Skills & Prompt Playbooks: Practical Library";
  const desc = metaDescription(
    "A practical AI skills and prompt playbook library with copy-ready templates, quality checks, workflow cards, source-backed principles, and beginner-safe review steps."
  );
  const canonical = `${site.url}/ai-skills.html`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: desc,
    url: canonical,
    hasPart: [
      ...aiSkillPlaybooks.map((skill) => ({
        "@type": "CreativeWork",
        name: skill.title,
        description: skill.bestFor,
      })),
      ...promptPlaybooks.map((prompt) => ({
        "@type": "CreativeWork",
        name: prompt.title,
        description: prompt.useFor,
      })),
    ],
  };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(metaTitle(title))}</title>
  <meta name="description" content="${escapeHtml(desc)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(desc)}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${site.url}/assets/hero-ai-skills.svg">
  ${rssAlternateLink()}
  <link rel="stylesheet" href="assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${nav("")}
  <main id="main">
    <section class="hero skills-hero">
      <div class="hero-copy">
        <p class="eyebrow">AI Skills & Prompt Playbooks</p>
        <h1>Use AI with reusable skills, not random prompts.</h1>
        <p>This library turns official prompt-engineering principles into practical operating cards: when to use each skill, what input to provide, the exact prompt to copy, and the quality checks that keep the output useful.</p>
        <div class="hero-actions">
          <a class="button" href="#skill-playbooks">Open Skill Playbooks</a>
          <a class="button secondary" href="#prompt-library">Copy prompts</a>
          <a class="button ghost" href="#quality-checklist">Quality checklist</a>
        </div>
        <div class="hero-proof">
          <span>${aiSkillPlaybooks.length} reusable skills</span>
          <span>${promptPlaybooks.length} copy-ready prompts</span>
          <span>${promptSources.length} official source families</span>
        </div>
      </div>
      <div class="hero-visual">
        <img src="assets/hero-ai-skills.svg" alt="AI skills dashboard with prompt cards, source checks, and quality gates" width="1200" height="760">
      </div>
    </section>

    <section class="stats-strip" aria-label="AI skills library highlights">
      <div class="stat"><strong>${aiSkillPlaybooks.length}</strong>skill cards for research, coding, writing, video, image, meetings, and privacy</div>
      <div class="stat"><strong>${promptPlaybooks.length}</strong>copy-ready prompt templates with use cases and review checks</div>
      <div class="stat"><strong>4</strong>source-backed principle groups from major AI documentation</div>
      <div class="stat"><strong>0</strong>generic filler prompts without a quality bar</div>
    </section>

    <section class="section" id="source-backed-principles">
      <div class="section-header">
        <div>
          <p class="eyebrow">Source-backed principles</p>
          <h2>What high-quality prompting has in common.</h2>
        </div>
        <p class="section-lead">The page uses recurring guidance from OpenAI, Anthropic, Google Gemini, and Microsoft Copilot documentation, then translates it into original workflows for everyday users.</p>
      </div>
      <div class="principle-grid">
        ${promptPrinciples
          .map(
            (item) => `<article class="principle-card">
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.detail)}</p>
            </article>`
          )
          .join("")}
      </div>
      <div class="source-grid" aria-label="Official prompt engineering sources">
        ${promptSources
          .map(
            (source) => `<a class="source-card" href="${source.url}" rel="nofollow noopener" target="_blank">
              <span class="tag blue">${escapeHtml(source.name)}</span>
              <p>${escapeHtml(source.lesson)}</p>
            </a>`
          )
          .join("")}
      </div>
    </section>

    <section class="section" id="prompt-anatomy">
      <div class="section-header">
        <div>
          <p class="eyebrow">Prompt anatomy</p>
          <h2>The repeatable structure behind most useful AI requests.</h2>
        </div>
        <p class="section-lead">If a prompt has no goal, audience, input, output format, or review rule, it is usually too weak for publishable work.</p>
      </div>
      <div class="anatomy-grid">
        <div class="anatomy-step"><strong>Role</strong><p>Who should the model imitate: analyst, editor, reviewer, tutor, engineer, art director.</p></div>
        <div class="anatomy-step"><strong>Goal</strong><p>The concrete job to finish, written in one sentence.</p></div>
        <div class="anatomy-step"><strong>Context</strong><p>Audience, constraints, business purpose, date sensitivity, and source material.</p></div>
        <div class="anatomy-step"><strong>Output</strong><p>The exact format: table, checklist, brief, JSON, storyboard, code review, or step list.</p></div>
        <div class="anatomy-step"><strong>Quality bar</strong><p>How the result will be judged and what it must flag instead of guessing.</p></div>
      </div>
      <pre class="prompt-box prompt-foundation">Act as a [role].
Goal: [specific task].
Context: [audience, business goal, constraints].
Inputs: [paste source material].
Output format: [table, checklist, brief, JSON, steps].
Quality bar: flag uncertainty, separate facts from assumptions, and list what a human must verify before use.</pre>
    </section>

    <section class="section" id="skill-playbooks">
      <div class="section-header">
        <div>
          <p class="eyebrow">Skill Playbooks</p>
          <h2>Reusable AI skills for real work.</h2>
        </div>
        <p class="section-lead">Each card is designed as a small operating procedure: the task, when to use it, workflow steps, copy-ready prompt, and the quality signal that proves it worked.</p>
      </div>
      <div class="skill-playbook-grid">
        ${aiSkillPlaybooks
          .map(
            (skill) => `<article class="skill-card" id="${slugify(skill.title)}">
              <div class="skill-card-head">
                <span class="tag ${skill.color}">Skill</span>
                <span>${escapeHtml(skill.bestFor)}</span>
              </div>
              <h3>${escapeHtml(skill.title)}</h3>
              <p><strong>Use when:</strong> ${escapeHtml(skill.useWhen)}</p>
              <ol>${skill.workflow.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
              <h4>Copy-ready prompt</h4>
              <pre class="prompt-box">${escapeHtml(skill.prompt)}</pre>
              <p class="quality-note"><strong>Quality signal:</strong> ${escapeHtml(skill.quality)}</p>
            </article>`
          )
          .join("")}
      </div>
      <div class="ad-slot">Reserved high-value tutorial ad placement</div>
    </section>

    <section class="section" id="prompt-library">
      <div class="section-header">
        <div>
          <p class="eyebrow">Prompt Library</p>
          <h2>Copy-ready prompt templates with a purpose.</h2>
        </div>
        <p class="section-lead">These are not magic words. Each prompt has a use case, a copy block, and a practical check so readers know when the output is good enough.</p>
      </div>
      <div class="prompt-library-grid">
        ${promptPlaybooks
          .map(
            (item) => `<article class="prompt-card">
              <div class="prompt-meta">
                <span class="tag violet">${escapeHtml(item.label)}</span>
                <span>${escapeHtml(item.useFor)}</span>
              </div>
              <h3>${escapeHtml(item.title)}</h3>
              <h4>Copy-ready prompt</h4>
              <pre class="prompt-box">${escapeHtml(item.prompt)}</pre>
              <p><strong>Check:</strong> ${escapeHtml(item.check)}</p>
            </article>`
          )
          .join("")}
      </div>
    </section>

    <section class="section" id="bad-vs-better">
      <div class="section-header">
        <div>
          <p class="eyebrow">Before and after</p>
          <h2>Bad prompts fail because they hide the real job.</h2>
        </div>
        <p class="section-lead">A better prompt does not need to be long. It needs to make the task inspectable.</p>
      </div>
      <div class="example-compare">
        ${promptComparisons
          .map(
            (example) => `<article>
              <div class="compare-column bad"><span>Weak</span><p>${escapeHtml(example.weak)}</p></div>
              <div class="compare-column better"><span>Better</span><p>${escapeHtml(example.better)}</p></div>
              <p>${escapeHtml(example.why)}</p>
            </article>`
          )
          .join("")}
      </div>
    </section>

    <section class="section" id="quality-checklist">
      <div class="section-header">
        <div>
          <p class="eyebrow">Quality checklist</p>
          <h2>Keep low-value AI output off the website.</h2>
        </div>
        <p class="section-lead">Use this checklist before publishing a prompt, workflow, tutorial, or AI-assisted article. If it fails, revise the page instead of adding more words.</p>
      </div>
      <div class="quality-grid">
        ${promptQualityChecks.map((check, index) => `<div><strong>${index + 1}</strong><p>${escapeHtml(check)}</p></div>`).join("")}
      </div>
      <div class="directory-note">
        <p><strong>Editorial rule:</strong> useful AI content should help a reader finish a task, avoid a mistake, choose between options, or verify an answer. Anything else is filler.</p>
      </div>
    </section>
  </main>
  ${footer("")}
  <script src="assets/site.js" defer></script>
</body>
</html>
`;
}

function homePage() {
  const latestArticles = [...articles].slice(-10).reverse();
  const featured = [
    ...articles.filter((article) => ["best-ai-tools-2026", "chatgpt-vs-claude-vs-gemini", "perplexity-ai-research-workflow", "midjourney-prompt-guide", "runway-ai-video-guide", "canva-ai-design-workflow"].includes(article.slug)),
    ...articles.filter((article) => article.type === "Comparison").slice(0, 6),
  ].slice(0, 12);
  const featuredSites = aiSites.slice(0, 8);
  const learningPaths = [
    {
      label: "Beginner stack",
      title: "Choose your first AI toolkit",
      text: "Start with one chatbot, one research assistant, and one productivity workspace before buying specialist tools.",
      links: [
        ["Best AI Tools", "articles/best-ai-tools-2026.html"],
        ["AI Skills", "ai-skills.html"],
        ["AI Sites", "ai-sites.html"],
      ],
    },
    {
      label: "Creator stack",
      title: "Build visuals, video, and voice",
      text: "Use image prompts, storyboard-first video planning, and short voice samples to control cost and quality.",
      links: [
        ["Image workflow", "categories/image.html"],
        ["Video workflow", "categories/video.html"],
      ],
    },
    {
      label: "Work stack",
      title: "Automate meetings, notes, and email",
      text: "Turn repeatable work into checklists and only automate the steps that are already stable.",
      links: [
        ["Productivity guides", "categories/productivity.html"],
        ["Meeting notes", "articles/ai-meeting-notes-workflow.html"],
      ],
    },
    {
      label: "Builder stack",
      title: "Use AI coding without chaos",
      text: "Clarify requirements, write a small spec, keep project memory, then edit one function or file at a time.",
      links: [
        ["Coding guides", "categories/coding.html"],
        ["Cursor workflow", "articles/cursor-ai-workflow-guide.html"],
      ],
    },
  ];
  const offerWatch = aiSites
    .filter((tool) => /free|trial|off|student|annual/i.test(tool.offer))
    .slice(0, 6);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: `${site.url}/`,
    description: site.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>AI Tool Compass: ${articles.length} Practical AI Guides</title>
  <meta name="description" content="A practical AI tool tutorial site with ${articles.length} beginner-friendly guides, comparisons, workflows, prompt templates, SEO clusters, and AdSense-ready layouts.">
  <link rel="canonical" href="${site.url}/index.html">
  <meta property="og:title" content="AI Tool Compass: ${articles.length} Practical AI Guides">
  <meta property="og:description" content="Choose the right AI tools faster with practical tutorials, comparisons, workflows, and beginner-friendly examples.">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${site.url}/assets/hero-ai-tool-compass.svg">
  ${rssAlternateLink()}
  <link rel="stylesheet" href="assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${nav("")}
  <main id="main">
    <section class="hero home-hero">
      <div class="hero-copy">
        <p class="eyebrow">AI tool intelligence hub</p>
        <h1>Find the right AI tool before you pay for the wrong one.</h1>
        <p>${site.name} is a practical blue-chip style AI navigation and tutorial hub: official AI website links, pricing checkpoints, beginner workflows, comparison tables, and monetization-ready editorial pages.</p>
        <div class="hero-actions">
          <a class="button" href="ai-sites.html">Open AI Sites Directory</a>
          <a class="button secondary" href="ai-skills.html">AI Skills & Prompt Playbooks</a>
          <a class="button secondary" href="articles/best-ai-tools-2026.html">Read the tool stack guide</a>
          <a class="button ghost" href="#learning-paths">Pick a learning path</a>
        </div>
      <div class="hero-proof">
        <span>${articles.length} in-depth guides</span>
        <span>12 AI sites tracked</span>
        <span>10 SEO clusters</span>
        <span>AI Skills library</span>
      </div>
      </div>
      <div class="hero-visual">
        <img src="assets/hero-ai-tool-compass.svg" alt="Editorial AI tool compass dashboard with category cards and comparison paths" width="1200" height="760">
      </div>
    </section>

    <section class="stats-strip" aria-label="Site highlights">
      <div class="stat"><strong>${articles.length}</strong>long-form tutorials with examples, checks, FAQs, and comparison tables</div>
      <div class="stat"><strong>12</strong>mainstream AI websites with official links and pricing pages</div>
      <div class="stat"><strong>10</strong>topic clusters covering chat, research, image, video, coding, and marketing</div>
      <div class="stat"><strong>2026</strong>offer notes marked with a local verification date</div>
    </section>

    <section class="section" id="reader-tools">
      <div class="section-header">
        <div>
          <p class="eyebrow">Return faster</p>
          <h2>Give readers a reason to come back instead of bouncing once.</h2>
        </div>
        <p class="section-lead">This block combines follow, save, and resume actions that work on a static site: RSS for subscription, local save states for favorites, and recent-reading continuity across visits.</p>
      </div>
      <div class="reader-loop-grid">
        <article class="return-panel">
          <p class="eyebrow">Follow</p>
          <h3>Subscribe without handing over an inbox.</h3>
          <p>Use the site feed for fresh guides, then save the homepage locally so return visitors can jump back into the library in one click.</p>
          <div class="action-cluster">
            <a class="button" href="rss.xml">Open RSS feed</a>
            <button class="button secondary utility-button" type="button" data-copy-feed-url data-feed-url="${site.url}/rss.xml">Copy feed URL</button>
            <button class="button ghost utility-button" type="button" data-bookmark-site>Save site</button>
          </div>
        </article>
        <article class="return-panel">
          <p class="eyebrow">Saved guides</p>
          <h3>Build a shortlist worth revisiting.</h3>
          <p>When a reader saves an article, it appears here on the next visit so the homepage becomes a working dashboard instead of a one-time landing page.</p>
          <div class="reader-loop-list" data-saved-articles>
            <p class="empty-state">No saved guides yet. Open an article and use the Save article button to start a private shortlist in this browser.</p>
          </div>
        </article>
        <article class="return-panel">
          <p class="eyebrow">Continue reading</p>
          <h3>Pick up where you left off.</h3>
          <p>Recent reading history turns the homepage into a return surface, especially when the site adds new daily guides and comparison pages.</p>
          <div class="reader-loop-list" data-recent-articles>
            <p class="empty-state">No recent reading history yet. Open a guide and it will appear here automatically.</p>
          </div>
        </article>
      </div>
    </section>

    <section class="section" id="ai-skills-preview">
      <a class="directory-strip skills-strip" href="ai-skills.html">
        <img src="assets/hero-ai-skills.svg" alt="AI skills and prompt playbooks dashboard with reusable prompt systems" width="1200" height="760">
        <div>
          <p class="eyebrow">Prompt Playbooks</p>
          <h2>Practical AI skills readers can copy and reuse.</h2>
          <p>Open the AI Skills library for copy-ready prompts, research workflows, coding specs, content editing checks, image prompts, video storyboards, and privacy redaction routines.</p>
          <div class="hero-proof">
            <span>${aiSkillPlaybooks.length} skill cards</span>
            <span>${promptPlaybooks.length} prompts</span>
            <span>Quality checklist</span>
          </div>
        </div>
      </a>
    </section>

    <section class="section" id="ai-sites-preview">
      <div class="section-header">
        <div>
          <p class="eyebrow">Featured AI websites</p>
          <h2>Main tools readers actually search for.</h2>
        </div>
        <p class="section-lead">The homepage now works like an AI navigation portal: quick summaries, official links, pricing notes, and a clean route into deeper tutorials.</p>
      </div>
      <div class="site-mini-grid">
        ${featuredSites
          .map(
            (tool) => `<a class="site-mini-card" href="ai-sites.html#ai-site-list">
              <span class="tag ${tool.color}">${escapeHtml(tool.category)}</span>
              <h3>${escapeHtml(tool.name)}</h3>
              <p>${escapeHtml(tool.intro)}</p>
              <strong>${escapeHtml(tool.offer)}</strong>
            </a>`
          )
          .join("")}
      </div>
    </section>

    <section class="section" id="learning-paths">
      <div class="section-header">
        <div>
          <p class="eyebrow">Learning paths</p>
          <h2>Start by use case, not by hype.</h2>
        </div>
        <p class="section-lead">Each path connects the directory, category hub, and long-form articles so beginners can move from tool discovery to practical execution.</p>
      </div>
      <div class="learning-grid">
        ${learningPaths
          .map(
            (path) => `<article class="path-card">
              <span>${escapeHtml(path.label)}</span>
              <h3>${escapeHtml(path.title)}</h3>
              <p>${escapeHtml(path.text)}</p>
              <div class="path-links">${path.links.map(([label, href]) => `<a href="${href}">${escapeHtml(label)}</a>`).join("")}</div>
            </article>`
          )
          .join("")}
      </div>
    </section>

    <section class="section" id="offer-watch">
      <div class="section-header">
        <div>
          <p class="eyebrow">Offer watch</p>
          <h2>Current free trials and discount signals.</h2>
        </div>
        <p class="section-lead">These are short discovery notes, not guarantees. The page links to official pricing pages so readers can verify before paying.</p>
      </div>
      <div class="offer-watch-list">
        ${offerWatch
          .map(
            (tool) => `<div class="offer-row">
              <span class="tag ${tool.color}">${escapeHtml(tool.name)}</span>
              <p>${escapeHtml(tool.offer)}</p>
              <a href="${tool.pricingUrl}" rel="nofollow noopener" target="_blank">Official pricing</a>
            </div>`
          )
          .join("")}
      </div>
    </section>

    <section class="section" id="tool-categories">
      <div class="section-header">
        <div>
          <p class="eyebrow">Topic clusters</p>
          <h2>Built around search intent and real tasks.</h2>
        </div>
        <p class="section-lead">The structure mirrors proven AI directory and editorial patterns: category hubs, tool comparisons, beginner tutorials, prompt libraries, mistake checklists, and disclosure pages.</p>
      </div>
      <div class="grid categories">
        ${clusters
          .map(
            (cluster) => `<a class="card" href="categories/${cluster.slug}.html"><span class="tag ${cluster.color}">${escapeHtml(cluster.tag)}</span><h3>${escapeHtml(cluster.name)}</h3><p>${escapeHtml(truncate(cluster.intent, 135))}.</p></a>`
          )
          .join("")}
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <p class="eyebrow">Editor's toolkit</p>
          <h2>What every page gives the reader.</h2>
        </div>
        <p class="section-lead">This site is built to avoid thin AI content. The useful details are visible on every long-form article, so the reader knows how to act.</p>
      </div>
      <div class="toolkit-grid">
        <div class="tech-panel"><h3>Decision tables</h3><p>Compare tools by task, trade-off, and beginner risk instead of brand popularity.</p></div>
        <div class="tech-panel"><h3>Prompt briefs</h3><p>Reusable role, goal, input, context, output format, and review-standard prompts.</p></div>
        <div class="tech-panel"><h3>AI Skills</h3><p>Copy-ready prompt playbooks turn useful workflows into repeatable systems readers can apply immediately.</p></div>
        <div class="tech-panel"><h3>Field notes</h3><p>Community-inspired workflow lessons translated into original English guidance.</p></div>
        <div class="tech-panel"><h3>Quality checks</h3><p>Source verification, privacy notes, affiliate disclosure, and publish-ready checklists.</p></div>
      </div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <p class="eyebrow">Featured library</p>
          <h2>Start with the highest-intent guides.</h2>
        </div>
        <p class="section-lead">These pages target durable searches: best tools, alternatives, comparisons, tutorials, prompt examples, and beginner workflows.</p>
      </div>
      <div class="grid articles">${featured.map((article) => articleCard(article)).join("")}</div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <p class="eyebrow">Latest updates</p>
          <h2>Newest AI workflow articles.</h2>
        </div>
        <p class="section-lead">This block is fed by the modular article data file, so the homepage can surface newly added daily articles after one rebuild.</p>
      </div>
      <div class="grid articles">${latestArticles.map((article) => articleCard(article)).join("")}</div>
    </section>

    <section class="section">
      <div class="section-header">
        <div>
          <p class="eyebrow">Trust and monetization</p>
          <h2>Monetization roadmap without weakening trust.</h2>
        </div>
        <p class="section-lead">Monetization roadmap: build useful pages first, then add compliant ad placements, affiliate disclosures, comparison intent pages, and recurring update checks.</p>
      </div>
      <div class="roadmap">
        <div><strong>1</strong><h3>Publish helpful clusters</h3><p>Keep the 100-page structure organized around real search intent and practical tasks.</p></div>
        <div><strong>2</strong><h3>Add compliant ads</h3><p>Use reserved placements only after the site has policies, traffic, and original value.</p></div>
        <div><strong>3</strong><h3>Layer affiliate pages</h3><p>Disclose relationships, link to official pricing, and explain who should skip each tool.</p></div>
        <div><strong>4</strong><h3>Update offers</h3><p>Review pricing pages regularly so trial and discount notes do not become stale.</p></div>
      </div>
      <div class="ad-slot">Reserved responsive ad placement</div>
    </section>
  </main>
  ${footer("")}
  <script src="assets/site.js" defer></script>
</body>
</html>
`;
}

function simplePage({ file, title, description, heading, body }) {
  const canonical = `${site.url}/${file}`;
  const metaDesc = metaDescription(description);
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: metaDesc,
    url: canonical,
  };
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(metaTitle(title))}</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:type" content="website">
  ${rssAlternateLink()}
  <link rel="stylesheet" href="assets/styles.css">
  <script type="application/ld+json">${JSON.stringify(schema)}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  ${nav("")}
  <main id="main" class="page-shell">
    <section class="page-hero"><p class="eyebrow">Site policy</p><h1>${escapeHtml(heading)}</h1><p class="section-lead">${escapeHtml(metaDesc)}</p></section>
    <section class="article-content">${body}</section>
  </main>
  ${footer("")}
  <script src="assets/site.js" defer></script>
</body>
</html>
`;
}

function generatePolicyPages() {
  writeFile(
    "review-methodology.html",
    simplePage({
      file: "review-methodology.html",
      title: "Review Methodology: How AI Tool Compass Evaluates Tools",
      description:
        "How AI Tool Compass evaluates AI tools, writes comparisons, checks claims, handles updates, and separates editorial guidance from advertising. It is written for readers who want an original, useful site instead of thin scaled pages.",
      heading: "Review Methodology",
      body: `<h2>How guides are built</h2><p>Each guide starts with a reader task, not a product pitch. We compare tools by workflow fit, ease of use, output quality, cost, limits, and the checks a beginner should run before trusting the result.</p><h2>What we check</h2><p>We look for clear use cases, realistic setup steps, common failure points, and whether a tool helps the reader finish a real job. Pricing and current product details should be verified against official pages before publication updates.</p><h2>Advertising boundary</h2><p>Advertising slots and affiliate links must not decide the editorial verdict. Sponsored placements should be labeled clearly and kept visually separate from recommendations.</p>`,
    })
  );
  writeFile(
    "editorial-policy.html",
    simplePage({
      file: "editorial-policy.html",
      title: "Editorial Policy: Helpful AI Guides Without Hype",
      description:
        "Editorial rules for AI Tool Compass, including original explanations, beginner clarity, fact checking, affiliate disclosure, and avoiding scaled low-value content. It explains how we keep the site useful and transparent.",
      heading: "Editorial Policy",
      body: `<h2>Helpful content standard</h2><p>Every page should help a reader make a better decision or complete a task. Articles should include examples, practical steps, limits, and clear warnings where beginners commonly make mistakes.</p><h2>Original value</h2><p>We avoid scraped summaries, doorway pages, keyword stuffing, and thin affiliate pages. A guide should add original structure, plain-English explanation, comparison logic, and a useful workflow.</p><h2>Corrections and updates</h2><p>AI tools change quickly. When a product feature, price, policy, or capability changes, the affected article should be updated with a new modification date and clearer guidance.</p>`,
    })
  );
}

function generateSitemap() {
  const pages = [
    "index.html",
    "ai-sites.html",
    "ai-skills.html",
    "rss.xml",
    ...clusters.map((cluster) => `categories/${cluster.slug}.html`),
    ...articles.map((article) => `articles/${article.slug}.html`),
    "privacy.html",
    "affiliate-disclosure.html",
    "review-methodology.html",
    "editorial-policy.html",
    "contact.html",
  ];
  const urls = pages.map((page) => `  <url><loc>${site.url}/${page}</loc><lastmod>${site.date}</lastmod></url>`).join("\n");
  writeFile("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
}

function generateRss() {
  const items = [...articles]
    .sort((a, b) => String(articleDate(b)).localeCompare(String(articleDate(a))) || String(b.title).localeCompare(String(a.title)))
    .slice(0, 40)
    .map((article) => {
      const link = `${site.url}/articles/${article.slug}.html`;
      const description = article.summary || articleStandfirst(article);
      return [
        "  <item>",
        `    <title>${escapeXml(article.title)}</title>`,
        `    <link>${escapeXml(link)}</link>`,
        `    <guid>${escapeXml(link)}</guid>`,
        `    <pubDate>${formatRfc822(articleDate(article))}</pubDate>`,
        `    <description>${escapeXml(description)}</description>`,
        "  </item>",
      ].join("\n");
    })
    .join("\n");

  writeFile(
    "rss.xml",
    `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n<channel>\n  <title>${escapeXml(site.name)}</title>\n  <link>${escapeXml(site.url)}</link>\n  <description>${escapeXml(site.description)}</description>\n  <language>en-us</language>\n  <lastBuildDate>${formatRfc822(site.date)}</lastBuildDate>\n${items}\n</channel>\n</rss>\n`
  );
}

function generateSite() {
  ensureDir("articles");
  ensureDir("categories");
  cleanHtmlDir("articles");
  cleanHtmlDir("categories");
  generateAssets();
  articles.forEach((article) => writeFile(`articles/${article.slug}.html`, articlePage(article)));
  clusters.forEach((cluster) => writeFile(`categories/${cluster.slug}.html`, categoryPage(cluster)));
  writeFile("ai-sites.html", aiSitesPage());
  writeFile("ai-skills.html", aiSkillsPage());
  writeFile("index.html", homePage());
  generatePolicyPages();
  generateRss();
  generateSitemap();
  writeFile("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
  console.log(`Generated ${articles.length} articles and ${clusters.length} category pages.`);
}

generateSite();
