import logo from './logo.svg';
import './App.css';
import Sidebar from './components/SideBar';
import Home from "./views/Home";
import CustomerManagement from "./views/CustomerManagement";
import { BrowserRouter as Router, Switch, Route, } from 'react-router-dom';
import { AppBar, makeStyles, Toolbar, IconButton, Button } from '@material-ui/core';
import styles from "./assets/jss/components/appStyle";

const routes = [
  {
    path: "/home",
    exact: true,
    sidebar: "主页",
    main: Home
  },
  {
    path: "/custome",
    sidebar: "客户管理中心",
    main: CustomerManagement
  },
  {
    path: "/contact-us",
    sidebar: "联系我们",
    main: () => <h2>Shoelaces</h2>
  }
]
const useStyles = makeStyles(styles);

function App() {
  const classes = useStyles();

  return (
    <Router
      path="/admin"
    >
      <div className={classes.wrapper}>
        {/* <header className="App-header"> */}

        <Sidebar
          routes={routes}
        />

        <div className={classes.mainPanel}>

          <AppBar className={classes.appBar}>
            <Toolbar className={classes.container}>
              <div className={classes.flex}>
                {/* Here we create navbar brand, based on route name */}
                <IconButton edge="end" color="transparent" href="#" >
                  hello
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {/* <div style={{height:"10px", color:"red"}}></div> */}

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
    </Router>
  );
}

export default App;
