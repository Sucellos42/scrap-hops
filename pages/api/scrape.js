import SOURCES from "@/constants/sources";
import puppeteer from "puppeteer-core";
import chromium from "chrome-aws-lambda";



class Scrapper {
  constructor(urls, tags, site, browser) {
    this.urls = urls;
    this.tags = tags;
    this.site = site;
    this.browser = browser;
    this.page = null;
  }
  
  async scrape() {
    const data = {};
    
    for (const [key, url] of Object.entries(this.urls)) {
      console.log(`Scraping ${key} url : ${url} from ${this.site}...`)
      data[key] = await this.scrapeSite(url);
    }
    
    return data;
  }
  
  isValidUrl(url) {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  }
  
  async scrapeSite(url) {
    if (!this.isValidUrl(url)) {
      return { status: false, price: 0, url };
    }
    
    const page = await this.browser.newPage();
    
    await page.goto(url);
    
    try {
      const priceElement = await page.waitForSelector(this.tags.price, { timeout: 5000 });
      const statusElement = await page.waitForSelector(this.tags.status, { timeout: 5000 });
      
      const price = await priceElement.evaluate(el => el.textContent);
      const status = await statusElement.evaluate(el => el.textContent);
      
      return this.formatData({ price, status, url });
      
    } catch (error) {
      return { status: false, price: 0, url };
    }
  }
  
  formatData(data) {
    const removeNonNumeric = (str) => str.replace(/[^0-9,.]+/g, "").replace(",", ".");
    
    const statusCheckers = {
      pinta: (obj) => obj.status.trim().toLowerCase().includes("disponible"),
      rolling: (obj) => obj.status.trim().toLowerCase().includes("en stock"),
      biereappro: (obj) => !obj.status.trim().toLowerCase().includes("rupture"),
      brouwland: (obj) => obj.status.trim().toLowerCase().includes("en stock"),
      toutpourbrasser: (obj) => !obj.status.trim().toLowerCase().includes("en cours de"),
      polsinelli: (obj) => obj.status.trim().toLowerCase().includes("disponible"),
    };
    
    return {
      ...data,
      status: statusCheckers[this.site](data),
      price: removeNonNumeric(data.price),
    };
  }
}

export default async function handler(req, res) {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
  
  const scrapers = Object.entries(SOURCES).map(([sourceName, source]) => {
    return new Scrapper(source.URLS, source.TAGS, sourceName.toLowerCase(), browser);
  });
  
  try {
    const data = await Promise.all(scrapers.map((scraper) => scraper.scrape()));
    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  } finally {
    await browser.close();
  }
  
  // Increase the event listeners limit if needed
  process.setMaxListeners(20);
}
