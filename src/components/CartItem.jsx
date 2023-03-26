import React from 'react';
import styles from "../styles/Cart.module.css";
export default function CartItem({item, onAdd, onRemove}) {
  return (
    <div className={styles.cartDetails}>
       <div className={styles.leftCart}>
        <img src={item.image} alt="" />
        <h2>{item.title}</h2>
      </div>
      <div className={styles.quantityContainer}>
          <button onClick={onRemove}>-</button>
          <button>{item.quantity}</button>
          <button onClick={onAdd}>+</button>
        </div>
    </div>
  )
}