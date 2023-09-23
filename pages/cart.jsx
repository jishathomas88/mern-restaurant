import React, { useState } from 'react'
import styles from '../styles/Cart.module.css'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
    FUNDING
} from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';
import axios from 'axios'
import { reset } from '@/redux/cartSlice';
import OrderDetails from '@/components/orderDetails';

// This values are the props in the UI



function cart() {
    const [open,setOpen]=useState(false);
    const cart=useSelector(state=>state.cart);
    const dispatch=useDispatch();
    const router=useRouter();
    const [cash,setCash]=useState(false);

    const createOrder=async (data)=>{
        try{
            const res=await axios.post(`http://localhost:3000/api/orders`,data);
            res.status===201 && router.push(`/orders/${res.data._id}`)
            dispatch(reset());
        }catch(err){
            console.log(err)
        }
        

    }

    const amount = cart.total;
   const currency = "USD";
   const style = {"layout":"vertical"};

   const ButtonWrapper = ({ currency, showSpinner }) => {
    // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
    // This is the main reason to wrap the PayPalButtons in a new component
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency,
            },
        });
    }, [currency, showSpinner]);


    return (<>
            { (showSpinner && isPending) && <div className="spinner" /> }
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function (details) {
                        createOrder({customer:details.purchase_units[0].shipping.name.full_name,address:details.purchase_units[0].shipping.address.address_line_1,total:cart.total,method:1})

                    }); 
                }}
            />
        </>
    );
}

  return (
    <div className={styles.container}>

        <div className={styles.left}>
            <table className={styles.table}>
                 <thead>
                    <tr className={styles.trTitle}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th> 
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                         cart.products.map((product)=>(
                            <tr key={product._id} className={styles.tr}>
                            <td>
                                <div className={styles.imgContainer}>
                                    <Image src={product.img} alt="" layout="fill" objectFit='contain'></Image>
                                </div>
                            </td>
                            <td>
                                <span className={styles.name}>{product.title}</span>
                            </td>
                            <td>
                                {
                                  product.extras.map((extra)=>(
                                    <span key={extra._id} className={styles.extras}>{extra.text}</span>
                                  ))  
                                }
                                
                            </td>
                            <td>
                                <span className={styles.price}>{product.price}</span>
                            </td>
                            <td>
                                <span className={styles.quantity}>{product.quantity}</span>
                            </td>
                            <td>
                                <span className={styles.total}>{product.price * product.quantity}</span>
                            </td>
                        </tr>
                         ))   
                        }
                        
                    
                    </tbody>
                   
            </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Subtotal: </b>${cart.total}
                    </div>
                    <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Discount: $0.00</b>
                    </div>
                    <div className={styles.totalText}>
                    <b className={styles.totalTextTitle}>Total:</b>${cart.total}
                    </div>
                      
                       {
                        open ? (
                            <div className={styles.paymentMethods}> 
                            <button className={styles.payButton} onClick={()=>setCash(true)}>CASH ON DELIVERY</button>
                            <PayPalScriptProvider
                        options={{
                            "client-id": "AVrb53K2qTnpAGsjhHCZnlzltyt6SdGJOzYRcKiqj1UJGH63P0C9KamvriAHpk0dwKb5mFkXcRi9kwec",
                            components: "buttons",
                            currency: "USD",
                            "disable-funding": "credit,card,p24"
                        }}
                    >
                        <ButtonWrapper
                            currency={currency}
                            showSpinner={false}
                        />
                    </PayPalScriptProvider>
                    </div>) :
                    <button onClick={()=>setOpen(true)} className={styles.button}>CHECKOUT NOW!</button>
                   
                    }
                
                    
                    
                </div>

            </div>
            
               {
               cash && (
                <OrderDetails total={cart.total} createOrder={createOrder}/>
               )} 
            
      
            
        </div>
       
    
  )
}

export default cart
