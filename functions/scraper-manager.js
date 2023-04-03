// scraper-manager.js
import { scrapeSite } from './scraper.js';
import { formatData } from './formatter.js';
import { handleError } from './error-handling.js';
import { sites } from '@/constants/sources';

export async function scrapeAllSites() {
  const scrapedData = {};
  const promises = [];
  
  for (const [siteKey, siteValue] of Object.entries(sites)) {
    console.log(sites)
    const urls = siteValue.URLS;
    const tags = siteValue.TAGS;
    const site = siteKey;
    for (const [key, url] of Object.entries(urls)) {
      scrapedData[site] = scrapedData[site] || {};
      console.log(scrapedData, "scrapedData")
      promises.push(
        scrapeSite(url, tags, site)
          .then((result) => formatData(result, site))
          .then((formattedData) => (scrapedData[site][key] = formattedData))
          .catch(handleError)
      );
    }
  }
  
  await Promise.all(promises);
  return scrapedData;
}
