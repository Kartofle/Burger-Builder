import React from 'react';

import styles from './Order.module.css'

const order = (props) => {
    const ingredients = [];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    const ingredientOutput = ingredients.map(ig => {
        return <span className={styles.Ingredients} key={ig.name}>{ig.amount} {ig.name}</span>;
    });

    return (
        <div className={styles.Order}>
            <p><strong>Burger Order:</strong></p>
            <div className={styles.Grid}>
                {ingredientOutput}
            </div>
            <p><strong>${props.price.toFixed(2)}</strong></p>
        </div>
    )
    
}

export default order;