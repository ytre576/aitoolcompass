# GitHub Pages 部署说明

目标域名：

```text
aitoolcompass.bbroot.com
```

## 1. 创建 GitHub 仓库

在 GitHub 新建一个仓库，例如：

```text
aitoolcompass
```

建议设为 Public。GitHub Free 的私有仓库 Pages 权限取决于账号/组织套餐。

## 2. 推送本地项目

在本目录执行：

```powershell
git init
git branch -M main
git add .
git commit -m "Deploy AI Tool Compass static site"
git remote add origin https://github.com/YOUR_USERNAME/aitoolcompass.git
git push -u origin main
```

把 `YOUR_USERNAME` 换成你的 GitHub 用户名或组织名。

## 3. 开启 GitHub Pages

进入仓库：

```text
Settings -> Pages
```

在 `Build and deployment` 里：

```text
Source: GitHub Actions
```

本项目已经包含 `.github/workflows/pages.yml`，推送到 `main` 后会自动生成并发布静态网站。

## 4. 设置自定义域名

在 GitHub 仓库：

```text
Settings -> Pages -> Custom domain
```

填写：

```text
aitoolcompass.bbroot.com
```

保存后等待 DNS 生效，并在可用后勾选 `Enforce HTTPS`。

## 5. 设置 DNS

因为 `aitoolcompass.bbroot.com` 是子域名，应在域名 DNS 控制台添加一条 CNAME：

```text
主机记录/Name: aitoolcompass
类型/Type: CNAME
值/Target: YOUR_USERNAME.github.io
```

把 `YOUR_USERNAME.github.io` 换成你的 GitHub Pages 默认域名。

注意：CNAME 目标不要带仓库名，不要写成 `YOUR_USERNAME.github.io/aitoolcompass`。

## 6. 验证 DNS

Windows PowerShell：

```powershell
Resolve-DnsName aitoolcompass.bbroot.com -Type CNAME
```

应看到它指向：

```text
YOUR_USERNAME.github.io
```

DNS 可能需要几分钟到 24 小时生效。

## 7. 后续每天更新文章

运行：

```powershell
run-daily-articles.bat
```

新增文章后重新提交并推送：

```powershell
git add data/custom-articles.json articles assets categories index.html sitemap.xml robots.txt
git commit -m "Add daily AI articles"
git push
```

推送后 GitHub Actions 会自动重新部署。
