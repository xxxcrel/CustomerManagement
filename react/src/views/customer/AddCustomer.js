import { Button, InputAdornment, makeStyles, MenuItem, Snackbar, TextField } from "@material-ui/core";
import React from 'react';
import Alert from "../../components/Alert";
import { API_URL } from "../../constants/Constant";

export default function AddCustomer(props) {
    const classes = useStyles();
    const [companyName, setCompanyName] = React.useState("");
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [addState, setAddState] = React.useState("success");
    const [toastMessage, setToastMessage] = React.useState("");
    const [gender, setGender] = React.useState("男");
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [age, setAge] = React.useState("");
    const [tel, setTel] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [type, setType] = React.useState("PERSONAL");
    const [area, setArea] = React.useState("华东");

    const genders = [
        {
            value: "男",
            label: "男"
        },
        {
            value: "女",
            label: "女"
        },
    ];

    const types = [
        {
            value: "PERSONAL",
            label: "个人"
        },
        {
            value: "INDIVIDUAL",
            label: "私企"
        },
        {
            value: "STATE-OWNED",
            label: "国企"
        }
    ];

    const areas = [
        {
            value: "华东",
            label: "华东"
        },
        {
            value: "华西",
            label: "华西"
        },
        {
            value: "华北",
            label: "华北"
        },
        {
            value: "华南",
            label: "华南"
        }
    ]

    const onAddCustomer = () => {
        if (type !== "" && companyName !== "" && username !== ""
            && password !== "" && gender !== "" && tel !== "" && age !== ""
            && address !== "" && area !== "") {
            fetch(`${API_URL}/customer/add`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    companyName: companyName,
                    type: type,
                    username: username,
                    password: password,
                    gender: gender,
                    tel: tel,
                    age: age,
                    address: address,
                    area: area
                })
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    if (json["code"] === 200) {
                        setSnackbarOpen(true);
                        setAddState("success");
                        setToastMessage(json["data"]);
                    } else {
                        setSnackbarOpen(true);
                        setAddState("info");
                        setToastMessage(json["data"]);
                    }
                })
        }
    }
    const onClose = () => {
        setSnackbarOpen(false);
    }

    return (
        <div className={classes.wrapper}>
            <h4>添加客户</h4>
            <TextField className={classes.inputWrapper} select value={type} onChange={e => { setType(e.target.value) }} variant="outlined" size="small">
                {types.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField label="企业名" className={classes.inputWrapper} variant="outlined" size="small" placeholder="个人用户无需填写" value={companyName} onChange={e => setCompanyName(e.target.value)} />
            <TextField label="代表人" className={classes.inputWrapper} value={username} onChange={e => setUsername(e.target.value)} variant="outlined" size="small" />
            <TextField type="password" label="密码" className={classes.inputWrapper} value={password} onChange={e => setPassword(e.target.value)} variant="outlined" size="small" />
            <TextField label="性别" select value={gender} onChange={event => { setGender(event.target.value) }} className={classes.inputWrapper} variant="outlined" size="small" >
                {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField label="联系电话" value={tel} onChange={e => setTel(e.target.value)} className={classes.inputWrapper} variant="outlined" size="small" InputProps={{ startAdornment: <InputAdornment>+86 ： </InputAdornment> }} />
            <TextField label="年龄" value={age} onChange={e => setAge(e.target.value)} className={classes.inputWrapper} variant="outlined" size="small" />
            <TextField label="地址" placeholder="个人用户填写家庭地址, 企业用户填写公司地址" value={address} onChange={e => setAddress(e.target.value)} className={classes.inputWrapper} variant="outlined" size="small" />
            <TextField label="地区" select value={area} onChange={event => { setArea(event.target.value) }} className={classes.inputWrapper} variant="outlined" size="small" >
                {areas.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <Button className={classes.addButton} onClick={onAddCustomer}> 添加</Button>
            <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={onClose}>
                <Alert severity={addState}>
                    {toastMessage}
                </Alert>
            </Snackbar>
        </div>
    );

}

const useStyles = makeStyles({
    wrapper: {
        // borderRadius: "30px",
        height: 420,
        // backgroundColor: "yellow",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
    },
    inputWrapper: {
        width: 480,
        marginBottom: "20px",
    },
    addButton: {
        width: 480,
        backgroundColor: "#50ebeb"
    }
});