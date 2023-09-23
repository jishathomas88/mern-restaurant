import React from 'react'
import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'

function PizzaList({pizzaList}) {
  return (
    <div className={styles.container} >
      <h1 className={styles.title}>THE BEST PIZZA IN TOWN</h1>
      <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis,
       quam nihil sint ex accusantium quo ad quisquam natus non placeat eaque voluptas ipsa itaque 
       aperiam eligendi commodi reprehenderit dolorum fugiat!
      </p>
      <div className={styles.wrapper}>
        {pizzaList.map((pizza)=>(
          <PizzaCard key={pizza._id} pizza={pizza}/>
         ))}     
       
       
      </div>
    </div>
  )
}

export default PizzaList
