import React from 'react';
import {Route, Switch} from 'react-router-dom';
import CustomersListPage from './CustomersListPage';
import AddCustomerPage from './AddCustomerPage';


import AppliedRoute from './components/AppliedRoute';

export default ({childProps}) => (
  <Switch>
    <AppliedRoute path="/" exact component={AddCustomerPage}  />
    <AppliedRoute path="/top5" exact component={CustomersListPage}  />

    
  </Switch>
);