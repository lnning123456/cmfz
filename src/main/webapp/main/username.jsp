<%@page isELIgnored="false" pageEncoding="UTF-8" contentType="text/html; utf-8" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>ECharts</title>
    <!-- 引入 echarts.js -->
    <script src="../boot/js/jquery-2.2.1.min.js"></script>
    <script src="../boot/js/echarts.js"></script>
    <script src="../goeasy/goeasy-1.0.3.js" type="text/javascript"></script>
</head>
<body>
<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="main" style="width: 600px;height:400px;"></div>


<script type="text/javascript">
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));

    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '持明法洲用户注册量统计图',
            link: 'http://www.jd.com',
            //show:false
            textStyle: {
                color: 'red'
            }
        },
        tooltip: {},
        legend: {
            data: ['男', '女'],
            type: 'plain'
        },
        xAxis: {
            data: ["第一周", "第二周", "第三周"]

        },
        yAxis: {},
        series: [{
            name: '男',
            type: 'bar'
            //data: [5, 20, 36, 10, 10, 20]
        }, {
            name: '女',
            type: 'bar'
            //data: [15, 2, 6, 110, 80, 50]
        }]
    };

    $.ajax({
        url: '${pageContext.request.contextPath}/user/findAll',
        type: 'post',
        datatype: 'json',
        success: function (result) {
            myChart.setOption({
                series: [{
                    data: [result.y1, result.y2, result.y3]
                    //持明法洲近一周用户注册量
                    //select count(id) from user where  sysdate-create_date<7
                }, {

                    data: [result.x1, result.x2, result.x3]
                }]
            });
        }
    });


    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    //初始化goeasy对象
    var goEasy = new GoEasy({
        host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
        appkey: "BC-c628a50f918e45cea1dbe2b63d8b226c" //替换为您的应用appkey
    });
    //接收消息
    goEasy.subscribe({
        channel: "ln", //替换为您自己的channel
        onMessage: function (data) {
            $.ajax({
                url: '${pageContext.request.contextPath}/user/findAll',
                type: 'post',
                datatype: 'json',
                success: function (result) {
                    myChart.setOption({
                        series: [{
                            data: [result.y1, result.y2, result.y3]
                        }, {
                            data: [result.x1, result.x2, result.x3]
                        }], title: {
                            text: data.content
                        }
                    });
                }
            })
        }
    });


</script>
</body>
</html>