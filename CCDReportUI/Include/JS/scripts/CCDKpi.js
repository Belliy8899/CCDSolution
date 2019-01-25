$(function () {
    GetCCDData();
    GetProject();
    GetEquipmentAdress();
    GetEquipmentType();
    //var contentDivHeigth = $(".container-l").width();
});

function GetCCDData() {
    var GetCCDKpi = setInterval(function () {
        $.post("../../DataAPI/CCDKpiReport.ashx", { Action: "GetCCDKpiData", Isalram: $("#alram").is(":checked"), Projectname: $("#projectname").val(), Equipmentadress: $("#equipmentadress").val(), equipmenttype: $("#equipmenttype").val() },
            function (data) {
                try {
                    GetCCDKpiChart(data);
                } catch (e) {
                    alert("获取数据失败！");
                }
            }, "json");
        clearInterval(GetCCDKpi);
        GetCCDData();
    }, 1000)
}
function GetCCDKpiChart(data) {
    $("#SecondRow-div").html("");
    var listkpi = data.ListKpi;
    var listkpilength = listkpi.length;
    var newdate = new Date();
    var strnewdate = newdate.getFullYear() + "-" + newdate.getMonth() + 1 + "-" + newdate.getDate();
    for (var j = 0; j < listkpilength; j++) {
        var html = "";
        if (listkpi[j].collecttime.substring(0, 10) != strnewdate) {
            html += '<div class="card" style="border: 1.5px solid #96c2f1; background: #FFD700; width: 220px; float: left">';
        }
        else {
            if (listkpi[j].okrate < listkpi[j].okrateline) {
                html += '<div class="card" style="border: 1.5px solid #96c2f1; background: #ff0000; width: 220px; float: left">';
            }
            else {
                html += '<div class="card" style="border: 1.5px solid #96c2f1; background: #eff7ff; width: 220px; float: left">';
            }
        }
        html += '<div class="card-body" style="margin-left: 10px;">';
        html += '<h4 class="card-title" style="color:#836FFF">' + listkpi[j].station + '</h4>';
        html += '<p class="card-text" style="margin-top:-5px" >项目：' + listkpi[j].projectname + '</p>';
        html += ' <p class="card-text" style="margin-top:-7px">设备位置：' + listkpi[j].equipmentadress + '</p>';
        //html += ' <p class="card-text" style="margin-top:-10px">设备IP：' + listkpi[j].equipmentip + '</p>';
        html += ' <p class="card-text" style="margin-top:-7px">采集时间：' + listkpi[j].collecttime + '</p>';
        html += '<p class="card-text" style="float:left;margin-top:-7px">良率：' + listkpi[j].okrate + '%' + '</p>';
        html += '<p class="card-text" style="margin-top:-7px">&nbsp;&nbsp;不良率：' + listkpi[j].ngrate + '%' + '</p>';
        html += '<p class="card-text" style="float:left;margin-top:-7px">产量：' + listkpi[j].yield + '</p>';
        html += '<p class="card-text" style="margin-top:-7px">&nbsp;&nbsp;&nbsp;&nbsp;不良：' + Math.floor(listkpi[j].yield * listkpi[j].ngrate / 100) + '</p>';
        html += '<a class="card-link" style="margin-top:-7px"  herf="javascript:void(0)" onclick="OpenDetails(\'' + listkpi[j].projectname + ',' + listkpi[j].equipmentadress + ',' + listkpi[j].station + ',' + listkpi[j].equipmentip + '\');">查看详情</a>';
        $("#SecondRow-div").append(html);
    }
}
function OpenDetails(p) {
    var arr = p.split(',');
    detailsUrl = "CCDKpiDetails.aspx?p=" + encodeURI(arr[0]) + "&e=" + encodeURI(arr[1]) + "&s=" + encodeURI(arr[2]) + "&ip=" + encodeURI(arr[3]);
    window.open(detailsUrl);
}
//获取项目数据并绑定下拉框
function GetProject() {
    $.post("../../DataAPI/Common.ashx", { Action: "GetProject" }, function (myData) {
        try {
            if (myData != null) {
                for (var i = 0; i < myData.length; i++) {
                    var option = "";
                    if (i == 0) {
                        option = "<option value=\"all\">全部</option>"
                        $("#projectname").append(option);
                    }
                    option = "<option value=\"" + myData[i].projectname + "\">" + myData[i].projectname + "</option>";
                    $("#projectname").append(option);
                }
            }
        } catch (e) {
            EyAlert("获取项目数据失败！");
        }
    }, "json");
}
//获取设备位置并绑定
function GetEquipmentAdress() {
    $.post("../../DataAPI/Common.ashx", { Action: "GetEquipmentAdress" }, function (myData) {
        try {
            if (myData != null) {
                //$("#equipmentadress").combobox("loadData", myData);
                for (var i = 0; i < myData.length; i++) {
                    var option = "";
                    if (i == 0) {
                        option = "<option value=\"all\">全部</option>"
                        $("#equipmentadress").append(option);
                    }
                    option = "<option value=\"" + myData[i].equipmentadress + "\">" + myData[i].equipmentadress + "</option>";
                    $("#equipmentadress").append(option);
                }
            }
        } catch (e) {
            EyAlert("获取设备位置数据失败！");
        }
    }, "json");
}
//获取设备型号
function GetEquipmentType() {
    $.post("../../DataAPI/Common.ashx", { Action: "GetEquipmentType" }, function (myData) {
        try {
            if (myData != null) {
                //$("#equipmentadress").combobox("loadData", myData);
                for (var i = 0; i < myData.length; i++) {
                    var option = "";
                    if (i == 0) {
                        option = "<option value=\"all\">全部</option>"
                        $("#equipmenttype").append(option);
                    }
                    option = "<option value=\"" + myData[i].equipmenttype + "\">" + myData[i].equipmenttype + "</option>";
                    $("#equipmenttype").append(option);
                }
            }
        } catch (e) {
            EyAlert("获取设备位置数据失败！");
        }
    }, "json");
}




