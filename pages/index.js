import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Featured from '@/components/Featured'
import PizzaList from '@/components/PizzaList'
import axios from 'axios'
import AddButton from '@/components/AddButton'
import Add from '@/components/Add'
import { useState } from 'react'



const inter = Inter({ subsets: ['latin'] })

export default function Home({pizzaList,admin}) {
  const [close,setClose]=useState(true);
  return (
    <>
   
      <Head>   
        <title>Pizza restaurant in Abudhabi</title>
        <meta name="description" content="Best Pizza restaurant in town" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
     
     
     <main className={`${styles.main} ${inter.className}`}>
        <div className={styles.description}>
       
      <Featured />
      {console.log(admin)}
{admin && 
<AddButton  setClose={setClose}/>

}
      <PizzaList pizzaList={pizzaList}/>
      {!close && <Add  setClose={setClose}/>}
        </div>
        
      </main>
      
    </>
  )
}

export const getServerSideProps=async (ctx) =>{
  const mycookie=ctx.req?.cookies || ""
  let admin=false;
  if(mycookie.token === process.env.TOKEN){
    admin=true;
  }
  
//const res=await axios.get("http://localhost:3000/api/products")
const res=await axios.get("https://mern-restaurant-kappa.vercel.app/api/products")
return{
  props: {
    pizzaList:res.data,
    admin
  }
}
}