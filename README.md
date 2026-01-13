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

```
I need to set up a health/wellness article auto-generation project from scratch. 
This is my first time doing something like this, so I need very detailed beginner instructions.

The project uses Node.js, Playwright, TypeScript, and Git.
It does two main things:
1. Scrapes trending health topics from Newrank website
2. Generates articles using Bohrium AI

**Complete Setup Instructions I Need:**

**Phase 1: Install Required Software**
1. Git installation
   - What is Git and why do I need it?
   - Where to download it (provide links)
   - Step-by-step installation for [Windows / Mac / Linux]
   - How to verify it's installed

2. Node.js installation
   - What is Node.js and npm?
   - Download the LTS version from https://nodejs.org/
   - Step-by-step installation for [Windows / Mac / Linux]
   - How to verify with: node --version
   - What to do if something goes wrong

3. VS Code installation (optional but recommended)
   - Why VS Code is useful
   - Where to download it (https://code.visualstudio.com/)
   - How to install it
   - How to open files with it

**Phase 2: Get the Project Code**
1. How to clone the repository using Git
   - Example: git clone [repository-url]
   - Where the project files will be saved
   - What each folder contains

2. If I don't have Git/command line comfort:
   - Alternative way to download as ZIP file
   - How to extract it

**Phase 3: Install Project Dependencies**
1. Navigate to project folder in terminal:
   - Example: cd C:\Users\YourName\Downloads\Practices (Windows)
   - Example: cd /Users/YourName/Practices (Mac)
   - Example: cd /home/username/Practices (Linux)

2. Run: npm install
   - What does this do?
   - What should I see?
   - How long will it take?

3. Run: npx playwright install chromium
   - What is Playwright?
   - What is Chromium?
   - Why do we need this?

**Phase 4: First Run - Get Topics**
1. Command: npm run scrape
   - What happens when I run this?
   - A browser should open automatically - explain this
   - Where will topics be saved?
   - How do I know it succeeded?
   - Common errors and fixes

**Phase 5: Second Run - Generate Article**
1. First time setup - Bohrium login
   - I may need to log in to Bohrium AI website
   - What to do if login is required
   - How to close the browser after login

2. Command: npm run generate
   - What happens when I run this?
   - How long does it take?
   - Where will the article be saved?
   - What format is the article in?
   - How do I know it succeeded?
   - Common errors and fixes

**Phase 6: View Your Generated Articles**
1. Where articles are saved
   - Folder structure: artifacts/[date]/ 
   - article-[date].md (the main article)
   - references-[date].json (the references)

2. How to open and read articles
   - Open with VS Code
   - Open with text editor (Windows/Mac/Linux specific)
   - Can I edit the articles?

**Phase 7: Daily Workflow**
1. Every day I need to run:
   - npm run scrape (get today's topics)
   - npm run generate (generate article)
   - Then press Enter to close browser

2. Where to find today's article
   - It will be in artifacts/[today's date]/

**Troubleshooting & Common Issues:**
1. "command not found" error
   - What this means
   - How to fix it

2. "npm ERR!" error
   - What to check
   - How to fix it

3. Browser opens but nothing happens
   - Network issues
   - Website might be slow
   - What to do

4. First time Bohrium login needed
   - How to log in manually
   - When to close the browser
   - How to run again after login

5. Article generation failed
   - Check if npm run scrape worked first
   - Check if topics folder has files
   - Restart and try again

6. Want to start fresh/clear logins
   - Command to clear Newrank login: rm -rf .browser-data
   - Command to clear Bohrium login: rm -rf .browser-data-bohrium

**Important Reminders:**
- Be clear that this is for a beginner with no programming experience
- Provide exact commands to copy-paste
- Explain technical terms in simple language
- Show examples specific to Windows, Mac, and Linux
- Tell me what SUCCESS looks like at each step
- Explain what each tool does and why we need it

My goal: Run this every day to generate new wellness articles automatically.
Please make sure I can do this daily without needing technical help.
```

**如何使用这个提示：**
1. 复制上面的代码块（从 `I need to set up...` 到最后）
2. 打开你喜欢的 AI 聊天工具：
   - ChatGPT: https://chat.openai.com
   - Claude: https://claude.ai
   - 或其他 AI 助手
3. 将提示粘贴到聊天框
4. 修改括号内的内容：
   - 将 `[Windows / Mac / Linux]` 替换为你的操作系统
   - 如果有 `[repository-url]`，替换为实际的项目 Git 地址
5. 发送，然后按照 AI 的详细指导进行！

AI 会为你提供：
✅ 逐步的安装说明  
✅ 针对你操作系统的具体命令  
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
