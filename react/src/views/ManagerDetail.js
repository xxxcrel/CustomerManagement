import { Avatar, Divider, makeStyles } from "@material-ui/core"

export default function ManagerDetail(props) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Header className={classes.headerWrapper} />
            <Body className={classes.bodyWrapper} />
        </div>
    )
}

function Header(props) {
    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <Avatar src="/assets/img/default_avatar.jpeg" style={{ width: 180, height: 180, marginLeft: 100 }}>

            </Avatar>
            {/* <Divider /> */}
            <h2> 哈哈哈</h2>
        </div>
    );
}
function Body(props) {
    return (
        <div>

        </div>
    )
}

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%"
    },
    headerWrapper: {
        height: "300px",

    },
    bodyWrapper: {
        height: "calc(100% - 300px)",
        backgroundColor: "yellow"
    }
}))