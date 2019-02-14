<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CCDKpiReport.aspx.cs" Inherits="CCDReportUI.Views.CCDKpiReport" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>CCD视觉监控数据智能看板</title>
    <%--<link href="../Include/easyui/1.3.4/themes/default/easyui.css" rel="stylesheet" />
    <link href="../Include/easyui/css/wu.css" rel="stylesheet" />
    <link href="../Include/easyui/css/icon.css" rel="stylesheet" />--%>
    <link href="../Include/Css/bootstrap.min.css" rel="stylesheet" />
    <link href="../Include/Css/CCDKpiReport.css" rel="stylesheet" />
    <script src="../Include/JS/jquery-1.8.3.min.js"></script>
    <script src="../Include/JS/jquerysession.js"></script>
    <script src="../Include/JS/bootstrap.min.js"></script>
    <script src="../Include/JS/popper.min.js"></script>
    <%-- <script src="../Include/easyui/1.3.4/jquery.easyui.min.js"></script>
    <script src="../Include/easyui/1.3.4/locale/easyui-lang-zh_CN.js"></script>--%>
    <%--<script src="../Include/JS/echarts_4.1.0.rc2_echarts.min.js"></script>
    <script src="../Include/JS/dark.js"></script>
    <script src="../Include/JS/macarons.js"></script>--%>
    <script src="../Include/JS/scripts/CCDKpi.js"></script>
</head>
<body>
    <div class="container-l">
        <div class="FirstRow-div">
            <div class="Logo">
                <div class="Logo-div" id="Logo-div">
                    <img class="LogoImg" src="/Include/img/sunwodalogo.png" />
                </div>
            </div>
            <div class="TitleDiv">
                <div style="margin-left: 30%">
                    欣旺达CCD视觉监控数据智能看板
                </div>
            </div>
            <div class="QueryDiv">
                <div>
                    <div>
                        <label>项目名称：</label>
                        <select id="projectname" name="projectname" style="width: 100px;">
                        </select>
                        <label>设备位置：</label>
                        <select id="equipmentadress" name="equipmentadress" style="width: 100px;">
                        </select>
                    </div>
                    <div>
                        <label>设备类型：</label>
                        <select id="equipmenttype" name="equipmenttype" style="width: 100px;">
                        </select>
                        <label>
                            <input type="checkbox" id="alram" />&nbsp;仅看报警
                            <input type="checkbox" id="online" />&nbsp;仅看离线</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="SecondRow-div" id="SecondRow-div">
            <%--<div id="ContentDiv" class="ContentDiv" >
                <div id="CCDkpiDiv" class="CCDkpiDiv"></div>
            </div>--%>
            <%--<div class="card" style="border: 1.5px solid #96c2f1; background: #eff7ff; width: 220px; float: left">
                <div class="card-body" style="margin-left: 10px">
                    <h5 class="card-title" style="color:sandybrown">极耳裁切机</h5>
                    <p class="card-text">设备位置：APH22 3栋2楼</p>
                    <p class="card-text">设备IP：127.0.0.1</p>
                    <p class="card-text" style="float:left">良率：99%</p>
                    <p class="card-text" style="float:left">不良率：1%</p>
                    <p class="card-text">产量：8000</p>
                    <a class="card-link" onclick="OpenDetails()">查看详情</a>
                </div>
            </div>--%>
        </div>
    </div>
</body>
</html>
