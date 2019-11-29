<%@page isELIgnored="false" pageEncoding="UTF-8" contentType="text/html; utf-8" %>

<script>
    $(function () {
        $("#bannerList").jqGrid({
            url: "${pageContext.request.contextPath}/banner/queryByPage",
            editurl: "${pageContext.request.contextPath}/banner/edit",
            datatype: "json",
            colNames: ["id", "标题", "状态", "创建时间", "简介", "图片", "操作"],
            colModel: [
                {name: "id"},//<input id="id">
                {name: "title", editable: true},
                {
                    name: "status", editable: true, edittype: "select",
                    editoptions: {value: "y:展示;n:不展示"},
                    formatter: function (a, b, c) {
                        if (a === 'y') {
                            return "展示";
                        } else {
                            return "不展示"
                        }
                    }
                },
                {name: "createDate", formatter: "date"},
                {name: "brief", editable: true},
                {
                    name: "imgPath", editable: true, edittype: "file",
                    formatter: function (cellvalue, options, rowObject) {
                        return "<img style='width:100px;height:70px' src='${pageContext.request.contextPath}/img/" + cellvalue + "'/>"
                    }
                },
                {
                    name: "", formatter: function (a, b, c) {
                        return "<input type='button' value='下载轮播图详情' onclick='bannerOutExcel()'>  "
                    }
                }
            ],
            styleUI: "Bootstrap",
            autowidth: true,
            pager: "#bannerPager",
            rowNum: 2,
            page: 1,
            rowList: [2, 4, 8],
            multiselect: true,
            viewrecords: true,
            height: "60%"
        }).jqGrid("navGrid", "#bannerPager",
            { //处理前台页面按钮组的样式以及展示后者不展示。
                search: false
            },
            {//控制编辑按钮，在编辑之前或者之后要进行的额外操作
                closeAfterEdit: true,
                beforeShowForm: function (obj) {
                    obj.find("#imgPath").attr("disabled", true);
                    obj.find("#title").attr("readonly", true);
                    obj.find("#brief").attr("readonly", true)
                }
            },
            {//控制添加按钮，在添加之前或者之后要进行的额外操作
                closeAfterAdd: true,

                afterSubmit: function (response) {
                    var bannerId = response.responseText;
                    $.ajaxFileUpload({
                        url: "${pageContext.request.contextPath}/banner/upload",
                        fileElementId: "imgPath",
                        data: {bId: bannerId},
                        success: function (data) {

                        }
                    });

                    $("#bannerList").jqGrid('clearGridData');
                    jQuery("#bannerList").trigger("reloadGrid");
                    var banner = $("#bannerList");
                    console.log("刷新" + banner);


                    return "sdfds"
                }

            },
            {//控制删除按钮，在删除之前或者之后要进行的额外操作
                beforeShowForm: function () {
                    //   alert(3)
                }
            }
        )


    })

    function bannerOutExcel() {
        console.log("bannerOutExcel"),
            $.ajax({

                url: "${pageContext.request.contextPath}/banner/outExcel",
                datatype: "json",
                type: "post",
                data: {},
                success: function (data) {

                }
            })

    }
</script>

<table id="bannerList"></table>
<div id="bannerPager"></div>