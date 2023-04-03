// scraper.js
import puppeteer from 'puppeteer';

export async function scrapeSite(url, tags, site) {
  const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
  const page = await browser.newPage();
  await page.goto(url);
  
  // si url est une chaine vide on renvoie un objet vide
  if (url === '') {
    return { price: 0, status: false, url };
  }
  
  try {
    await Promise.all([
      page.waitForSelector(tags.price, { timeout: 5000 }),
      page.waitForSelector(tags.status, { timeout: 5000 }),
    ]);
  } catch (e) {
    console.error(`Error on ${site} scraping: ${e}`);
    await browser.close();
    throw new Error('Scraping error');
  }
  
  try {
    const price = await page.$eval(tags.price, (el) => el.textContent.trim());
    const status = await page.$eval(tags.status, (el) => el.textContent.trim());
    return { price, status, url };
  } catch (e) {
    console.error(`Error on ${site} scraping: ${e}`);
    await browser.close();
    throw new Error('Scraping error');
    return { price: 0, status: false, url };
  }
}
