import { Card, makeStyles } from '@material-ui/core';
import * as echarts from 'echarts';
import React from 'react';

export default function Home(props) {
    var statisMonthChart, statisDayChart, customerPorprotionChart, genderChart;

    const classes = useStyles();
    var monthData = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];

    var dayData = [[]];

    var monthDataList = monthData.map(function (item) {
        return item[0];
    });
    var monthValueList = monthData.map(function (item) {
        return item[1];
    });

    const [locationData, setLocationData] = React.useState("");

    const [genderData, setGenderData] = React.useState("");

    const monthStatisOption = () => ({
        visualMap: {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 350
        },
        title: {
            left: 'center',
            text: '客户在线统计(月)',
            textStyle: {
                color: "black"
            },
            top: "2%"
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: monthDataList
        },
        yAxis: {
        },
        series: {
            type: 'line',
            showSymbol: false,
            data: monthValueList
        }
    });
    const dayStatisOption = () => ({
        visualMap: {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 350
        },
        title: {
            left: 'center',
            text: '客户在线统计(天)',
            textStyle: {
                color: "black"
            },
            top: "2%"
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: monthDataList
        },
        yAxis: {
        },
        series: {
            type: 'line',
            showSymbol: false,
            data: monthValueList
        }
    })
    const porprotionOption = () => ({
        title: {
            text: "地区统计",
            left: "center",
            textStyle: {
                color: "black"
            },
            top: "2%"
        },

        visualMap: {
            show: false,
            min: 1,
            max: 10,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                // data: [
                //     { value: 365, name: '江西' },
                //     { value: 274, name: '浙江' },
                //     { value: 310, name: '四川' },
                //     { value: 335, name: '上海' },
                //     { value: 300, name: '广州' }
                // ],
                data: locationData,
                roseType: 'angle',
            }
        ]
    });

    const genderOption = () => ({
        title: {
            text: "性别比列",
            left: "center",
            textStyle: {
                color: "black"
            },
            top: "2%"
        },

        visualMap: {
            show: false,
            min: 10,
            max: 20,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data: genderData,
                roseType: 'angle',
            }
        ]
    });

    React.useEffect(() => {

        fetch("http://localhost:5147/api/statistics/location", {
            method: "GET"
        })
            .then(resp => resp.json())
            .then(json => {
                if (locationData == null || locationData.length == 0)
                    setLocationData(json["data"]);
            })
            .catch(error => {
                console.log("Error: " + error);
            });
        fetch("http://localhost:5147/api/statistics/gender", {
            method: "GET"
        })
            .then(resp => resp.json())
            .then(json => {
                if (genderData == null || genderData.length == 0)
                    setGenderData(json["data"]);
            })
            .catch(error => {
                console.log("Error: " + error);
            });

        statisMonthChart = echarts.init(document.getElementById('statisMonth'));
        statisMonthChart.setOption(monthStatisOption());

        customerPorprotionChart = echarts.init(document.getElementById('customerPorprotion'));
        customerPorprotionChart.setOption(porprotionOption());

        statisDayChart = echarts.init(document.getElementById("statisDay"));
        statisDayChart.setOption(dayStatisOption());

        genderChart = echarts.init(document.getElementById("gender"));
        genderChart.setOption(genderOption());
    })
    // 绘制图表
    return (
        <div className={classes.wrapper}>

            <div className={classes.lineWrapper}>
                <div id="statisMonth" className={classes.statisMonth} />
                <div id="customerPorprotion" className={classes.customerPorprotion} />

            </div>
            <div className={classes.lineWrapper}>

                <div id="statisDay" className={classes.statisDay} />
                <div id="gender" className={classes.gender} />
            </div>
        </div>
    )
}

const useStyles = makeStyles(theme => ({
    wrapper: {
        height: "100%",
        flexDirection: "column",
        display: "flex",
        margin: "10px",
    },
    lineWrapper: {
        display: "flex",
        flexDirection: "row",
        marginBottom: "15px",
        // flexBasis: "50%"

        height: "300px"
    },
    statisMonth: {
        position: "absloute",
        // paddingTop: "10px",
        width: "50%",
        // height: "400px",
        marginRight: "10px",
        boxShadow: "0",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: "10px",
        transition: "all 0.4s ease 0s",
        // boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        "&:hover,&:focus": {
            boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        }
    },
    statisDay: {
        // position: "absloute",
        width: "50%",
        // height: "",
        marginRight: "10px",
        boxShadow: "0",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: "10px",
        transition: "all 0.4s ease 0s",
        // boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        "&:hover,&:focus": {
            boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        }

    },
    customerPorprotion: {
        width: "50%",
        // height: "400px",
        boxShadow: "0",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: "10px",
        transition: "all 0.4s ease 0s",
        // boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        "&:hover,&:focus": {
            boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        }
    },
    gender: {
        width: "50%",
        // height: "400px",
        boxShadow: "0",
        backgroundColor: "rgb(255, 255, 255)",
        borderRadius: "10px",
        transition: "all 0.4s ease 0s",
        // boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        "&:hover,&:focus": {
            boxShadow: "0px 2px 8px rgb(0 0 0 / 10%), 3px 10px 30px rgb(0 0 0 / 8%)",
        }

    }
}))