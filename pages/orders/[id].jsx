import React from 'react'
import Image from 'next/image'
import styles from '../../styles/Order.module.css'
import axios from 'axios';

function Order({order}) {
  console.log(order);
  const status=order.status;
  const statusClass=(index)=>{
    if(index-status < 1) return styles.done;
     if(index-status === 1) return styles.inProgress
    if(index-status > 1) return styles.undone
  }
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
        
            <table className={styles.table}>
                <thead>
                    <tr className={styles.trTitle}>
                        <th>Order Id</th>
                        <th>Customer</th>
                        <th>Address</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className={styles.tr}>
                        <td>
                        <span className={styles.id}>{order._id}</span>
                        </td>
                        <td>
                            <span className={styles.name}>{order.customer}</span>
                        </td>
                        <td>
                            <span className={styles.address}>{order.address}</span>
                        </td>
                        
                        <td>
                            <span className={styles.total}>${order.total}</span>
                        </td>
            
                    </tr>
                    </tbody>
                    </table>
        
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <Image  src="/img/paid.png" width={30} height={30} alt=""></Image>
            <span>Payment</span>
            <div className={styles.checkedIcon}>
            <Image src="/img/checked.png" width={20} height={20} alt=""></Image>
          </div>
          </div>
          <div className={statusClass(1)}>
            <Image src="/img/bake.png" width={30} height={30} alt=""></Image>
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
            <Image src="/img/checked.png" width={20} height={20} alt=""></Image>
          </div>
          </div>
          <div className={statusClass(2)}>
            <Image src="/img/bike.png" width={30} height={30} alt=""></Image>
            <span>On the way</span>
            <div className={styles.checkedIcon}>
            <Image src="/img/checked.png" width={20} height={20} alt=""></Image>
          </div>
          </div>
          <div className={statusClass(3)}>
            <Image src="/img/delivered.png" width={30} height={30} alt=""></Image>
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
            <Image src="/img/checked.png" width={20} height={20} alt=""></Image>
          </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
      <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal:</b>&{order.total}
                    </div>
                    <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount:</b>&00.00
                    </div>
                    <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>&{order.total}
                    </div>
                    <button className={styles.button}>PAID</button>
                </div>

      </div>
    </div>
  )
}
export const getServerSideProps=async ({params}) =>{
  const res=await axios.get(`http://mern-restaurant-j2h6.vercel.app/api/orders/${params.id}`)
  return{
   props:{order:res.data}   
   
  }

}


export default Order

