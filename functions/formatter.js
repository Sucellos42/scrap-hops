// formatter.js
export function formatData(scrapedData, site) {
  const pinta = (obj) => obj.status.trim().toLowerCase().includes('disponible');
  const rolling = (obj) => obj.status.trim().toLowerCase().includes('en stock');
  const biereappro = (obj) => !obj.status.trim().toLowerCase().includes('rupture');
  const brouwland = (obj) => obj.status.trim().toLowerCase().includes('en stock');
  const toutpourbrasser = (obj) => !obj.status.trim().toLowerCase().includes('en cours de');
  const removeNonNumeric = (str) => str.replace(/[^0-9,.]+/g, '').replace(',', '.');
  
  switch (site) {
    case 'pinta':
      return {
        ...scrapedData,
        status: pinta(scrapedData),
        price: removeNonNumeric(scrapedData.price),
      };
    case 'rolling':
      return {
        ...scrapedData,
        status: rolling(scrapedData),
        price: removeNonNumeric(scrapedData.price),
      };
    case 'biereappro':
      return {
        ...scrapedData,
        status: biereappro(scrapedData),
        price: removeNonNumeric(scrapedData.price),
      };
    case 'brouwland':
      return {
        ...scrapedData,
        status: brouwland(scrapedData),
      };
    case 'toutpourbrasser':
      return {
        ...scrapedData,
        status: toutpourbrasser(scrapedData),
        price: removeNonNumeric(scrapedData.price),
      };
    default:
      return {
        ...scrapedData,
        status: false,
        price: 0,
      };
  }
}
