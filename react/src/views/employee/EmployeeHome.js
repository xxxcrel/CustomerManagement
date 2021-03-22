import { Button, makeStyles } from "@material-ui/core";
import { Link, Switch, Route } from 'react-router-dom';
import { ArrowRightRounded } from "@material-ui/icons";
import AllEmployee from "./AllEmployee";
import AddEmployee from "./AddEmployee";
import AuditManager from "./AuditEmployee";
import Sidebar from "../../components/SideBar";


const routes = [
    {
        path: "/employee/all",
        exact: true,
        sidebar: "在职员工",
        main: AllEmployee
    },
    {
        path: "/employee/add",
        sidebar: "添加员工",
        main: AddEmployee
    },
    // {
    //     path: "/manager/audit",
    //     sidebar: "管理员审计",
    //     main: AuditManager
    // }
]
export default function EmployeeHome(props) {

    const classes = useStyles();

    return (
        <div className={classes.wrapper}>
            <div className={classes.sidebarWrapper}>
                <Sidebar routes={routes} title="员工审计中心" color="balck" />

                {/* <h2> hello</h2> */}
                {/* <Link to="/login" style={{ textDecoration: "none", width: "auto" }}> */}
                <Button style={{ backgroundColor: "red", color: "white", margin: "20px 20px" }} onClick={e => {
                    props.history.push("/login");
                }} >退出登入</Button>
                {/* </Link> */}

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
                            component={route.main}
                        />
                    ))}
                    <Route
                        key={3}
                        path="/employee/details"
                        exact={true}
                        component={AuditManager} />
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