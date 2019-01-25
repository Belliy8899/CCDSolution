<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="CCDKpiReport.aspx.cs" Inherits="CCDReportUI.Views.CCDKpiReport" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>CCD监控看板</title>
    <link href="../Include/easyui/1.3.4/themes/default/easyui.css" rel="stylesheet" />
    <link href="../Include/easyui/css/wu.css" rel="stylesheet" />
    <link href="../Include/easyui/css/icon.css" rel="stylesheet" />
    <link href="../Include/Css/Common.css" rel="stylesheet" />
    <script src="../Include/JS/jquery-1.8.3.min.js"></script>
    <script src="../Include/easyui/1.3.4/jquery.easyui.min.js"></script>
    <script src="../Include/easyui/1.3.4/locale/easyui-lang-zh_CN.js"></script>
    <script src="../Include/JS/echarts_4.1.0.rc2_echarts.min.js"></script>
    <script src="../Include/JS/dark.js"></script>
    <script src="../Include/JS/macarons.js"></script>
    <script src="../Include/JS/scripts/CCDKpi.js"></script>
</head>
<body>
    <div class="container-l">
        <div class="FirstRow-div">
            <%--<div class="Logo">
                <div class="Logo-div" id="Logo-div">
                    <img class="LogoImg" src="/Include/img/sunwodalogo.png" />
                </div>
            </div>--%>
            <div class="TitleDiv">CCD监控看板</div>
            <div class="TypeDiv">
                <select class="easyui-combobox" id="equipmentType" name="equipmentType" style="width: 100px;">
                    <option value="CCDTest">激光机</option>
                    <option value="0">上料机</option>
                    <option value="2">检测机</option>
                </select>
            </div>
        </div>
        <div class="SecondRow-div">
            <div class="ContentDiv">
                <div id="CCDkpiDiv" class="CCDkpiDiv"></div>
            </div>
        </div>
    </div>
</body>
</html>
