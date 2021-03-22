import React from 'react';
import { List, Accordion, Avatar, Typography, makeStyles, IconButton, Button, Grid, Dialog, DialogContent, DialogActions, AppBar, Toolbar, Divider, TextField } from "@material-ui/core";
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link, Switch } from 'react-router-dom';
import { API_URL } from '../../constants/Constant';
import { Redirect, Route } from 'react-router';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { ArrowLeftRounded, BackspaceRounded, KeyboardArrowLeftRounded } from '@material-ui/icons';
import Rating from '@material-ui/lab/Rating';

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});
const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

export default function FeedbackHome(props) {

    const customer = props.location.state;
    const classes = useStyles();
    const [orders, setOrders] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const [showDetails, setShowDetails] = React.useState(false);
    const [currentProduct, setCurrentProduct] = React.useState(null);
    const [currentOrder, setCurrentOrder] = React.useState(null);

    const handleOpen = () => {
        setShowDetails(true);
    }

    const handleClose = () => {
        setShowDetails(false);
    }

    React.useEffect(() => {
        if (orders == null || orders.length === 0) {
            console.log(customer.customerId);
            fetch(`${API_URL}/customer/order?customerId=${customer.id}`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    setOrders(json["data"])
                })
        }
    })
    const AllProducts = (props) => {
        return (
            <Grid container spacing={3}>
                {
                    orders.map((order) => (
                        <Grid item xs={3}>
                            <IconButton style={{ width: 120, height: 120 }} onClick={e => {
                                setCurrentOrder(order);
                                setShowDetails(true);
                            }}>
                                <Avatar style={{ width: 60, height: 60 }} src={order.product.icon} alter="fail" variant="square" />
                            </IconButton>
                            <Typography style={{ textAlign: "center" }}>
                                {order.product.name}
                            </Typography>
                        </Grid>
                    ))
                }
            </Grid>
        );
    };
    const ProductDetail = (props) => {
        console.log(props);
        console.log(currentOrder);
        return (
            <div style={{ height: "100%", borderRadius: 10 }}>
                <AppBar position="relative" style={{ boxShadow: "none", backgroundColor: "inherit" }}>
                    <Toolbar >
                        <IconButton onClick={e => { setShowDetails(false) }}>
                            <KeyboardArrowLeftRounded />
                        </IconButton>
                        <Typography style={{ flexGrow: "1", textAlign: "center" }}>
                            <b style={{ color: "black" }}>{currentOrder.product.name}</b>
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Divider />

                <div style={{ height: "auto", display: "flex", flexDirection: "column", alignItems: "normal", margin: "10px 10px" }}>
                    <div style={{ flex: 1, marginLeft: 10, marginTop: 10 }} >
                        <Typography>
                            产品到期时间: <b>{currentOrder.endTime}</b>
                        </Typography>
                        <br />
                        <Typography>
                            授权码: <b>{currentOrder.authorizationCode}</b>
                        </Typography>

                    </div>
                    {/* <Divider orientation="vertical" flexItem style={{ height: "415px", marginRight: 10 }} /> */}
                    <Divider style={{ marginTop: 20 }} />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", marginTop: 20 }}>
                        <TextField
                            variant="outlined"
                            placeholder="对产品进行评价"
                            multiline={true}
                            rows={6}
                            style={{ width: "100%", }} />
                        <Typography style={{ marginRight: 10 }}>
                            给产品打个评分吧!
                        </Typography>
                        <Rating style={{ marginRight: 10, position: "relative", right: 0, marginBottom: 10 }} value={0} />
                        <Button color="secondary" variant="outlined" style={{ marginRight: 10 }}>
                            提交评价
                        </Button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.wrapper}>
            <Typography style={{ fontSize: 24, fontWeight: "bold" }}>
                客户服务中心
            </Typography>
            <div className={classes.panel}>

                <div style={{ margin: "10px 10px", display: "flex", flexDirection: "row", justifyContent: "start", alignItems: "start" }}>
                    <Avatar style={{ width: 80, height: 80 }}>
                        {customer.companyName[2]}
                    </Avatar>
                    <Typography style={{ marginLeft: 16, flexGrow: "1", marginTop: 10, }}>
                        公司全称: {customer.companyName}
                        <br />
                        代表人: {customer.username}
                    </Typography>
                    <Button style={{ backgroundColor: "red", color: "white" }} onClick={e => {
                        props.history.goBack();
                    }}>
                        退出
                    </Button>
                </div>
                <Typography style={{ fontWeight: "bold", margin: "5px 10px" }}>
                    您已购买的产品:
                </Typography>
                <div style={{ width: "100%", height: "100%", border: "1px solid", borderRadius: 10, borderColor: "grey" }}>
                    {showDetails ? <ProductDetail /> : <AllProducts />}
                </div>
            </div>
            <Dialog onClose={handleClose} open={false}>
                <DialogTitle>
                    产品详情
                </DialogTitle>
                <DialogContent>

                </DialogContent>
            </Dialog>
        </div >
    )
}


const useStyles = makeStyles((theme) => ({
    wrapper: {
        height: "100%",
        width: "100%",
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        backgroundImage: "linear-gradient(to right, #50eb8b, #0eb4dd)",
    },
    header: {
        color: "black"
    },
    panel: {
        backgroundColor: "#f5f7fa",
        width: "600px",
        height: "600px",
        borderRadius: "10px",
        // textAlign: "center",
        display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        flexDirection: "column",
        padding: "10px 10px",
        "&:hover,&:focus": {
            boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        }

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