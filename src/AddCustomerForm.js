import React from 'react';
import {
    Form, Input, DatePicker, Button, message
} from 'antd';
import 'antd/dist/antd.css';
import moment from 'moment';
import CustomersList from './CustomersList';
import { getCustomers, addCustomer } from './CustomerService';


class AddCustomerForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading: false
    };
    constructor(props) {
        super(props);
        this.state = {
            data: null
        };
    }
    refreshList = () => {
        getCustomers("orderby=id&orderbydirection=desc&page=1&RecordsPerPage=100").then(res => {
            if (res.isSuccess) {
                const data = res.data;
                this.setState({ data })

            } else {
                const error = res.data;
                message.error(`Failed to list customers: ${error.ErrorMessage}`);
            }
        })

    }
    componentDidMount() {
        this.refreshList();
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ loading: true });
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let dob = values.dob.toDate();
                dob.setHours(dob.getHours() - dob.getTimezoneOffset() / 60);
                values.dob = dob;
                addCustomer(values).then(res => {
                    if (res.isSuccess) {
                        message.success(`Customer(custCode: ${res.data.custCode}) is added`, 10);
                        this.refreshList();
                    }
                    else {
                        const error = res.data;
                        message.error(`Failed to add customer: ${error.errorMessage}`);
                    }
                });
            }
            this.setState({ loading: false });
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const firstNameConfig = {
            rules: [{ required: true, message: 'First name is required.' }],
        };

        const lastNameConfig = {
            rules: [{ required: true, message: 'Last name is required.', whitespace: true }],
        };

        const dateFormat = 'DD/MM/YYYY';

        const dobConfig = {
            initialValue: moment('01/01/1980', dateFormat),
            rules: [{ type: 'object', required: true, message: 'Date of birth is required.' }],
        };

        const emailConfig = {
            rules: [{
                type: 'email', message: 'E-mail invalid.',
            }, {
                required: true, message: 'E-mail is required.',
            }],
        };


        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item
                        {...formItemLayout}
                        label="First Name"
                    >
                        {getFieldDecorator('firstName', firstNameConfig)(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Last Name"
                    >
                        {getFieldDecorator('lastName', lastNameConfig)(
                            <Input />
                        )}
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Date of birth"
                    >
                        {getFieldDecorator('dob', dobConfig)(

                            <DatePicker format={dateFormat} />
                        )}
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        label="E-mail"
                    >
                        {getFieldDecorator('email', emailConfig)(
                            <Input />
                        )}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" loading={this.state.loading} htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
                <CustomersList data={this.state.data}></CustomersList>
            </div>

        );
    }
}

export default Form.create()(AddCustomerForm);
