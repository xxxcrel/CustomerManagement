import { Button, makeStyles, TextField, Snackbar, withStyles, FormHelperText, Radio, RadioGroup } from "@material-ui/core";
import React from "react";
import { Link, hashHistory } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import Alert from "../components/Alert";
import { API_URL, BootstrapInput } from "../constants/Constant";
import clsx from 'clsx';

function StyledRadio(props) {
    const classes = useStyles();

    return (
        <Radio
            className={classes.root}
            disableRipple
            color="default"
            checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
            icon={<span className={classes.icon} />}
            {...props}
        />
    );
}
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
    const [type, setType] = React.useState("customer");
    const [loginState, setLoginState] = React.useState("success");
    const [accountLabel, setAccountLabel] = React.useState("代表人")
    const handleChange = (event) => {
        setType(event.target.value);
        switch (event.target.value) {
            case "customer":
                setAccountLabel("代表人");
                break;
            case "employee":
                setAccountLabel("工号");
                break;
            case "admin":
                setAccountLabel("账号")
                break;
            default:
                break;
        }
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
            case "customer":
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
            case "employee":
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
            case "admin":
                console.log("admin");
                if (username === "admin" && password === "admin") {
                    setTimeout(() => {
                        props.history.push("/employee/all")
                    }, 1500);
                    return;
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
                        label={accountLabel}
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
                    <FormControl component="fieldset" className={classes.loginType}>
                        <RadioGroup defaultValue={type} aria-label="type" name="customized-radios" onChange={handleChange} >
                            <div>
                                <FormControlLabel value="customer" control={<StyledRadio />} label="客户" />
                                <FormControlLabel value="employee" control={<StyledRadio />} label="员工" />
                                <FormControlLabel value="admin" control={<StyledRadio />} label="管理员" />
                            </div>
                        </RadioGroup>
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
        width: "240px",
        outline: "none",
    },
    button: {
        borderRadius: "8px",
        width: "240px",
        marginTop: "10px",
        // backgroundImage: "linear-gradient(to right, #7B75B1, #19D6EB)",
    },
    loginType: {
        marginTop: 15,
        marginBottom: 10
    },
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 16,
        height: 16,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#f5f8fa',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '$root.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:hover ~ &': {
            backgroundColor: '#ebf1f5',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#137cbd',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 16,
            height: 16,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
        'input:hover ~ &': {
            backgroundColor: '#106ba3',
        },
    },
}));