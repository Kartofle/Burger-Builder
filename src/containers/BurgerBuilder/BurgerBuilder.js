import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        // axios.get('https://react-my-burger-app-1077.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState( { ingredients: response.data } );
        //     })
        //     .catch(error => {
        //         this.setState( { error: true } );
        //     });
    }

    isPurchasable (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => { 
            return ingredients[igKey];
        }).reduce( (sum, el) => { 
            return sum + el 
        }, 0);
            return sum > 0;
    }

    purchasingHandler = () => {
        this.setState({purchasing: true});
    }

    cancelPurchaseHandler = () => {
        this.setState({purchasing: false});
    }

    toCheckoutHandler = () => {
        this.props.history.push('/checkout');
    }

    render () {
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
        
        if ( this.props.ings ) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ingredientDisabled={disabledInfo} 
                        price={this.props.price} 
                        ordered={this.purchasingHandler}
                        purchasable={this.isPurchasable(this.props.ings)}/>
                </Fragment>
            );
            orderSummary = <OrderSummary 
                ingredients={this.props.ings}
                price={this.props.price}
                cancelPurchase={this.cancelPurchaseHandler}
                checkout={this.toCheckoutHandler} /> 
        }
        if ( this.state.loading ) {
            orderSummary = <Spinner />;
        }
        return (
            <Fragment>
                <Modal shown={this.state.purchasing} hideModal={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName}),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler( BurgerBuilder, axios ));