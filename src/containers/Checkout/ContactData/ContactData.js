import React, { Component } from 'react';

import styles from './ContactData.module.css'
import Button from '../../../components/UI/Button/Button';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: '',
        }
    }

    render () {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your contact information.</h4>
                <form>
                    <input type="text" name="name" placeholder="Your Name" />
                    <input type="email" name="email" placeholder="Your Email" />
                    <input type="text" name="street" placeholder="Street Address" />
                    <input type="text" name="zipCode" placeholder="Zip-Code" />
                    <Button btnType="Success"> ORDER </Button>
                </form>
            </div>
        );
    }
}

export default ContactData;