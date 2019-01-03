import React from 'react';
import CustomersList from './CustomersList';
import { Button, Spin, message} from 'antd';
import { Redirect } from 'react-router-dom'
import getCustomers from './CustomerService';

class CustomersListPage extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
          data: null,
          redirect: false

        };
      }
     
    setRedirect = () => {
        this.setState({
            redirect: true
        })
    }
    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }
    componentDidMount() {

        getCustomers("").then(res=>{
            if(res.isSuccess)
            {
                const data = res.data;
                this.setState({ data })

            }else{
                const error = res.data;
                message.error(`Failed to list customers: ${error.ErrorMessage}`);
            }
        })
    };

    render() {
        let list = null;
        if (this.state.data) {
            return <div>
                {this.renderRedirect()}
                <span>The Top 5 Oldest Customers(sort by last name) </span>
                <CustomersList data={this.state.data}></CustomersList>
                <Button type="primary" onClick={this.setRedirect}>Add</Button>

            </div>
        }
        else {
            return <Spin size="large" />
        }
        
    }
}

export default CustomersListPage;