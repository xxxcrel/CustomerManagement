import { AppBar, Button, IconButton, Snackbar, TextField, Toolbar, Typography } from "@material-ui/core";
import { KeyboardArrowLeftRounded } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
import React from 'react';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export default function ModifyPassword(props) {

    const [toastMessage, setToastMessage] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);

    const onClose = (event, reason) => {
        setSnackbarOpen(false);
    }

    const onConfirm = e => {
        setSnackbarOpen(true);
        setToastMessage("修改成功");
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", height: "400px" }}>
            <AppBar style={{ boxShadow: "none", backgroundColor: "white" }}>
                <Toolbar>
                    <IconButton onClick={e => { props.history.goBack() }}>
                        <KeyboardArrowLeftRounded style={{ color: "black" }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Typography>修改密码</Typography>
            <TextField variant="outlined" size="small" style={{ marginTop: 20, width: 300 }} label="新密码" />
            <TextField variant="outlined" size="small" style={{ marginTop: 20, width: 300 }} label="确认密码" />
            <div style={{ marginTop: 20 }}>
                <Button onClick={e => { props.history.goBack() }} style={{ marginRight: 50, backgroundColor: "#50EBEB", borderRadius: 20, width: 100 }}>取消</Button>
                <Button onClick={onConfirm} style={{ marginLeft: 50, backgroundColor: "red", borderRadius: 20, width: 100 }}>确认</Button>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={onClose}>
                <Alert severity="success">
                    {toastMessage}
                </Alert>
            </Snackbar>
        </div>
    )
}