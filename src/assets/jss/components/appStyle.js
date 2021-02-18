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
} from "./material-dashboard-react.js"
const appStyle = theme => ({
    wrapper: {
        position: "relative",
        top: "0",
        height: "100vh"
    },
    mainPanel: {
        overflow: "auto",
        position: "relative",
        float: "right",
        ...transition,
        maxHeight: "100%",
        width: "100%",
        overflowScrolling: "touch"
    },
    content: {
        marginTop: "20px",
        padding: "20px 15px",
        minHeight: "calc(100vh - 123px)"
    },

    appBar: {
        backgroundColor: "red",
        // boxShadow:
        //     "0 12px 20px -10px rgba(" +
        //     hexToRgb(warningColor[0]) +
        //     ",.28), 0 4px 20px 0 rgba(" +
        //     hexToRgb(blackColor) +
        //     ",.12), 0 7px 8px -5px rgba(" +
        //     hexToRgb(warningColor[0]) +
        //     ",.2)",
        borderBottom: "0",
        marginBottom: "0",
        position: "absolute",
        width: "100%",
        paddingTop: "10px",
        zIndex: "1029",
        color: lightBlue,
        border: "0",
        borderRadius: "3px",
        padding: "10px 0",
        transition: "all 150ms ease 0s",
        minHeight: "50px",
        display: "block"
    },
    container: {
        ...container,
        minHeight: "50px",
        color: "blue"
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