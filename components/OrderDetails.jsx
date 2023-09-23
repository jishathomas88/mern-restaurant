import React from 'react'
import styles from '../styles/OrderDetails.module.css'
import { useState } from 'react';
function OrderDetails({total,createOrder}) {
  const [customer,setCustomer]=useState("");
  const [address,setAddress]=useState("")
  const handleClick=()=>{
   createOrder({customer,address,method:0,total})
  }
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>You will pay ${total} after delivery</h2>
        <div className={styles.item}>
            <label className={styles.label}>Name Surname</label>
            <input onChange={(e)=>setCustomer(e.target.value)} type="text" className={styles.input} placeholder='Name'></input>
           
        
        </div>
        <div className={styles.item}>
            <label className={styles.label}>Phone number</label>
            <input type="text" className={styles.input} placeholder='0565696761'></input>
        </div>
        <div className={styles.item}>
            <label className={styles.label}>Address</label>
            <textarea onChange={(e)=>setAddress(e.target.value)} rows={5} type="text" className={styles.textarea} placeholder='Shabia 10,MBZ'></textarea>
        </div>
        
        <button onClick={handleClick} className={styles.button}>Order</button>
      </div>
    </div>
  )
}

export default OrderDetails
