import { makeStyles } from "@material-ui/core";

export default function ContactUs() {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.cardWrapper}>
                <h4>商业合作联系: 123123123</h4>
            </div>
        </div>
    )
}


const useStyles = makeStyles(theme => ({
    wrapper: {
        // backgroundColor: "yellow",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%"
    },
    cardWrapper: {
        width: "400px",
        height: "400px",
        borderRadius: "10px",
        textAlign: "center",
        backgroundColor: "rgb(255, 255, 255)",
        transition: "all 0.4s ease 0s",
        boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
    }
}));