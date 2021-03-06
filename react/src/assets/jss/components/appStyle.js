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
    whiteColor,
    boxShadow
} from "./material-dashboard-react.js";

import bgImage from "../../img/sidebar-2.jpg";

const appStyle = theme => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        position: "absloute",
        height: "100%",
        width: "100%",
    },
    sidebar: {
        position: "relative",
        width: drawerWidth,
        height: "inherit",
        ...boxShadow,
        boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)"
        // marginLeft: -drawerWidth
    },
    mainPanel: {
        position: "relative",
        height: "inherit",
        width: "calc(100% - 260px)",
        backgroundColor: "#f5f7fa",
    },

    appBar: {
        // position: "absolute",
        boxShadow: "none",
        backgroundColor: "#F5F7FA",
        // height: "50px",
        // width: "inherit",
        transition: "all 150ms ease 0s",
        minHeight: "50px",
        display: "block",
        // backgroundColor: "white",
        // borderBottomWidth: "1px",
        // borderBottomStyle: "solid",
        // borderColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
        // backgroundImage: "url(" + bgImage + ")"
    },
    content: {
        // width: "100k
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