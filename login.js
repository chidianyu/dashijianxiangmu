$(function () {

    $("#link_reg").on("click", function () {
        $('.login-box').hide();
        $('.reg-box').show();

    })
    $("#link_login").on("click", function () {
        $('.login-box').show();
        $('.reg-box').hide()

    })

    let form = layui.form

    form.verify({

        passs: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {

            let pass = $('.reg-box [name=password]').val()
            if (pass !== value) {
                return '两次密码不一致'
            }

        }

    });
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        let data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val(),
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }

            layer.msg('注册成功，请登录！')
        })
    })

    let layer = layui.layer
    // var layer = layui.layer
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登陆认证失败!')
                }
                layer.msg('登录成功！')

                localStorage.setItem('token', res.token)
                location.href = '/index.html'

            }
        })

    })

})
// getUserInfo()


// function getUserInfo() {
//     $.ajax({
//         method: "GET",
//         url: "/my/userinfo",
//         success: function (res) {
//             console.log(res);
//             if (res.status !== 0) {
//                 return layui.layer.msg('获取用户信息失！')
//             }
//         }
//     });


// }
