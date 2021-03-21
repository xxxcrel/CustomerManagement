import { forwardRef } from 'react';
import React from 'react';
import MaterialTable from "material-table";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MuiAlert from '@material-ui/lab/Alert';
import { Card, Dialog, DialogActions, Button, Avatar, IconButton, TextField, CircularProgress, makeStyles, MenuItem, InputAdornment, Select, Snackbar } from '@material-ui/core';
import { PageviewRounded, FolderRounded, AddRounded, AddCircleRounded, ArrowRightRounded, ArrowLeftRounded, FirstPageRounded, LastPageRounded, ReplySharp, CloudDownload } from '@material-ui/icons';
import { use } from 'echarts';
import { API_URL } from '../../constants/Constant';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const tableIcons = {
  Add: forwardRef((props, ref) => <AddCircleRounded {...props} ref={ref} style={{ color: "#298CEE" }} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} style={{ color: "dodgerblue" }} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color: "lightgray" }} />),
  Delete: forwardRef((props, ref) => <Delete {...props} ref={ref} style={{ color: "red" }} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{ color: "blue" }} />),
  Export: forwardRef((props, ref) => <CloudDownload{...props} ref={ref} style={{ color: "#50EBEB" }} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPageRounded {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPageRounded {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ArrowRightRounded {...props} ref={ref} style={{ fontSize: "35" }} />),
  PreviousPage: forwardRef((props, ref) => <ArrowLeftRounded {...props} ref={ref} style={{ fontSize: "35" }} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


const columns = [
  // { field: 'id', title: 'ID', width: 10 },
  // 
  {
    field: 'companyName',
    title: '公司'
  },
  // {
  //   field: 'area.name',
  //   title: '地区',
  //   width: 10
  // },
  { field: 'username', title: '代表人', width: 10 },
  {
    field: 'tel',
    title: '电话',
    width: 20
  },
  { field: 'gender', title: '性别', width: 10 },
  {
    field: 'age',
    title: '年龄',
    // type: 'numeric',
    width: 10,
  },
];

const localization = {
  header: {
    actions: "操作"
  },
  body: {
    emptyDataSourceMessage: "",
    editRow: {
      deleteText: <div style={{ color: "red" }}>确定删除此客户吗?</div>
    }
  },
  pagination: {
    firstTooltip: "首页",
    previousTooltip: "上一页",
    nextTooltip: "下一页",
    lastTooltip: "末页",
    labelRowsSelect: "行"
  },
  toolbar: {
    nRowsSelected: n => `已选择${n}行`,
    exportCSVName: "导出为CSV",
    exportPDFName: "导出为PDF",
    searchTooltip: "精准查询",
    searchPlaceholder: "请输入查询条件"
  }
}
const genders = [
  {
    value: "male",
    label: "男"
  },
  {
    value: "female",
    label: "女"
  },
];
export default function AllCustomer(props) {
  let rows;
  const classes = useStyles();
  const [data, setData] = React.useState(rows);
  const [loaded, setLoaded] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");
  const [loginState, setLoginState] = React.useState("success");
  const [selectedDate, setSelectedDate] = React.useState(new Date('2021-03-01T21:11:54'));

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  const onClose = (event, reason) => {
    setSnackbarOpen(false);
  }

  React.useEffect(() => {
    console.log("effect start");
    // setLoaded(false);
    if (!loaded) {
      setTimeout(() => {
        fetch(`${API_URL}/customer/all`)
          .then(resp => {
            return resp.json();
          }).then(data => {
            // rows = data["data"];
            setLoaded(true);
            console.log(data["data"]);
            setData(data["data"]);
            // rows = data["data"];
          }).catch(error => {
            console.log("Error: " + error);

          });
      }, 1000);
    }
    console.log("effect end");
    return () => { console.log("cleanup") }
  })


  const AreaSelector = () => {
    return (
      <TextField select variant="outlined" size="small" value={0} style={{ width: 90, marginTop: 10 }} SelectProps={{
        native: true
      }}>
        <option value={0}>华中</option>
        <option value={1}>华北</option>
      </TextField>
    )
  }
  return (
    <div className={classes.tableWrapper}>
      <MaterialTable
        // backgroundColor="#f5f7fa"
        title={AreaSelector()}
        style={{ boxShadow: "none" }}
        icons={tableIcons}
        columns={columns}
        data={data}
        editable={{
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve()
              }, 1000)
            }),
        }
        }
        localization={localization}
        options={{
          exportButton: true,
          pageSize: 10,
          columnResizable: true,
          // showTitle: false,
          // draggable: true,
          overflowY: "scroll",
          paginationType: "stepped",
          searchFieldVariant: "outlined",
          searchFieldStyle: {
            borderRadius: "20px",
            height: "35px",
            // width: "200px",
          },
          exportFileName: "所有客户数据",
          selection: true,
          actionsColumnIndex: columns.length,
          rowStyle: {
            backgroundColor: "#eee"
          }
        }}
        detailPanel={rowData =>
        (
          <div style={{ alignItems: "center", display: "flex", padding: "0px 200px", flexDirection: "column" }}>

            <div style={{ display: "flex", flexDirection: "row" }}>
              <h3 style={{ alignSelf: "center", textAlign: "center" }}>客户详细信息</h3>
              <div style={{ alignSelf: "center", marginLeft: "100px" }}><Button style={{ backgroundColor: "#50EBEB", height: "30px", }} onClick={e => { setDisable(!disable) }}>编辑</Button></div>
            </div>
            <div style={{ width: "100%", height: 360, display: "flex", flexDirection: "row", justifyContent: "center" }}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField variant="outlined" size="small" disabled label="地区" style={{ width: 280, height: 50 }} value={rowData.area.name} > </TextField>
                <TextField variant="outlined" size="small" disabled label="姓名" style={{ width: 280, height: 50 }} value={rowData.username}> </TextField>
                <TextField variant="outlined" size="small" disabled={disable} label="电话" style={{ width: 280, height: 50 }} value={rowData.tel}> </TextField>
                <TextField variant="outlined" size="small" disabled label="性别" style={{ width: 280, height: 50 }} value={rowData.gender}> </TextField>
                <TextField variant="outlined" size="small" disabled label="年龄" style={{ width: 280, height: 50 }} value={rowData.age}> </TextField>
                <TextField variant="outlined" size="small" disabled={disable} label="地址" style={{ width: 280, height: 50 }} value={rowData.address}> </TextField>
              </div>

              <div style={{ display: "flex", flexDirection: "column", marginLeft: 80 }}>
                <TextField variant="outlined" size="small" disabled label="客户类型" style={{ width: 280, height: 50 }} value={rowData.type.typeDesc}> </TextField>
              </div>
            </div>
          </div>
        )}

      />

      {!loaded &&
        <div style={{ color: "#07A8BA", position: "absolute", top: "50%", left: "50%", }}>
          <CircularProgress color="inherit" />
        </div>
      }

      <Snackbar open={snackbarOpen} autoHideDuration={1500} onClose={onClose}>
        <Alert severity={loginState}>
          {toastMessage}
        </Alert>
      </Snackbar>

    </div>

  );
}

function DetailPanel(rowData) {
  // const classes = useStyles();


}


const useStyles = makeStyles(theme => ({
  tableWrapper: {
    position: "relative",
    alignItems: "center",
    // padding: "1px",
    backgroundColor: "white",

  },
  inputWrapper: {
    width: 280,
    marginBottom: "10px",
  },
  addButton: {
    backgroundColor: "#eee",
    borderRadius: "6px",
    width: "160px"
  },
  detailInputField: {
    height: 30,
    width: 200
  }
}));