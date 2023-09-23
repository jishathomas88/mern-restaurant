import React from 'react'
import styles from '../styles/Footer.module.css'
import Image from 'next/image';

function Footer() {
  return (
    
    <div className={styles.container} >
      <div className={styles.item}>
        
        <Image src="/img/bg.png" alt="" layout="fill" objectFit='cover'></Image>
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
           <h2  className={styles.motto}>
              OH!YES ,WE DID .THE LAMA PIZZA,WELL BAKED SLICE OF PIZZA.
           </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            <br />
           Building no:P-136
           <br />Mussaffa,
           <br />Shabiya 10
           <br />Abudhabi
          </p>
          <p className={styles.text}>
            <br />
           Building no:P-136
           <br />Mussaffa,
           <br />Shabiya 10
           <br />Abudhabi
          </p>
          <p className={styles.text}>
            <br />
           Building no:P-136
           <br />Mussaffa,
           <br />Shabiya 10
           <br />Abudhabi
          </p>
            </div>
        <div className={styles.card}>
        <h1 className={styles.title}>WORKING HOURS</h1>
            <p className={styles.text}>
              <br />
             Monday until Friday
             <br /> 10.00am - 10.00pm
             <br />
            </p>
            <p className={styles.text}>
              <br />
             saturday-sunday
             <br /> 10.00am - 12.00pm
            </p>
        </div>
      
      </div>
    </div>
    
  );
};

export default Footer
