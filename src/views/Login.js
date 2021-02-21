import { Button, makeStyles, TextField, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { setPageStateUpdate } from "@material-ui/data-grid";
import React from "react";
import { setState } from "react";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login(props) {
    const classes = useStyles();
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [loginMessage, setLoginMessage] = React.useState("");

    const onLogin = (event) => {
        console.log("onLogin");
        console.log("username: " + username + "\npassword: " + password);
        var loginForm = new FormData();
        loginForm.set("username", username);
        loginForm.set("password", password);
        fetch("http://localhost:5147/api/login", {
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
                // return resp.json().then(json => {
                //     console.log("json" + json);
                // });
            }
        }).then(data => {
            console.log(data);
            setSnackbarOpen(true);
            setLoginMessage(data["data"]);
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
                        // error
                        // helperText="请输入正确的用户名"
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
                        // error
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
                        {loginMessage}
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
        backgroundImage: "linear-gradient(to right, #e8198b, #0eb4dd)"
    },
    header: {
        color: "black"
    },
    loginPanel: {
        backgroundColor: "#D8DEE3",
        width: "300px",
        height: "240px",
        borderRadius: "10px",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        padding: "10px 10px"
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