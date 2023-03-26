import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import CartItem from "./CartItem";
import {clearCart, addItem, removeItem} from '../utils/cartSlice';
import styles from "../styles/Cart.module.css";
import { Link } from 'react-router-dom';
export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const totalQuantity = useSelector((store) => store.cart.totalQuantity);
  const totalAmount = useSelector((store) => store.cart.totalAmount);
  const handleClearCart = () => {
    dispatch(clearCart());
};
const handleAddItem = (item) => {
    dispatch(addItem(item));
};
const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
};
  return (
    <div className={styles.cartPage}>
            <div className={styles.cartItemContainer}>
                <h1>Cart Items</h1>
                <div className={styles.clearCart}>
                    <button onClick={() => handleClearCart()} className={styles.clearCartBtn}>Clear Cart</button>
                </div>
                <div className={styles.cartDetailContainer}>
                    {cartItems.length? cartItems.map((item) => (
                        <CartItem
                            key={item?.id}
                            item = {item}
                            onAdd={() => handleAddItem(item)}
                            onRemove={() => handleRemoveItem(item?.id)}
                        />
                    )) :
                    <div className={styles.emptycart}>
                        <Link to="/"><button className={styles.restaurantNearBtn}>SEE ALL PRODUCTS</button></Link>
                    </div>
                     }
                </div>
                <div className={styles.cartSummary}>
                    <p>Total Items: <b> {totalQuantity} </b></p>
                    <p>Total Amount :<b> ${totalAmount.toFixed(2)}</b></p>
                </div>
                <div className={styles.paymentBtnContainer}>
                <p>Total Bill:<b> ${totalAmount.toFixed(2)}</b></p>
              
                </div>
            </div>
            </div>
  )
}