$(function () {
    let form = layui.form
    let layer = layui.layer
    var laypage = layui.laypage;
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 如果小于两位数就补0
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    // 需要将请求参数对象提交到服务器
    var q = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 3, // 每页显示几条数据，默认每页显示2条
        cate_id: '', // 文章分类的 Id
        state: '', // 文章的发布状态

    }

    initTable()
    initCate()

    // 定义一个查询的参数对象，将来请求数据的时候，
    // 需要将请求参数对象提交到服务器
    // var q = {
    //     pagenum: 1, // 页码值，默认请求第一页的数据
    //     pagesize: 2, // 每页显示几条数据，默认每页显示2条
    //     cate_id: '', // 文章分类的 Id
    //     state: '' // 文章的发布状态
    // }
    // initCate()
    function initCate() {
        $.ajax({
            method: 'get',
            url: "/my/article/cates",
            // data: "q",
            // dataType: "dataType",
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("添加失败")
                }
                let htmlStr = template("tplcate_id", res)
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        });
    }
    // 定义美化时间的过滤器

    // 定义获取文章的数据
    function initTable() {
        $.ajax({
            // method: 'GET',
            url: "/my/article/list",
            data: q, //
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg("获取失败")
                }
                let htmlStr = template("tpl-table", res)
                $('tbody').html(htmlStr)
                // form.render()
                renderPage(res.total) //这里是调用的分页方法
            }

        })
    }
    $('#form-Search').on('submit', function (e) {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        console.log(q.state);
        initTable()
    })

    function renderPage(total) {
        // console.log(total);   
        laypage.render({
            elem: 'page-box' //渲染谁几就写谁如果是ID不需要加警号
            , count: total, //总条数
            limit: q.pagesize,  //煤业显示几条
            curr: q.pagenum,   //默认选择哪一个
            layout: ["count", "limit", "prev", "page", "next", "skip"],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                console.log(obj.curr);//点击页码能获取到页码的数字
                q.pagenum = obj.curr //这个就是吧最新的页码值赋值给Q
                q.pagesize = obj.limit
                if (!first) {
                    initTable()

                }

            }
        });
    }
    //定义删除
    $("tbody").on('click', '.btn-delete', function () {
        var len = $('.btn-delete').length
        let id = $(this).attr('data-id');
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("太好了删除失败")
                    }
                    layer.msg("删除成功")
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1

                    }
                    initTable()

                }

            })
            layer.close(index);
        });
    })

    $('body').on('click', '.edit', function () {
        // console.log();
        location.href = '/art_edit.html?id=' + $(this).attr('data-id')
    })
}) 