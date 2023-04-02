
export const PINTA = {
  URLS: {
    URL_IDAHO: 'https://www.pinta.it/fr/196/luppolo_pellet_1kg/1972/luppolo_idaho_7_idaho_-pellet_1_kg_crop_2021.html',
    URL_MOSAIC: 'https://www.pinta.it/fr/196/luppolo_pellet_1kg/1194/luppolo_mosaic_-_pellet_kg_1_crop_2021.html',
    URL_SORACHI: 'https://www.pinta.it/fr/196/luppolo_pellet_1kg/588/luppolo_sorachi_ace_-_pellet_1_kg_crop_2022.html'
  },
  TAGS: {
    price: '.price',
    status: '.status_1'
  }
};

export const BIEREAPPRO = {
  URLS: {
    URL_IDAHO: 'https://biere-appro.com/houblon-en-pellets/673-1949-houblon-idaho-7.html#/111-poids_houblon-sachet_yakima_1kg',
    URL_MOSAIC: 'https://biere-appro.com/houblon-en-pellets/250-1490-houblon-mosaic.html#/111-poids_houblon-sachet_yakima_1kg',
    URL_CITRA: 'https://biere-appro.com/houblon-en-pellets/240-houblon-citra.html#/111-poids_houblon-sachet_yakima_1kg'
  }
  ,
  TAGS: {
    price: '[itemprop=price]',
    status: '#product-availability'
  }
};

export const ROLLINGBEERS = {
  URLS: {
    URL_IDAHO: "https://www.rolling-beers.fr/fr/en-pellets/3920-2224-houblon-en-pellets-idaho-7.html#/28-poids-1kg",
    URL_MOSAIC: "https://www.rolling-beers.fr/fr/en-pellets/902-604-houblon-en-pellets-mosaic.html#/28-poids-1kg",
    URL_SORACHI: "https://www.rolling-beers.fr/fr/en-pellets/1645-1045-houblon-en-pellets-sorachi-ace.html#/28-poids-1kg"
  },
  TAGS: {
    price: "span[itemprop=price]",
    status: "#product-availability .dispo-text p"
  }
}

