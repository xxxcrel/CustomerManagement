import logo from './logo.svg';
import './App.css';
import Sidebar from './components/SideBar';
import Home from "./views/Home";
import CustomerManagement from "./views/CustomerManagement";
import { BrowserRouter as Router, Switch, Route, Link, } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, IconButton, Button, Typography, Avatar } from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';

import styles from "./assets/jss/components/appStyle";
import Login from './views/Login';

const routes = [
  {
    path: "/admin/home",
    exact: true,
    sidebar: "客户统计",
    main: Home
  },
  {
    path: "/admin/custome",
    sidebar: "客户管理中心",
    main: CustomerManagement
  },
  {
    path: "/admin/contact-us",
    sidebar: "联系我们",
    main: () => <h2>Shoelaces</h2>
  }
]
const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();
  const onLogout = event => {

  }
  return (
    <div className={classes.wrapper}>
      {/* <header className="App-header"> */}
      <div className={classes.sidebar}>
        <Sidebar
          routes={routes}
        />
      </div>


      <div className={classes.mainPanel}>
        <AppBar className={classes.appBar} position="relative">
          <Toolbar className={classes.container}>
            <Typography style={{ flexGrow: "1" }} />
            <IconButton>
              <Avatar src="/assets/img/default_avatar.jpeg" alt="登入" />
            </IconButton>
            <Link to="/login" replace={true}>
              <Button style={{ textDecoration: "none" }} onClick={onLogout}>注销</Button>
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
