---
name: web-access
license: MIT
github: https://github.com/eze-is/web-access
description:
  所有联网操作必须通过此 skill 处理，包括：搜索、网页抓取、浏览器交互、动态渲染页面操作、登录态访问、社交媒体内容获取等。触发场景：用户要求搜索信息、查看网页内容、访问需要登录的网站、操作网页界面、抓取社交媒体内容（小红书、微博、知乎等）、读取动态渲染页面、以及任何需要真实浏览器环境的网络任务。此 skill 将联网视为一个策略问题而非工具调用问题，核心是「像人一样思考，兼顾高效与适应性地完成任务」。
---

# web-access Skill（OpenClaw 适配版）

## 工具链映射

原始 web-access 基于 Claude Code 的 CDP Proxy 直连用户 Chrome。OpenClaw 有自己的浏览器控制基础设施，以下是工具映射：

| 原始工具 | OpenClaw 实现 |
|---------|--------------|
| CDP Proxy HTTP API | `browser` tool |
| WebSearch | `web_search` tool |
| WebFetch | `web_fetch` tool |
| curl | `exec` tool |
| Jina 预处理 | `web_fetch`（提取模式选 markdown） |
| 子 Agent 分治 | `sessions_spawn` |

## 前置检查

每次需要浏览器操作前，先确认 OpenClaw 浏览器状态：

```bash
openclaw browser status
```

如果浏览器未启动，使用 `browser action=start` 启动。如果需要用户登录态（`profile="user"`），确保用户在场并授权。

## 浏览哲学（核心不变）

**像人一样思考，兼顾高效与适应性地完成任务。**

执行任务时不会过度依赖固有印象所规划的步骤，而是带着目标进入，边看边判断，遇到阻碍就解决，发现内容不够就深入——全程围绕「我要达成什么」做决策。

**① 拿到请求** — 先明确用户要做什么，定义成功标准：什么算完成了？需要获取什么信息、执行什么操作、达到什么结果？

**② 选择起点** — 根据任务性质、平台特征、达成条件，选最可能直达的方式作为第一步去验证。一次成功最好；不成功则调整。

**③ 过程校验** — 每一步的结果都是证据，不只是成功或失败的二元信号。用结果对照①的成功标准，更新判断：路径在推进吗？发现方向错了立即调整，不在同一个方式上反复重试。

**④ 完成判断** — 对照任务成功标准，确认任务完成后才停止，但不要过度操作。

## 联网工具选择

一手信息优于二手信息。搜索引擎是发现入口，找到来源后直接访问原文。

| 场景 | 工具 |
|------|------|
| 搜索摘要、发现信息来源 | `web_search` |
| URL 已知，需从页面提取特定信息 | `web_fetch`（提取模式） |
| URL 已知，需要原始 HTML 源码 | `exec` + curl |
| 非公开内容、静态层无效的平台（小红书、微信公众号等） | `browser` tool |
| 需要登录态、交互操作、自由导航探索 | `browser` tool |
| 需要截图/视觉验证 | `browser` tool |

进入浏览器层后，`browser action=evaluate` 就是你的眼睛和手：

- **看** — `snapshot` 获取页面结构，发现链接、按钮、表单、内容
- **做** — `click` 点击元素、`type` 填表、`press` 提交
- **读** — `evaluate` 提取文字，判断图片/视频是否承载核心信息

## 浏览器操作参考（OpenClaw `browser` tool）

```bash
# 启动浏览器（profile="user" 使用用户登录态，"openclaw" 使用隔离浏览器）
browser action=start profile=user

# 打开 URL
browser action=open url="https://example.com"

# 页面快照（了解结构）
browser action=snapshot

# 执行 JS / 读取 DOM
browser action=evaluate fn="() => document.title"

# 点击元素（CSS 选择器）
browser action=click selector="button.submit"

# 填表
browser action=fill selector="input[name=q]" text="搜索内容"

# 滚动（触发懒加载）
browser action=act selector="body" kind=scroll direction=bottom

# 截图
browser action=screenshot

# 关闭标签页
browser action=close
```

## 信息核实原则

核实的目标是**一手来源**。搜索引擎和聚合平台是定位信息的工具，不可用于直接证明真伪。

| 信息类型 | 一手来源 |
|---------|---------|
| 政策/法规 | 发布机构官网 |
| 企业公告 | 公司官方新闻页 |
| 学术声明 | 原始论文/机构官网 |
| 工具能力/用法 | 官方文档 |

找不到官网时，权威媒体的原创报道（非转载）可作为次级依据，但需向用户说明。

## 并行调研：子 Agent 分治策略

任务包含多个**独立**调研目标时，鼓励分治给子 Agent 并行执行：

```bash
sessions_spawn task="..." mode=run
```

**好处：**
- 速度：多子 Agent 并行，总耗时约等于单个子任务时长
- 上下文保护：抓取内容不进入主 Agent 上下文，主 Agent 只接收摘要

**子 Agent Prompt 写法：** 目标导向，而非步骤指令。
- 在子 Agent prompt 中写清楚要什么（"获取..."、"调研..."），避免暗示具体手段（"搜索..."、"抓取..."）
- 子 Agent 有自主判断能力，过度指定步骤会剥夺其判断空间

**分治判断标准：**
- ✅ 适合：目标相互独立，每个子任务量足够大（多页抓取、多轮搜索）
- ❌ 不适合：目标有依赖关系，简单单页查询

## 站点经验积累

操作中积累的特定网站经验，按域名存储在 `references/site-patterns/` 下（OpenClaw skill 目录）。

已有经验的站点：
```bash
ls ~/.openclaw/workspace/skills/web-access/references/site-patterns/ 2>/dev/null | sed 's/\.md$//' || echo "暂无"
```

确定目标网站后，如果上方列表中有匹配的站点，必须读取对应文件获取先验知识。经验内容标注了发现日期，当作"可能有效的提示"而非"保证"。

**CDP 操作成功完成后**，如果发现了有必要记录的新站点或新模式，主动写入对应的站点经验文件。只写经过验证的事实，不写未确认的猜测。

文件格式：
```markdown
---
domain: example.com
aliases: [示例, Example]
updated: 2026-03-25
---
## 平台特征
架构、反爬行为、登录需求、内容加载方式等事实

## 有效模式
已验证的 URL 模式、操作策略、选择器

## 已知陷阱
什么会失败以及为什么
```

## References 索引

| 文件 | 何时加载 |
|------|---------|
| `references/cdp-api.md` | 需要用浏览器执行复杂操作时 |
| `references/site-patterns/*.md` | 访问已知站点前 |
