import React, { Component } from 'react';

import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: '',
        },
        loading: false
    }

    orderHandler = (event) => {
        this.setState( { loading: true } );
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            name: '',
            email: '',
            address: {
                street: '',
                zipCode: '',
            }
        }
        axios.post('/orders.json', order)
            .then(response => { 
                this.setState({ loading: false });
                this.props.history.push('/'); 
            } )
            .catch(error => { 
                this.setState({ loading: false });
            } );
    }

    render () {
        let form = ( 
            <form>
                <input className={styles.Input}type="text" name="name" placeholder="Your Name" />
                <input className={styles.Input}type="email" name="email" placeholder="Your Email" />
                <input className={styles.Input}type="text" name="street" placeholder="Street Address" />
                <input className={styles.Input}type="text" name="zipCode" placeholder="Zip-Code" />
                <Button btnType="Success" clicked={this.orderHandler}> ORDER </Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact information.</h4>
               {form}
            </div>
        );
    }
}

export default ContactData;