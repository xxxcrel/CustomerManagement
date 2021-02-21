import { lightBlue } from "@material-ui/core/colors";
import {
    drawerWidth,
    transition,
    container,
    defaultFont,
    grayColor,
    hexToRgb,
    warningColor,
    blackColor,
    whiteColor
} from "./material-dashboard-react.js";

import bgImage from "../../img/sidebar-2.jpg";

const appStyle = theme => ({
    wrapper: {
        // position: "r",
        // top: "0",
        // height: "100vh"
    },
    sidebar: {
        position: "relative",
        left: "0px",
        top: "0px",
        bottom: "0px",
        height: "100%",
        width: drawerWidth
    },
    mainPanel: {
        // ...transition,
        // backgroundColor: "#A7FACE",
        position: "relative",
        height: "100%",
        top: "0px",
        left: "0px",
        marginLeft: drawerWidth + 1,
        overflowScrolling: "touch"
    },

    appBar: {
        // position: "absolute",
        boxShadow: "none",
        // top: "0",
        height: "50px",
        transition: "all 150ms ease 0s",
        minHeight: "50px",
        display: "block",
        backgroundColor: "white",
        // borderBottomWidth: "1px",
        // borderBottomStyle: "solid",
        // borderColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
        // backgroundImage: "url(" + bgImage + ")"
    },
    content: {
        width: "100%",
        height: "100%",
        marginTop: "35px",
        // backgroundColor: "red"
        // minHeight: "calc(100vh - 123px)"
    },
    container: {
        ...container,
        minHeight: "50px",
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