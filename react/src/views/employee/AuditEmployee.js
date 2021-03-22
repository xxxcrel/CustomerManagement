import { Avatar, makeStyles, Box, Typography, AppBar, Toolbar, IconButton, TextField, Button, Snackbar } from "@material-ui/core";
import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { AddCircleRounded, ArrowLeftRounded, BackspaceRounded, BackupRounded, KeyboardArrowLeftRounded } from "@material-ui/icons";
import MuiAlert from '@material-ui/lab/Alert';
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);
function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export default function AuditManager(props) {

    const info = props.location.state;

    const [value, setValue] = React.useState(0);
    const [permission, setPermission] = React.useState('');
    const [area, setArea] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [toastMessage, setToastMessage] = React.useState("");
    const [loginState, setLoginState] = React.useState("success");

    const onClose = (event, reason) => {
        setSnackbarOpen(false);
    }
    const handleAreaChange = e => {
        setArea(e.target.value);
    }
    const handlePermissionChange = (event) => {
        setPermission(event.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <AppBar position="relative" style={{ boxShadow: "none", backgroundColor: "inherit" }}>
                <Toolbar>
                    <IconButton onClick={e => { props.history.goBack() }}>
                        <KeyboardArrowLeftRounded />
                    </IconButton>

                    <Typography style={{ color: "black", flexGrow: "1", textAlign: "center" }}>
                        {info.username}
                    </Typography>
                </Toolbar>
            </AppBar>

            <div className={classes.headerWrapper}>

                <Avatar src={info.avatarUrl} className={classes.avatar} />

                <div style={{ display: "flex", flexDirection: "column", marginTop: 10 }}>
                    <div style={{ display: "flex", flexDirection: "row" }}>

                        <Typography >
                            工号:{info.jobNum}
                        </Typography>

                        <div style={{ textAlign: "center", marginLeft: 10, marginTop: 2, fontSize: 12, width: 40, height: 20, borderRadius: 20, backgroundColor: "#3FD9D9", color: "white" }}>
                            {info.state.name}
                        </div>
                    </div>
                    <Typography style={{ marginTop: 5 }}>
                        姓名: {info.username}
                    </Typography>
                </div>
            </div>

            <div>
                <Paper square className={classes.tabWrapper}>
                    <Tabs
                        // className={classes.tabWrapper}
                        style={{ backgroundColor: "#f5f7fa" }}
                        value={value}
                        onChange={handleChange}
                        variant="standard"
                        indicatorColor="primary"
                        // textColor="secondary"
                        // TabIndicatorProps={{
                        //     textColor: "#83EB94",
                        //     backgroundColor: "#83EB94"
                        // }}
                        aria-label="icon tabs example"
                    >
                        <Tab label="基础信息" aria-label="person" />
                        <Tab label="权限管理" aria-label="phone" />
                        {/* <Tab icon={<FavoriteIcon />} aria-label="favorite" /> */}
                    </Tabs>
                    <hr style={{ height: 1, marginTop: 0 }} />

                </Paper>
                <TabPanel value={value} index={0} style={{ width: "100%" }}>
                    <div style={{ width: "inherit" }}>
                        <Button style={{ position: "fixed", right: 10, backgroundColor: "#50EBEB" }}>编辑</Button>

                    </div>
                    <div className={classes.inputWrapper}>
                        <label style={{ marginRight: 30, paddingTop: 10 }}>姓名:</label>
                        <TextField variant="outlined" size="small" value={info.username}></TextField>

                    </div>
                    <div className={classes.inputWrapper}>
                        <label style={{ marginRight: 30, marginTop: 10 }}>年龄:</label>
                        <TextField variant="outlined" size="small" value={info.age}></TextField>

                    </div>
                    <div className={classes.inputWrapper}>
                        <label style={{ marginRight: 30 }}>性别:</label>
                        <TextField variant="outlined" size="small" value={info.gender}></TextField>

                    </div>

                    <div className={classes.inputWrapper}>
                        <label>入职日期:</label>
                        <TextField variant="outlined" size="small" value={info.entryDate}></TextField>

                    </div>
                    <div className={classes.inputWrapper}>
                        <label>联系电话:</label>
                        <TextField variant="outlined" size="small" value={info.tel}></TextField>

                    </div>
                    <div className={classes.inputWrapper}>
                        <label>管理地区:</label>
                        <TextField variant="outlined" size="small" value={info.area}></TextField>

                    </div>

                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div>
                        <FormControl className={classes.margin}>
                            <InputLabel htmlFor="demo-customized-select-native">权限</InputLabel>
                            <NativeSelect
                                id="demo-customized-select-native"
                                value={permission}
                                onChange={handlePermissionChange}
                                input={<BootstrapInput />}
                            >
                                <option aria-label="None" value={0}>无</option>

                                <option value={10}>所有权</option>
                                <option value={20}>查看</option>
                                <option value={30}>添加</option>
                                <option value={40}>删除</option>
                                <option value={50}>修改</option>
                            </NativeSelect>
                        </FormControl>
                        <Button style={{ marginTop: 25, position: "fixed", right: 10, backgroundColor: "red", color: "white" }}>删除</Button>
                        <Button onClick={e => { setSnackbarOpen(true); setToastMessage("添加权限:查看"); setLoginState("success"); }} style={{ marginTop: 25, position: "fixed", right: 80, backgroundColor: "#50EBEB" }}>修改</Button>
                    </div>
                </TabPanel>
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
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%"
    },
    headerWrapper: {
        display: "flex",
        flexDirection: "row",
        height: 140,
        marginLeft: 60,
        marginTop: 20
    },
    avatar: {
        width: 100,
        height: 100,
        marginRight: 20
    },
    tabWrapper: {
        boxShadow: "none",
        backgroundColor: "$f5f7fa"
    },
    inputWrapper: {
        marginBottom: 10,
        alignItems: "center",
        // justifyContent: "center",
        display: "flex",
        flexDirection: "row"
    },
    margin: {
        width: 200
    }
}))