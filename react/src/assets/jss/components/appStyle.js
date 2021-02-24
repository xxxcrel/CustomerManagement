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
        display: "flex",
        flexDirection: "row",
        position: "absloute",
        height: "100%",
        width: "100%",
    },
    sidebar: {
        position: "relative",
        width: "19%",
        height: "inherit",
    },
    mainPanel: {
        position: "relative",
        height: "800px",
        width: "82%",
        top: "0",
        bottom: "0",
        backgroundColor: "yellow"
    },

    appBar: {
        // position: "absolute",
        boxShadow: "none",
        // backgroundColor: "#F5F7FA",
        height: "50px",
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
        // width: "100%",
        // height: "100%",
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