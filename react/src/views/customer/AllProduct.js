import { Avatar, Card, Divider, Grid, Link, List, makeStyles, Paper, Typography } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import Rating from '@material-ui/lab/Rating';
import { color } from "echarts";
import React from "react";
import { API_URL } from "../../constants/Constant";

export default function AllProduct(props) {
    const classes = useStyles();
    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        if (products == null || products.length === 0) {
            fetch(`${API_URL}/product/all`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json);
                    setProducts(json["data"]);
                })
        }
        return () => { console.log("cleanup") }
    });

    const onItemClick = (event) => {
        console.log("click");
    }
    return (
        <div className={classes.wraper}>
            <Grid container spacing={4} className={classes.container} justify="space-around">
                {
                    products.map((product) => (
                        <Grid item className={classes.item} xs={3} onClick={e => {
                            props.history.push("/customer/productDetails", product.id);
                        }}>
                            <div className={classes.itemHeader}>
                                <Avatar src={product.icon} style={{ width: 35, height: 35 }} />
                                <Typography style={{ flex: 4, color: "#2384E5", paddingLeft: 5 }}>
                                    <b> {product.name}</b>
                                </Typography>
                                <Rating disabled style={{ flex: 3 }} value={product.rating}></Rating>
                            </div>
                            <Divider />
                            <div style={{ height: 240 }}>
                                <Typography style={{ fontSize: 15, color: "gray", marginTop: 7 }}>
                                    {product.description}
                                </Typography>
                            </div>
                            <Divider />
                            <div className={classes.itemBottom}>
                                <Typography style={{ fontSize: 12, flex: "1" }}>
                                    上架日期:{product.launchTime}
                                </Typography>
                                <Typography style={{ fontSize: 12, alignSelf: "right" }}>
                                    价格:￥<b style={{ color: "red" }}>{product.price}</b>/年
                                </Typography>

                            </div>
                        </Grid>
                    ))
                }
            </Grid>
            <Pagination className={classes.pagination} count={1} />
        </div >
    )
}

const useStyles = makeStyles((theme) => ({
    wraper: {
        width: "100%",
        // height: "100%",
        position: "absolute",
        // backgroundColor: "red",
    },
    container: {
        width: "100%",
        // height: "100%",
        // marginBottom: 20,
    },

    item: {
        marginTop: 30,
        marginBottom: 30,
        height: 300,
        marginLeft: 35,
        boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: "10px",
        transition: "all 0.4s ease 0s",
        display: "flex",
        flexDirection: "column"
    },
    itemHeader: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
        // backgroundColor: "yellow"
    },
    itemBottom: {
        display: "flex",
        // position: "relative",
        // bottom: 0,
        flexDirection: "row"
    },
    pagination: {
        alignSelf: "center",
        display: "flex",
        justifyContent: "center"
    }

}));