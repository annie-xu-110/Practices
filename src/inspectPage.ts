import { chromium, BrowserContext } from 'playwright';
import * as path from 'path';

// Path to store persistent browser data
const USER_DATA_DIR = path.join(__dirname, '..', '.browser-data');

/**
 * This is a helper script to inspect the page structure and test selectors.
 * It will open the page and keep it open so you can inspect elements.
 * Use this to find the correct CSS selectors for the article titles.
 */
async function inspectPage() {
  let context: BrowserContext | null = null;
  
  try {
    context = await chromium.launchPersistentContext(USER_DATA_DIR, {
      headless: false,
      slowMo: 500,
      viewport: { width: 1280, height: 720 }
    });
    
    const page = context.pages()[0] || await context.newPage();
    
    console.log('Opening page...');
    await page.goto('https://t.newrank.cn/keywordsearch?platform=gongzhonghao&keyword=养生', {
      waitUntil: 'networkidle',
      timeout: 60000
    });
    
    await page.waitForTimeout(3000);
    
    console.log('\n=== INSPECTION MODE ===');
    console.log('The browser will stay open for 2 minutes.');
    console.log('Use this time to:');
    console.log('1. Right-click on an article title and select "Inspect"');
    console.log('2. Find the CSS class or selector for the article titles');
    console.log('3. Update the selectors in scrapeNewrank.ts accordingly');
    console.log('\nCommon things to look for:');
    console.log('- Article container class (e.g., .article-item, .content-card)');
    console.log('- Title element class (e.g., .article-title, .content-title)');
    console.log('- Link elements with titles (e.g., a[class*="title"])');
    console.log('\nTesting some selectors...\n');
    
    // Test various selectors and report findings
    const testSelectors = [
      'a',
      'h3',
      'h4', 
      '.title',
      '[class*="title"]',
      '[class*="article"]',
      '[class*="content"]',
      '.list-item',
      '.item'
    ];
    
    for (const selector of testSelectors) {
      try {
        const elements = await page.$$(selector);
        if (elements.length > 0) {
          const firstText = await elements[0].textContent();
          console.log(`${selector}: Found ${elements.length} elements. First text: "${firstText?.trim().substring(0, 50)}..."`);
        }
      } catch (e) {
        // Skip if selector fails
      }
    }
    
    console.log('\nBrowser will stay open for 2 minutes for manual inspection...');
    await page.waitForTimeout(120000); // 2 minutes
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (context) {
      await context.close();
    }
  }
}

inspectPage()
  .then(() => {
    console.log('\nInspection completed!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\nError:', error);
    process.exit(1);
  });
