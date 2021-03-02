import { makeStyles } from "@material-ui/core";
import { Link, Switch, Route } from 'react-router-dom';
import { ArrowRightRounded } from "@material-ui/icons";
import AllManager from "./AllManager";
import AddManger from "./AddManager";
import AuditManager from "./AuditManager";

const routes = [
    {
        path: "/employee/all",
        exact: true,
        sidebar: "在职管理员",
        main: AllManager
    },
    {
        path: "/employee/add",
        sidebar: "添加管理员",
        main: AddManger
    },
    {
        path: "/employee/audit",
        sidebar: "管理员审计",
        main: AuditManager
    }
]
export default function EmpoloyeemManagement(props) {

    const classes = useStyles();


    return (
        <div className={classes.wrapper}>
            <div className={classes.sidebarWrapper}>
                <Sidebar />
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

function Sidebar(props) {

    return (
        <div>
            <h2 style={{ color: "white", paddingLeft: "90px" }}>管理员 </h2>
            <ul>
                <Link>

                </Link>
                <Link>
                </Link>
            </ul>
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
        position: "relative",
        width: "260px",
        backgroundColor: "black"

    },
    panelWrapper: {
        height: "100%",
        position: "relative",
        width: "calc(100% - 260px)",
        backgroundColor: "#f5f7fa"
    }
}))