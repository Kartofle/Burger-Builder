import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    lettuce: 0.25,
    bacon: 1.00,
    cheese: 0.75,
    patty: 1.50
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 0,
            bacon: 0,
            cheese: 0,
            patty: 0
        },
        totalPrice: 4.00,
        purchasable: false,
        purchasing: false
    }

    isPurchasableHandler (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => { 
            return ingredients[igKey];
        }).reduce((sum, el) => { return sum + el }, 0);
        this.setState({ purchasable: sum > 0 })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.isPurchasableHandler(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) { 
            return; 
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount; 
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.isPurchasableHandler(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    toCheckoutHandler = () => {
        alert('Proceeding to Checkout');
    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <Fragment>
                <Modal shown={this.state.purchasing} hideModal={this.cancelPurchaseHandler}>
                    <OrderSummary 
                        ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        cancelPurchase={this.cancelPurchaseHandler}
                        checkout={this.toCheckoutHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    ingredientDisabled={disabledInfo} 
                    price={this.state.totalPrice} 
                    ordered={this.purchasingHandler}
                    purchasable={this.state.purchasable}/>
            </Fragment>
        );
    }
}

export default BurgerBuilder;