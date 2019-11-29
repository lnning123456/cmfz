<%@ page isELIgnored="false" contentType="text/html; charset=utf-8" pageEncoding="utf-8" %>
<script src="../boot/js/jquery-2.2.1.min.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/boot/js/echarts.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath}/boot/js/china.js"></script>
<script src="../goeasy/goeasy-1.0.3.js" type="text/javascript"></script>
<!-- 为ECharts准备一个具备大小（宽高）的Dom -->
<div id="china" style="width: 600px;height: 600px;margin-top: 30px;margin-left: 30px">

</div>

<script type="text/javascript">
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('china'));


    /*  function randomData() {
          return Math.round(Math.random() * 10000);
      }
      */

    var a = new Date();

    var my_day = a.getDate();

    var my_month = a.getMonth() + 1;

    var my_year = a.getFullYear();


    //document.write(my_year+"年"+my_month+"月"+my_day+"日");
    //console.log(my_month);

    var option;
    option = {
        title: {
            text: '持名法州用户全国分布图',
            subtext: my_year + "年" + my_month + "月" + my_day + "日" + ' 最新数据',
            left: 'center'
        },
        tooltip: {},
        // 说明
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['男', '女']
        },
        visualMap: {
            min: 0,
            max: 3000,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],           // 文本，默认为数值文本
            calculable: true
        },
        // 工具箱
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        series: [
            {
                name: '男',
                type: 'map',
                mapType: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                }


            },
            {
                name: '女',
                type: 'map',
                mapType: 'china',
                label: {
                    normal: {
                        show: true
                    },
                    emphasis: {
                        show: true
                    }
                }
                /* data: [
                     {name: "安徽", value: 0},
                     {name: "吉林", value: randomData()},
                     {name: "辽宁", value: randomData()},
                     {name: "西藏", value: randomData()},
                     {name: "湖南", value: randomData()},
                 //    {name: "新疆", value: randomData()},
                     {name: "青海", value: randomData()},
                     {name: "甘肃", value: randomData()},
                     {name: "宁夏", value: randomData()},
                     {name: "陕西", value: randomData()},
                     {name: "重庆", value: randomData()},
                     {name: "四川", value: randomData()},
                     {name: "云南", value: randomData()},
                     {name: "广西", value: randomData()},
                     {name: "海南", value: randomData()},
                     {name: "贵州", value: randomData()},
                     {name: "上海", value: randomData()},
                     {name: "重庆", value: randomData()},
                     {name: "湖北", value: randomData()},
                     {name: "江西", value: randomData()},
                     {name: "台湾", value: randomData()},
                     {name: "江西", value: randomData()},
                     {name: "福建", value: randomData()},
                     {name: "江苏", value: randomData()},
                     {name: "浙江", value: randomData()},
                     {name: "河南", value: randomData()},
                     {name: "陕西", value: randomData()},
                     {name: "河北", value: randomData()},
                     {name: "山东", value: randomData()},
                     {name: "山西", value: randomData()},
                     {name: "天津", value: randomData()},
                     {name: "北京", value: randomData()},
                     {name: "广东", value: randomData()},
                     {name: "内蒙古", value: randomData()},
                     {name: "黑龙江", value: randomData()},
                     {name: "南海诸岛", value: randomData()}
                 ]*/
            }
        ]
    };
    $.ajax({
        url: '${pageContext.request.contextPath}/user/addressNumber',
        type: 'post',
        datatype: 'json',
        success: function (result) {
            console.log(result);
            var man = result.man;
            var woman = result.woman;
            console.log(man);

            function manAddress() {
                var adder = [];
                for (var m in man) adder.push({name: m, value: man[m]});

                return adder;

            }

            function womanAddress() {
                var adder = [];
                for (var w in woman) adder.push({name: w, value: woman[w]});

                return adder;
            }

            myChart.setOption({
                series: [{
                    data: manAddress()

                }, {

                    data: womanAddress()
                }]
            });
        }
    });
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
            console.log(data);
            $.ajax({
                url: '${pageContext.request.contextPath}/user/addressNumber',
                type: 'post',
                datatype: 'json',
                success: function (result) {
                    console.log(result);
                    var man = result.man;
                    var woman = result.woman;
                    console.log(man);

                    function manAddress() {
                        var adder = [];
                        for (var m in man) adder.push({name: m, value: man[m]});

                        return adder;

                    }

                    function womanAddress() {
                        var adder = [];
                        for (var w in woman) adder.push({name: w, value: woman[w]});

                        return adder;
                    }

                    myChart.setOption({
                        series: [{
                            data: manAddress()

                        }, {

                            data: womanAddress()
                        }]
                    });
                }
            });
        }
    });

</script>












