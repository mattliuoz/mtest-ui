import React from 'react';
import AddCustomerForm from './AddCustomerForm';
import { Button } from 'antd';
import { Redirect } from 'react-router-dom'

class AddCustomerPage extends React.Component {
    state = {
        redirect: false
    }
    setRedirect = () => {
        this.setState({
            redirect: true
        });
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/top5' />
        }
    }
    render() {
        return <div>
            {this.renderRedirect()}
            <Button type="primary" onClick={this.setRedirect}>Show Top 5</Button>
            <br></br>
            <span>Add a new customer</span>
            <AddCustomerForm />

        </div>
    }
}

export default AddCustomerPage;