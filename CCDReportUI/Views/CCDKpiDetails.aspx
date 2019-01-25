<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CCDKpiDetails.aspx.cs" Inherits="CCDReportUI.Views.CCDKpiDetails" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>CCD监控数据详情</title>
    <link href="../Include/Css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Include/Css/CCDKpiDetails.css" rel="stylesheet" />
    <link href="../Include/JS/bootstrap-datetimepicker.min.css" rel="stylesheet" />
    <script src="../Include/JS/jquery-1.8.3.min.js"></script>
    <script src="../Include/JS/bootstrap.min.js"></script>
    <script src="../Include/JS/bootstrap-datetimepicker.js"></script>
    <script src="../Include/JS/bootstrap-datetimepicker.zh-CN.js"></script>
    <script src="../Include/JS/popper.min.js"></script>
    <script src="../Include/JS/echarts_4.1.0.rc2_echarts.min.js"></script>
    <script src="../Include/JS/dark.js"></script>
    <script src="../Include/JS/macarons.js"></script>
    <script src="../Include/JS/scripts/CCDKpiDetails.js"></script>
</head>
<body>
    <div class="container-l">
        <div class="FirstRow-div">
            <div class="Logo">
                <div class="Logo-div" id="Logo-div">
                    <img class="LogoImg" src="/Include/img/sunwodalogo.png" />
                </div>
            </div>
            <div class="TitleDiv" id="TitleDiv">CCD监控数据详情</div>
            <div class="QueryDiv">
                <div style="margin-left:15%">
                    开始时间：
            <input type="text" value="" id="datetimepickerstart" />
                </div>
                <div style="margin-top:2px;margin-left:15%">
                    结束时间：
            <input type="text" value="" id="datetimepickerend" />
                </div>
            </div>
        </div>
        <div class="SecondRow-div" id="SecondRow-div">
            <div class="chartdiv">
                <div class="piebardiv">
                    <div id="AlramInfoTop5" class="AlramInfoTop5"></div>
                    <div id="OkRatePie" class="OkRatePie"></div>
                </div>
                <%--<div id="YieldLine" class="YieldLine"></div>--%>
                <div class="linebardiv">
                    <div id="YieldLine" class="YieldLine"></div>
                </div>
            </div>

            <div class="tablediv">
                <div id="AlramInfotable" class="AlramInfotable"></div>
            </div>
        </div>
    </div>
</body>
</html>
