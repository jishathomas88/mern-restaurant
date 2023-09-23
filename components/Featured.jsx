import React, { useState } from 'react'
import styles from  '../styles/Featured.module.css'
import Image from 'next/image'


function Featured() {

const [index,setIndex]=useState(0);
    const images=[
      '/img/featured1.jpg',
      '/img/featured2.jpg',
      '/img/featured3.jpg'
    ];
    const handleArrow=(direction)=>{
      if(direction==="l"){
      setIndex((index !== 0) ? index-1 : 2)
      }
      else if(direction==="r"){
        setIndex((index !== 2) ? index+1 : 0)
      }
    
    }
    console.log(index);
  return (
       <div className={styles.container}>
        <div className={styles.arrowContainer} style={{left:0}} onClick={()=>
          handleArrow("l")
         
          }>
        <Image src="/img/arrowl.png" layout='fill' alt="" objectFit='contain'></Image>
        </div>
        
        <div className={styles.wrapper} style={{transform:`translateX(${-100*index}vw)`}}>
            
                {
                    images.map((img,ind)=>
                    (
                    <div className={styles.imgContainer} key={{ind}}>
                    <Image src={img} layout='fill' alt="" objectFit='contain' ></Image>
                </div>)
                )
                }
                
       
           
        </div>
        <div className={styles.arrowContainer} style={{right:0}} onClick={()=>handleArrow("r")}>
        <Image src="/img/arrowr.png" layout='fill' objectFit='contain'></Image>
        </div>
         
    </div>  
    
  );
};

export default Featured
