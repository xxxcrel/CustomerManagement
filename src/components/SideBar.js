import { List, ListItem, makeStyles, ListItemText, Drawer } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types"
import classNames from "classnames";
import bgImage from "../assets/img/sidebar-2.jpg";
import {
  NavLink
} from "react-router-dom";
import styles from "../assets/jss/components/sidebarStyle.js"
import { whiteColor } from "../assets/jss/components/material-dashboard-react";
// import "../assets/css/sidebar.css"

const useSytles = makeStyles(styles);


export default function Sidebar(props) {

  function activeRoute(routeName) {
    console.log(window.location.href + "");
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  const { routes } = props;

  const classes = useSytles();

  return (
      <div className={classes.drawerPaper}>
        <div className={classes.logo}>
          <h3 style={{ color: whiteColor }}>客户管理系统</h3>
        </div>
        <div className={classes.sidebarWrapper}>
          <List className={classes.list}>
            {
              routes.map((route, index) => {

                return (
                  <NavLink
                    to={route.path}
                    className={classes.item}
                    activeClassName={classes.itemActive}
                    activeStyle={{ color: "yellow" }}
                    key={index}>
                    <ListItem button>
                      <ListItemText
                        primary={route.sidebar}
                        disableTypography={true}
                        className={classes.itemText}
                      />
                    </ListItem>
                  </NavLink>
                );
              })
            }

          </List>
        </div>

        <div
          className={classes.background}
          style={{ backgroundImage: "url(" + bgImage + ")" }}
        />

      </div>


  );
}

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object)
}