import styles from '@/styles/Home.module.css'
import {useEffect, useState} from 'react'
import Head from 'next/head'
import Cell from "@/components/cell";

export default function Home() {
  const [data, setData] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [hopNames, setHopNames] = useState([])
  const [sitesNames, setSitesNames] = useState([])
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  
  
  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/scrape')
      const hops = await response.json()
      setData(hops.data)
      // Si data est fetch on récupère les noms des houblons
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }
  
  const getHopNames = () => {
    const hopNames = Object.keys(data[Object.keys(data)[1]])
    setHopNames(hopNames)
  }
  
  const getSitesNames = () => {
    const names = Object.keys(data)
    setSitesNames(names)
  }
  
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      getHopNames()
      getSitesNames()
    }
    console.log(data, "data from useEffect")
  }, [data])
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSecondsElapsed(prevSecondsElapsed => prevSecondsElapsed + 10);
      console.log(`Il s'est écoulé ${secondsElapsed} secondes depuis le dernier message en console.log.`);
    }, 1200000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [secondsElapsed]);
  
  
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
                sitesNames.map((siteName) => (
                  <th key={siteName}>{siteName}</th>
                ))
              }
            </tr>
            </thead>
            <tbody>
             {/*Crée les noms des houblons en td*/}
              {hopNames.map((hopName) => (
                <tr key={hopName}>
                  <th>{hopName}</th>
                {/*  récupérer la donnée correspondant au houblon pour chaque sites */}
                  {sitesNames.map((siteName) => (
                      <Cell key={siteName+hopName} hopData={data[siteName][hopName]}/>
                    )
                  )}
                  
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </>
  )
}

