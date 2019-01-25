$(function () {
    var qq = decodeURI(GetQueryString('s')) + "(" + decodeURI(GetQueryString('ip')) + ")" + "_CCD监控数据详情";
    $("#TitleDiv").html(qq);
    GetCCDDataDetails();
    GetDatetime();

});
//获取页面传递的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);  //获取url中"?"符后的字符串并正则匹配            
    var context = "";
    if (r != null)
        context = r[2];
    reg = null;
    r = null;
    return context == null || context == "" || context == "undefined" ? "" : context;
}
//加载页面
function GetCCDDataDetails() {
    var p = decodeURI(GetQueryString('p'));
    var e = decodeURI(GetQueryString('e'));
    var s = decodeURI(GetQueryString('s'));
    var GetCCDKpiDetails = setInterval(function () {
        $.post("../../DataAPI/CCDKpiDetails.ashx", { Action: "GetCCDKpiDetails", project: p, equipmentadress: e, station: s, starttime: $("#datetimepickerstart").val(), endtime: $("#datetimepickerend").val() },
        function (data) {
            try {
                GetAlramTable(data.listAlram);
                GetAlramChart(data.listAlramNum);
                GetAlramPieChart(data.listAlramNum);
                GetYiledTrend(data.listAlramTread, data.listYiled, data.listOkrate);
            } catch (e) {
                alert("获取数据失败！");
            }
        }, "json");
        clearInterval(GetCCDKpiDetails);
        GetCCDDataDetails();
    }, 1000)
}
//报警信息表格
function GetAlramTable(alramdata) {
    $("#AlramInfotable").empty();
    var html = "";
    html += "<table  class=\"table table-hover\">";
    html += "<thead> <tr><th>报警时间</th> <th>报警信息</th> </tr> </thead><tbody>";
    for (var i = 0; i < alramdata.length; i++) {
        html += "<tr><td style=\"white-space:nowrap\">" + alramdata[i].collecttime + "</td> <td style=\" white-space:nowrap\">" + alramdata[i].alraminfo + "</td></tr>";
    }
    html += "</tbody></table>";
    $("#AlramInfotable").append(html);
}
//报警TOP5
function GetAlramChart(tdata) {
    var temp = echarts.init(document.getElementById('AlramInfoTop5'));
    option = {
        title: {
            text: '报警原因TOP5',
            x: 'left'
        },
        color: ['#3398DB'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: GetXBarData(tdata),
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    show: true,
                    formatter: function (params) {
                        var newParamsName = "";
                        var paramsNameNumber = 10;//params.length;
                        var provideNumber = 5;  //一行显示几个字
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                        if (paramsNameNumber > provideNumber) {
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = "";
                                var start = p * provideNumber;
                                var end = start + provideNumber;
                                if (p == rowNumber - 1) {
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    tempStr = params.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr;
                            }

                        } else {
                            newParamsName = params;
                        }
                        return newParamsName
                    },
                    textStyle: {
                        color: '#6861a6' //文字颜色
                    }
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
                name: '报警次数',
                type: 'bar',
                barWidth: '60%',
                data: GetYBarData(tdata),
                itemStyle: {
                    normal: {
                        label: {
                            show: true, //开启显示
                            position: 'top', //在上方显示
                            textStyle: { //数值样式
                                color: '#4169E1',
                                fontSize: 16
                            }
                        }
                    }
                }
            }
        ]
    };
    temp.setOption(option);
}
function GetXBarData(theData) {
    var Ret = [];
    if (theData.length > 5)
        theData.length = 5;
    for (var i = 0; i < theData.length; i++) {
        Ret.push(theData[i].alramname);
    }
    return Ret;
}
function GetYBarData(theData) {
    var Ret = [];
    if (theData.length > 5)
        theData.length = 5;
    for (var i = 0; i < theData.length; i++) {
        Ret.push(theData[i].num);
    }
    return Ret;
}
//报警分布饼图
function GetAlramPieChart(kdata) {
    var temp = echarts.init(document.getElementById('OkRatePie'));
    option = {
        title: {
            text: '报警分布饼图',
            x: 'left'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        //color: ['green', 'red'],
        //legend: {
        //    orient: 'vertical',
        //    left: 'right',
        //    data: GetXPieBarData(kdata)
        //},
        series: [
            {
                name: '比例',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: GetPieBarData(kdata),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    temp.setOption(option);
}
function GetPieBarData(theData) {
    var Ret = [];
    var sum = 0;
    for (var i = 0; i < theData.length; i++) {
        Ret.push({ name: theData[i].alramname, value: theData[i].num });
        //Ret.push({ name: theData[i].alramname + " " + theData[i].num, value: theData[i].num });
        //Ret.push({ name: "不良率", value: (theData[i].ngrate / 100).toFixed(2) });
    }
    return Ret;
}
function GetXPieBarData(theData) {
    var Ret = [];
    var sum = 0;
    for (var i = 0; i < theData.length; i++) {
        Ret.push(theData[i].alramname);
    }
    return Ret;
}
//设置日期时间控件
function GetDatetime() {
    $('#datetimepickerstart').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',     /*此属性是显示顺序，还有显示顺序是mm-dd-yyyy*/
    });
    $('#datetimepickerend').datetimepicker({
        format: 'yyyy-mm-dd hh:ii',     /*此属性是显示顺序，还有显示顺序是mm-dd-yyyy*/
    });
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    starttime = year + '-' + month + '-' + date + ' 00:00'
    $('#datetimepickerstart').val(starttime);
    endtime = year + '-' + month + '-' + date + ' 23:59'
    $('#datetimepickerend').val(endtime);
}

function GetYiledTrend(alramdata, yileddata, okratedata) {
    var myChart = echarts.init(document.getElementById('YieldLine'));
    var colors = ['#CD3333', '#458B00', '#FF4500'];
    option = {
        color: colors,
        title: {
            text: '产量报警良率趋势图',
            x: 'left'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '10%',
            left: '5%'
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['报警', '产量', '良率']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: GetTimeFrameData(),
                axisLabel: {
                    show: true,
                    formatter: function (params) {
                        var newParamsName = "";
                        var paramsNameNumber = params.length;
                        var provideNumber = 11;  //一行显示几个字
                        var rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                        if (paramsNameNumber > provideNumber) {
                            for (var p = 0; p < rowNumber; p++) {
                                var tempStr = "";
                                var start = p * provideNumber;
                                var end = start + provideNumber;
                                if (p == rowNumber - 1) {
                                    tempStr = params.substring(start, paramsNameNumber);
                                } else {
                                    tempStr = params.substring(start, end) + "\n";
                                }
                                newParamsName += tempStr;
                            }

                        } else {
                            newParamsName = params;
                        }
                        return newParamsName
                    },
                    textStyle: {
                        color: '#6861a6' //文字颜色
                    }
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '报警(次)',
                //min: 0,
                //max: 250,
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '产量(个)',
                splitLine: { show: false },
                //min: 0,
                //max: 25,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: '良率(%)',
                min: Math.min.apply(null, GetOkRateTread(okratedata)) - 1,
                max: 100,
                offset: 55,
                position: 'right',
                axisLine: {
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '报警',
                type: 'bar',
                data: GetAlramTread(alramdata)

            },
            {
                name: '产量',
                type: 'line',
                showSymbol: false,
                yAxisIndex: 1,
                data: GetYiledTread(yileddata)
            },
            {
                name: '良率',
                type: 'line',
                showSymbol: false,
                yAxisIndex: 2,
                data: GetOkRateTread(okratedata)
            }
        ]
    };
    myChart.setOption(option);
}

function getDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
     function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}
//时间整合数组
function GetTimeFrameData() {
    var Ret = [];
    var statetime = getDate($("#datetimepickerstart").val());
    var endtime = getDate($("#datetimepickerend").val());
    var strstarttime = statetime.getFullYear() + "-" + statetime.getMonth() + 1 + "-" + statetime.getDate();
    var strendtime = endtime.getFullYear() + "-" + endtime.getMonth() + 1 + "-" + endtime.getDate();
    var sh = statetime.getHours();
    var eh = endtime.getHours();
    var days = DateDiff(strendtime, strstarttime);
    if (days == 0) {
        for (var i = 0; i < 24; i++) {
            if (i >= sh && i <= eh) {
                Ret.push((i < 10 ? "0" + i : i) + ":00-" + (i + 1) + ":00 " + "" + addDay(0, statetime));
            }
        }
    }
    else {
        for (var j = 0; j <= days; j++) {
            if (j == 0) {
                for (var i = 0; i < 24; i++) {
                    if (i >= sh) {
                        Ret.push((i < 10 ? "0" + i : i) + ":00-" + (i + 1) + ":00 " + "" + addDay(j, statetime));
                    }
                }
            }
            else if (j == days) {
                for (var i = 0; i < 24; i++) {
                    if (i <= eh) {
                        Ret.push((i < 10 ? "0" + i : i) + ":00-" + (i + 1) + ":00 " + "" + addDay(j, statetime));
                    }
                }
            }
            else {
                for (var i = 0; i < 24; i++) {
                    Ret.push((i < 10 ? "0" + i : i) + ":00-" + (i + 1) + ":00 " + "" + addDay(j, statetime));
                }
            }
        }
    }
    return Ret;
}
//计算两个日期的间隔天数
function DateDiff(sDate1, sDate2) {
    //Date.parse() 解析一个日期时间字符串，并返回1970/1/1 午夜距离该日期时间的毫秒数
    var time1 = Date.parse(new Date(sDate1));
    var time2 = Date.parse(new Date(sDate2));
    var nDays = Math.abs(parseInt((time2 - time1) / 1000 / 3600 / 24));
    return nDays;
};
//给日期加天数
function addDay(dayNumber, date) {
    date = date ? date : new Date();
    var ms = dayNumber * (1000 * 60 * 60 * 24)
    var newDate = new Date(date.getTime() + ms);
    return newDate.getFullYear() + "-" + newDate.getMonth() + 1 + "-" + newDate.getDate();
}
//将产量整合成符合要求的数组
function GetYiledTread(yileddata) {
    var Ret = [];
    var RetYiled = [];
    var RetYiled1 = [];
    var statetime = getDate($("#datetimepickerstart").val());
    var endtime = getDate($("#datetimepickerend").val());
    var strstarttime = statetime.getFullYear() + "-" + statetime.getMonth() + 1 + "-" + statetime.getDate();
    var strendtime = endtime.getFullYear() + "-" + endtime.getMonth() + 1 + "-" + endtime.getDate();
    var days = DateDiff(strendtime, strstarttime);
    var sh = statetime.getHours();
    var eh = endtime.getHours();
    var newdate = new Date();
    var nh = newdate.getHours();

    if (days == 0) {
        for (var j = 0; j < yileddata.length; j++) {
            RetYiled.push(yileddata[j].t);
        }
        for (var i = 0; i < 24; i++) {
            if (i >= sh && (i <= nh && nh < eh)) {
                if ($.inArray(i, RetYiled) > -1) {
                    Ret.push(yileddata[$.inArray(i, RetYiled)].num);
                }
                else {
                    if (i - 1 > 0) {
                        Ret.push(Ret[Ret.length - 1])
                    }
                    else {
                        Ret.push(0);
                    }
                }
            }
        }
    }
    else {
        for (var m = 0; m <= days; m++) {
            RetYiled = [];
            RetYiled1 = [];
            for (var j = 0; j < yileddata.length; j++) {
                if (addDay(m, statetime) == yileddata[j].collectdate) {
                    RetYiled.push(yileddata[j].t);
                    RetYiled1.push(yileddata[j].num);
                }
            }
            if (m == 0) {
                for (var i = 0; i < 24; i++) {
                    if (i >= sh) {
                        if ($.inArray(i, RetYiled) > -1) {
                            Ret.push(RetYiled1[$.inArray(i, RetYiled)]);
                        }
                        else {
                            if (i - 1 > 0) {
                                Ret.push(Ret[Ret.length - 1])
                            }
                            else {
                                Ret.push(0);
                            }
                        }
                    }
                }
            }
            else if (m == days) {
                for (var i = 0; i < 24; i++) {
                    if (i <= (addDay(m, statetime) == (newdate.getFullYear() + "-" + newdate.getMonth() + 1 + "-" + newdate.getDate()) ? nh : 24) && nh < eh) {
                        if ($.inArray(i, RetYiled) > -1) {
                            Ret.push(RetYiled1[$.inArray(i, RetYiled)]);
                        }
                        else {
                            Ret.push(Ret[Ret.length - 1]);
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < 24; i++) {
                    if ($.inArray(i, RetYiled) > -1) {
                        Ret.push(RetYiled1[$.inArray(i, RetYiled)]);
                    }
                    else {
                        Ret.push(Ret[Ret.length - 1]);
                    }
                }
            }
        }
    }
    return Ret;
}
//将报警整合为符合要求的数组
function GetAlramTread(alramdata) {
    var Ret = [];
    var RetAlram = [];
    var RetAlram1 = [];
    var statetime = getDate($("#datetimepickerstart").val());
    var endtime = getDate($("#datetimepickerend").val());
    var strstarttime = statetime.getFullYear() + "-" + statetime.getMonth() + 1 + "-" + statetime.getDate();
    var strendtime = endtime.getFullYear() + "-" + endtime.getMonth() + 1 + "-" + endtime.getDate();
    var days = DateDiff(strendtime, strstarttime);
    var newdate = new Date();
    var nh = newdate.getHours();
    var sh = statetime.getHours();
    var eh = endtime.getHours();
    if (days == 0) {
        for (var j = 0; j < alramdata.length; j++) {
            RetAlram.push(alramdata[j].t);
        }
        for (var i = 0; i < 24; i++) {
            if (i >= sh && i <= eh) {
                if ($.inArray(i, RetAlram) > -1) {
                    Ret.push(alramdata[$.inArray(i, RetAlram)].num);
                }
                else {
                    Ret.push(0);
                }
            }
        }
    }
    else {
        for (var m = 0; m <= days; m++) {
            RetAlram = [];
            RetAlram1 = [];
            for (var j = 0; j < alramdata.length; j++) {
                if (addDay(m, statetime) == alramdata[j].collectdate) {
                    RetAlram.push(alramdata[j].t);
                    RetAlram1.push(alramdata[j].num);
                }
            }
            if (m == 0) {
                for (var i = 0; i < 24; i++) {
                    if (i >= sh) {
                        if ($.inArray(i, RetAlram) > -1) {
                            Ret.push(RetAlram1[$.inArray(i, RetAlram)]);
                        }
                        else {
                            Ret.push(0);
                        }
                    }
                }
            }
            else if (m == days) {
                for (var i = 0; i < 24; i++) {
                    if (i <= (addDay(m, statetime) == (newdate.getFullYear() + "-" + newdate.getMonth() + 1 + "-" + newdate.getDate()) ? nh : 24) && nh < eh) {
                        if ($.inArray(i, RetAlram) > -1) {
                            Ret.push(RetAlram1[$.inArray(i, RetAlram)]);
                        }
                        else {
                            Ret.push(0);
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < 24; i++) {
                    if ($.inArray(i, RetAlram) > -1) {
                        Ret.push(RetAlram1[$.inArray(i, RetAlram)]);
                    }
                    else {
                        Ret.push(0);
                    }
                }
            }
        }
    }
    return Ret;
}
//将良率信息整合为符合要求的数组
function GetOkRateTread(okratedata) {
    var Ret = [];
    var RetOkrate = [];
    var RetOkrate1 = [];
    var statetime = getDate($("#datetimepickerstart").val());
    var endtime = getDate($("#datetimepickerend").val());
    var strstarttime = statetime.getFullYear() + "-" + statetime.getMonth() + 1 + "-" + statetime.getDate();
    var strendtime = endtime.getFullYear() + "-" + endtime.getMonth() + 1 + "-" + endtime.getDate();
    var days = DateDiff(strendtime, strstarttime);
    var sh = statetime.getHours();
    var eh = endtime.getHours();
    var newdate = new Date();
    var nh = newdate.getHours();

    if (days == 0) {
        for (var j = 0; j < okratedata.length; j++) {
            RetOkrate.push(okratedata[j].t);
        }
        for (var i = 0; i < 24; i++) {
            if (i >= sh && (i <= nh && nh < eh)) {
                if ($.inArray(i, RetOkrate) > -1) {
                    Ret.push(okratedata[$.inArray(i, RetOkrate)].num);
                }
                else {
                    if (i - 1 > 0) {
                        Ret.push(Ret[Ret.length - 1])
                    }
                    else {
                        Ret.push(0);
                    }
                }
            }
        }
    }
    else {
        for (var m = 0; m <= days; m++) {
            RetOkrate = [];
            RetOkrate1 = [];
            for (var j = 0; j < okratedata.length; j++) {
                if (addDay(m, statetime) == okratedata[j].collectdate) {
                    RetOkrate.push(okratedata[j].t);
                    RetOkrate1.push(okratedata[j].num);
                }
            }
            if (m == 0) {
                for (var i = 0; i < 24; i++) {
                    if (i >= sh) {
                        if ($.inArray(i, RetOkrate) > -1) {
                            Ret.push(RetOkrate1[$.inArray(i, RetOkrate)]);
                        }
                        else {
                            if (i - 1 > 0) {
                                Ret.push(Ret[Ret.length - 1])
                            }
                            else {
                                Ret.push(0);
                            }
                        }
                    }
                }
            }
            else if (m == days) {
                for (var i = 0; i < 24; i++) {
                    if (i <= (addDay(m, statetime) == (newdate.getFullYear() + "-" + newdate.getMonth() + 1 + "-" + newdate.getDate()) ? nh : 24) && nh < eh) {
                        if ($.inArray(i, RetOkrate) > -1) {
                            Ret.push(RetOkrate1[$.inArray(i, RetOkrate)]);
                        }
                        else {
                            Ret.push(Ret[Ret.length - 1]);
                        }
                    }
                }
            }
            else {
                for (var i = 0; i < 24; i++) {
                    if ($.inArray(i, RetOkrate) > -1) {
                        Ret.push(RetOkrate1[$.inArray(i, RetOkrate)]);
                    }
                    else {
                        Ret.push(Ret[Ret.length - 1]);
                    }
                }
            }
        }
    }
    return Ret;
}




