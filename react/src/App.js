import Sidebar from './components/SideBar';
import Home from "./views/Home";
import CustomerManagement from "./views/CustomerManagement";
import { BrowserRouter as Router, Switch, Route, Link, Redirect, } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, IconButton, Button, Typography, Avatar } from '@material-ui/core';

import styles from "./assets/jss/components/appStyle";
import ContactUs from './views/ContactUs';
import ManagerDetail from './views/ManagerDetail';
import { LiveTvOutlined } from '@material-ui/icons';

const routes = [
  {
    path: "/customer/home",
    exact: true,
    sidebar: "客户统计",
    main: Home
  },
  {
    path: "/customer/custome",
    sidebar: "客户管理",
    main: CustomerManagement
  },
  {
    path: "/customer/contact-us",
    sidebar: "联系我们",
    main: ContactUs
  },

]
const useStyles = makeStyles(styles);

let info;

function App(props) {

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
            <Link to={{ pathname: "/customer/details", state: info }}>
              <Avatar src={info.avatarUrl} alt="登入" />
            </Link>
            <Link to="/login" style={{ textDecoration: "none", marginLeft: 20 }}>
              <Button underline="none">注销</Button>
            </Link>

          </Toolbar>
        </AppBar>

        <div className={classes.content}>
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
              />
            ))}
            <Route
              key={10}
              path="/customer/details"
              exact={true}
              component={ManagerDetail} />
            {/* <Redirect from="/customer" to="/customer/home" /> */}
          </Switch>
        </div>

      </div>
    </div>
  );
}

export default App;
