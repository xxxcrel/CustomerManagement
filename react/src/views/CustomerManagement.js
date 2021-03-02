import { forwardRef } from 'react';
import React from 'react';
import MaterialTable from "material-table";
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Dialog, DialogActions, Button, Avatar, IconButton, TextField, CircularProgress, makeStyles, MenuItem, InputAdornment } from '@material-ui/core';
import { PageviewRounded, FolderRounded, AddRounded, AddCircleRounded, ArrowRightRounded, ArrowLeftRounded, FirstPageRounded, LastPageRounded, ReplySharp } from '@material-ui/icons';
import { use } from 'echarts';
import { API_URL } from '../assets/jss/components/constants';
// import defaultAvatar from "../assets/img/default_avatar.jpeg"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddCircleRounded {...props} ref={ref} style={{ color: "#298CEE" }} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} style={{ color: "dodgerblue" }} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color: "lightgray" }} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{ color: "red" }} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{ color: "blue" }} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
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
  {
    field: "avatar", title: "头像", render: rowData => <Avatar src={rowData.avatarUrl} alt="无"></Avatar>, editComponent: props => {
      return (
        <div>
          <Avatar
            // style={{backgroundImage: "url(" + }}
            onClick={event => { console.log("click") }}
            src={props.rowData.avatarUrl} alt="无" />
        </div>

      );
    },
    width: 40
  },
  { field: 'id', title: 'ID', width: 10 },
  { field: 'username', title: '姓名', width: 20 },
  { field: 'gender', title: '性别', width: 20 },
  { field: "idCard", title: '身份证', width: 40 },
  {
    field: 'age',
    title: '年龄',
    type: 'numeric',
    width: 40,
  },
  {
    field: 'address',
    title: '住址',
    width: 20
  },
  {
    field: 'tel',
    title: '电话',
    width: 50
  }
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
    // firstAriaLabel: string;
    previousTooltip: "上一页",
    // previousAriaLabel?: string;
    nextTooltip: "下一页",
    lastTooltip: "末页",
    // lastAriaLabel?: string;
    labelRowsSelect: "行"
  },
  toolbar: {
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
export default function CustomerManagement(props) {
  let rows;
  const classes = useStyles();
  const [add, setAdd] = React.useState(false);
  const [data, setData] = React.useState(rows);
  const [loaded, setLoaded] = React.useState(false);
  const [gender, setGender] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [age, setAge] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [idCard, setIdCard] = React.useState("");

  React.useEffect(() => {
    console.log("effect start");
    // setLoaded(false);
    if (!loaded) {
      setTimeout(() => {
        fetch(`${API_URL}/api/user/all`)
          .then(resp => {
            return resp.json();
          }).then(data => {
            // rows = data["data"];
            setLoaded(true);
            setData(data["data"]);
            // rows = data["data"];
            console.log(data);
          }).catch(error => {
            console.log("Error: " + error);

          });
      }, 1000);
    }
    console.log("effect end");
    return () => { console.log("cleanup") }
  })

  const handleAddOpen = () => {
    setAdd(true);
  };
  const handleAddClose = () => {
    setAdd(false);
  };

  const onAddCustomer = () => {
    console.log(username + age + tel + address + idCard + gender);
    var userData = {
      username: `${username}`,
      tel: `${tel}`,
      address: `${address}`,
      gender: `${gender}`,
      idCard: `${idCard}`,
      age: `${age}`
    }
    console.log(JSON.stringify(userData));
    // 
    fetch(`${API_URL}/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData)
    }).then(resp => resp.json())
      .then(json => {
        console.log(json["data"]);
      }).catch(error => {
        console.log("Error: " + error);
      });
  }

  return (
    <div className={classes.tableWrapper}>
      <MaterialTable
        // backgroundColor="#f5f7fa"
        title="客户"
        style={{ boxShadow: "none" }}
        icons={tableIcons}
        columns={columns}
        data={data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000)
            }),

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
          pageSize: 9,
          showTitle: false,
          draggable: true,
          paginationType: "stepped",
          searchFieldVariant: "outlined",
          searchFieldStyle: {
            borderRadius: "20px",
            height: "35px",
            // width: "200px",
          },
          actionsColumnIndex: columns.length,
          rowStyle: {
            backgroundColor: "#eee"
          }
        }}
        detailPanel={rowData => {
          return <h4> "{rowData.idCard}"</h4>
        }
        }
        actions={[
          {
            icon: tableIcons.Add,
            position: "toolbar",
            onClick: (event, rowData) => {
              handleAddOpen(true);
            }
          }
        ]
        }
      />

      {!loaded &&
        <div style={{ color: "#07A8BA", position: "absolute", top: "50%", left: "50%", }}>
          <CircularProgress color="inherit" />
        </div>
      }

      <Dialog onClose={handleAddClose} open={add} >

        <div className={classes.dialogWrapper}>
          <h4>添加客户</h4>
          <TextField label="姓名" className={classes.inputWrapper} value={username} onChange={e => setUsername(e.target.value)} variant="outlined" size="small" />
          <TextField label="性别" select value={gender} onChange={event => { setGender(event.target.value) }} className={classes.inputWrapper} variant="outlined" size="small" >
            {genders.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField label="电话" value={tel} onChange={e => setTel(e.target.value)} className={classes.inputWrapper} variant="outlined" size="small" InputProps={{ startAdornment: <InputAdornment>+86 ： </InputAdornment> }} />
          <TextField label="身份证" value={idCard} onChange={e => setIdCard(e.target.value)} className={classes.inputWrapper} variant="outlined" size="small" />
          <TextField label="年龄" value={age} onChange={e => setAge(e.target.value)} className={classes.inputWrapper} variant="outlined" size="small" />
          <TextField label="住址" value={address} onChange={e => setAddress(e.target.value)} className={classes.inputWrapper} variant="outlined" size="small" />
          {/* <TextField className={classes.inputWrapper} variant="outlined" size="small" /> */}
          <DialogActions onClick={handleAddClose}>
            <Button className={classes.addButton} onClick={onAddCustomer}>
              添加
            </Button>
          </DialogActions>

        </div>
      </Dialog>
    </div>

  );
}


const useStyles = makeStyles(theme => ({
  tableWrapper: {
    position: "relative",
    alignItems: "center",
    // padding: "1px",
    backgroundColor: "#f5f7fa",

  },
  dialogWrapper: {
    width: 360,
    // borderRadius: "30px",
    height: 420,
    // backgroundColor: "yellow",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    // padding: "20px 10px"
  },
  inputWrapper: {
    width: 280,
    marginBottom: "10px",
  },
  addButton: {
    backgroundColor: "#eee",
    borderRadius: "6px",
    width: "160px"
  }
}));