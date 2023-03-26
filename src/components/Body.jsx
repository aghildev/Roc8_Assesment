
import React, { useState, useEffect } from 'react';
import { PRODUCTS_API_ENDPOINT } from '../utils/config.jsx';
import { useFetch } from '../utils/hooks/useFetch';
import styles from '../styles/Body.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import Shimmer from "./Shimmer"
import { Link } from 'react-router-dom';


const Body = () => {
    const { data: products, isPending, error } = useFetch(PRODUCTS_API_ENDPOINT);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState(null);

    useEffect(() => {
        const handleSearch = setTimeout(() => {
            setSearchTerm(searchTerm);
        }, 200);

        return () => clearTimeout(handleSearch);
    }, [searchTerm]);

    useEffect(() => {
        if (products && selectedSuggestion) {
            const matchingProduct = products.find(
                (product) => product.title.toLowerCase() === selectedSuggestion.toLowerCase()
            );
            if (matchingProduct) {
                setSearchTerm(matchingProduct.title);
            }
        }
    }, [selectedSuggestion, products]);

    useEffect(() => {
        if (products && searchTerm && !selectedSuggestion) {
            const suggestions = products
                .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((product) => product.title);

            setSearchSuggestions(suggestions);
        } else {
            setSearchSuggestions([]);
        }
    }, [searchTerm, products, selectedSuggestion]);

    const filteredProducts = products
        ? products.filter((product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    return (
        <div className={styles.container}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setSelectedSuggestion(null);
                    }}
                />
                {searchSuggestions.length > 0 && !selectedSuggestion && (
                    <div className={styles.suggestions}>
                        {searchSuggestions.map((suggestion) => (
                            <div
                                key={suggestion}
                                onClick={() => {
                                    setSelectedSuggestion(suggestion);
                                }}
                            >
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {isPending && <Shimmer />}

            {error && <div>{error}</div>}

            {filteredProducts.length === 0 && <div>No products found.</div>}

            <div className={styles.cardsContainer}>
                {filteredProducts.map((product) => {
                    let ratingClass = '';
                    if (product.rating.rate >= 4.4) {
                        ratingClass = styles.green;
                    } else if (product.rating.rate >= 4 && product.rating.rate < 4.4) {
                        ratingClass = styles.orange;
                    } else {
                        ratingClass = styles.red;
                    }

                    return (

                        <Link to={"/products/" + product.id} key={product.id} className={styles.card}>
                            <div key={product.id} >
                                <img src={product.image} alt={product.title} />
                                <div className={styles.cardBody}>
                                    <h3 className={styles.cardTitle}>{product.title}</h3>
                                    <div className={`${styles.cardRating} ${ratingClass}`} style={{ display: "inline" }}>
                                        <FontAwesomeIcon icon={faStar} />
                                    </div>
                                    <span className={styles.cardRatingNumber}>{product.rating.rate.toFixed(1)}</span>
                                    <span className={styles.cardRatingCount}>({product.rating.count}votes)</span>
                                    <h4 className={styles.cardPrice}>{`$${product.price.toFixed(2)}`}</h4>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div >
    );
};
export default Body;
