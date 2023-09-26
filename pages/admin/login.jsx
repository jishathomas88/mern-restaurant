import React from 'react'
import styles from '../../styles/Login.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'

function login() {
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);
    const [error,setError]=useState(false);
    const router=useRouter();
    const handleClick=async()=>{
        try{
            await axios.post("http://mern-restaurant-j2h6.vercel.app/api/login",{
                username,
                password
             })
             router.push('/admin')

        }catch(err){
            setError(true);
            console.log(err);
        }
    
    }
  return (
    <div className={styles.container}>
        <div className={styles.wrapper}>
             <h1 className={styles.title}>Admin Dashboard</h1>
             
             <input
             placeholder='Username'
             type="text"
             className={styles.input}
             onChange={(e)=>setUsername(e.target.value)}
             ></input>
              
             <input
             placeholder='Password'
             type="password"
             className={styles.input}
             onChange={(e)=>setPassword(e.target.value)}
             ></input>
             <button onClick={handleClick} className={styles.button}>Sign In</button>
             {error && <span className={styles.error}>Wrong Credentials!</span>}
        </div>
      
    </div>
  )
}

export default login
