import {BIEREAPPRO, PINTA} from "@/constants/sources";


async function formatData(scrapedData) {
  function pinta(obj) {
    return obj.status.trim().toLowerCase().includes("disponible") ? "disponible" : "rupture";
  }
  
  function biereappro(obj) {
    return obj.status.trim().toLowerCase().includes("rupture") ? "rupture" : "disponible";
  }
  
  function removeNonNumeric(str) {
    return str.replace(/[^0-9,\.]+/g, "").replace(",", ".");
  }
  
  return {
    PINTA: {...scrapedData.PINTA, status: pinta(scrapedData.PINTA), price: removeNonNumeric(scrapedData.PINTA.price)},
    BIEREAPPRO: {
      ...scrapedData.BIEREAPPRO,
      status: biereappro(scrapedData.BIEREAPPRO),
      price: removeNonNumeric(scrapedData.BIEREAPPRO.price)
    }
  };
}


export default async function handler(req, res) {
  let count = 0;
  console.log(performance.now() + 'ms' + ' - ' + 'start')
  const puppeteer = require('puppeteer');
  
  async function scrapeSite(url, tags) {
    
    
    // console.log(urlObj, "urlObj")
    // pour chaque URLS de url obj on scrap
    
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url); // Change URL based on the object passed in
    await page.waitForSelector(tags.price); // Wait for price element to load
    await page.waitForSelector(tags.status); // Wait for status element to load
    
    const price = await page.$eval(tags.price, el => el.textContent.trim()); // Extract price
    const status = await page.$eval(tags.status, el => el.textContent.trim()); // Extract status
    
    // Format price and status
    
    
    await browser.close();
    const data = {price, status, url: url}
    console.log(data, "data")
    return {price, status, url: url};
  }
  
  async function scrapeAllSites() {
    const scrapedData = {};
    const data = {};
    // PINTA
    for (const [key, url] of Object.entries(PINTA.URLS)) {
      data[key] = await scrapeSite(url, PINTA.TAGS);
      scrapedData.PINTA = data;
    }
    
    // BIEREAPPRO
    for (const [key, url] of Object.entries(BIEREAPPRO.URLS)) {
      data[key] = await scrapeSite(url, BIEREAPPRO.TAGS);
      scrapedData.BIEREAPPRO = data;
    }
    
    return scrapedData;
    // return await formatData(scrapedData);
  }
  
  await scrapeAllSites()
    .then(data => {
      console.log(data, "data")
      res.status(200).json({data: data})
    })
    .catch(err => {
      console.error(err, "err")
      res.status(500).json({error: err})
    });
  console.log(performance.now() + 'ms' + ' - ' + 'end')
  
  
}

