import { lightBlue } from "@material-ui/core/colors";
import {
    drawerWidth,
    transition,
    container,
    defaultFont,
    grayColor,
    hexToRgb,
    warningColor,
    blackColor
} from "./material-dashboard-react.js";

import bgImage from "../../img/sidebar-2.jpg";

const appStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh"
    },
    sidebar: {
        position: "absloute",
        left: "0px",
        top: "0px",
        height: "100%",
        width: drawerWidth
    },
    mainPanel: {
        ...transition,
        maxHeight: "100%",
        marginLeft: drawerWidth,
        overflowScrolling: "touch"
    },
    appBar: {
        position: "relative",
        width: "100%",
        transition: "all 150ms ease 0s",
        minHeight: "50px",
        display: "block",
        backgroundImage: "url(" + bgImage + ")"
    },
    content: {
        position: "relative",
        // minHeight: "calc(100vh - 123px)"
    },
    container: {
        ...container,
        minHeight: "60px",
        // color: "white",
        // backgroundColor: "white"
    },
    flex: {
        flex: 1
    },
    title: {
        ...defaultFont,
        letterSpacing: "unset",
        lineHeight: "30px",
        fontSize: "18px",
        borderRadius: "3px",
        textTransform: "none",
        color: "inherit",
        margin: "0",
        "&:hover,&:focus": {
            background: "transparent"
        }
    },
});

export default appStyle;