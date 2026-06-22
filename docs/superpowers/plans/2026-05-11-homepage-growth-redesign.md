# Homepage Growth Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把首页改造成适合英文 SEO 增长的混合型首页，同时强化 AI 新手与内容创作者两类用户的入口。

**Architecture:** 不直接手改 `index.html`，而是修改 `tools/generate-site.js` 的首页生成逻辑，让新首页成为可重复生成的站点产物。配套更新 `assets/styles.css` 和 `tools/validate-site.js`，再用自动化测试锁定新结构。

**Tech Stack:** Node.js, static HTML generation, CSS, Node test runner

---

### Task 1: 先写首页结构测试

**Files:**
- Create: `tools/homepage-growth.test.js`
- Test: `tools/homepage-growth.test.js`

- [ ] **Step 1: 写失败测试**

写一个 Node 测试，执行 `tools/generate-site.js` 后读取 `index.html`，断言首页包含以下新结构：

- `Pick the right AI tool, then put it to work.`
- `AI Tool Finder`
- `Browse by job, not by brand.`
- `Creator workflows that lead to published output.`
- `Popular comparisons before you upgrade`
- `This week's AI signals worth tracking.`

- [ ] **Step 2: 跑测试确认失败**

Run: `node --test tools\homepage-growth.test.js`

Expected:
- 当前首页尚未包含这些结构，测试失败。

### Task 2: 改首页生成器

**Files:**
- Modify: `tools/generate-site.js`

- [ ] **Step 1: 调整首页首屏文案与 meta**

把首页标题与描述调整为更偏搜索与任务导向，减少站点自夸式措辞。

- [ ] **Step 2: 新增首页分诊结构**

在首页生成函数里新增：

- Start Here
- AI Tool Finder
- Creator Workflows
- Popular Comparisons
- Weekly AI Signals

- [ ] **Step 3: 重排旧模块**

下移 Reader Tools，保留 AI Skills / AI Sites / Featured Library / Latest Updates / Monetization 等现有模块。

### Task 3: 增补样式

**Files:**
- Modify: `assets/styles.css`

- [ ] **Step 1: 为新增首页模块补样式**

新增以下类对应的布局和视觉规则：

- `command-grid`
- `command-card`
- `finder-grid`
- `finder-card`
- `creator-grid`
- `creator-card`
- `comparison-grid`
- `comparison-card`
- `signal-grid`
- `signal-card`

- [ ] **Step 2: 做移动端适配**

确保新增模块在中等屏和手机端可以折叠为 1-2 列，不破坏现有文章卡片布局。

### Task 4: 更新校验脚本

**Files:**
- Modify: `tools/validate-site.js`

- [ ] **Step 1: 用新首页结构替换旧的弱约束**

把首页校验从旧的营销式字符串，调整为新结构校验：

- AI Tool Finder
- Creator workflows
- Popular comparisons
- Weekly AI signals

- [ ] **Step 2: 保持原有链接数量和基础 SEO 校验**

保留：

- article 链接数量
- category 链接数量
- JSON-LD / canonical / description / title 等检查

### Task 5: 重建与验证

**Files:**
- Modify: generated site output files as produced by generator

- [ ] **Step 1: 重建站点**

Run: `node tools\generate-site.js`

Expected:
- 生成新的 `index.html` 与相关页面。

- [ ] **Step 2: 跑首页结构测试**

Run: `node --test tools\homepage-growth.test.js`

Expected:
- PASS

- [ ] **Step 3: 跑站点全量校验**

Run: `node tools\validate-site.js`

Expected:
- PASS with validated file counts

- [ ] **Step 4: 人工检查变更范围**

Run: `git status --short`

Expected:
- 只出现本次首页改版相关文件与重建产物。
