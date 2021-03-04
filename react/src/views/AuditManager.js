import { Avatar, makeStyles } from "@material-ui/core"

export default function AuditManager(props) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>

            <div className={classes.headerWrapper}>
                <Avatar src="/assets/img/default_avatar.jpeg" />

            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
    },
    headerWrapper: {
        display: "flex",
        flexDirection: "row"
    }
}))