$(function () {


    getUserInfo()


})
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "http://www.escook.cn:8086/my/userinfo",
        headers: {
            Authorization: localStorage.setItem('token') || ''
        },
        success: function (res) {
            if (res.success !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
        }
    });


}