import Sidebar from './components/SideBar';
import Home from "./views/Home";
import CustomerManagement from "./views/CustomerManagement";
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, IconButton, Button, Typography, Avatar } from '@material-ui/core';

import styles from "./assets/jss/components/appStyle";
import ContactUs from './views/ContactUs';
import ManagerDetail from './views/ManagerDetail';

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
  {
    path: "/customer/detail",
    main: ManagerDetail
  }
]
const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>

      <div className={classes.sidebar}>
        <Sidebar
          title="客户管理中心"
          routes={routes}
        />
      </div>


      <div className={classes.mainPanel}>
        <AppBar className={classes.appBar} position="relative">
          <Toolbar className={classes.container}>
            <Typography style={{ flexGrow: "1" }} />
            <Link to="/customer/detail">
              <Avatar src="/assets/img/default_avatar.jpeg" alt="登入" />
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
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
                children={<route.main />}
              />
            ))}
          </Switch>
        </div>

      </div>
    </div>
  );
}

export default App;
