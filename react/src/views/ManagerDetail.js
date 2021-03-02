import { Avatar, Divider, makeStyles, TextField } from "@material-ui/core"
import React from "react";
import { API_URL } from "../assets/jss/components/constants";

export default function ManagerDetail(props) {

    const [info, setInfo] = React.useState("");
    var _body = new FormData();
    _body.set("jobNum", "123123");
    React.useEffect(() => {
        fetch(`${API_URL}/manager/info?jobNum=123123`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json["data"])
                setInfo(json["data"])
            })
    })
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Avatar src="/assets/img/default_avatar.jpeg" style={{ width: 180, height: 180, marginLeft: 100 }} />
            <div style={{ width: 10, height: 800, color: "blue" }} />
            <div className={classes.bodyWrapper}>
                <h6>姓名:</h6>
                <TextField value={info.username} />
                <h6>工号:</h6>
                <TextField value={info.jobNum} />
                <h6>年龄:</h6>
                <TextField value={info.age} />
                <h6>性别:</h6>
                <TextField value={info.gender} />
                <h6>入职日期:</h6>
                <TextField value={info.entryDate} />
                {/* <TextField label="当前状态" value={info.state.name} /> */}
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        flexDirection: "row",
        height: "100%",
        width: "100%"
    },
    headerWrapper: {
        height: "300px",

    },
    bodyWrapper: {
        height: "calc(100% - 300px)",
        marginLeft: 40,
        flexDirection: "column",
        display: "flex"
        // backgroundColor: "yellow"
    }
}))