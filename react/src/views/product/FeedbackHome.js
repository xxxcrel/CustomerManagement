import React from 'react';
import { List, Accordion, Avatar, Typography, makeStyles, IconButton, Button, Grid, Dialog, DialogContent, DialogActions } from "@material-ui/core";
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Switch } from 'react-router-dom';
import { API_URL } from '../../constants/Constant';
import { Redirect, Route } from 'react-router';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

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

    const handleOpen = () => {
        setShowDetails(true);
    }

    const handleClose = () => {
        setShowDetails(false);
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

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
    const PurchasedProducts = (props) => {
        return (
            <Grid container spacing={3}>
                {
                    orders.map((order) => (
                        <Grid item xs={3}>
                            <IconButton style={{ width: 150, height: 150 }} onClick={e => {
                                handleOpen();
                            }}>
                                <Avatar style={{ width: 90, height: 90 }} src={order.product.icon} alter="fail" variant="square" />
                            </IconButton>
                            <Typography style={{ textAlign: "center" }}>
                                {order.product.name}
                            </Typography>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }

    return (
        <div className={classes.wrapper}>
            <Typography style={{ fontSize: 24, fontWeight: "bold" }}>
                Cheese科技客户服务中心
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
                    在Cheese科技购买的产品:
                </Typography>
                <div style={{ width: "100%", height: "100%", border: "1px solid", borderRadius: 10, borderColor: "grey" }}>
                    <PurchasedProducts />
                </div>
            </div>
            <Dialog onClose={handleClose} open={showDetails}>
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