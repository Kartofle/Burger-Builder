import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const burger = ( props ) => {
    let toppings = Object.keys( props.ingredients ).map( igKey => {
        return [...Array( props.ingredients[igKey])].map(( _, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if ( toppings.length === 0 ) {
        toppings = <p>Please start adding ingredients.</p>;
    }
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type='bun-top'/>
            {toppings}
            <BurgerIngredient type='bun-bottom'/>
        </div>
    );
};

export default burger;