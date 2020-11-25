$(function () {
    initArtCateList()
    function initArtCateList() {
        $.ajax({
            method: "GET",
            url: "/my/article/cates",
            success: function (res) {
                // console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }

        })
    }

    let layer = layui.layer
    let index = null
    let form = layui.form
    $("#btnAddCate").on("click", function () {
        index = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $("#dialog-add").html()
        });
    })

    // 注册时间委托
    $('body').on('submit', "#form-add", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg("添加成功")
                initArtCateList()
            }


        })

        layer.close(index)

    })
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialog-edit').html()
        })
        var arr = $(this).attr('data-id')
        // console.log(arr);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + arr,
            success: function (res) {
                form.val('form-edit', res.data)
            }
        })
    })


    // 下面是修改
    $('body').on('submit', "#form-edit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加失败')
                }
                layer.msg("修改成功")
                initArtCateList()
            }


        })

        layer.close(indexEdit)

    })
    $("body").on('click', ".btn-delete", function () {
        // console.log('ok ');
        var id = $(this).attr('data-id');
        // console.log(id \);
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg("太好了删除失败")
                    }
                    initArtCateList()
                }
            })
            layer.close(index);
        });
    })

})