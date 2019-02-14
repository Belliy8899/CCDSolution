<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CCDReportUI.Views.Login" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>登录</title>
    <link href="../Include/Css/login.css" rel="stylesheet" />
    <script src="../Include/JS/jquery-1.8.3.min.js"></script>
    <script src="../Include/JS/jquerysession.js"></script>
    <script src="../Include/JS/scripts/login.js"></script>
</head>
<body>
    <div class="main">
        <div class="mainin">
            <img height="50" width="150" src="../Include/img/sunwodalogo.png" />
            <div class="mainin1">
                <ul>
                    <li><span>部门：</span><select name="loginname" id="loginname" class="SearchKeyword"></select></li>
                    <li><span>密码：</span><input type="password" name="password" id="password" placeholder="密码" class="SearchKeyword2" /></li>
                    <li>
                        <button class="tijiao" onclick="login()">登录</button></li>
                </ul>
            </div>
            <div class="footpage">欣旺达科技股份有限公司&&sunwoda.com</div>
        </div>
    </div>
</body>
</html>
