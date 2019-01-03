import React from 'react';
import 'antd/dist/antd.css'; 

import { Table } from 'antd';

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name'
},
{
  title: 'Email',
  dataIndex: 'email',
  key: 'email',
},
{
  title: 'DOB',
  dataIndex: 'dob',
  key: 'dob',
},
{
  title: 'CustCode',
  dataIndex: 'custCode',
  key: 'custCode',
}
];

const customersList = props => {
    return (
        <Table columns={columns} dataSource={props.data} />
    );
};

export default customersList;