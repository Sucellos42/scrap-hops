import styles from "@/styles/Home.module.css";

export default function Cell(data) {
  
  const getStatusIcon = (status) => {
    return status === true ? '🟢' : '🔴'
  }
  
  return (
    <td>
      {data ? (
        <p>Non récupéré</p>
      ) : (
        <>
          <span className={styles.hopElement}>
            <a href={data.url}>Lien</a>
          </span>
          <span className={styles.hopElement}>{data.price}€</span>
          <span className={styles.hopElement}>{getStatusIcon(data.status)}</span>
        </>
    
      )
      }
    </td>
  )
}
