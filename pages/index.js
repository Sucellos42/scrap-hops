import styles from '@/styles/Home.module.css'
import { useState } from 'react'
import Head from 'next/head'

export default function Home() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/scrape')
      const hops = await response.json()
      setData(hops.data)
      console.log(hops.data)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  
  const getStatusIcon = (status) => {
    return status === true ? '🟢' : '🔴'
  }
  
  return (
    <>
      <Head>
        <title>Table de houblon</title>
        <meta name="description" content="Table de houblon" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Table de houblon</h1>
        <button onClick={fetchData} disabled={isLoading}>
          {isLoading ? 'Chargement...' : 'Récupérer les données'}
        </button>
        {Object.keys(data).length > 0 && (
          <table className={styles.table}>
            <thead>
            <tr>
              <th></th>
              <th>IDAHO</th>
              <th>MOSAIC</th>
              <th>CITRA</th>
              <th>Sorachi</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th>PINTA</th>
              {/* IDAHO */}
              <td>
                  <span className={styles.hopElement}>
                    <a href={data.PINTA.URL_IDAHO.url}>Lien</a>
                  </span>
                <span className={styles.hopElement}>{data.PINTA.URL_IDAHO.price}€</span>
                <span className={styles.hopElement}>{getStatusIcon(data.PINTA.URL_IDAHO.status)}</span>
              </td>
              {/* MOSAIC */}
              <td>
                  <span className={styles.hopElement}>
                    <a href={data.PINTA.URL_MOSAIC.url}>Lien</a>
                  </span>
                <span className={styles.hopElement}>{data.PINTA.URL_MOSAIC.price}€</span>
                <span className={styles.hopElement}>{getStatusIcon(data.PINTA.URL_MOSAIC.status)}</span>
              </td>
              {/* CITRA */}
              <td>
              </td>
              {/* SORACHI */}
              <td>
                <span className={styles.hopElement}>
                  <a href={data.PINTA.URL_SORACHI.url}>Lien</a>
                </span>
                <span className={styles.hopElement}>{data.PINTA.URL_SORACHI.price}€</span>
                <span className={styles.hopElement}>{getStatusIcon(data.PINTA.URL_SORACHI.status)}</span>
              </td>
            </tr>
            <tr>
              <th>BIEREAPPRO</th>
              {/* IDAHO */}
              <td>
                <span className={styles.hopElement}>
                  <a href={data.BIEREAPPRO.URL_IDAHO.url}>Lien</a>
                </span>
                <span className={styles.hopElement}>{data.BIEREAPPRO.URL_IDAHO.price}€</span>
                <span className={styles.hopElement}>{getStatusIcon(data.BIEREAPPRO.URL_IDAHO.status)}</span>
              </td>
              {/* MOSAIC */}
              <td>
                <span className={styles.hopElement}>
                  <a href={data.BIEREAPPRO.URL_MOSAIC.url}>Lien</a>
                </span>
                <span className={styles.hopElement}>{data.BIEREAPPRO.URL_MOSAIC.price}€</span>
                <span className={styles.hopElement}>{getStatusIcon(data.BIEREAPPRO.URL_MOSAIC.status)}</span>
              </td>
              {/* CITRA */}
              <td>
                <span className={styles.hopElement}>
                  <a href={data.BIEREAPPRO.URL_CITRA.url}>Lien</a>
                </span>
                <span className={styles.hopElement}>{data.BIEREAPPRO.URL_CITRA.price}€</span>
                <span className={styles.hopElement}>{getStatusIcon(data.BIEREAPPRO.URL_CITRA.status)}</span>
              </td>
              {/* SORACHI */}
              <td>
              </td>
            </tr>
            
          </tbody>
          </table>
        )}
      </main>
    </>
  )
}

