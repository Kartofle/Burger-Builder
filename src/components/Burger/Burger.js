import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import styles from './Burger.module.css';

const burger = ( props ) => {
    return (
        <div className={styles.Burger}>
            <BurgerIngredient type='bun-top'/>
            <BurgerIngredient type='lettuce'/>
            <BurgerIngredient type='bacon'/>
            <BurgerIngredient type='cheese'/>
            <BurgerIngredient type='patty'/>
            <BurgerIngredient type='bun-bottom'/>
        </div>
    );
};

export default burger;