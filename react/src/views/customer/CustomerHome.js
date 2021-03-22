import Sidebar from '../../components/SideBar';
import Home from "./Statistics";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, IconButton, Button, Typography, Avatar } from '@material-ui/core';
import styles from "../../assets/jss/components/appStyle";
import ContactUs from './ContactUs';
import EmployeeDetail from './EmployeeDetails';
import AddCustomer from './AddCustomer';
import AllCustomer from './AllCustomer';
import AllProduct from './AllProduct';
import ProductDetails from './ProductDetails';

const routes = [
  {
    path: "/customer/statistics",
    exact: true,
    sidebar: "客户统计",
    main: Home
  },
  {
    path: "/customer/all",
    sidebar: "所有客户",
    main: AllCustomer
  },
  {
    path: "/customer/add",
    sidebar: "添加客户",
    main: AddCustomer
  },
  {
    path: "/customer/porduct",
    sidebar: "产品列表",
    main: AllProduct
  },
  {
    path: "/customer/contact-us",
    sidebar: "商业合作",
    main: ContactUs
  },

]
const useStyles = makeStyles(styles);

let info;

export default function CustomerHome(props) {

  console.log(props);
  if (props.location.state != null) {

    info = props.location.state;

  }

  const classes = useStyles();

  return (
    <div className={classes.wrapper}>

      <div className={classes.sidebar}>
        <Sidebar
          title="客户管理中心"
          routes={routes}
          color="#5FA3E7"
        />
      </div>


      <div className={classes.mainPanel}>
        <AppBar className={classes.appBar} position="relative">
          <Toolbar className={classes.container}>
            <Typography style={{ flexGrow: "1" }} />
            <Link to={{ pathname: "/customer/employeeDetails", state: info }}>
              <Avatar src={info.avatarUrl} alt="登入" />
            </Link>
            <Link to="/login" style={{ textDecoration: "none", marginLeft: 20 }}>
              <Button style={{ backgroundColor: "red", color: "white", width: 50, height: 30 }}>注销</Button>
            </Link>

          </Toolbar>
        </AppBar>

        <div className={classes.content}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
            <Route
              key={10}
              path="/customer/employeeDetails"
              exact={true}
              component={EmployeeDetail} />
            <Route
              key={11}
              path="/customer/productDetails"
              extract={true}
              component={ProductDetails} />
          </Switch>
        </div>

      </div>
    </div>
  );
}
