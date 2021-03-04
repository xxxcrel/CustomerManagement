import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserHistory } from 'history';
import { Route, Router, Switch, Redirect } from 'react-router-dom';
import Login from './views/Login';
import EmpoloyeemManagement from './views/EmployeeManagement';
import ModifyPassword from './views/ModifyPassword';

const hist = createBrowserHistory();
ReactDOM.render(
  // <React.StrictMode>
  <Router history={hist}>
    <Switch>
      <Route path="/customer" component={App} />
      <Route path="/login" component={Login} />
      {/* <Route path="/admin-login" component={AdminLogin} /> */}
      <Route path="/manager" component={EmpoloyeemManagement} />
      <Route path="/updatePassword" component={ModifyPassword} />
      <Redirect from="/" to="/login" />
    </Switch>
  </Router>
  // </React.StrictMode>,
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
