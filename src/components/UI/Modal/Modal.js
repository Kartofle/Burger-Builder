import React, { Fragment, Component } from 'react';

import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {

    shouldComponentUpdate ( nextProps, nextState ) {
        return nextProps.show !== this.props.show || nextProps.children != this.props.children;
    }    

    render () {
        return (
            <Fragment>
                <Backdrop 
                    shown={this.props.shown} 
                    clicked={this.props.hideModal} />
                <div 
                    className={styles.Modal}
                    style={{
                        transform: this.props.shown ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.shown ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Fragment>
        );
    }
}

export default Modal;