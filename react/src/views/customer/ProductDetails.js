import React from "react";
import { AppBar, Snackbar, Button, Toolbar, IconButton, makeStyles, Divider, Typography, List, ListItem, Avatar, Accordion, Dialog, TextField, MenuItem, duration } from '@material-ui/core';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { KeyboardArrowLeftRounded, RateReview } from "@material-ui/icons";
import { API_URL } from "../../constants/Constant";
import Rating from "@material-ui/lab/Rating";
import Alert from "../../components/Alert";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers'
export default function ProductDetails(props) {
    let productId = props.location.state;
    const classes = useStyles();
    const [product, setProduct] = React.useState("");
    const [comments, setComments] = React.useState([]);
    const [orders, setOrders] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [addState, setAddState] = React.useState("success");
    const [toastMessage, setToastMessage] = React.useState("");
    const [startDate, setStartDate] = React.useState(new Date());
    const [endDate, setEndDate] = React.useState(new Date());
    const [customers, setCustomers] = React.useState([]);
    const [finalPrice, setFinalPrice] = React.useState(0);
    const [selectedCustomer, setSelectedCustoemr] = React.useState("");

    const handleStartChange = (date) => {
        setStartDate(date);
        console.log(date);
    };
    const handleEndChange = (date) => {
        setEndDate(date);
        var duration = (date - startDate) / (1000 * 60 * 60 * 24);
        console.log(duration);
        if (duration > 0) {
            setFinalPrice(parseInt(duration / 365 * product.price));
        }
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    const onSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    React.useEffect(() => {
        if (product == null || product === "") {
            fetch(`${API_URL}/product/one?id=${productId}`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    setProduct(json["data"]);
                })
        }
        if (comments == null || comments.length === 0) {
            fetch(`${API_URL}/product/comments?id=${productId}`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    setComments(json["data"]);
                })
        }
        if (orders == null || orders.length === 0) {
            refreshOrder();
        }
        if (customers == null || customers.length === 0) {
            fetch(`${API_URL}/customer/all`)
                .then(resp => resp.json())
                .then(data => {
                    console.log(data["data"]);
                    setCustomers(data["data"]);
                }).catch(error => {
                    console.log("Error: " + error);

                });
        }
    })

    const refreshOrder = () => {
        fetch(`${API_URL}/product/${productId}/order`)
            .then(resp => resp.json())
            .then(json => {
                console.log(json);
                setOrders(json["data"]);
            })

    }
    const addOrder = () => {
        setDialogOpen(true);
    }
    const onAddOrder = () => {
        console.log(startDate.toLocaleDateString());
        if (selectedCustomer !== "" && endDate > startDate && finalPrice > 0) {
            fetch(`${API_URL}/product/purchase`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    companyName: selectedCustomer,
                    productId: product.id,
                    startTime: startDate.toLocaleDateString(),
                    endTime: endDate.toLocaleDateString(),
                    finalPrice: finalPrice
                })
            })
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    if (json["code"] === 200) {
                        setSnackbarOpen(true);
                        setToastMessage(json["data"]);
                        setAddState("success");
                        handleDialogClose();
                        refreshOrder();
                    }
                }).catch(err => {
                    setSnackbarOpen(true);
                    setToastMessage("网络延迟,请稍后重试");
                    setAddState("error");
                    handleDialogClose();
                })
        }
    }
    return (
        <div className={classes.wrapper}>
            <AppBar position="relative" style={{ backgroundColor: "inherit", boxShadow: "none", }}>
                <Toolbar>
                    <IconButton edge="start" onClick={e => { props.history.goBack() }} style={{ marginLeft: 0 }}>
                        <KeyboardArrowLeftRounded style={{ color: "black" }} />
                    </IconButton>
                    <Typography style={{ color: "black", flexGrow: "1", textAlign: "center", fontWeight: "bold" }}>
                        {product.name}
                    </Typography>
                    <Button style={{ backgroundColor: "#50ebeb" }} onClick={addOrder}>
                        新增订单
                    </Button>
                </Toolbar>
            </AppBar>

            <Divider />
            <div style={{ display: "flex", flexDirection: "row", height: "666px" }}>
                <div style={{ display: "flex", flexDirection: "column", flex: 2, padding: "10px 10px" }}>
                    <div style={{ flex: 1 }}>
                        <Typography className={classes.header3}>
                            产品详情
                        </Typography>
                        <Typography>
                            {product.description}
                        </Typography>

                    </div>
                    <Divider />
                    <div style={{ flex: 1, marginTop: 10 }}>
                        <Typography className={classes.header3}>
                            客户评价:
                        </Typography>
                        <List>
                            {
                                comments.map((comment) => (
                                    <ListItem>
                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <div style={{ width: "500px", display: "flex", flexDirection: "row", marginBottom: 10 }}>
                                                <Avatar>{comment.customer.companyName[2]}</Avatar>
                                                <Typography style={{ flex: 8, marginLeft: 6 }}>
                                                    {comment.customer.companyName}
                                                    <br />
                                                    {comment.reviewDate}
                                                </Typography>

                                                <Rating style={{ flex: 2 }} value={comment.rating} disabled />
                                            </div>
                                            <Typography style={{ fontSize: 14, paddingLeft: 50 }}>

                                                {comment.review}
                                            </Typography>
                                        </div>
                                    </ListItem>
                                ))
                            }
                        </List>
                    </div>
                </div>
                <Divider orientation="vertical" />
                {/* <div style={{ marginLeft: 20, width: 1, height: 100, borderLeft: "1px solid", borderColor: "red" }} /> */}
                <div style={{ flex: 2, height: "666px", padding: "10px 10px" }}>
                    <Typography className={classes.header3} style={{ marginLeft: 20 }}>
                        已购客户
                    </Typography>
                    <List>
                        {
                            orders.map((order) => (
                                <ListItem >
                                    <Accordion style={{ width: "100%", }} expanded={expanded === order.id} onChange={handleChange(order.id)}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1bh-content"
                                            id="panel1bh-header"
                                        >
                                            <Typography className={classes.heading}>{order.customer.companyName}</Typography>
                                            <Typography className={classes.secondaryHeading}>代表人:{order.customer.username}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                购买期限: <b>{order.startTime}</b> - <b>{order.endTime}</b>
                                                <br />
                                                最终合作价格: ￥<b>{order.finalPrice}</b>
                                                <br />
                                                授权码: {order.authorizationCode}
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </ListItem>
                            ))
                        }
                    </List>
                </div>
            </div>
            <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={onSnackbarClose}>
                <Alert severity={addState}>
                    {toastMessage}
                </Alert>
            </Snackbar>

            <Dialog onClose={handleDialogClose} open={dialogOpen} >

                <div style={{ display: "flex", flexDirection: "column", paddingLeft: 20, textAlign: "start", width: 340 }}>
                    <Typography style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, marginTop: 10, }}>
                        新增订单
                    </Typography>
                    <Typography style={{ marginTop: 20 }} >
                        选择客户:
                    </Typography>
                    <TextField select
                        // SelectProps={{ native: true }}
                        value={selectedCustomer}
                        onChange={e => setSelectedCustoemr(e.target.value)}
                        variant="outlined"
                        size="small"
                        style={{ marginTop: 10, marginBottom: 10, width: 320 }}>
                        {
                            customers.map((customer) => (
                                <MenuItem key={customer.id} value={customer.companyName}>
                                    {customer.companyName}
                                </MenuItem>
                            ))
                        }
                    </TextField>
                    <Typography style={{ marginBottom: 10 }}>
                        购买产品: <b style={{ color: "red" }}>{product.name}</b>
                    </Typography>
                    <Typography style={{ marginBottom: 10 }}>
                        产品单价: <b style={{ color: "red" }}>¥{product.price}/年</b>
                    </Typography>
                    <Typography >
                        购买期限:
                    </Typography>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 10 }}>

                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="date-picker-start"
                                value={startDate}
                                style={{
                                    border: "solid",
                                    borderWidth: "1px",
                                    textDecoration: "none",
                                    borderRadius: "5px",
                                    width: 145,
                                    height: 35,
                                    textAlign: "center",
                                    justifyContent: "center"

                                }}
                                InputProps={{
                                    disableUnderline: true,

                                }}
                                onChange={handleStartChange}
                            />

                        </MuiPickersUtilsProvider>
                        <b style={{ marginLeft: 5, marginRight: 5 }}> 至 </b>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                                disableToolbar
                                format="yyyy/MM/dd"
                                margin="normal"
                                id="date-picker-end"
                                value={endDate}
                                style={{
                                    border: "solid",
                                    borderWidth: "1px",
                                    textDecoration: "none",
                                    borderRadius: "5px",
                                    width: 145,
                                    height: 35,
                                    textAlign: "center",
                                    justifyContent: "center"

                                }}
                                InputProps={{
                                    disableUnderline: true,

                                }}
                                onChange={handleEndChange}
                            />

                        </MuiPickersUtilsProvider>

                    </div>
                    <Typography>
                        总价格: <b style={{ color: "red" }}>￥{finalPrice}</b>
                    </Typography>
                    <Button onClick={onAddOrder} style={{ backgroundColor: "#50ebeb", marginTop: 10, marginBottom: 20, width: 320 }}>
                        生成订单
                    </Button>
                </div>
            </Dialog>
        </div >
    )
}

const useStyles = makeStyles((theme) => ({
    wrapper: {
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // flexDirection: "column",
        // height: "400px"
    },
    header3: {
        fontSize: 18,
        fontWeight: "bolder"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));