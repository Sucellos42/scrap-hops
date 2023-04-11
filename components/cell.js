import styles from "@/styles/Home.module.css";

export default function Cell({ hopData }) {
  const getStatusIcon = (status) => {
    return status === true ? '🟢' : '🔴'
  }
  
  const isEmpty = (obj) => {
    return !Object.keys(obj).length
  }
  
  return (
    <td>
      {isEmpty(hopData) ? (
        <p>Non récupéré</p>
      ) : (
        <>
          {hopData.url === "" ? (
            <span>🔴</span>
            ) : (
              <>
                <span className={styles.hopElement}>
                  <a href={hopData.url}>Lien</a>
                </span>
                <span className={styles.hopElement}>{hopData.price}€</span>
                <span className={styles.hopElement}>{getStatusIcon(hopData.status)}</span>
              </>
            )}
        </>
        )}
    </td>
    // <td>
    //   {isEmpty(hopData) ? (
    //     <p>Non récupéré</p>
    //   ) : (
    //     <>
    //       <span className={styles.hopElement}>
    //         <a href={hopData.url}>Lien</a>
    //       </span>
    //       <span className={styles.hopElement}>{hopData.price}€</span>
    //       <span className={styles.hopElement}>{getStatusIcon(hopData.status)}</span>
    //     </>
    //
    //   )
    //   }
    // </td>
  )
}
