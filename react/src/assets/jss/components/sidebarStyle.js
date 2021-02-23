import { blue, green, red } from "@material-ui/core/colors";
import {
    drawerWidth,
    transition,
    boxShadow,
    defaultFont,
    primaryColor,
    primaryBoxShadow,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    whiteColor,
    grayColor,
    blackColor,
    hexToRgb
} from "./material-dashboard-react.js"

const sidebarStyle = theme => ({
    drawerPaper: {
        // border: "none",
        // border: "solid",
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        zIndex: "1",
        // ...boxShadow,
        borderRightWidth: "1px",
        borderRightStyle: "solid",
        borderColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)",
        width: drawerWidth,
        backgroundImage: "linear-gradient(to right, #2C3328, #07A8BA)",
        // background: "linear-gradient(blue, pink)"
    },
    sidebarWrapper: {
        position: "relative",
        height: "calc(100vh - 75px)",
        overflow: "auto",
        width: drawerWidth,
        zIndex: "4",
        // ...boxShadow,
        overflowScrolling: "touch",
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
            backgroundColor: "rgba(" + hexToRgb(grayColor[6]) + ", 0.3)"
        }
    },
    logoLink: {
        ...defaultFont,
        textTransform: "uppercase",
        padding: "5px 0",
        display: "block",
        fontSize: "18px",
        textAlign: "left",
        fontWeight: "400",
        lineHeight: "30px",
        textDecoration: "none",
        backgroundColor: "transparent",
        "&,&:hover": {
            color: whiteColor
        }
    },
    logoLinkRTL: {
        textAlign: "right"
    },
    logoImage: {
        width: "30px",
        display: "inline-block",
        maxHeight: "30px",
        marginLeft: "10px",
        marginRight: "15px"
    },
    background: {
        position: "absolute",
        zIndex: "1",
        height: "100%",
        width: "100%",
        display: "block",
        top: "0",
        left: "0",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
            position: "absolute",
            zIndex: "3",
            width: "100%",
            height: "100%",
            content: '""',
            display: "block",
            background: blackColor,
            opacity: ".8"
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

    purple: {
        backgroundColor: primaryColor[0],
        ...primaryBoxShadow,
        "&:hover,&:focus": {
            backgroundColor: primaryColor[0],
            ...primaryBoxShadow
        }
    },
    blue: {
        backgroundColor: infoColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(infoColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(infoColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: infoColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(infoColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(infoColor[0]) +
                ",.2)"
        }
    },
    green: {
        backgroundColor: successColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(successColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(successColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: successColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(successColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(successColor[0]) +
                ",.2)"
        }
    },
    orange: {
        backgroundColor: warningColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(warningColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(warningColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: warningColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(warningColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(warningColor[0]) +
                ",.2)"
        }
    },
    red: {
        backgroundColor: dangerColor[0],
        boxShadow:
            "0 12px 20px -10px rgba(" +
            hexToRgb(dangerColor[0]) +
            ",.28), 0 4px 20px 0 rgba(" +
            hexToRgb(blackColor) +
            ",.12), 0 7px 8px -5px rgba(" +
            hexToRgb(dangerColor[0]) +
            ",.2)",
        "&:hover,&:focus": {
            backgroundColor: dangerColor[0],
            boxShadow:
                "0 12px 20px -10px rgba(" +
                hexToRgb(dangerColor[0]) +
                ",.28), 0 4px 20px 0 rgba(" +
                hexToRgb(blackColor) +
                ",.12), 0 7px 8px -5px rgba(" +
                hexToRgb(dangerColor[0]) +
                ",.2)"
        }
    },

});

export default sidebarStyle;