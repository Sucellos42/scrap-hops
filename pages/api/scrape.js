import {BIEREAPPRO, BROUWLAND, PINTA, POLSINELLI, ROLLINGBEERS, TOUTPOURBRASSER} from "@/constants/sources";


async function formatData(scrapedData, site) {
  const pinta = (obj) => obj.status.trim().toLowerCase().includes('disponible');
  const rolling = (obj) => obj.status.trim().toLowerCase().includes('en stock');
  const biereappro = (obj) => !obj.status.trim().toLowerCase().includes('rupture');
  const brouwland = (obj) => obj.status.trim().toLowerCase().includes('en stock');
  const toutpourbrasser = (obj) => !obj.status.trim().toLowerCase().includes('en cours de');
  const polsinelli = (obj) => obj.status.trim().toLowerCase().includes('disponible');
  const removeNonNumeric = (str) => str.replace(/[^0-9,.]+/g, '').replace(',', '.');
  
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
    case 'brouwland':
      return {
        ...scrapedData,
        status: brouwland(scrapedData),
      }
    case 'toutpourbrasser':
      return {
        ...scrapedData,
        status: toutpourbrasser(scrapedData),
        price: removeNonNumeric(scrapedData.price)
      }
    case 'polsinelli':
      return {
        ...scrapedData,
        status: polsinelli(scrapedData),
        price: removeNonNumeric(scrapedData.price)
      }
    default:
      return {
        ...scrapedData,
        status: false,
        price: 0
      }
      
  }
}


export default async function handler(req, res) {
  console.log(performance.now() + 'ms' + ' - ' + 'start')
  const puppeteer = require('puppeteer');
  
  async function scrapeSite(url, tags, site) {
    console.log('scrape', url)
    // pour chaque URLS de url obj on scrap
    if (url.length < 1) {
      return {}
    }
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url); // Change URL based on the object passed in
    
    // on attend que les éléments soient chargés
    // si il ne charge pas avant 5s on ferme le browser et on retourne un objet vide
    try {
      const verif1 = await page.waitForSelector(tags.price, {timeout: 5000}); // Wait for price element to load
      const verif2 = await page.waitForSelector(tags.status, {timeout: 5000}); // Wait for status element to load
  
      const price = await verif1.evaluate(el => el.textContent); // Extract price
      const status = await verif2.evaluate(el => el.textContent); // Extract status
  
      console.log('price', price)
      console.log('status', status)
  
      // Format price and status
      await browser.close();
      const data = {price, status, url: url}
      return await formatData(data, site);
    } catch (e) {
      await browser.close();
      return {status: false, price: 0, url: url}
    }
  }
  
  async function scrapeAllSites() {
    const scrapedData = {
      PINTA: {},
      BIEREAPPRO: {},
      ROLLINGBEERS: {},
      BROUWLAND: {},
      TOUTPOURBRASSER: {},
      POLSINELLI: {}
    };
    
    await scrapeSiteUrls(PINTA.URLS, PINTA.TAGS, scrapedData.PINTA, 'pinta');
    await scrapeSiteUrls(BIEREAPPRO.URLS, BIEREAPPRO.TAGS, scrapedData.BIEREAPPRO, 'biereappro');
    await scrapeSiteUrls(ROLLINGBEERS.URLS, ROLLINGBEERS.TAGS, scrapedData.ROLLINGBEERS, 'rolling');
    await scrapeSiteUrls(BROUWLAND.URLS, BROUWLAND.TAGS, scrapedData.BROUWLAND, 'brouwland');
    await scrapeSiteUrls(TOUTPOURBRASSER.URLS, TOUTPOURBRASSER.TAGS, scrapedData.TOUTPOURBRASSER, 'toutpourbrasser');
    await scrapeSiteUrls(POLSINELLI.URLS, POLSINELLI.TAGS, scrapedData.POLSINELLI, 'polsinelli');
    
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



