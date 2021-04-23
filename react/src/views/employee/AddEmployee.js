import { Avatar, Button, makeStyles, MenuItem, TextField, Snackbar } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import React from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { API_URL } from "../../constants/Constant";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function AddEmployee(props) {

    var genders = ["女", "男"];
    var areas = ["华东", "华西", "华北", "华南"];
    var states = ["实习", "在职", "请假中", "调休中", "离职"];
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [jobNum, setJobNum] = React.useState("");
    const [gender, setGender] = React.useState(1);
    const [age, setAge] = React.useState("");
    const [tel, setTel] = React.useState("");
    const [area, setArea] = React.useState(1);
    const [state, setState] = React.useState(1);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [loginState, setLoginState] = React.useState("success");
    const onLogout = e => {
        props.history.push("/login");
    }

    const onAddEmployee = (e) => {
        if (username !== "" && password !== "" && jobNum !== ""
            && age !== "" && tel !== "") {
            fetch(`${API_URL}/employee/entry`, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                    jobNum: jobNum,
                    age: age,
                    tel: tel,
                    gender: genders[gender],
                    area: areas[area],
                    state: states[state]
                }),
                headers: {
                    "content-type": "application/json"
                }
            }).then(resp => resp.json())
                .then(json => {
                    setSnackbarOpen(true);
                    setLoginState("success");
                    setToastMessage(json["data"]);
                })
        }
    }
    const onClose = (event, reason) => {
        setSnackbarOpen(false);
    }
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Avatar className={classes.avatarWrapper}>
                <AddAPhoto />
            </Avatar>
            <b className={classes.labelWrapper}>姓名:</b>

            <TextField value={username} onChange={e => setUsername(e.target.value)} className={classes.inputWrapper} size="small" variant="outlined" />
            <b className={classes.labelWrapper}>工号:</b>
            <TextField value={jobNum} onChange={e => setJobNum(e.target.value)} className={classes.inputWrapper} size="small" variant="outlined" />
            <b className={classes.labelWrapper}>密码:</b>
            <TextField value={password} onChange={e => setPassword(e.target.value)} className={classes.inputWrapper} size="small" variant="outlined" />

            <b className={classes.labelWrapper}>性别:</b>
            <TextField onChange={e => setGender(e.target.value)} className={classes.inputWrapper} size="small" variant="outlined" select value={gender}>
                <MenuItem value={1}>男</MenuItem>
                <MenuItem value={0}>女</MenuItem>
            </TextField>
            <b className={classes.labelWrapper}>电话:</b>
            <TextField value={tel} onChange={e => setTel(e.target.value)} className={classes.inputWrapper} size="small" variant="outlined" />
            <b className={classes.labelWrapper}>年龄:</b>
            <TextField value={age} onChange={e => setAge(e.target.value)} className={classes.inputWrapper} size="small" variant="outlined" />
            <b className={classes.labelWrapper}>管理区域:</b>
            <TextField value={area} onChange={e => setArea(e.target.value)} select className={classes.inputWrapper} size="small" variant="outlined" >
                <MenuItem value={0}>华东</MenuItem>
                <MenuItem value={1}>华北</MenuItem>
                <MenuItem value={2}>华南</MenuItem>
                <MenuItem value={3}>华西</MenuItem>
            </TextField>
            {/* <b className={classes.labelWrapper}>入职日期:</b>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    disableToolbar
                    // variant="inline"
                    format="yyyy/MM/dd"
                    margin="normal"
                    id="date-picker-inline"
                    // label="Date picker inline"
                    value={selectedDate}

                    style={{
                        border: "solid",
                        borderWidth: "1px",
                        textDecoration: "none",
                        borderRadius: "5px",
                        width: 460,
                        height: 40,
                        textAlign: "center",
                        // alignItems: "center",
                        justifyContent: "center"

                    }}
                    InputProps={{
                        disableUnderline: true,

                    }}
                    // variant="outlined"
                    onChange={handleDateChange}
                // KeyboardButtonProps={{
                //     'aria-label': 'change date',
                // }}
                />

            </MuiPickersUtilsProvider> */}
            {/* <TextField className={classes.inputWrapper} size="small" variant="outlined" /> */}
            <b className={classes.labelWrapper} >阶段:</b>
            <TextField value={state} onChange={e => setState(e.target.value)} className={classes.inputWrapper} select size="small" variant="outlined" >
                <MenuItem value={0}>实习</MenuItem>
                <MenuItem value={1}>在职</MenuItem>
                <MenuItem value={2}>请假中</MenuItem>
                <MenuItem value={3}>调休中</MenuItem>
                <MenuItem value={4}>离职</MenuItem>
            </TextField>
            <Button onClick={onAddEmployee} className={classes.addButton}>添加</Button>
            <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={onClose}>
                <Alert severity={loginState}>
                    {toastMessage}
                </Alert>
            </Snackbar>
            {/* <b className={classes.labelWrapper} >管理区域</b>
            <TextField className={classes.inputWrapper} size="small" variant="outlined" /> */}
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
        width: "460px",
        // height: "20px"
    },
    labelWrapper: {
        padding: 0,
        marginRight: 400,
        marginTop: 10,
        marginBottom: 8,
        alignSelf: "left",
        backgroundColor: ""
    },
    addButton: {
        width: 460,
        marginTop: 20,
        backgroundColor: "#50EBEB"
    }
}));