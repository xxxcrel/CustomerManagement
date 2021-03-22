import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Login from './views/Login';
import ModifyPassword from './views/customer/ModifyPassword';
import CustomerHome from './views/customer/CustomerHome';
import EmployeeHome from './views/employee/EmployeeHome';
import ProductDetails from './views/customer/ProductDetails';
import FeedbackHome from './views/product/FeedbackHome';

const hist = createBrowserHistory();
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/customer" component={CustomerHome} />
      <Route path="/login" component={Login} />
      <Route path="/employee" component={EmployeeHome} />
      <Route path="/updatePassword" component={ModifyPassword} />
      <Route path="/feedback/home" component={FeedbackHome} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>
  , document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
