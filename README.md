# 养生文章自动生成工具 🌿

这是一个帮助你自动生成养生文章的工具。只需要简单几步，就能获取最新的养生话题并生成专业的文章。

---

## 📋 目录

1. [安装准备工作](#-第一步安装准备工作)
2. [下载项目代码](#-第二步下载项目代码)
3. [安装项目依赖](#-第三步安装项目依赖)
4. [获取养生话题](#-第四步获取养生话题)
5. [生成养生文章](#-第五步生成养生文章)
6. [查看生成的文章](#-第六步查看生成的文章)
7. [常见问题](#-常见问题)

---

## 🔧 第一步：安装准备工作

### 1.1 安装 Node.js

Node.js 是运行这个工具的基础软件。

1. 打开浏览器，访问：https://nodejs.org/
2. 点击绿色按钮下载 **LTS 版本**（推荐大多数用户）
3. 按照操作系统选择：
   - **Windows**：双击 `.msi` 文件安装
   - **Mac**：双击 `.pkg` 文件安装
   - **Linux**：根据你的发行版使用包管理器安装
4. 安装完成后，重启电脑

**验证安装成功：**

1. 打开终端/命令行：
   - **Windows**：按 `Win + R`，输入 `cmd` 或打开「PowerShell」
   - **Mac**：按 `Cmd + Space`，输入「终端」
   - **Linux**：打开你的终端应用
2. 输入以下命令，然后按回车：
   ```
   node --version
   ```
3. 如果显示类似 `v20.x.x` 的数字，说明安装成功！

### 1.2 安装 VS Code（可选但推荐）

VS Code 是一个代码编辑器，可以方便地查看和编辑文件。

1. 访问：https://code.visualstudio.com/
2. 点击下载按钮
3. 双击下载的文件安装

---

## 📁 第二步：下载项目代码

如果你已经有项目文件夹，可以跳过这一步。

项目文件夹应该在你下载的位置。记住这个路径，后续步骤中会用到。

---

## 📦 第三步：安装项目依赖

这一步只需要做一次！

1. 打开终端/命令行
2. 输入以下命令进入项目文件夹（将 `<project-path>` 替换为你的项目路径）：
   ```
   cd <project-path>
   ```
   例如：
   - **Windows**：`cd C:\Users\YourName\Downloads\Practices`
   - **Mac**：`cd /Users/YourName/Practices`
   - **Linux**：`cd /home/username/Practices`
3. 安装所有需要的工具：
   ```
   npm install
   ```
4. 安装浏览器工具：
   ```
   npx playwright install chromium
   ```

等待几分钟，看到没有红色错误信息就说明成功了！

---

## 🔍 第四步：获取养生话题

这一步会从新榜网站获取最新的养生热门话题。

1. 打开终端/命令行
2. 确保在项目文件夹中（将 `<project-path>` 替换为你的项目路径）：
   ```
   cd <project-path>
   ```
3. 运行获取话题的命令：
   ```
   npm run scrape
   ```

**会发生什么：**
- 自动打开一个浏览器窗口
- 访问新榜网站并获取热门话题
- 话题会保存到 `topics` 文件夹中

**成功标志：**
- 看到类似 `Topics saved to: topics/2026-01-04.json` 的消息
- `topics` 文件夹中出现了新的 `.json` 文件

---

## ✨ 第五步：生成养生文章

这一步会用获取的话题，通过 AI 生成一篇养生文章。

1. 打开终端/命令行
2. 确保在项目文件夹中（将 `<project-path>` 替换为你的项目路径）：
   ```
   cd <project-path>
   ```
3. 运行生成文章的命令：
   ```
   npm run generate
   ```

**会发生什么：**
- 自动打开浏览器
- 访问 Bohrium AI 网站
- 自动输入话题并生成文章
- 文章会保存到 `artifacts` 文件夹

**首次使用注意：**
- 第一次使用时，可能需要登录 Bohrium 网站
- 登录后，关闭程序，重新运行命令即可
- 登录信息会被记住，下次不需要重新登录

**成功标志：**
- 看到 `Process completed successfully!` 消息
- 终端显示 `Press Enter to close browser and exit...`
- 按回车键关闭浏览器

---

## 📄 第六步：查看生成的文章

生成的文章保存在 `artifacts` 文件夹中，按日期分类。

**文件位置：**
```
<project-folder>/
└── artifacts/
    └── <date>/               ← 日期文件夹
        ├── article-<date>.md         ← 文章内容（Markdown格式）
        └── references-<date>.json    ← 参考文献
```

**如何查看文章：**

1. **用 VS Code 打开**（推荐）：
   - 打开 VS Code
   - 点击 文件 > 打开文件夹
   - 选择项目文件夹
   - 在左侧找到 `artifacts` > 日期文件夹 > `.md` 文件

2. **用文本编辑器打开**：
   - **Windows**：在文件管理器找到文件，右键点击 > 打开方式 > 记事本或其他编辑器
   - **Mac**：在 Finder 找到文件，右键点击 > 打开方式 > 文本编辑
   - **Linux**：在文件管理器找到文件，右键点击 > 打开方式 > 文本编辑器

---

## ❓ 常见问题

### Q: 运行命令时显示 "command not found"
**解决方法：** 确保已经安装 Node.js，并重启终端。

### Q: 显示 "npm ERR!" 错误
**解决方法：** 
1. 确保在正确的文件夹中（运行 `cd <project-path>`）
2. 重新运行 `npm install`

### Q: 浏览器打开后一直转圈圈
**解决方法：** 
1. 检查网络连接
2. 等待一会儿，网站可能比较慢
3. 如果超过2分钟，关闭终端，重新运行命令

### Q: 第一次运行需要登录
**解决方法：**
1. 在打开的浏览器中手动登录
2. 登录成功后，按 Ctrl+C 关闭程序
3. 重新运行 `npm run generate`

### Q: 文章没有生成/内容为空
**解决方法：**
1. 确保先运行了 `npm run scrape` 获取话题
2. 检查 `topics` 文件夹中是否有 `.json` 文件
3. 重新运行 `npm run generate`

---

## 📝 每日使用流程总结

每天只需要做这两步：

```bash
# 1. 打开终端，进入项目文件夹
cd <project-path>

# 2. 获取今天的热门话题
npm run scrape

# 3. 生成养生文章
npm run generate

# 4. 按回车键关闭浏览器
```

生成的文章在 `artifacts/日期/` 文件夹中！

---

## 🆘 需要帮助？

如果遇到问题，可以：
1. 截图错误信息
2. 记下你执行的命令
3. 联系技术支持

祝使用愉快！🌸

---

## 🤖 用 AI 助手获取帮助

如果你需要更详细的设置指导，可以将以下提示复制到 ChatGPT、Claude 或其他 AI 助手：

<details>
<summary>📋 点击展开完整 AI 提示</summary>

```
我需要从零开始设置一个健康养生文章自动生成项目。
这是我第一次做这样的事情，所以我需要非常详细的初学者说明。

**重要：请用中文（简体中文）详细回复我的所有问题。**

项目使用 Node.js、Playwright、TypeScript 和 Git。
它做两件主要的事情：
1. 从新榜网站抓取热门健康话题
2. 使用 Bohrium AI 生成文章

**我需要的完整设置说明：**

**第一阶段：安装必要的软件**
1. Git 安装
   - Git 是什么，我为什么需要它？
   - 在哪里下载（提供链接）
   - 针对 [Windows / Mac / Linux] 的逐步安装说明
   - 如何验证是否安装成功

2. Node.js 安装
   - Node.js 和 npm 是什么？
   - 从 https://nodejs.org/ 下载 LTS 版本
   - 针对 [Windows / Mac / Linux] 的逐步安装说明
   - 如何使用以下命令验证：node --version
   - 如果出现问题怎么办

3. VS Code 安装（可选但推荐）
   - 为什么 VS Code 有用
   - 在哪里下载（https://code.visualstudio.com/）
   - 如何安装
   - 如何用它打开文件

**第二阶段：获取项目代码**
1. 如何使用 Git 克隆仓库
   - 命令：git clone https://github.com/annie-xu-110/Practices
   - 项目文件会保存在哪里
   - 每个文件夹的用途

2. 如果我不熟悉 Git/命令行
   - 另一种下载方式（ZIP 文件）
   - 如何解压它

**第三阶段：安装项目依赖**
1. 在终端中导航到项目文件夹
   - 首先，请问我的用户名是什么？我会告诉你
   - Windows 示例：cd C:\Users\[你的用户名]\Downloads\Practices
   - Mac 示例：cd /Users/[你的用户名]/Practices
   - Linux 示例：cd /home/[你的用户名]/Practices

2. 运行：npm install
   - 这做什么？
   - 我应该看到什么？
   - 这需要多长时间？

3. 运行：npx playwright install chromium
   - Playwright 是什么？
   - Chromium 是什么？
   - 我们为什么需要它？

**第四阶段：第一次运行 - 获取话题**
1. 命令：npm run scrape
   - 运行此命令时会发生什么？
   - 浏览器应该会自动打开 - 解释这一点
   - 话题会保存在哪里？
   - 我怎么知道成功了？
   - 常见错误和修复方法

**第五阶段：第二次运行 - 生成文章**
1. 首次设置 - Bohrium 登录
   - 我可能需要登录到 Bohrium AI 网站
   - 如果需要登录怎么办
   - 登录后如何关闭浏览器

2. 命令：npm run generate
   - 运行此命令时会发生什么？
   - 需要多长时间？
   - 文章会保存在哪里？
   - 文章是什么格式？
   - 我怎么知道成功了？
   - 常见错误和修复方法

**第六阶段：查看生成的文章**
1. 文章保存的位置
   - 文件夹结构：artifacts/[日期]/
   - article-[日期].md（主文章）
   - references-[日期].json（参考文献）

2. 如何打开和阅读文章
   - 用 VS Code 打开
   - 用文本编辑器打开（Windows/Mac/Linux 特定）
   - 我可以编辑文章吗？

**第七阶段：每日工作流程**
1. 每天我需要运行：
   - npm run scrape（获取今天的话题）
   - npm run generate（生成文章）
   - 然后按回车键关闭浏览器

2. 在哪里找到今天的文章
   - 它会在 artifacts/[今天的日期]/ 文件夹中

**故障排除和常见问题：**
1. "command not found" 错误
   - 这意味着什么
   - 如何修复

2. "npm ERR!" 错误
   - 需要检查什么
   - 如何修复

3. 浏览器打开但什么都没发生
   - 网络问题
   - 网站可能比较慢
   - 怎么办

4. 首次 Bohrium 登录需要
   - 如何手动登录
   - 何时关闭浏览器
   - 登录后如何再次运行

5. 文章生成失败
   - 检查 npm run scrape 是否成功
   - 检查话题文件夹是否有文件
   - 重新启动并重试

6. 想要重新开始/清除登录
   - 清除 Newrank 登录的命令：rm -rf .browser-data
   - 清除 Bohrium 登录的命令：rm -rf .browser-data-bohrium

**重要提醒：**
- 清楚地说明这是为没有编程经验的初学者准备的
- 提供精确的命令供我复制粘贴
- 用简单的语言解释技术术语
- 展示针对 Windows、Mac 和 Linux 的具体示例
- 告诉我每一步应该看到什么样的"成功"
- 解释每个工具的用途和我们为什么需要它
- 不要猜测我的用户名，而是问我的用户名，这样你可以给我正确的命令

我的目标：每天运行此项目以自动生成新的养生文章。
请确保我可以每天运行此项目而不需要技术帮助。
```

</details>

**如何使用这个提示：**
1. 点击上面的「📋 点击展开完整 AI 提示」展开代码块
2. 复制整个代码块
3. 打开你喜欢的 AI 聊天工具：
   - ChatGPT: https://chat.openai.com
   - Claude: https://claude.ai
   - 或其他 AI 助手
4. 将提示粘贴到聊天框
5. 修改以下内容：
   - **操作系统**：将 `[Windows / Mac / Linux]` 替换为你的操作系统
6. 发送，AI 会用中文提供详细的设置指导，并会询问你的用户名来生成正确的命令！

AI 会为你提供：
✅ 用中文详细的安装说明  
✅ 针对你操作系统的具体命令  
✅ 会询问你的用户名而不是猜测  
✅ 每一步应该看到什么  
✅ 常见错误和解决方案  
✅ 技术术语的简单解释

---

---

# 技术文档 (Technical Documentation)

以下是开发者参考文档。

## Project Setup

The project uses:
- Playwright with TypeScript
- Chromium browser with persistent context
- TypeScript configuration
- Automatic browser state persistence (login sessions saved automatically)

## How Browser Persistence Works

The project uses `launchPersistentContext` which automatically:
- Saves all cookies, localStorage, sessionStorage
- Persists login sessions between runs
- Maintains browser cache and settings
- No manual save/load needed!

## Available Commands

| Command | Description |
|---------|-------------|
| `npm run scrape` | Get trending topics from Newrank |
| `npm run generate` | Generate article using Bohrium AI |
| `npm run inspect` | Open page to inspect element selectors |
| `npm run build` | Compile TypeScript to JavaScript |

## Project Structure

```
<project-folder>/
├── src/
│   ├── scrapeNewrank.ts        # Scrapes topics from Newrank
│   ├── submitPromptToBohrium.ts # Submits to Bohrium AI
│   └── inspectPage.ts          # Page inspector helper
├── topics/                      # Saved topics (by date)
├── artifacts/                   # Generated articles (by date)
├── prompt                       # Prompt template file
├── playwright.config.ts         # Playwright configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Project dependencies
├── .browser-data/              # Newrank browser data (gitignored)
└── .browser-data-bohrium/      # Bohrium browser data (gitignored)
```

## Troubleshooting

**To clear login and start fresh:**
```bash
# Clear Newrank login
rm -rf .browser-data

# Clear Bohrium login
rm -rf .browser-data-bohrium
```

Then run the respective command and login again.
