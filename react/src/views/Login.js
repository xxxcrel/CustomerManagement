import { Button, makeStyles, TextField, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import React from "react";
import { API_URL } from "../assets/jss/components/constants";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
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
        if (password.length < 6 || password.length === 0) {
            setPasswordError(true);
            setPasswordHelperText("密码不能为空或小于6位");
            return;
        }
        fetch(`${API_URL}/api/login`, {
            method: "POST",
            // 如果前端设置了no-cors, 则无论成功与否都不会返回数据,所以采用后端解决cors问题, 
            // 见https://stackoverflow.com/questions/40182785/why-fetch-return-a-response-with-status-0
            // mode: "no-cors",
            body: loginForm
        }).then(resp => {
            if (resp.headers.get("Content-Type") === "application/json") {
                return resp.json();
            } else {
                console.log("Oops, we haven't get JSON");
            }
        }).then(data => {
            console.log(data);
            setSnackbarOpen(true);
            setToastMessage(data["data"]);
            setTimeout(() => {
                props.history.push("/admin/home");
            }, 1500);

        }).catch(error => {
            console.log("Error: " + error);
        })
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
                <h4 className={classes.header}>管理员登入</h4>
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

                </form>
                <Button className={classes.button} onClick={onLogin} type="submit">登入</Button>
                <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={onClose}>
                    <Alert severity="success">
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
        height: "260px",
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
        backgroundImage: "linear-gradient(to right, #7B75B1, #19D6EB)",
    }
}));