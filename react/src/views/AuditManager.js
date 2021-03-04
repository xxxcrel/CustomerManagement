import { Avatar, makeStyles, Box, Typography, AppBar, Toolbar, IconButton } from "@material-ui/core";
import PropTypes from 'prop-types';
import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import { ArrowLeftRounded, BackspaceRounded, BackupRounded, KeyboardArrowLeftRounded } from "@material-ui/icons";

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
                        <Tab icon={<PersonPinIcon />} aria-label="person" />
                        <Tab icon={<PhoneIcon />} aria-label="phone" />
                        {/* <Tab icon={<FavoriteIcon />} aria-label="favorite" /> */}
                    </Tabs>
                    <hr style={{ height: 1, marginTop: 0 }} />

                </Paper>
                <TabPanel value={value} index={0}>
                    Item One
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
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
        marginLeft: 80,
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
    }
}))