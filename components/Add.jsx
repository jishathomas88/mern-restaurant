import React from 'react'
import styles from '../styles/Add.module.css'
import { useState } from 'react';
import axios from 'axios';

function Add({setClose}) {
    const [file,setFile]=useState(null);
    const [title,setTitle]=useState(null);
    const [desc,setDesc]=useState(null);
    const [prices,setPrices]=useState([]);
    const [extra,setExtra]=useState(null);
    const [extraOptions,setExtraOptions]=useState([]);
    const changePrice=(e,index)=>{
    const currentPrices=prices;
    currentPrices[index]=e.target.value;
    setPrices(currentPrices)
    }
    const handleExtraInput=(e)=>{
      setExtra({...extra,[e.target.name]:e.target.value})

    }
    const handleExtra=()=>{
      setExtraOptions((prev)=>[...prev,extra])
    }
    const handleCreate=async ()=>{
      const data=new FormData();
      data.append("file",file)
      data.append("upload_preset","uploads")
      try{
        const uploadRes=await axios.post("https://api.cloudinary.com/v1_1/dmyqfe2w0/image/upload",data)
        console.log(uploadRes);
        const {url}=uploadRes.data;
        const newProduct={
          title,
          desc,
          prices,
          extraOptions,
          img:url
        }
        const res=await axios.post("http://localhost:3000/api/products",newProduct)
      }catch(err){

      }


    }
  return (
    <div className={styles.container}>
    <div className={styles.wrapper}>
      <span onClick={()=>setClose(true)} className={styles.close}>X</span>
      <h1>Add a new Pizza</h1>
      <div className={styles.item}>
        <label className={styles.label}>Choose an image</label>
        <input type="file" onChange={(e)=>setFile(e.target.files[0])}></input>
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Title</label>
        <input type="text" className={styles.input} onChange={(e)=>setTitle(e.target.value)}></input>
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Description</label>
        <textarea rows={4} type="text" onChange={(e)=>setDesc(e.target.value)} />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Prices</label>
        <div className={styles.priceContainer}>
        <input type="number"
        className={`${styles.input} ${styles.inputSm}`}
        placeholder="small"
        onChange={(e)=>changePrice(e,0)}
        ></input>
        <input type="number"
        className={`${styles.input} ${styles.inputSm}`}
        placeholder="medium"
        onChange={(e)=>changePrice(e,1)}
        ></input>
        <input type="number"
        className={`${styles.input} ${styles.inputSm}`}
        placeholder="large"
        onChange={(e)=>changePrice(e,2)}
        ></input>
        </div>
        </div>
        <div className={styles.item}>
          
        <label className={styles.label}>Extra</label>
        <div className={styles.extra}>
        <input type="text"
        className={`${styles.input} ${styles.inputSm}`}
        placeholder="Item"
        name="text"
        onChange={handleExtraInput}
        ></input>
        <input type="number"
        className={`${styles.input} ${styles.inputSm}`}
        placeholder="Price"
        name="price"
        onChange={handleExtraInput}
        ></input>
        <button className={styles.addButton} onClick={handleExtra}>Add</button>
        </div>
        </div>
        <div className={styles.extraItems}>
          {
            extraOptions.map((option)=>(
              <span key={option.text} className={styles.extraItem}>{option.text}</span>
            ))
          }
        </div>
        <div className={styles.item}>
          <button className={styles.createButton} onClick={handleCreate}>Create</button> 
        </div>
    </div>
    </div>
  )
}

export default Add
