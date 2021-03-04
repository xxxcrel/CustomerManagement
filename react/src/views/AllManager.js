import { Card, Divider, makeStyles, Avatar } from "@material-ui/core";
import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import { FormatTextdirectionLToRSharp } from "@material-ui/icons";
import { API_URL } from "../assets/jss/components/constants";
const tileData = [
    {
        img: "/assets/img/default_avatar.jpeg",
        title: "hello"
    }, {
        img: "/assets/img/default_avatar.jpeg",
        title: "hello"
    }, {
        img: "/assets/img/default_avatar.jpeg",
        title: "hello"
    }, {
        img: "/assets/img/default_avatar.jpeg",
        title: "hello"
    },
    {
        img: "/assets/img/default_avatar.jpeg",
        title: "hello"
    },

]

export default function AllManger(props) {

    const classes = useStyles();
    const [north, setNorth] = React.useState([]);
    const [south, setSouth] = React.useState([]);
    const [west, setWest] = React.useState([]);
    const [east, setEast] = React.useState([]);

    const names = ["华东", "华西", "华南", "华北"]

    React.useEffect(() => {
        if (east == null || east.length === 0) {


            fetch(`${API_URL}/manager/findByArea?area=${names[0]}`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json["data"]);
                    setEast(json["data"])
                });
        }
        if (west == null | west.length === 0) {

            fetch(`${API_URL}/manager/findByArea?area=${names[1]}`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json["data"]);
                    setWest(json["data"])
                });
        }
        if (south == null | south.length === 0) {

            fetch(`${API_URL}/manager/findByArea?area=${names[2]}`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json["data"]);
                    setSouth(json["data"])
                });
        }
        if (north == null | north.length === 0) {

            fetch(`${API_URL}/manager/findByArea?area=${names[3]}`)
                .then(resp => resp.json())
                .then(json => {
                    console.log(json["data"]);
                    setNorth(json["data"])
                });
        } return () => { console.log("cleanup") }
    })

    return (
        <div className={classes.wrapper}>
            <div className={classes.lineWrapper}>

                <Card className={classes.cardWrapper}>
                    <h3 style={{ alignSelf: "center" }}>华北地区管理员</h3>
                    <hr style={{ width: 480 }} />
                    <GridList cellHeight={160} className={classes.gridList} cols={5}>
                        {east.map((tile) => (
                            <GridListTile key={tile.avataUrl}>
                                <Avatar className={classes.avatar} src={tile.avatarUrl} alt={tile.title} />
                                <h5>{tile.username}</h5>
                            </GridListTile>
                        ))
                        }
                    </GridList>
                </Card>
                <Card className={classes.cardWrapper}>

                    <h3 style={{ alignSelf: "center" }}>华南地区管理员</h3>
                    <hr style={{ width: 480 }} />
                    <GridList cellHeight={160} className={classes.gridList} cols={5}>
                        {west.map((tile) => (
                            <GridListTile key={tile.avatarUrl}>
                                <Avatar className={classes.avatar} src={tile.avatarUrl} alt={tile.title} />
                                <h5>{tile.username}</h5>
                            </GridListTile>
                        ))}
                    </GridList>
                </Card>
            </div>
            <div className={classes.lineWrapper}>
                <Card className={classes.cardWrapper}>

                    <h3 style={{ alignSelf: "center" }}>华西地区管理员</h3>
                    <hr style={{ width: 480 }} />
                    <GridList cellHeight={160} className={classes.gridList} cols={5}>
                        {south.map((tile) => (
                            <GridListTile key={tile.avatarUrl}>
                                <Avatar className={classes.avatar} src={tile.avatarUrl} alt={tile.title} />
                                <h5>{tile.username}</h5>
                            </GridListTile>
                        ))}
                    </GridList>               </Card>
                <Card className={classes.cardWrapper}>
                    <h3 style={{ alignSelf: "center" }}>华东地区管理员</h3>

                    <hr style={{ width: 480 }} />
                    <GridList cellHeight={160} className={classes.gridList} cols={5}>
                        {north.map((tile) => (
                            <GridListTile key={tile.avatarUrl} >
                                <Avatar className={classes.avatar} src={tile.avatarUrl} alt={tile.title} />
                                <h5>{tile.username}</h5>
                            </GridListTile>
                        ))}
                    </GridList>
                </Card>
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    wrapper: {

        display: "flex",
        flexDirection: "column",
        // backgroundColor: "yellow",
        width: "100%",
        height: "100%"
    },
    lineWrapper: {
        // backgroundColor: "red",
        // margin: "10px 10px",
        width: "100%",
        height: "50%",
        display: "flex",
        flexDirection: "row"

    },
    cardWrapper: {
        marginTop: "20px",
        marginLeft: "10px",
        marginRight: "10px",
        // marginBottom: "20px",
        width: "48%",
        height: "94%",
        borderRadius: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // display: "flex",
        justifyContent: "center"
    },
    gridList: {
        width: 480,
        height: 450,
    },
    avatar: {
        width: 60,
        height: 60
    }
}))