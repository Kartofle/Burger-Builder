import React, { Component, Fragment } from 'react';

import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            bacon: 1,
            cheese: 2,
            patty:2,
        }
    }

    render () {
        return (
            <Fragment>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build Controls</div>
            </Fragment>
        );
    }
}

export default BurgerBuilder;