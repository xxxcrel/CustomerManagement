import { Button, makeStyles } from "@material-ui/core";
import { Link, Switch, Route } from 'react-router-dom';
import { ArrowRightRounded } from "@material-ui/icons";
import AllManager from "./AllManager";
import AddManger from "./AddManager";
import AuditManager from "./AuditManager";
import Sidebar from "../components/SideBar";

const routes = [
    {
        path: "/manager/all",
        exact: true,
        sidebar: "在职管理员",
        main: AllManager
    },
    {
        path: "/manager/add",
        sidebar: "添加管理员",
        main: AddManger
    },
    // {
    //     path: "/manager/audit",
    //     sidebar: "管理员审计",
    //     main: AuditManager
    // }
]
export default function EmpoloyeemManagement(props) {

    const classes = useStyles();


    return (
        <div className={classes.wrapper}>
            <div className={classes.sidebarWrapper}>
                <Sidebar routes={routes} title="员工管理" color="balck" />

                {/* <h2> hello</h2> */}
                <Button style={{ backgroundColor: "red", color: "white" }} onClick={e => { }}>退出登入</Button>

            </div>

            <div className={classes.panelWrapper}>
                <Switch>
                    {routes.map((route, index) => (
                        // Render more <Route>s with the same paths as
                        // above, but different components this time.
                        <Route
                            key={index}
                            path={route.path}
                            exact={route.exact}
                            children={<route.main />}
                        />
                    ))}
                </Switch>
            </div>
        </div>
    )
}


const useStyles = makeStyles(theme => ({
    wrapper: {
        display: "flex",
        height: "100%",
        width: "100%",
        flexDirection: "row",
        backgroundColor: "yellow"
    },
    sidebarWrapper: {
        height: "100%",
        // position: "relative",
        width: "260px",
        backgroundColor: "black",
        display: "flex",
        // backgroundColor: "yellow",
        flexDirection: "column"
    },
    panelWrapper: {
        height: "100%",
        position: "relative",
        width: "calc(100% - 260px)",
        backgroundColor: "#f5f7fa"
    }
}))