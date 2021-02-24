import { Card, makeStyles } from '@material-ui/core';
import * as echarts from 'echarts';
import React from 'react';

export default function Home(props) {
    var onlineStatisChart, customerPorprotionChart;

    const classes = useStyles();
    var data = [["2000-06-05", 116], ["2000-06-06", 129], ["2000-06-07", 135], ["2000-06-08", 86], ["2000-06-09", 73], ["2000-06-10", 85], ["2000-06-11", 73], ["2000-06-12", 68], ["2000-06-13", 92], ["2000-06-14", 130], ["2000-06-15", 245], ["2000-06-16", 139], ["2000-06-17", 115], ["2000-06-18", 111], ["2000-06-19", 309], ["2000-06-20", 206], ["2000-06-21", 137], ["2000-06-22", 128], ["2000-06-23", 85], ["2000-06-24", 94], ["2000-06-25", 71], ["2000-06-26", 106], ["2000-06-27", 84], ["2000-06-28", 93], ["2000-06-29", 85], ["2000-06-30", 73], ["2000-07-01", 83], ["2000-07-02", 125], ["2000-07-03", 107], ["2000-07-04", 82], ["2000-07-05", 44], ["2000-07-06", 72], ["2000-07-07", 106], ["2000-07-08", 107], ["2000-07-09", 66], ["2000-07-10", 91], ["2000-07-11", 92], ["2000-07-12", 113], ["2000-07-13", 107], ["2000-07-14", 131], ["2000-07-15", 111], ["2000-07-16", 64], ["2000-07-17", 69], ["2000-07-18", 88], ["2000-07-19", 77], ["2000-07-20", 83], ["2000-07-21", 111], ["2000-07-22", 57], ["2000-07-23", 55], ["2000-07-24", 60]];

    var dateList = data.map(function (item) {
        return item[0];
    });
    var valueList = data.map(function (item) {
        return item[1];
    });

    const statisOption = () => ({
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
                color: "white"
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: dateList
        },
        yAxis: {
        },
        series: {
            type: 'line',
            showSymbol: false,
            data: valueList
        }
    })
    const porprotionOption = () => ({
        title: {
            text: "用户比列",
            left: "center",
            textStyle: {
                color: "white"
            }
        },

        visualMap: {
            show: false,
            min: 200,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data: [
                    { value: 365, name: '江西' },
                    { value: 274, name: '浙江' },
                    { value: 310, name: '四川' },
                    { value: 335, name: '上海' },
                    { value: 300, name: '广州' }
                ],
                roseType: 'angle',
            }
        ]
    });
    React.useEffect(() => {

        onlineStatisChart = echarts.init(document.getElementById('onlineStatis'));
        onlineStatisChart.setOption(statisOption());

        customerPorprotionChart = echarts.init(document.getElementById('customerPorprotion'));
        customerPorprotionChart.setOption(porprotionOption());
    })
    // 绘制图表
    return (
        <div className={classes.wrapper}>

            <Card id="onlineStatis" className={classes.onlineStatis} />
            <Card id="customerPorprotion" className={classes.customerPorprotion} />

        </div>
    )
}

const useStyles = makeStyles(theme => ({
    wrapper: {
        width: "100%",
        height: "100%",
        // marginLeft: "10px",
        flexDirection: "row",
        display: "flex",
        margin: "60px 10px",

    },
    onlineStatis: {
        position: "absloute",
        width: "50%",
        height: 300,
        marginRight: "10px"
    },
    customerPorprotion: {
        width: "50%",
        height: 300
    }
}))