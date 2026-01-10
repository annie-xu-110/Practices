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

**Mac 电脑：**

1. 打开浏览器，访问：https://nodejs.org/
2. 点击绿色按钮下载 **LTS 版本**（推荐大多数用户）
3. 双击下载的文件（.pkg），按照提示一步步安装
4. 安装完成后，重启电脑

**验证安装成功：**

1. 打开「终端」应用（在 启动台 > 其他 > 终端）
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

项目文件夹应该在：`/Users/annnnie/Practices`

---

## 📦 第三步：安装项目依赖

这一步只需要做一次！

1. 打开「终端」
2. 输入以下命令进入项目文件夹：
   ```
   cd /Users/annnnie/Practices
   ```
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

1. 打开「终端」
2. 确保在项目文件夹中：
   ```
   cd /Users/annnnie/Practices
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

1. 打开「终端」
2. 确保在项目文件夹中：
   ```
   cd /Users/annnnie/Practices
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
Practices/
└── artifacts/
    └── 2026-01-04/           ← 日期文件夹
        ├── article-2026-01-04.md      ← 文章内容（Markdown格式）
        └── references-2026-01-04.json ← 参考文献
```

**如何查看文章：**

1. **用 VS Code 打开**（推荐）：
   - 打开 VS Code
   - 点击 文件 > 打开文件夹
   - 选择 `Practices` 文件夹
   - 在左侧找到 `artifacts` > 日期文件夹 > `.md` 文件

2. **用文本编辑器打开**：
   - 在 Finder 中找到文件
   - 右键点击 > 打开方式 > 文本编辑

---

## ❓ 常见问题

### Q: 运行命令时显示 "command not found"
**解决方法：** 确保已经安装 Node.js，并重启终端。

### Q: 显示 "npm ERR!" 错误
**解决方法：** 
1. 确保在正确的文件夹中（`cd /Users/annnnie/Practices`）
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
cd /Users/annnnie/Practices

# 2. 获取今天的热门话题
npm run scrape

# 3. 生成养生文章
npm run generate

# 4. 按回车键关闭浏览器
```

生成的文章在 `artifacts/今天日期/` 文件夹中！

---

## 🆘 需要帮助？

如果遇到问题，可以：
1. 截图错误信息
2. 记下你执行的命令
3. 联系技术支持

祝使用愉快！🌸

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
/Users/annnnie/Practices/
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
