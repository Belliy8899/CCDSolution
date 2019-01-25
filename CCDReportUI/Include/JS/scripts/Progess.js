$(function () {
    GetProgess();
    updatetime();
});

function updatetime() {
    var timer = setInterval(function () {
        var cd = new Date();
        var time = cd.getHours() + ':' + cd.getMinutes() + ':' + cd.getSeconds();
        var date = cd.getFullYear() + '-' + cd.getMonth() + '-' + cd.getDate();
        //var week = week[cd.getDay()];
        $('#time').html(date + " " + time);
        clearInterval(timer);
        updatetime();
    }, 1000)
}

function GetProgess() {
    var Progess = setInterval(function () {
        $.post("../../DataAPI/Progress.ashx", { Action: "GetProgressData" }, function (data) {
            try {
                GetProgessChart(data.PlanQtyList);
                GetProgessKPIChart(data.KpiList);
            } catch (e) {
                EyAlert("获取数据失败！");
            }
        }, "json");
        clearInterval(Progess);
        GetProgess();
    },1000)
}
function GetProgessChart(data) {
    if (data != null) {
        var myBarChart = echarts.init(document.getElementById('ProgessChart'), 'dark');
        option = {
            title: {
                text: '生产计划与进度',
                subtext: ''
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            legend: {
                data: ['实际', '计划']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01]
            },
            yAxis: {
                type: 'category',
                data: GetYBarData(data)
            },
            series: [
                {
                    name: '计划',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: GetPBarData(data)
                },
                {
                    name: '实际',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true
                        }
                    },
                    data: GetCBarData(data)
                }
            ]
        };
        myBarChart.setOption(option);
    }
}
function GetCBarData(theData) {
    var Ret = [];
    for (var i = 0; i < theData.length; i++) {
        Ret.push(theData[i].completeqty);
    }
    return Ret;
}

function GetPBarData(theData) {
    var Ret = [];
    for (var i = 0; i < theData.length; i++) {
        Ret.push(theData[i].planqty);
    }
    return Ret;
}
function GetYBarData(theData) {
    var Ret = [];
    for (var i = 0; i < theData.length; i++) {
        Ret.push(theData[i].type);
    }
    return Ret;
}
function GetProgessKPIChart(data) {
    var myBarChart = echarts.init(document.getElementById('ProgessKPIChart'), 'macarons');
    option = {
        color: ['#3398DB'],
        title: {
            text: 'KPI指标分析',
            subtext: ''
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: GetXBarData(data),
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'KPI',
                type: 'bar',
                label: {
                    normal: {
                        show: true
                    }
                },
                barWidth: '60%',
                data: GetYKPIBarData(data)
            }
        ]
    };
    myBarChart.setOption(option);
}
function GetXBarData(theData) {
    var Ret = [];
    for (var i = 0; i < theData.length; i++) {
        Ret.push(theData[i].kpiname);
    }
    return Ret;
}
function GetYKPIBarData(theData) {
    var Ret = [];
    for (var i = 0; i < theData.length; i++) {
        Ret.push(theData[i].kpivalue);
    }
    return Ret;
}

