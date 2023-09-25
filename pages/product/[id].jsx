import React, { useState } from 'react'
import styles from '../../styles/Product.module.css'
import Image from 'next/image'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addProduct } from '@/redux/cartSlice';

function Product({pizza}) {
    const [price,setPrice]=useState(pizza.prices[0])
    const [size,setSize]=useState(0);
    const [extras,setExtras]=useState([])
    const [quantity,setQuantity]=useState(1)
    const dispatch=useDispatch()

    const changePrice=(number)=>{
     setPrice(price+number)
    }
const handleSize=(sizeIndex)=>{
const difference=pizza.prices[sizeIndex]-pizza.prices[size]
setSize(sizeIndex)
changePrice(difference)
}
const handleChange=(e,option)=>{
const checked=e.target.checked;
if(checked){
  changePrice(option.price)
  setExtras((prev)=>[...prev,option])
}
else{
  changePrice(-option.price)
  setExtras(extras.filter((extra)=>extra._id !== option._id))
}
 }

 const handleClick=()=>{
 if(quantity>0)
  dispatch(addProduct({...pizza,price,extras,quantity}))
  else return
  
 }
 console.log(extras) 
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.ImgContainer}>
            <Image src={pizza.img} layout="fill" alt="" objectFit='contain'></Image>
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
            <div className={styles.size} onClick={()=>handleSize(0)}>
                <Image src="/img/size.png" alt="" layout="fill"></Image>
                <span className={styles.number}>Small</span>
            </div>
            <div className={styles.size} onClick={()=>handleSize(1)}>
                <Image src="/img/size.png" alt="" layout="fill"></Image>
                <span className={styles.number}>Medium</span>
            </div>
            <div className={styles.size} onClick={()=>handleSize(2)}>
                <Image src="/img/size.png" alt="" layout="fill"></Image>
                <span className={styles.number}>Large</span>
            </div>

        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {
          pizza.extraOptions.map((option)=>(
            <div className={styles.option}>
            <input 
            type="checkbox" 
            id={option.text}
            name={option.text} 
            className={styles.checkbox}
            onChange={(e)=>handleChange(e,option)}
             >
            </input>
            <label htmlFor={option.text}>{option.text}</label>
        </div>
          ))
          }
            
           
        </div>
        <div className={styles.add}>
            <input onChange={(e)=>setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity}></input>
            <button className={styles.cart} onClick={handleClick}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product

export const getServerSideProps=async ({params})=>{
    
    const res=await axios.get(`http://mern-restaurant-j2h6.vercel.app/api/products/${params.id}`)
    return{
        props: {
          pizza:res.data
        }
      }
    
}