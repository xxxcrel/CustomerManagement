import { List, ListItem, makeStyles, ListItemText, Drawer, Divider } from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types"
import bgImage from "../assets/img/sidebar-2.jpg";
import {
  NavLink
} from "react-router-dom";

import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont,
  whiteColor,
  grayColor,
  blackColor,
  hexToRgb
} from "../assets/jss/components/material-dashboard-react.js";
import "../assets/css/sidebar.css"

const useSytles = makeStyles(theme => ({
  drawerPaper: {
    width: drawerWidth,
    height: "100%",
    backgroundColor: "black",
    // position: "relative"
  },
  sidebarWrapper: {
    position: "relative",
    zIndex: "4",
    // overflowScrolling: "touch",
  },
  logo: {
    position: "relative",
    padding: "15px 15px",
    color: blackColor,
    textAlign: "center",
    zIndex: "4",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: "0",
      height: "1px",
      right: "15px",
      width: "calc(100% - 30px)",
      backgroundColor: "rgba(" + hexToRgb(blackColor) + ", 0.3)"
    }
  },
  item: {
    position: "relative",
    display: "block",
    width: "auto",
    transition: "all 300ms linear",
    margin: "10px 12px 0",
    borderRadius: "5px",
    // padding: "10px 15px",
    textDecoration: "none",
    "&:hover,&:focus,&:visited,&": {
      borderRadius: "5px",
      color: "#C4F7CC"
    }
  },
  itemInternal: {
    "&:hover,&:focus,&:visited,&": {
      borderRadius: "5px",
    }
  },
  itemActive: {
    position: "relative",
    display: "block",
    width: "auto",
    transition: "all 300ms linear",
    margin: "10px 11px 0",
    borderRadius: "5px",
    // padding: "10px 15px",
    textDecoration: "none",
    backgroundColor: "#83EB94",
    "&:hover,&:focus,&:visited,&": {
      borderRadius: "5px",
      color: "#C4F7CC"
    }
  },
  itemText: {
    ...defaultFont,
    margin: "0",
    // padding: "2px",
    lineHeight: "30px",
    fontSize: "16px",
    fontWeight: 400,
    color: whiteColor
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none",
    position: "unset"
  },
}));


export default function Sidebar(props) {

  const { routes } = props;

  const classes = useSytles();

  return (
    <div className={classes.drawerPaper} style={{ backgroundColor: `${props.color}` }} >
      <div className={classes.logo}>
        <h3 style={{ color: whiteColor }}>{props.title}</h3>
      </div>
      {/* <Divider /> */}
      <div className={classes.sidebarWrapper}>
        <List className={classes.list}>
          {
            routes.map((route, index) => {

              return (
                <NavLink
                  to={route.path}
                  className={classes.item}
                  activeClassName={classes.itemActive}
                  // activeStyle={{ color: "yellow" }}
                  key={index}>
                  <ListItem button className={classes.itemInternal}>
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

    </div>


  );
}

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  color: PropTypes.string
}