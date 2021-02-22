import { forwardRef } from 'react';
import React from 'react';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Dialog, DialogActions, Button, Avatar, IconButton, TextField, CircularProgress } from '@material-ui/core';
import { PageviewRounded, FolderRounded, AddRounded } from '@material-ui/icons';
// import defaultAvatar from "../assets/img/default_avatar.jpeg"

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} style={{ color: "purple" }} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} style={{ color: "dodgerblue" }} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} style={{ color: "lightgray" }} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} style={{ color: "red" }} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} style={{ color: "#83EB94" }} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
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
    }
  },
  { field: 'id', title: 'ID', width: 40 },
  { field: 'username', title: '姓名', width: 40 },
  { field: 'gender', title: '性别', width: 30 },
  { field: "idCard", title: '身份证' },
  {
    field: 'age',
    title: '年龄',
    type: 'numeric',
    width: 40,
  },
  {
    field: 'address',
    title: '住址',
  },
  {
    field: 'tel',
    title: '电话'
  }
];

// r rows = [
//   { avatarUrl: "/assets/img/default_avatar.jpeg", id: 1, fullName: 'Snow', IDCard: "36233119329139129", gender: 'Jon', age: 35 },
//   { avatarUrl: "/assets/img/default_avatar.jpeg", id: 2, fullName: 'Lannister', IDCard: "36233119329139129", gender: 'Cersei', age: 42 },
//   { avatarUrl: "/assets/img/default_avatar.jpeg", id: 3, fullName: 'Lannister', IDCard: "36233119329139129", gender: 'Jaime', age: 45 },
//   { avatarUrl: "/assets/img/default_avatar.jpeg", id: 4, fullName: 'Stark', IDCard: "36233119329139129", gender: 'Arya', age: 16 },
//   { avatarUrl: "/assets/img/default_avatar.jpeg", id: 5, fullName: 'Targaryen', IDCard: "36233119329139129", gender: 'Daenerys', age: null },
//   { avatarUrl: "/assets/img/default_avatar.jpeg", id: 6, fullName: 'Melisandre', IDCard: "36233119329139129", gender: null, age: 150 },
//   { avatarUrl: "/assets/img/default_avatar.jpeg", id: 7, fullName: 'Clifford', IDCard: "36233119329139129", gender: 'Ferrara', age: 44 },
//   { avatarUrl: "/assets/img/default_avatar.jpeg", id: 8, fullName: 'Frances', IDCard: "36233119329139129", gender: 'Rossini', age: 36 },
//   { avatarUrl: "/assets/img/default_avatar.jpeg", id: 9, fullName: 'Roxie', IDCard: "36233119329139129", gender: 'Harvey', age: 65 },
// ];

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

export default function CustomerManagement(props) {
  let rows;

  const [add, setAdd] = React.useState(false);

  const [data, setData] = React.useState(rows);

  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    console.log("effect start");
    // setLoaded(false);
    if (!loaded) {
      setTimeout(() => {
        fetch("http://localhost:5147/api/userList")
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

  return (
    <div style={{ position: "relative", alignItems: "center" }}>
      <MaterialTable
        title="客户"
        style={{ boxShadow: "none" }}
        icons={tableIcons}
        columns={columns}
        data={data}
        editable={{
          // onRowAdd: newData =>
          //   new Promise((resolve, reject) => {
          //     setTimeout(() => {
          //       setData([...data, newData]);

          //       resolve();
          //     }, 1000)
          //   }),
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
          // deleteTooltip: rowData => "确定删除此客户吗?"
        }
        }
        localization={localization}
        options={{ actionsColumnIndex: columns.length }}
        detailPanel={rowData => {
          return <h4> "{rowData.IDCard}"</h4>
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
      <Dialog onClose={handleAddClose} open={add}>
        <DialogActions onClick={handleAddClose}>
          <Button>
            添加
          </Button>
        </DialogActions>
        <TextField></TextField>
        <TextField />
        <TextField />
        <TextField />
        <TextField />
        <TextField />
        <TextField />
      </Dialog>

    </div>

  );
}