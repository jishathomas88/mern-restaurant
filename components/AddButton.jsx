import React from 'react'
import styles from '../styles/Add.module.css'

function AddButton({setClose}) {
  return (
    <div onClick={()=>setClose(false)} className={styles.mainAddButton}>
      Add Button
    </div>
  )
}

export default AddButton
