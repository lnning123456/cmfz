<%@page isELIgnored="false" pageEncoding="UTF-8" contentType="text/html; utf-8" %>

<script>
    $(function () {
        $("#userList").jqGrid({
            url: "${pageContext.request.contextPath}/user/queryByPage",
            editurl: "${pageContext.request.contextPath}/user/edit",
            datatype: "json",
            colNames: ["id", "用户名", "密码", "年龄", "性别", "所在地", "注册时间"],
            colModel: [
                {name: "id"},//<input id="id">
                {name: "username", editable: true},
                {name: "password", editable: true},
                {name: "age", editable: true},
                {
                    name: "sex", editable: true, edittype: "select",
                    editoptions: {value: "y:男;n:女"},
                    formatter: function (a) {
                        if (a === 'y') {
                            return "男";
                        } else {
                            return "女"
                        }
                    }
                },
                {name: "address", editable: true},
                {name: "regdate", formatter: "date"}

            ],
            styleUI: "Bootstrap",
            autowidth: true,
            pager: "#userPager",
            rowNum: 2,
            page: 1,
            rowList: [2, 4, 8],
            multiselect: true,
            viewrecords: true,
            height: "60%"
        }).jqGrid("navGrid", "#userPager",
            { //处理前台页面按钮组的样式以及展示后者不展示。

            },
            {//控制编辑按钮，在编辑之前或者之后要进行的额外操作
                closeAfterEdit: true
                /* beforeShowForm: function (obj) {
                     obj.find("#imgPath").attr("disabled", true);
                     obj.find("#title").attr("readonly", true);
                     obj.find("#brief").attr("readonly", true)
                 }*/
            },
            {//控制添加按钮，在添加之前或者之后要进行的额外操作
                closeAfterAdd: true

            },
            {//控制删除按钮，在删除之前或者之后要进行的额外操作
                beforeShowForm: function () {
                    //   alert(3)
                }
            }
        )


    })


</script>

<table id="userList"></table>
<div id="userPager"></div>