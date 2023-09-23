import Image from 'next/image'
import React from 'react'
import styles from '../styles/PizzaCard.module.css'
import Link from 'next/link'

function PizzaCard({pizza}) {
  return (
    <div className={styles.container}>
      <Link href={`/product/${pizza._id}`}>
        <Image src={pizza.img} width="100" height="100" alt=""></Image>
        </Link>
      <h1 className={styles.title}>{pizza.title}</h1>
      <span className={styles.price}>${pizza.prices[0]}</span>
      <p className={styles.desc}>{pizza.desc}</p>
    </div>
  )
}

export default PizzaCard
