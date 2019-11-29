<%@page pageEncoding="UTF-8" isELIgnored="false" contentType="text/html; utf-8" %>

<!doctype html>
<html lang="en">
<head>

    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>


    <link rel="icon" href="../img/favicon.ico">
    <link rel="stylesheet" href="../boot/css/bootstrap.min.css">
    <link rel="stylesheet" href="../jqgrid/css/jquery-ui.css">
    <link rel="stylesheet" href="../jqgrid/css/trirand/ui.jqgrid-bootstrap.css">
    <script src="../boot/js/jquery-2.2.1.min.js"></script>
    <script src="../boot/js/bootstrap.min.js"></script>
    <script src="../jqgrid/js/trirand/jquery.jqGrid.min.js"></script>
    <script src="../jqgrid/js/trirand/i18n/grid.locale-cn.js"></script>
    <script src="../boot/js/ajaxfileupload.js"></script>

    <script src="../kindeditor/kindeditor-all-min.js"></script>
    <script src="../kindeditor/lang/zh-CN.js"></script>

    <style type="text/css">
        /*  .img-responsive {
              display: block;
              height: auto;
              max-width: 100%;
          }
  */
    </style>
    <script>
        /*
                if (document.cookie.indexOf("a=hello") == -1) {
                    alert("首次打开！");
                    var t = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 30);
                    document.cookie = "a=hello; expires=" + t.toGMTString();
                } else {
                    alert("再次打开！");
                }*/
    </script>

</head>
<body>
<br>
<nav class="navbar navbar-default">
    <div class="container-fluid">
        <div class="navbar-header">
            <a class="navbar-brand" href="#">
                <span>持名法州管理系统</span>
            </a>
        </div>
        <ul class="nav navbar-nav navbar-right">
            <a class="navbar-brand" href="#">
                <span>  退出登录 <span class="glyphicon glyphicon-log-in"></span></span>
            </a>
        </ul>
        <ul class="nav navbar-nav navbar-right">
            <a class="navbar-brand" href="#">
                欢迎： <span style="color: #31b0d5"> ${sessionScope.username}</span>
            </a>

        </ul>

    </div>
</nav>

<div class="container-fluid">

    <div class="row">
        <!--左侧-->
        <div class="col-md-2" role="tablist" aria-multiselectable="true">
            <!--手风琴开始-->
            <div class="panel-group" id="accordion">

                <div class="panel panel-default">
                    <%--用户管理--%>

                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-target="#collapseOne" data-parent="#accordion">
                                用户管理
                            </a>
                        </h4>
                    </div>
                    <div id="collapseOne" class="panel-collapse collapse">

                        <div class="panel-body">
                            <a href="javascript:$('#changeContent').load('user.jsp')"> 用户查看</a>
                        </div>

                    </div>

                    <%--上师管理--%>
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-target="#collapseTwo" data-parent="#accordion">
                                上师管理
                            </a>
                        </h4>
                    </div>
                    <div id="collapseTwo" class="panel-collapse collapse">
                        <div class="panel-body">
                            <a href="javascript:$('#dd').load('部门.html')">上师查询</a>
                        </div>

                    </div>

                    <%--文章管理--%>
                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-target="#collapseThree" data-parent="#accordion">
                                文章管理
                            </a>
                        </h4>
                    </div>
                    <div id="collapseThree" class="panel-collapse collapse">
                        <div class="panel-body">
                            <a href="javascript:$('#changeContent').load('article.jsp')">文章查询</a>
                        </div>

                    </div>
                    <%--专辑管理--%>
                    <br>

                    <div class="panel-heading">
                        <h4 class="panel-title">
                            <a data-toggle="collapse" data-target="#collapseFour" data-parent="#accordion">
                                专辑管理
                            </a>
                        </h4>
                    </div>
                    <div id="collapseFour" class="panel-collapse collapse">
                        <div class="panel-body">
                            <a href="javascript:$('#changeContent').load('album.jsp')">专辑查询</a>
                        </div>

                    </div>
                    <%--轮播图管理--%>

                    <%----%>
                    <div class="panel panel-default">
                        <div class="panel-heading" role="tab" id="#collapseSix">
                            <h4 class="panel-title">
                                <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseSix"
                                   aria-expanded="true" aria-controls="collapseOne">
                                    轮播图管理
                                </a>
                            </h4>
                        </div>
                        <div id="collapseSix" class="panel-collapse collapse" role="tabpanel"
                             aria-labelledby="headingOne">
                            <div class="panel-body">
                                <li><a href="javascript:$('#changeContent').load('banner.jsp')">轮播图列表</a></li>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!--右侧-->
        <div id="changeContent" class="col-md-10">
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="#">
                            <span>欢迎来到持明法洲后台管理系统</span>
                        </a>
                    </div>


                </div>
            </nav>
            <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <ol class="carousel-indicators">
                    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                </ol>

                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">
                    <div class="item active">
                        <img src="${pageContext.request.contextPath}/img/shouye.jpg" alt="...">
                        <div class="carousel-caption">
                        </div>
                    </div>
                    <div class="item">
                        <img style="width: 100%;height: 327px" src="${pageContext.request.contextPath}/img/A2.jpg"
                             alt="...">
                        <div class="carousel-caption">
                        </div>
                    </div>
                    <div class="item">
                        <img style="width: 100%;height: 327px"
                             src="${pageContext.request.contextPath}/img/captcha.jpg" alt="...">
                        <div class="carousel-caption">
                        </div>
                    </div>
                </div>

                <!-- Controls -->
                <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>

    </div>
</div>
<br>
<div class="panel panel-default">
    <div style="text-align: center" class="panel-body">
        百知教育@zparkhr.com.cn
    </div>
</div>

</body>
</html>







