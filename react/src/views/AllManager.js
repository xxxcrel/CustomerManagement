import { Card, makeStyles } from "@material-ui/core";

export default function AllManger(props) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div className={classes.lineWrapper}>

                <Card className={classes.cardWrapper}>

                </Card>
                <Card className={classes.cardWrapper}>

                </Card>
            </div>
            <div className={classes.lineWrapper}>
                <Card className={classes.cardWrapper}></Card>
                <Card className={classes.cardWrapper}></Card>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    wrapper: {

        display: "flex",
        flexDirection: "column",
        // backgroundColor: "yellow",
        width: "100%",
        height: "100%"
    },
    lineWrapper: {
        // backgroundColor: "red",
        margin: "10px 10px",
        width: "100%",
        height: "50%",
        display: "flex",
        flexDirection: "row"

    },
    cardWrapper: {
        margin: "40px 10px",
        width: "50%",
        height: "100%"
    }
}))