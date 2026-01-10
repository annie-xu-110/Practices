/// <reference lib="dom" />

import { chromium, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

function waitForEnter(message: string): Promise<void> {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        rl.question(message, () => {
            rl.close();
            resolve();
        });
    });
}

async function submitPromptToBohrium() {
    let context: BrowserContext | null = null;

    try {
        // Get today's date (used throughout the script)
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        // Find the latest JSON file from topics folder (closest to today's date)
        const topicsDir = path.join(__dirname, '..', 'topics');

        if (!fs.existsSync(topicsDir)) {
            throw new Error(`Topics directory not found: ${topicsDir}`);
        }

        const files = fs.readdirSync(topicsDir)
            .filter(file => file.endsWith('.json') && /^\d{4}-\d{2}-\d{2}\.json$/.test(file));

        if (files.length === 0) {
            throw new Error('No JSON files found in topics directory');
        }

        // Find the file with date closest to today (prefer today or most recent past date)
        const sortedFiles = files
            .map(file => {
                const dateStr = file.replace('.json', '');
                return { file, date: dateStr };
            })
            .sort((a, b) => b.date.localeCompare(a.date)); // Sort descending (newest first)

        // Pick the first file that is today or in the past (most recent)
        const latestFile = sortedFiles.find(f => f.date <= todayStr)?.file || sortedFiles[0].file;
        const topicsPath = path.join(topicsDir, latestFile);
        console.log(`Using latest topics file: ${latestFile} (today is ${todayStr})`);

        const topicsData = fs.readFileSync(topicsPath, 'utf-8');

        // Parse the JSON - it's now a string array
        const topics: string[] = JSON.parse(topicsData);

        console.log(`Loaded ${topics.length} topics from JSON file`);
        console.log('Topics:');
        topics.forEach((topic, index) => {
            console.log(`${index + 1}. ${topic}`);
        });

        // Read the prompt template
        const promptPath = path.join(__dirname, '..', 'prompt');
        let promptTemplate = fs.readFileSync(promptPath, 'utf-8');

        // Format topics as a numbered list
        const topicsList = topics
            .map((topic, index) => `${index + 1}. ${topic}`)
            .join('\n');

        // Replace <topics> placeholder with actual topics
        const filledPrompt = promptTemplate.replace('<topics>', topicsList);

        console.log('\n=== Filled Prompt ===');
        console.log(filledPrompt);
        console.log('=== End Prompt ===\n');

        // Launch browser with persistent context
        console.log('Launching browser...');
        context = await chromium.launchPersistentContext(
            path.join(__dirname, '..', '.browser-data'),
            {
                headless: false,
                slowMo: 500,
                viewport: { width: 1280, height: 720 }
            }
        );

        const page: Page = context.pages()[0] || await context.newPage();

        console.log('Navigating to Bohrium website...');
        await page.goto('https://www.bohrium.com/', {
            waitUntil: 'domcontentloaded',
            timeout: 60000
        });

        console.log('Waiting for page to fully load...');
        await page.waitForTimeout(3000);

        // Find and interact with the chatbox
        console.log('Looking for chatbox input field...');

        // Try multiple selectors to find the input field
        const inputSelectors = [
            'input[type="text"][placeholder*="chat" i]',
            'textarea[placeholder*="message" i]',
            'input[type="text"][placeholder*="message" i]',
            '[contenteditable="true"]',
            'input[type="text"]',
            'textarea'
        ];

        let inputField = null;
        for (const selector of inputSelectors) {
            inputField = await page.$(selector);
            if (inputField) {
                console.log(`Found input field with selector: ${selector}`);
                break;
            }
        }

        if (!inputField) {
            console.log('Could not find chatbox input field. Showing available elements...');
            const allInputs = await page.$$('input, textarea');
            console.log(`Found ${allInputs.length} input/textarea elements on the page`);

            // Take a screenshot for debugging
            await page.screenshot({ path: path.join(__dirname, '..', 'bohrium-debug.png') });
            console.log('Screenshot saved to bohrium-debug.png');

            throw new Error('Could not locate chatbox input field');
        }

        console.log('Clicking on input field...');
        await inputField.click();
        await page.waitForTimeout(500);

        console.log('Filling prompt into chatbox...');
        // Use fill() for large text to ensure it's completely entered
        await inputField.fill(filledPrompt);

        console.log('Waiting for text to be entered...');
        await page.waitForTimeout(1000);

        // Ensure the mode is set to "简洁" (concise mode)
        console.log('Checking for "简洁" mode...');
        try {
            // Find the mode element containing "简洁" text
            const modeElements = await page.$$('div[class*="model-select_model"]');
            let foundConciseMode = false;

            for (const element of modeElements) {
                const text = await element.textContent();
                if (text?.includes('简洁')) {
                    // Check if it's already active by looking for any "active" class
                    const className = await element.getAttribute('class');
                    const isActive = className?.includes('active');

                    if (!isActive) {
                        console.log('Clicking "简洁" mode to activate it...');
                        await element.click();
                        await page.waitForTimeout(500);
                    } else {
                        console.log('"简洁" mode is already active');
                    }
                    foundConciseMode = true;
                    break;
                }
            }

            if (!foundConciseMode) {
                console.log('Warning: Could not find "简洁" mode, continuing anyway...');
            }
        } catch (error) {
            console.log('Error setting mode:', error);
            console.log('Continuing with current mode...');
        }

        // Find and click the send button
        console.log('Looking for send button...');

        const sendButtonSelectors = [
            'span.dp-build-icon.text-color-primary.pointer',
            'span.dp-build-icon.pointer',
            'div:has(> span.dp-build-icon.pointer)',
            'span.dp-build-icon:has(svg circle)',
            '[class*="dp-build-icon"][class*="pointer"]',
            'button:has-text("Send")',
            'button:has-text("发送")',
            'button[aria-label*="send" i]',
            'button[aria-label*="Submit" i]',
            'button[type="submit"]'
        ];

        let sendButton = null;
        for (const selector of sendButtonSelectors) {
            try {
                sendButton = await page.$(selector);
                if (sendButton) {
                    // Verify it's visible and clickable
                    const isVisible = await sendButton.isVisible();
                    if (isVisible) {
                        console.log(`Found send button with selector: ${selector}`);
                        break;
                    } else {
                        sendButton = null;
                    }
                }
            } catch (e) {
                // Continue to next selector
            }
        }

        if (!sendButton) {
            console.log('Could not find send button. Inspecting buttons...');
            const buttons = await page.$$('button');
            console.log(`Found ${buttons.length} buttons on the page`);

            // Log button texts to help debugging
            for (let i = 0; i < Math.min(10, buttons.length); i++) {
                const text = await buttons[i].textContent();
                const ariaLabel = await buttons[i].getAttribute('aria-label');
                console.log(`Button ${i}: text="${text}", aria-label="${ariaLabel}"`);
            }

            throw new Error('Could not locate send button');
        }

        console.log('Clicking send button...');
        await sendButton.click();

        console.log('Message sent! Waiting for AI to generate response...');
        
        // Wait for generation to complete by monitoring the stop button
        console.log('Waiting for generation to complete...');
        
        let maxWaitTime = 180000; // 3 minutes max wait
        let checkInterval = 3000; // Check every 3 seconds
        let elapsedTime = 0;
        let generationComplete = false;
        
        // Give it a moment for the generation to potentially start
        await page.waitForTimeout(5000);
        
        while (elapsedTime < maxWaitTime && !generationComplete) {
            await page.waitForTimeout(checkInterval);
            elapsedTime += checkInterval;
            
            const stopButtonExists = await page.evaluate(() => {
                // Find SVG use element with stop-circle href
                const useElements = Array.from(document.querySelectorAll('button svg use'));
                for (const use of useElements) {
                    const href = use.getAttribute('xlink:href') || use.getAttribute('href') || '';
                    if (href.includes('stop-circle')) {
                        return true;
                    }
                }
                return false;
            });
            
            if (!stopButtonExists) {
                // Stop button not present means generation is complete (or hasn't started yet)
                // Check if we have content to confirm generation happened
                const hasContent = await page.evaluate(() => {
                    // Use robust selector: content inside notranslate div
                    const contentDiv = document.querySelector('div.notranslate[translate="no"] div[class*="_content_"]');
                    return contentDiv !== null && contentDiv.textContent && contentDiv.textContent.length > 100;
                });
                
                if (hasContent) {
                    console.log('Generation completed (no stop button and content exists)');
                    generationComplete = true;
                    break;
                }
            }
            
            // Get current content length for progress tracking
            const currentContentLength = await page.evaluate(() => {
                const contentDiv = document.querySelector('div.notranslate[translate="no"] div[class*="_content_"]');
                return contentDiv?.textContent?.length || 0;
            });
            
            console.log(`Still generating... ${currentContentLength} chars (${elapsedTime / 1000}s elapsed)`);
        }

        if (elapsedTime >= maxWaitTime) {
            console.log('Warning: Maximum wait time reached, proceeding with available content...');
        }

        // Additional wait to ensure any final rendering is complete
        console.log('Waiting for final rendering...');
        await page.waitForTimeout(2000);

        // Extract article content with better structure
        console.log('Extracting article content and references...');

        const extractedData = await page.evaluate(() => {
            const content: string[] = [];
            const images: { src: string; caption: string }[] = [];

            // Define reference type with bibliographic info
            interface Reference {
                number: number;
                title: string;
                titleChinese: string;
                authors: string[];
                journal: string;
                date: string;
                impactScore: string;
                context: string;
            }
            
            const references: Reference[] = [];

            // Use robust selector: content inside notranslate div
            const contentDiv = document.querySelector('div.notranslate[translate="no"] div[class*="_content_"]');
            
            if (!contentDiv) {
                return {
                    content: '',
                    references: [],
                    images: [],
                    fullHtml: document.body.innerHTML
                };
            }

            // Get all child elements to preserve structure
            const children = contentDiv.children;
            
            // Track which reference numbers appear in the article content for context
            const refContexts: { [key: number]: string } = {};
            
            for (let i = 0; i < children.length; i++) {
                const child = children[i] as HTMLElement;
                const tagName = child.tagName.toLowerCase();
                
                // Clone the element to manipulate
                const cloned = child.cloneNode(true) as HTMLElement;
                
                // Extract reference contexts from original element before modifying
                const originalRefs = child.querySelectorAll('span[class*="_button-round_"]');
                originalRefs.forEach((btn) => {
                    const refNumber = parseInt(btn.textContent?.trim() || '0');
                    if (refNumber && !refContexts[refNumber]) {
                        refContexts[refNumber] = child.textContent?.substring(0, 200) || '';
                    }
                });
                
                // Replace reference buttons with markdown-style [n]
                const refButtons = cloned.querySelectorAll('span[class*="_button-round_"]');
                refButtons.forEach((btn) => {
                    const refNum = btn.textContent?.trim() || '';
                    const marker = document.createTextNode(`[${refNum}]`);
                    btn.parentElement?.replaceWith(marker);
                });
                
                // Replace keyword highlights with plain text
                const keywords = cloned.querySelectorAll('span[class*="_keyword-inline_"]');
                keywords.forEach((kw) => {
                    const text = document.createTextNode(kw.textContent || '');
                    kw.replaceWith(text);
                });
                
                // Handle images within elements
                const imgDivs = cloned.querySelectorAll('div[class*="_img_"]');
                imgDivs.forEach((imgDiv) => {
                    const img = imgDiv.querySelector('img');
                    const caption = imgDiv.querySelector('div[class*="_img-title_"]');
                    if (img) {
                        const imgSrc = img.getAttribute('src') || '';
                        const imgCaption = caption?.textContent?.trim() || '';
                        images.push({ src: imgSrc, caption: imgCaption });
                        const imgMd = `\n\n![${imgCaption}](${imgSrc})\n*${imgCaption}*\n\n`;
                        const textNode = document.createTextNode(imgMd);
                        imgDiv.replaceWith(textNode);
                    }
                });
                
                // Convert to markdown based on tag type
                const text = cloned.textContent?.trim() || '';
                if (!text) continue;
                
                if (tagName === 'h1') {
                    content.push(`# ${text}`);
                } else if (tagName === 'h2') {
                    content.push(`## ${text}`);
                } else if (tagName === 'h3') {
                    content.push(`### ${text}`);
                } else if (tagName === 'h4') {
                    content.push(`#### ${text}`);
                } else if (tagName === 'h5') {
                    content.push(`##### ${text}`);
                } else if (tagName === 'h6') {
                    content.push(`###### ${text}`);
                } else if (tagName === 'hr') {
                    content.push('---');
                } else if (tagName === 'ol' || tagName === 'ul') {
                    // Handle lists
                    const items = cloned.querySelectorAll('li');
                    items.forEach((li, idx) => {
                        const liText = li.textContent?.trim() || '';
                        if (tagName === 'ol') {
                            content.push(`${idx + 1}. ${liText}`);
                        } else {
                            content.push(`- ${liText}`);
                        }
                    });
                } else if (tagName === 'p') {
                    content.push(text);
                } else {
                    // Default: just add the text
                    content.push(text);
                }
            }

            // Extract detailed bibliographic information from the reference panel
            // The references are in a sidebar with class _container_df1ey_1
            const referenceContainers = document.querySelectorAll('div[class*="_container_df1ey_1"]');
            
            referenceContainers.forEach((container) => {
                // Get reference number from _index_df1ey_12
                const indexEl = container.querySelector('div[class*="_index_df1ey"]');
                const indexText = indexEl?.textContent?.trim() || '';
                const refNumber = parseInt(indexText.replace('.', '')) || 0;
                
                if (refNumber === 0) return;
                
                // Get paper title (English) from _title-paragraph_1doxh_4
                const titleEl = container.querySelector('div[class*="_title-paragraph_"] p');
                const title = titleEl?.textContent?.trim() || '';
                
                // Get Chinese translation from _translate_df1ey_28
                const titleZhEl = container.querySelector('div[class*="_translate_df1ey"]');
                const titleChinese = titleZhEl?.textContent?.trim() || '';
                
                // Get authors from _author_name_phhph_48
                const authorEls = container.querySelectorAll('div[class*="_author_name_"]');
                const authors: string[] = [];
                authorEls.forEach((authorEl) => {
                    const authorName = authorEl.textContent?.trim();
                    if (authorName) authors.push(authorName);
                });
                
                // Check for "+N" more authors indicator
                const moreAuthorsEl = container.querySelector('div[class*="_more_phhph"]');
                if (moreAuthorsEl) {
                    const moreText = moreAuthorsEl.textContent?.trim() || '';
                    if (moreText) authors.push(moreText);
                }
                
                // Get publication date from _journal-date_df1ey_52
                const dateEl = container.querySelector('div[class*="_journal-date_"]');
                const date = dateEl?.textContent?.trim() || '';
                
                // Get journal name from _name-data_1f31b_11
                const journalEl = container.querySelector('span[class*="_name-data_"]');
                const journal = journalEl?.textContent?.trim() || '';
                
                // Get impact score from _journal-impact-factor_df1ey_58
                const impactEl = container.querySelector('div[class*="_journal-impact-factor_"]');
                const impactScore = impactEl?.textContent?.trim() || '';
                
                references.push({
                    number: refNumber,
                    title: title,
                    titleChinese: titleChinese,
                    authors: authors,
                    journal: journal,
                    date: date,
                    impactScore: impactScore,
                    context: refContexts[refNumber] || ''
                });
            });
            
            // Sort references by number
            references.sort((a, b) => a.number - b.number);

            return {
                content: content.join('\n\n'),
                references: references,
                images,
                fullHtml: document.body.innerHTML
            };
        });

        console.log(`Extracted ${extractedData.content.length} characters of content`);
        console.log(`Found ${extractedData.references.length} references`);
        console.log(`Found ${extractedData.images.length} images`);

        // Create artifacts folder with today's date
        const artifactsDir = path.join(__dirname, '..', 'artifacts', todayStr);
        if (!fs.existsSync(artifactsDir)) {
            fs.mkdirSync(artifactsDir, { recursive: true });
            console.log(`Created artifacts directory: ${artifactsDir}`);
        }

        // Save article content as markdown (using today's date)
        const articlePath = path.join(artifactsDir, `article-${todayStr}.md`);

        let markdownContent = `# 养生话题文章\n\n`;
        markdownContent += `*生成日期: ${todayStr}*\n\n`;
        markdownContent += `---\n\n`;
        markdownContent += extractedData.content;
        markdownContent += `\n\n---\n\n`;

        // Add images if found
        if (extractedData.images.length > 0) {
            markdownContent += `## 图片\n\n`;
            extractedData.images.forEach((img, index) => {
                markdownContent += `### 图 ${index + 1}\n`;
                markdownContent += `![${img.caption}](${img.src})\n`;
                if (img.caption) {
                    markdownContent += `*${img.caption}*\n`;
                }
                markdownContent += `\n`;
            }); artifactsDir
        }

        fs.writeFileSync(articlePath, markdownContent, 'utf-8');
        console.log(`Article saved to: ${articlePath}`);

        // Save full HTML for reference
        const htmlPath = path.join(__dirname, '..', `article-${todayStr}.html`);
        fs.writeFileSync(htmlPath, extractedData.fullHtml, 'utf-8');
        console.log(`Full HTML saved to: ${htmlPath}`);

        // Save references to a separate file
        const referencesPath = path.join(artifactsDir, `references-${todayStr}.json`);
        const referencesData = {
            date: todayStr,
            totalReferences: extractedData.references.length,
            references: extractedData.references.map(ref => ({
                number: ref.number,
                title: ref.title,
                titleChinese: ref.titleChinese,
                authors: ref.authors,
                journal: ref.journal,
                date: ref.date,
                impactScore: ref.impactScore,
                context: ref.context
            })),
            note: 'Bibliographic information extracted from Bohrium reference panel'
        };
        fs.writeFileSync(referencesPath, JSON.stringify(referencesData, null, 2), 'utf-8');
        console.log(`References saved to: ${referencesPath}`);

        console.log('\nKeeping browser open for 10 seconds for verification...');
        await page.waitForTimeout(10000);

    } catch (error) {
        console.error('Error during process:', error);
        throw error;
    }
    // Keep browser open for review
    console.log('\nBrowser left open. Press Ctrl+C to close when done.');
}

// Run the script
submitPromptToBohrium()
    .then(async () => {
        console.log('\nProcess completed successfully!');
        await waitForEnter('\nPress Enter to close browser and exit...');
        process.exit(0);
    })
    .catch(async (error) => {
        console.error('\nProcess failed:', error);
        await waitForEnter('\nPress Enter to close browser and exit...');
        process.exit(1);
    });
