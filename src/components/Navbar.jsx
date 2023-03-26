import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import styles from '../styles/Navbar.module.css';
import { Link } from 'react-router-dom';
import {  useSelector } from 'react-redux';
const Navbar = () => {


    const totalQuantity = useSelector((store) => store.cart.totalQuantity);
  return (
    <header>
    <nav className={styles.navbar}>
      <h1 className={styles.navbar__title}><Link to ="/" className={styles.navbar__link}>Roc8 Ecommerce</Link></h1>
         
      <div className={styles.navbar__cart}>
      <Link to = "/cart">
        <FaShoppingCart className={styles.navbar__cartIcon} />
        </Link>
        <span className={styles.navbar__cartBadge}>{totalQuantity}</span>
       
      </div>
    </nav>
    </header>
  );
};

export default Navbar;

