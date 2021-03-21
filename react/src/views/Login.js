import { Button, makeStyles, TextField, Snackbar, withStyles, FormHelperText } from "@material-ui/core";
import React from "react";
import { Link, hashHistory } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Alert from "../components/Alert";
import { API_URL, BootstrapInput } from "../constants/Constant";

export default function Login(props) {
    const classes = useStyles();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameHelperText, setUsernameHelperText] = React.useState("");
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordHelperText, setPasswordHelperText] = React.useState("");
    const [type, setType] = React.useState(0);
    const [loginState, setLoginState] = React.useState("success");
    const handleChange = (event) => {
        setType(event.target.value);
    };

    const onLogin = (event) => {
        setUsernameError(false);
        setUsernameHelperText("");
        setPasswordError(false);
        setPasswordHelperText("");
        console.log("onLogin");
        console.log("username: " + username + "\npassword: " + password);
        var loginForm = new FormData();
        loginForm.set("username", username);
        loginForm.set("password", password);
        if (username.length === 0) {
            setUsernameError(true);
            setUsernameHelperText("用户名不能为空");
            return;
        }
        if (password.length < 5 || password.length === 0) {
            setPasswordError(true);
            setPasswordHelperText("密码不能为空或小于5位");
            return;
        }

        switch (type) {
            case 0:
                fetch(`${API_URL}/customer/login`, {
                    method: "POST",
                    body: loginForm
                })
                    .then(resp => resp.json())
                    .then(json => {
                        if (json["code"] === 200) {
                            console.log(json);
                            setSnackbarOpen(true);
                            setLoginState("success");
                            setToastMessage("登入成功");
                            setTimeout(() => {
                                props.history.push("/feedback/home", json["data"]);
                            }, 1500);
                        } else {
                            setSnackbarOpen(true);
                            setLoginState("error");
                            setToastMessage("登入失败");
                        }
                    })
                break;
            case 1:
                fetch(`${API_URL}/employee/login`, {
                    method: "POST",
                    body: loginForm
                }).then(resp => {
                    if (resp.headers.get("Content-Type") === "application/json") {
                        return resp.json();
                    } else {
                        console.log(resp);
                        console.log("Oops, we haven't get JSON");
                    }
                }).then(data => {
                    if (data["code"] === 200) {
                        console.log(data);
                        setSnackbarOpen(true);
                        setLoginState("success");
                        setToastMessage("登入成功");
                        setTimeout(() => {
                            props.history.push("/customer/statistics", data["data"]);
                        }, 1500);
                    } else {
                        setSnackbarOpen(true);
                        setLoginState("error");
                        setToastMessage("登入失败");
                    }
                }).catch(error => {
                    // props.history.push("/customer/home");
                    setSnackbarOpen(true);
                    setToastMessage(error)
                    // console.log("Error: " + error);
                })
                break;
            case 2:
                if (type === 2) {
                    if (username === "admin" && password === "admin") {
                        setTimeout(() => {
                            props.history.push("/employee/all")
                        }, 1500);
                        return;
                    }
                }
                break;
            default:
                break;
        }

    }
    const onUsernameChange = (event) => {
        setUsername(event.target.value);
        // console.log(event.target.value);
    }
    const onPasswordChange = (event) => {
        setPassword(event.target.value);
        // console.log(event.target.value);
    }

    const onClose = (event, reason) => {
        setSnackbarOpen(false);
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.loginPanel}>
                <h4 className={classes.header}>登入</h4>
                <form className={classes.inputWrapper}>
                    <TextField
                        error={usernameError}
                        helperText={usernameHelperText}
                        value={username}
                        onChange={onUsernameChange}
                        className={classes.inputField}
                        variant="outlined"
                        label="账号"
                        size="small"
                        color="primary" />
                    <TextField
                        value={password}
                        onChange={onPasswordChange}
                        error={passwordError}
                        helperText={passwordHelperText}
                        className={classes.inputField}
                        type="password"
                        variant="outlined"
                        label="密码"
                        size="small"
                        color="primary" />

                    <FormControl variant="outlined" className={classes.loginType}>
                        {/* <InputLabel id="demo-customized-select-label">登入类型</InputLabel> */}
                        {/* <FormHelperText>登入类型</FormHelperText> */}
                        <Select
                            label="账户类型"
                            labelId="demo-customized-select-label"
                            id="demo-customized-select"
                            value={type}
                            // variant=""
                            onChange={handleChange}
                            input={<BootstrapInput />}
                        >
                            <MenuItem value={0}>
                                客户
                            </MenuItem>
                            <MenuItem value={1}>
                                员工
                            </MenuItem>
                            <MenuItem value={2}>管理员</MenuItem>

                        </Select>
                    </FormControl>

                </form>
                <Button className={classes.button} onClick={onLogin} type="submit" style={{
                    backgroundImage: "linear-gradient(to right, #7B75B1, #19D6EB)",
                }}>登入</Button>
                {/* <Link to="/admin-login" style={{ textDecoration: "none" }}>
                    <Button className={classes.button} stylle={{ backgroundColor: "red", color: "red" }}>超级管理员登入</Button>
                </Link> */}
                <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={onClose}>
                    <Alert severity={loginState}>
                        {toastMessage}
                    </Alert>
                </Snackbar>
            </div>

        </div>
    )
}

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: "100%",
        width: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(to right, #e8198b, #0eb4dd)",
    },
    header: {
        color: "black"
    },
    loginPanel: {
        backgroundColor: "#f5f7fa",
        width: "300px",
        height: "300px",
        borderRadius: "10px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        padding: "10px 10px",
        "&:hover,&:focus": {
            boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        }

    },
    inputWrapper: {
        display: "flex",
        flexDirection: "column"
    },
    inputField: {
        margin: "5px auto",
        width: "220px",
        outline: "none",
    },
    button: {
        borderRadius: "8px",
        width: "220px",
        marginTop: "10px",
        // backgroundImage: "linear-gradient(to right, #7B75B1, #19D6EB)",
    },
    loginType: {
        marginTop: "20px"
    }
}));