import {BIEREAPPRO, PINTA, ROLLINGBEERS} from "@/constants/sources";


async function formatData(scrapedData, site) {
  function pinta(obj) {
    return obj.status.trim().toLowerCase().includes("disponible");
  }
  
  function rolling(obj) {
    return obj.status.trim().toLowerCase().includes("en stock");
  }
  
  function biereappro(obj) {
    return !obj.status.trim().toLowerCase().includes("rupture");
  }
  
  function removeNonNumeric(str) {
    return str.replace(/[^0-9,\.]+/g, "").replace(",", ".");
  }
  switch (site) {
    case 'pinta':
      return {
        ...scrapedData,
        status: pinta(scrapedData),
        price: removeNonNumeric(scrapedData.price)
      }
    case 'rolling':
      return {
        ...scrapedData,
        status: rolling(scrapedData),
        price: removeNonNumeric(scrapedData.price)
      }
    case 'biereappro':
      return {
        ...scrapedData,
        status: biereappro(scrapedData),
        price: removeNonNumeric(scrapedData.price)
      }
    default:
      return {
        ...scrapedData,
        status: false,
        price: 0
      }
      
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
  
  async function scrapeSite(url, tags, site) {
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
    const formattedData = await formatData(data, site)
    console.log(formattedData, "data from scrapeSite")
    return formattedData;
  }
  
  async function scrapeAllSites() {
    const scrapedData = {
      PINTA: {},
      BIEREAPPRO: {},
      ROLLINGBEERS: {}
    };
    
    await scrapeSiteUrls(PINTA.URLS, PINTA.TAGS, scrapedData.PINTA, 'pinta');
    await scrapeSiteUrls(BIEREAPPRO.URLS, BIEREAPPRO.TAGS, scrapedData.BIEREAPPRO, 'biereappro');
    await scrapeSiteUrls(ROLLINGBEERS.URLS, ROLLINGBEERS.TAGS, scrapedData.ROLLINGBEERS, 'rolling');
    
    return scrapedData;
  }
  
  async function scrapeSiteUrls(urls, tags, data, site) {
    for (const [key, url] of Object.entries(urls)) {
      data[key] = await scrapeSite(url, tags, site);
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

