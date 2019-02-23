import React from 'react';

import styles from './Order.module.css';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const order = (props) => {
    return (
        <div className={styles.Order}>
            <h1>Your Order:</h1>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button 
                btnType="Danger"
                onClick={props.checkoutCancelled} >CANCEL</Button>
            <Button 
                btnType="Success"
                onClick={props.checkoutContinued} >SUBMIT</Button>
        </div>
    )
}

export default order;

