# Daily Article Assistant

这个项目现在支持模块化新增文章：

- `data/site-config.json`：站点名称、域名、日期、描述。
- `data/custom-articles.json`：后续每天新增的文章记录。
- `tools/generate-site.js`：统一读取基础 100 篇和新增文章，生成文章页、分类页、首页、配图、sitemap。
- `dist/DailyArticleAssistantConsole.exe`：稳定的控制台版一键新增工具。
- `dist/DailyArticleAssistant.exe`：图形界面版；当前打包环境提示 Tkinter 不完整，如无法打开请使用控制台版。

## 推荐用法

双击：

```text
dist/DailyArticleAssistantConsole.exe
```

然后按提示填写：

1. Codex 路径，默认是 `C:\Users\Administrator\AppData\Roaming\npm\codex.ps1`
2. 分类，如 `productivity`、`research`、`coding`
3. 文章类型，如 `Guide`、`Workflow`
4. 数量，默认 `5`
5. 主题方向

程序会自动：

1. 调用本地 Codex 生成结构化文章数据
2. 追加到 `data/custom-articles.json`
3. 执行 `node tools\generate-site.js`
4. 执行 `node tools\validate-site.js`
5. 在 `logs/` 保存 Codex 原始输出

## 命令行一键运行

```powershell
dist\DailyArticleAssistantConsole.exe --auto --category productivity --article-type Guide --count 5 --topic "AI productivity tools and workflows for small business traffic"
```

只重建并验证网站：

```powershell
dist\DailyArticleAssistantConsole.exe --rebuild-only
```

## 注意

- 新文章不需要手写 HTML，只需要维护 `data/custom-articles.json`。
- 新文章会自动出现在对应分类页、首页 Latest updates、sitemap 和文章配图中。
- 不要并行运行生成和验证命令；生成器会先清空再重写 `articles/` 和 `categories/`。
- 上线前请把 `data/site-config.json` 里的 `https://example.com` 改成真实域名。
