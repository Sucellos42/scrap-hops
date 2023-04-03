
export const PINTA = {
  URLS: {
    IDAHO: 'https://www.pinta.it/fr/196/luppolo_pellet_1kg/1972/luppolo_idaho_7_idaho_-pellet_1_kg_crop_2021.html',
    // MOSAIC: 'https://www.pinta.it/fr/196/luppolo_pellet_1kg/1194/luppolo_mosaic_-_pellet_kg_1_crop_2021.html',
    // SORACHI: 'https://www.pinta.it/fr/196/luppolo_pellet_1kg/588/luppolo_sorachi_ace_-_pellet_1_kg_crop_2022.html',
    // IDAHO: '',
    MOSAIC: '',
    SORACHI: '',
    CITRA: ''
  },
  TAGS: {
    price: '.price',
    status: '.status_1'
  }
};

export const BIEREAPPRO = {
  URLS: {
    // IDAHO: 'https://biere-appro.com/houblon-en-pellets/673-1949-houblon-idaho-7.html#/111-poids_houblon-sachet_yakima_1kg',
    IDAHO: '',
    SORACHI: '',
    CITRA: 'https://biere-appro.com/houblon-en-pellets/240-houblon-citra.html#/111-poids_houblon-sachet_yakima_1kg',
    MOSAIC: 'https://biere-appro.com/houblon-en-pellets/250-1490-houblon-mosaic.html#/111-poids_houblon-sachet_yakima_1kg'
  }
  ,
  TAGS: {
    price: '[itemprop=price]',
    status: '#product-availability'
  }
};

export const ROLLINGBEERS = {
  URLS: {
    // IDAHO: "https://www.rolling-beers.fr/fr/en-pellets/3920-2224-houblon-en-pellets-idaho-7.html#/28-poids-1kg",
    // MOSAIC: "https://www.rolling-beers.fr/fr/en-pellets/902-604-houblon-en-pellets-mosaic.html#/28-poids-1kg",
    // SORACHI: "https://www.rolling-beers.fr/fr/en-pellets/1645-1045-houblon-en-pellets-sorachi-ace.html#/28-poids-1kg",
    IDAHO: "",
    MOSAIC: "",
    SORACHI: "",
    CITRA: ""
  },
  TAGS: {
    price: "span[itemprop=price]",
    status: "#product-availability .dispo-text p"
  }
}

export const BROUWLAND = {
  URLS: {
    IDAHO: "https://brouwland.com/fr/houblons/2336-houblons-en-pellets-idaho7-1-kg.html",
    MOSAIC: "",
    SORACHI: "",
    CITRA: ""
  },
  TAGS: {
    price: ".price_value",
    status: "#product-availability"
  }
}

export const TOUTPOURBRASSER = {
  URLS: {
    // IDAHO: "https://www.toutpourbrasser.com/houblons-en-pellets-idaho7-kg-xml-406_245-2048.html",
    MOSAIC: "",
    IDAHO: "",
    CITRA: "",
    SORACHI: ""
  },
  TAGS: {
    price: ".PrixPromo",
    status: ".fa_stock_refill"
  }
}

export const POLSINELLI = {
  URLS: {
    SORACHI: "https://www.polsinelli.it/fr/houblon-sorachi-ace-1-kg-P1729.htm",
    MOSAIC: "",
    IDAHO: "",
    CITRA: "https://www.polsinelli.it/fr/houblon-citra-1-kg-P2836.htm"
  },
  TAGS: {
    price: ".prodotto__prezzo--finale",
    status: "prodottoDisponibile"
  }
}

// TODO: copier le bloc ci-dessus en changeant les le nom, les urls et les tags pour ajouter un site



export const sites = {
  PINTA,
  BIEREAPPRO,
  ROLLINGBEERS,
  BROUWLAND,
  TOUTPOURBRASSER,
  POLSINELLI,
  // TODO: ajouter-ici pour ajouter un site
  
}
