import {BIEREAPPRO, PINTA} from "@/constants/sources";


async function formatData(scrapedData) {
  function pinta(obj) {
    return obj.status.trim().toLowerCase().includes("disponible") ? "disponible" : "rupture";
  }
  
  biereappro(scrapedData)
  // pinta(scrapedData)
  
  function biereappro(obj) {
    return obj.status.trim().toLowerCase().includes("rupture") ? "rupture" : "disponible";
  }
  
  function removeNonNumeric(str) {
    return str.replace(/[^0-9,\.]+/g, "").replace(",", ".");
  }
  
  return {
      ...scrapedData,
      status: pinta(scrapedData),
      price: removeNonNumeric(scrapedData.price)
  }
  //   PINTA: {
  //     ...scrapedData.PINTA,
  //     status: pinta(scrapedData.PINTA),
  //     price: removeNonNumeric(scrapedData.PINTA.price)},
  //   BIEREAPPRO: {
  //     ...scrapedData.BIEREAPPRO,
  //     status: biereappro(scrapedData.BIEREAPPRO),
  //     price: removeNonNumeric(scrapedData.BIEREAPPRO.price)
  //   }
  // };
}


export default async function handler(req, res) {
  console.log(performance.now() + 'ms' + ' - ' + 'start')
  const puppeteer = require('puppeteer');
  
  async function scrapeSite(url, tags) {
    
    
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
    const formattedData = await formatData(data)
    console.log(formattedData)
    return formattedData;
  }
  
  async function scrapeAllSites() {
    const scrapedData = {
      PINTA: {},
      BIEREAPPRO: {}
    };
    
    await scrapeSiteUrls(PINTA.URLS, PINTA.TAGS, scrapedData.PINTA);
    await scrapeSiteUrls(BIEREAPPRO.URLS, BIEREAPPRO.TAGS, scrapedData.BIEREAPPRO);
    
    return scrapedData;
  }
  
  async function scrapeSiteUrls(urls, tags, data) {
    for (const [key, url] of Object.entries(urls)) {
      data[key] = await scrapeSite(url, tags);
    }
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

