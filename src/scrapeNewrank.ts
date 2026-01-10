import { chromium, BrowserContext, Page } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

// Path to store persistent browser data
const USER_DATA_DIR = path.join(__dirname, '..', '.browser-data');

async function scrapeNewrankArticles() {
  let context: BrowserContext | null = null;
  
  try {
    // Launch persistent context - automatically saves all browser state
    console.log('Launching browser with persistent context...');
    context = await chromium.launchPersistentContext(USER_DATA_DIR, {
      headless: false,
      slowMo: 500, // Slow down by 500ms to see actions
      viewport: { width: 1280, height: 720 }
    });
    
    const page: Page = context.pages()[0] || await context.newPage();
    
    console.log('Navigating to Newrank keyword search page...');
    await page.goto('https://t.newrank.cn/keywordsearch?platform=gongzhonghao&keyword=养生', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    // Wait for the page to load
    await page.waitForTimeout(3000);
    
    console.log('Looking for the date filter (发布时间)...');
    
    // Wait a bit longer for dynamic content to load
    await page.waitForTimeout(5000);
    
    // Click on "昨日" (yesterday) radio button
    try {
      console.log('Attempting to click "昨日" filter...');
      
      // The date filter uses radio buttons with class "ant-radio-button-wrapper"
      // Find the one containing "昨日" text
      const yesterdayLabel = await page.$('label.ant-radio-button-wrapper:has-text("昨日")');
      
      if (yesterdayLabel) {
        await yesterdayLabel.click();
        console.log('Clicked "昨日" filter successfully!');
        await page.waitForTimeout(5000); // Wait for results to reload
      } else {
        console.log('Could not find "昨日" radio button, trying alternative method...');
        
        // Alternative: find radio input with value="1" (昨日 is value 1)
        const yesterdayRadio = await page.$('input.ant-radio-button-input[value="1"]');
        if (yesterdayRadio) {
          // Click the parent label
          const parentLabel = await yesterdayRadio.evaluateHandle(el => el.closest('label'));
          if (parentLabel) {
            await (parentLabel as any).click();
            console.log('Clicked "昨日" using alternative method');
            await page.waitForTimeout(5000);
          }
        } else {
          console.log('Could not find date filter');
        }
      }
      
    } catch (error) {
      console.log('Error clicking date filter:', error);
    }

    console.log('Waiting for results to load after filtering...');
    
    console.log('Extracting article titles...');
    
    // Extract titles - the page uses Ant Design table
    const articles: string[] = [];
    
    // Find all table rows with article data
    const tableRows = await page.$$('tr.ant-table-row[data-row-key]');
    console.log(`Found ${tableRows.length} article rows in the table`);
    
    const limit = Math.min(10, tableRows.length);
    for (let i = 0; i < limit; i++) {
      try {
        // Find the title div within each row - it has class "max-w-[180px] truncate"
        const titleDiv = await tableRows[i].$('div.max-w-\\[180px\\].truncate');
        if (titleDiv) {
          const titleText = await titleDiv.textContent();
          if (titleText && titleText.trim().length > 0) {
            articles.push(titleText.trim());
          }
        }
      } catch (e) {
        console.log(`Error extracting title from row ${i}:`, e);
        continue;
      }
    }
    
    console.log(`Found ${articles.length} articles`);
    
    // If we still don't have enough articles, print page structure for debugging
    if (articles.length < 10) {
      console.log('\nNote: Found fewer than 10 articles. You may need to inspect the page structure.');
      console.log('Opening browser for 10 seconds - please inspect the page to find the correct selectors...');
      await page.waitForTimeout(10000);
    }
    
    // Save to JSON file with current date as filename (YYYY-MM-DD format)
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0]; // Gets YYYY-MM-DD
    
    // Create topics folder if it doesn't exist
    const topicsDir = path.join(__dirname, '..', 'topics');
    if (!fs.existsSync(topicsDir)) {
      fs.mkdirSync(topicsDir, { recursive: true });
      console.log('Created topics directory');
    }
    
    const outputPath = path.join(topicsDir, `${dateStr}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(articles, null, 2), 'utf-8');
    
    console.log(`\nData saved to: ${outputPath}`);
    console.log('\nExtracted articles:');
    articles.forEach((article, index) => {
      console.log(`${index + 1}. ${article}`);
    });
    
    // Keep browser open for a few seconds so you can see the final state
    await page.waitForTimeout(3000);
    
  } catch (error) {
    console.error('Error during scraping:', error);
    throw error;
  } finally {
    if (context) {
      await context.close();
    }
  }
}

// Run the scraper
scrapeNewrankArticles()
  .then(() => {
    console.log('\nScraping completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nScraping failed:', error);
    process.exit(1);
  });
