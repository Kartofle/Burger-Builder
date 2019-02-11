import React, { Fragment } from 'react';

import styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <Fragment>
        <Backdrop shown={props.shown} clicked={props.hideModal} />
        <div className={styles.Modal}
            style={{
                transform: props.shown ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.shown ? '1' : '0'
            }}>
            {props.children}
        </div>
    </Fragment>
);

export default modal;