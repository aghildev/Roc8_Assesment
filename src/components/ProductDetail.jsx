import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../utils/hooks/useFetch';
import { PRODUCTS_API_ENDPOINT } from '../utils/config';
import styles from "../styles/ProductDetails.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../utils/cartSlice';
import Shimmer from './Shimmer';

export default function ProductDetail() {
    const { id } = useParams();
    const { data } = useFetch(PRODUCTS_API_ENDPOINT + id);
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);

    const handleAddItem = (item) => {
        dispatch(addItem(item));
    };

    const handleRemoveItem = (itemId) => {
        dispatch(removeItem(itemId));
    };

    const getAddedItemCount = (itemId) => {
        let count = 0;
        cartItems.forEach((item) => {
            if (item.id === itemId) {
                count += item.quantity;
            }
        });
        return count;
    };

    const isAddedToCart = (itemId) => {
        return getAddedItemCount(itemId) > 0;
    };

    return (!data) ? <Shimmer /> : (
        <div className={styles.product_details_container}>
            <div className={styles.product_img}>
                <img src={data.image} alt="" />
            </div>
            <div className={styles.product_info}>
                <h1 className={styles.product_title}>{data.title}</h1>
                <h2 className={styles.product_category}>Category: <b> {data.category}</b></h2>
                <p className={styles.product_description}>{data.description}</p>
                <p className={styles.product_price}> $<span>{data.price}/-</span></p>
                <h5 className={(data?.rating?.rate > 4) ? styles.infoItemTop : styles.infoItemPoor}><i className="fa-solid fa-star" style={{ color: "white", fontSize: ".7rem" }}></i> {data?.rating?.rate}</h5>
                <h5 className={styles.infoItem}>Rating Count: {data?.rating?.count}</h5>
                {isAddedToCart(data?.id) ? <button className={styles.Product_info_addedBtn} disabled>Added To Cart</button> : <button className={styles.product_info_btn} onClick={() => handleAddItem(data)}>Add</button>}
                {cartItems.map((item) => {
                    if (item.id === data.id) {
                        return (
                            <div className={styles.quantityContainer}>
                                <button className={styles.quantityButton} onClick={() => handleRemoveItem(item.id)}>-</button>
                                <button className={styles.quantityButton}>{getAddedItemCount(item.id)}</button>
                                <button className={styles.quantityButton} onClick={() => handleAddItem(data)}>+</button>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}
