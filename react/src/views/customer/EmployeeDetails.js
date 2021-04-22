import { Avatar, Divider, makeStyles, TextField, clsx, Button } from "@material-ui/core"
import { Link } from "react-router-dom";
import React from "react";
import { API_URL } from "../../constants/Constant";

export default function EmployeeDetail(props) {

    // const info = props.location.state;
    // var _body = new FormData();
    // _body.set("jobNum", "123123");
    const [username, setUsername] = React.useState(null);
    const [avatarUrl, setAvatarUrl] = React.useState(null);
    const [jobNum, setJobNum] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [entryDate, setEntryDate] = React.useState(null);
    const [employeeId, setEmployeeId] = React.useState(null);
    React.useEffect(() => {
        var infoStr = localStorage.getItem("info");
        var info = JSON.parse(infoStr);
        console.log("info: " + info);
        setEmployeeId(info.id);
        setUsername(info.username);
        setAvatarUrl(info.avatarUrl);
        setJobNum(info.jobNum);
        setAge(info.age);
        setGender(info.gender);
        setEntryDate(info.entryDate);
        return () => { };
    }, []);
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <div style={{ marginLeft: 100 }}>

                <Avatar src={avatarUrl} style={{ width: 180, height: 180, }} />
                <Link to={{ pathname: "/updatePassword", state: { type: "employee", id: employeeId } }} style={{ textDecoration: "none" }}>
                    <Button style={{ marginLeft: 50, marginTop: 20, backgroundColor: "#50EBEB" }}>修改密码</Button>
                </Link>
            </div>
            {/* <div style={{ width: 10, height: 800, color: "blue" }} /> */}
            <div className={classes.bodyWrapper}>
                <h6>姓名:</h6>
                <TextField value={username} />
                <h6>工号:</h6>
                <TextField value={jobNum} />
                <h6>年龄:</h6>
                <TextField value={age} />
                <h6>性别:</h6>
                <TextField value={gender} />
                <h6>入职日期:</h6>
                <TextField value={entryDate} />
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