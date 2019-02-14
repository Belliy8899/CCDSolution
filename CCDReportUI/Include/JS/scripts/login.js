$(function () {
    GetDepartment();
});
function GetDepartment() {
    $.post("../../DataAPI/Common.ashx", { Action: "GetEquipmentAdress" }, function (myData) {
        try {
            if (myData != null) {
                var tem = [];
                for (var i = 0; i < myData.length; i++) {
                    if (tem.indexOf(myData[i].equipmentadress.split('-')[1]) === -1) {
                        tem.push(myData[i].equipmentadress.split('-')[1]);
                    }
                }
                var option = "";
                option = "<option value=\"all\">超级管理员</option>"
                $("#loginname").append(option);
                for (var i = 0; i < tem.length; i++) {
                    var aa = tem[i];
                    try {
                        if (aa == undefined) {
                            tem[i] = "其他";
                        }
                        option = "<option value=\"" + tem[i] + "\">" + tem[i] + "</option>";
                        $("#loginname").append(option);
                    }
                    catch (e) {
                    }
                }
            }
        } catch (e) {
            EyAlert("获取数据失败！");
        }
    }, "json");
}
function login() {
    var user, pas;
    if ($('#loginname').val() == null || $('#loginname').val() == "") {
        alert("请选择部门");
        return;
    }
    else {
        user = $('#loginname').val();
    }

    if ($('#password').val() == null || $('#password').val() == "") {
        alert("请输入密码");
        return;
    }
    else {
        pas = $('#password').val();
    }

    $.ajax({
        type: "post",
        url: "../DataAPI/login.ashx?loginname=" + user + "&password=" + pas + "&a=" + new Date().getTime(),
        error: function (request) {
            EyAlert("密码错误");
            $("#password").val("");
            return false;
        },
        complete: function (data) {
            if (data.responseText != "") {
                $.session.set('username', data.responseText);
                window.location = "/Views/CCDKpiReport.aspx";
            } else {
                EyAlert("密码错误");
                $("#password").val("");
                return false;
            };
        }
    });
}