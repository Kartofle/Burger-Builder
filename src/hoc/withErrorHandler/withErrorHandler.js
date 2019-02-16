import React, { Component, Fragment } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        state = {
            error: null
        }

        componenetWillMount () {
            axios.reqInterceptor = axios.interceptor.request.use(req => {
                this.setState({error: null}); 
                return req;
            });
            axios.resInterceptors = axios.interceptor.response.use(res => res, error => {
                this.setState({error: error});            
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({error: null});
        }

        render () {
            return (
                <Fragment>
                    <Modal 
                        shown={this.state.error}
                        hideModal={this.errorConfirmedHandler}>
                       {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Fragment>
            );
        }
    }
}

export default withErrorHandler;