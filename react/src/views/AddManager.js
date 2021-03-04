import { Avatar, makeStyles, MenuItem, TextField } from "@material-ui/core";
import { AddAPhoto } from "@material-ui/icons";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import React from 'react';

export default function AddManager(props) {
    const onLogout = e => {
        props.history.push("/login");
    }

    const [selectedDate, setSelectedDate] = React.useState(new Date('2021-03-01T21:11:54'));

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const classes = useStyles();
    return (
        <div className={classes.wrapper}>
            <Avatar className={classes.avatarWrapper} onClick={onLogout}>
                <AddAPhoto />
            </Avatar>
            <b className={classes.labelWrapper}>姓名:</b>

            <TextField className={classes.inputWrapper} size="small" variant="outlined" />
            <b className={classes.labelWrapper}>工号:</b>
            <TextField className={classes.inputWrapper} size="small" variant="outlined" />
            <b className={classes.labelWrapper}>性别:</b>
            <TextField className={classes.inputWrapper} size="small" variant="outlined" select value={0}>
                <MenuItem value={0}>男</MenuItem>
                <MenuItem value={1}>女</MenuItem>
            </TextField>
            <b className={classes.labelWrapper}>电话:</b>
            <TextField className={classes.inputWrapper} size="small" variant="outlined" />
            <b className={classes.labelWrapper}>地址:</b>
            <TextField className={classes.inputWrapper} size="small" variant="outlined" />
            <b className={classes.labelWrapper}>入职日期:</b>
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

            </MuiPickersUtilsProvider>
            {/* <TextField className={classes.inputWrapper} size="small" variant="outlined" /> */}
            <b className={classes.labelWrapper} >阶段:</b>
            <TextField className={classes.inputWrapper} value={0} select size="small" variant="outlined" >
                <MenuItem value={0}>实习</MenuItem>
                <MenuItem value={1}>正式员工</MenuItem>
                <MenuItem value={2}>离职</MenuItem>
            </TextField>
            <b className={classes.labelWrapper} >管理区域</b>
            <TextField className={classes.inputWrapper} size="small" variant="outlined" />
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
    }
}));