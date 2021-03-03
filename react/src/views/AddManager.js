import { Avatar, makeStyles, TextField } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";

export default function AddManager(props) {
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Avatar className={classes.avatarWrapper}>
                <AddAPhoto />
            </Avatar>
            <p className={classes.labelWrapper}>姓名:</p>
            <TextField className={classes.inputWrapper} variant="outlined" />
            <p className={classes.labelWrapper}>工号:</p>
            <TextField className={classes.inputWrapper} variant="outlined" />
            <p className={classes.labelWrapper}>性别:</p>
            <TextField className={classes.inputWrapper} variant="outlined" />
            <p className={classes.labelWrapper}>电话:</p>
            <TextField className={classes.inputWrapper} variant="outlined" />
            <p className={classes.labelWrapper}>地址:</p>
            <TextField className={classes.inputWrapper} variant="outlined" />
            <p className={classes.labelWrapper}>入职日期:</p>
            <TextField className={classes.inputWrapper} variant="outlined" />
            <p className={classes.labelWrapper}>当前状态:</p>
            <TextField className={classes.inputWrapper} variant="outlined" />
        </div>
    );
}

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: "100%",
        // backgroundColor: "yellow",
        flexDirection: "column",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    avatarWrapper: {
        width: "100px",
        height: "100px"
    },
    inputWrapper: {
        width: "460px"
    },
    labelWrapper: {
        padding: 0,
        backgroundColor: ""
    }
}));