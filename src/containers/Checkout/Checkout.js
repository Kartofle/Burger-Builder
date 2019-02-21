import React, { Component } from 'react';

import Order from '../../components/Order/Order';

class Checkout extends Component {
    state = {
        ingredients: {
            lettuce: 1,
            bacon: 1,
            cheese: 1,
            patty: 1
        }
    }

    render () {
        return (
            <div>
                <Order ingredients={this.state.ingredients} />
            </div>
        );
    }
}

export default Checkout;