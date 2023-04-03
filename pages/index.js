import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react'
import Head from 'next/head'
import Cell from "@/components/cell";
import {Tbody} from "@/components/Tbody";

export default function Home() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [hopNames, setHopNames] = useState([])
  
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/scrape')
      const hops = await response.json()
      setData(hops.data)
      // Si data est fetch on récupère les noms des houblons
      console.log(hops.data, "hops.data")
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  
  const getHopNames = () => {
    const hopNames = Object.keys(data[Object.keys(data)[1]])
    setHopNames(hopNames)
    console.log(hopNames, "hopNames")
  }
  
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      getHopNames()
    }
  }, [data])
  
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
        <button onClick={fetchData} disabled={isLoading} className={styles.fetchButton}>
          {isLoading ? 'Chargement...' : 'Récupérer les données'}
        </button>
        {Object.keys(data).length > 0 && (
          <table className={styles.table}>
            <thead>
            <tr>
              <th></th>
              {/* Crée les noms des sites en th */}
              {
                Object.keys(data).map((key) => (
                  <th key={key}>{key}</th>
                ))
              }
            </tr>
            </thead>
            <tbody>
             {/*Crée les noms des houblons en td*/}
              {hopNames.map((hopName) => (
                <tr key={hopName}>
                  <td>{hopName}</td>
                  {/*Crée les données des houblons en td*/}
                  
                  
                  
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  )
}

