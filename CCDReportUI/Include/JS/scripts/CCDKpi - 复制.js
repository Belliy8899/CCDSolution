$(function () {
    GetCCDData();
    var contentDivHeigth = $(".container-l").width();
    //alert(contentDivHeigth);
});

function GetCCDData() {
    //var GetCCDKpi = setInterval(function () {
    $.post("../../DataAPI/CCDKpiReport.ashx", { Action: "GetCCDKpiData", EquipmentType: $("#projectname").combobox("getValue") }, function (data) {
        try {
            GetCCDKpiChart(data);
        } catch (e) {
            alert("获取数据失败！");
        }
    }, "json");
    //    clearInterval(GetCCDKpi);
    //    GetCCDData();
    //}, 600000)
}
function GetCCDKpiChart(data) {
    var dd = document.getElementById('CCDkpiDiv');

    //var myChart = echarts.getInstanceByDom(document.getElementById('CCDkpiDiv'));
    //if (myChart === undefined) {
    //    myChart = echarts.init(document.getElementById('CCDkpiDiv'));
    //}
    var listkpi = data.ListKpi;
    var listkpilength = listkpi.length;
    var columns = 8;
    var rows = 1;
    var EmptyKPINUM = 0;
    var fatherDivHeigth = 580;
    if (listkpilength >= columns) {
        rows = Math.ceil(listkpilength / columns)
        if (listkpilength < rows * columns) {
            EmptyKPINUM = rows * columns - listkpilength;
        } else {
            EmptyKPINUM = 0;
        }
        for (var j = 0; j < rows; j++) {
            $("#ContentDiv").append('<div id="CCDkpiDiv' + j + '" class="CCDkpiDiv1 style="heigth: ' + parseInt(fatherDivHeigth / rows) + 'px;""></div>');
            //$("#ContentDiv").append('<div id="CCDkpiDiv' + j + '" class="CCDkpiDiv1"></div>');
            var CCDkpiDivTemp = echarts.init(document.getElementById('CCDkpiDiv' + j));
            CCDkpiDivTemp.setOption({
                //color: [],
                grid: {
                    top: '8',
                    left: '1%',
                    right: '1%',
                    bottom: '20px',
                    containLabel: true
                },
                legend: {
                    data: ['Forest', 'Steppe', 'Desert', 'Wetland']
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        return params[0].name.split(';')[0] + '<br/>' +
                           params[0].marker + params[0].seriesName + ' : ' + params[0].value + '<br/>' +
                           params[1].marker + params[1].seriesName + ' : ' + params[1].value;
                    }
                },
                calculable: true,
                xAxis: [
                    {
                        type: 'category',
                        axisTick: { show: false },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: '#668B8B',
                                width: 1,
                                type: 'solid'
                            },
                            symbol: ['none', 'arrow'],
                            symbolOffset: [0, 12]
                        },
                        data: [],
                        axisLabel: {
                            interval: 0,
                            margin: 15,
                            textStyle: {
                                color: '#668B8B',
                                fontSize: '12'
                            },
                            color: '#668B8B',
                            formatter: function (params) {
                                params = params.split(';')[0];
                                var paramsNameNumber = params.length;
                                var provideNumber = 7;
                                var tempStr;
                                if (paramsNameNumber > provideNumber) {
                                    tempStr = params.substring(0, provideNumber) + "\n" + params.substring(provideNumber, paramsNameNumber);
                                } else {
                                    tempStr = params;
                                }
                                return tempStr;
                            }

                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLine: {
                            show: false,
                            lineStyle: {
                                show: false,
                                color: '#668B8B',
                                width: 1,
                                type: 'solid'
                            },
                            symbol: ['none', 'arrow'],
                            symbolOffset: [0, 12]
                        },
                        axisLabel: {
                            show: true,
                            color: '#668B8B',
                            formatter: '{value} %'
                        },
                        boundaryGap: [0, 0.1],
                        splitLine: {
                            show: true,
                            lineStyle: {
                                show: false,
                                color: '#375252',
                                width: 1,
                                type: 'dotted'
                            }
                        }
                    }
                ],
                series: [

                    {
                        name: '不良率',
                        type: 'bar',
                        barCategoryGap: "30%",
                        //barWidth: 38,//柱图宽度
                        data: [12, 44, 55]
                    },
                    {
                        name: '良率',
                        type: 'bar',
                        barCategoryGap: "30%",
                        //barWidth: 38,//柱图宽度
                        data: [11, 22, 33]
                    }
                ]
            });
            CCDkpiDivTemp.setOption({
                xAxis: [
                    {
                        data: function (listkpi, j) {
                            var datas = [];
                            var temp = ((j + 1) * columns) > listkpilength ? listkpilength : ((j + 1) * columns);
                            for (var i = j * columns; i < temp; i++) {
                                datas.push({
                                    value: listkpi[i].EquipmentIP,
                                    textStyle: {
                                        backgroundColor: "#48D1CC",
                                        borderRadius: 10,
                                        padding: [3, 3, 3, 3],
                                        color: "#ffffff",

                                    }
                                });
                            }
                            if (EmptyKPINUM > 0 && rows === j + 1) {
                                for (var i = 0; i < EmptyKPINUM; i++) {
                                    datas.push({
                                        value: "",
                                        //value: listkpi[i].EquipmentCode + ';' + listkpi[i].EquipmentIP,
                                        //textStyle: {
                                        //    backgroundColor: "#48D1CC",
                                        //    borderRadius: 10,
                                        //    padding: [3, 3, 3, 3],
                                        //    color: "#ffffff"
                                        //}
                                    });
                                }
                            }
                            return datas;
                        }(listkpi, j)
                    }],
                series: [
           {
               name: '良率',
               label: {
                   show: true,
                   rotate: 90,
                   align: 'left',
                   verticalAlign: 'middle',
                   position: 'insideBottom',
                   formatter: '{a}:{c}%',
                   color: '#0000EE'
               },
               data: function (listkpi, j) {
                   var datas = [];
                   var temp = ((j + 1) * columns) > listkpilength ? listkpilength : (j + 1) * columns;
                   for (var i = j * columns; i < temp; i++) {
                       datas.push({
                           value: listkpi[i].OkRate.toFixed(4) * 100,
                           itemStyle: {
                               color: '#32CD32',
                           }
                       });
                   }
                   if (EmptyKPINUM > 0 && rows === j + 1) {
                       for (var i = 0; i < EmptyKPINUM; i++) {
                           datas.push({
                               value: 0,
                               //itemStyle: {
                               //    color: '#ffc032',
                               //}
                           });
                       }
                   }
                   return datas;
               }(listkpi, j)
           },
           {
               name: '不良率',
               label: {
                   show: true,
                   rotate: 90,
                   align: 'left',
                   verticalAlign: 'middle',
                   position: 'insideBottom',
                   formatter: '{a}:{c}%',
                   color: '#0000EE',
               },
               data: function (listkpi, j) {
                   var datas = [];
                   var temp = ((j + 1) * columns) > listkpilength ? listkpilength : (j + 1) * columns;
                   for (var i = j * columns; i < temp; i++) {
                       datas.push({
                           value: listkpi[i].NgRate.toFixed(4) * 100,
                           itemStyle: {
                               color: '#4169E1',
                           }
                       });
                   }
                   if (EmptyKPINUM > 0 && rows === j + 1) {
                       for (var i = 0; i < EmptyKPINUM; i++) {
                           datas.push({
                               value: 0,
                               //itemStyle: {
                               //    color: '#9ac3e5',
                               //}
                           });
                       }
                   }
                   return datas;
               }(listkpi, j)
           }
                ]
            });
        }

    } else {
        $("#ContentDiv").append('<div id="CCDkpiDiv" class="CCDkpiDiv1"></div>');
        var myChart = echarts.init(document.getElementById('CCDkpiDiv'));
        myChart.setOption({
            //color: [],
            grid: {
                top: '8',
                left: '1%',
                right: '1%',
                bottom: '20px',
                containLabel: true
            },
            legend: {
                data: ['Forest', 'Steppe', 'Desert', 'Wetland']
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    return params[0].name.split(';')[0] + '<br/>' +
                       params[0].marker + params[0].seriesName + ' : ' + params[0].value + '<br/>' +
                       params[1].marker + params[1].seriesName + ' : ' + params[1].value;
                }
            },
            calculable: true,
            xAxis: [
                {
                    type: 'category',
                    axisTick: { show: false },
                    axisLine: {
                        show: false,
                        lineStyle: {
                            color: '#668B8B',
                            width: 1,
                            type: 'solid'
                        },
                        symbol: ['none', 'arrow'],
                        symbolOffset: [0, 12]
                    },
                    data: [],
                    axisLabel: {
                        interval: 0,
                        margin: 15,
                        textStyle: {
                            color: '#668B8B',
                            fontSize: '12'
                        },
                        color: '#668B8B',
                        formatter: function (params) {
                            params = params.split(';')[0];
                            var paramsNameNumber = params.length;
                            var provideNumber = 7;
                            var tempStr;
                            if (paramsNameNumber > provideNumber) {
                                tempStr = params.substring(0, provideNumber) + "\n" + params.substring(provideNumber, paramsNameNumber);
                            } else {
                                tempStr = params;
                            }
                            return tempStr;
                        }

                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLine: {
                        show: false,
                        lineStyle: {
                            show: false,
                            color: '#668B8B',
                            width: 1,
                            type: 'solid'
                        },
                        symbol: ['none', 'arrow'],
                        symbolOffset: [0, 12]
                    },
                    axisLabel: {
                        show: true,
                        color: '#668B8B',
                        formatter: '{value} %'
                    },
                    boundaryGap: [0, 0.1],
                    splitLine: {
                        show: true,
                        lineStyle: {
                            show: false,
                            color: '#375252',
                            width: 1,
                            type: 'dotted'
                        }
                    }
                }
            ],
            series: [

                {
                    name: '不良率',
                    type: 'bar',
                    barCategoryGap: "30%",
                    //barWidth: 38,//柱图宽度
                    data: [12, 44, 55]
                },
                {
                    name: '良率',
                    type: 'bar',
                    barCategoryGap: "30%",
                    //barWidth: 38,//柱图宽度
                    data: [11, 22, 33]
                }
            ]
        });
        myChart.setOption({
            xAxis: [
                {
                    data: function (listkpi) {
                        var datas = [];
                        for (var i = 0; i < listkpi.length; i++) {
                            datas.push({
                                value: listkpi[i].EquipmentCode + ';' + listkpi[i].EquipmentIP,
                                textStyle: {
                                    backgroundColor: "#48D1CC",
                                    borderRadius: 10,
                                    padding: [3, 3, 3, 3],
                                    color: "#ffffff"
                                }
                            });
                        }
                        return datas;
                    }(listkpi)
                }],
            series: [
       {
           name: '良率',
           label: {
               show: true,
               rotate: 90,
               align: 'left',
               verticalAlign: 'middle',
               position: 'insideBottom',
               formatter: '{a}:{c}%',
               color: '#68217A'
           },
           data: function (listkpi) {
               var datas = [];
               for (var i = 0; i < listkpi.length; i++) {
                   datas.push({
                       value: listkpi[i].OkRate.toFixed(2),
                       itemStyle: {
                           color: '#ffc032',
                       }
                   });
               }
               return datas;
           }(listkpi)
       },
       {
           name: '不良率',
           label: {
               show: true,
               rotate: 90,
               align: 'left',
               verticalAlign: 'middle',
               position: 'insideBottom',
               formatter: '{a}:{c}%',
               color: '#68217A',
           },
           data: function (listkpi) {
               var datas = [];
               for (var i = 0; i < listkpi.length; i++) {
                   datas.push({
                       value: listkpi[i].NgRate.toFixed(2),
                       itemStyle: {
                           color: '#9ac3e5',
                       }
                   });
               }
               return datas;
           }(listkpi)
       }
            ]
        });
    }


}
