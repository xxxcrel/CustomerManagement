import { AppBar, Button, IconButton, Snackbar, TextField, Toolbar, Typography } from "@material-ui/core";
import createBreakpoints from "@material-ui/core/styles/createBreakpoints";
import { KeyboardArrowLeftRounded } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
import { API_URL } from "../../constants/Constant";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function ModifyPassword(props) {

    const typeAndId = props.location.state;

    const [toastMessage, setToastMessage] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [loginState, setLoginState] = React.useState("success");
    const [newPwd, setNewPwd] = React.useState(null);
    const [confirmPwd, setConfirmPwd] = React.useState(null);

    const onClose = (event, reason) => {
        setSnackbarOpen(false);
    }

    const onConfirm = e => {
        if (newPwd !== confirmPwd) {
            setSnackbarOpen(true);
            setToastMessage("两次密码不一致");
            setLoginState("info");
            return;
        }
        var form = new FormData();
        form.set("id", typeAndId.id);
        form.set("newPwd", newPwd);
        switch (typeAndId.type) {
            case "employee":
                fetch(`${API_URL}/employee/changePwd`, {
                    method: "POST",
                    body: form
                }).then(resp => resp.json())
                    .then(json => {
                        setSnackbarOpen(true);
                        setToastMessage(json["data"]);
                        setLoginState("success");
                        // props.history.goBack();
                    });
                break;
            case "customer":
                fetch(`${API_URL}/customer/changePwd`, {
                    method: "POST",
                    body: form
                }).then(resp => resp.json())
                    .then(json => {
                        setSnackbarOpen(true);
                        setToastMessage(json["data"]);
                        setLoginState("success");
                        // props.history.goBack();
                    })
                break;
            default:
                return;
        }

        // setSnackbarOpen(true);
        // setToastMessage("修改失败,与最近一次密码相似");
        // setLoginState("info");
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "400px" }}>
            <AppBar style={{ backgroundColor: "#9DF5F5" }}>
                <Toolbar>
                    <IconButton onClick={e => { props.history.goBack() }}>
                        <KeyboardArrowLeftRounded style={{ color: "black", alignSelf: "center" }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Typography>修改密码</Typography>
            <TextField onChange={e => { setNewPwd(e.target.value) }} variant="outlined" size="small" type="password" style={{ marginTop: 20, width: 300 }} label="新密码" />
            <TextField onChange={e => { setConfirmPwd(e.target.value) }} variant="outlined" size="small" type="password" style={{ marginTop: 20, width: 300 }} label="确认密码" />
            <div style={{ marginTop: 20 }}>
                <Button onClick={e => { props.history.goBack() }} style={{ marginRight: 50, backgroundColor: "#50EBEB", borderRadius: 20, width: 100 }}>取消</Button>
                <Button onClick={onConfirm} style={{ marginLeft: 50, backgroundColor: "red", borderRadius: 20, width: 100 }}>确认</Button>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={onClose}>
                <Alert severity={loginState}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}