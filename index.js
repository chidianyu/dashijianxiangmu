$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function (e) {
        e.preventDefault()
        console.log(123);
        layer.confirm('退出登录?', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })

    })
    // 渲染用户的头像

    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            // headers 就是请求头配置对象
            headers: {
                Authorization: localStorage.getItem('token') || ''
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                // 调用 renderAvatar 渲染用户的头像
                renderAvatar(res.data)
            }
        })
    }
})
// function getUserInfo() {
//     $.ajax({
//         method: 'GET',
//         url: '/my/userinfo',
//         success: function (res) {
//             if (res.status !== 0) {
//                 return layer.msg("获取用户信息失败")
//             }
//         }



//     })

// }


// 点击按钮，实现退出功能
