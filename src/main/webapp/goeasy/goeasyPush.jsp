<%@page pageEncoding="UTF-8" %>
<!doctype html>
<html lang="en">
<head>
    <title>GoEasy</title>
    <script src="goeasy-1.0.3.js" type="text/javascript"></script>
    <script>
        //初始化goeasy对象
        var goEasy = new GoEasy({
            host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
            appkey: "BC-c628a50f918e45cea1dbe2b63d8b226c", //替换为您的应用appkey
        });

        //接收消息
        goEasy.subscribe({
            channel: "ln", //替换为您自己的channel
            onMessage: function (result) {
                alert("Channel:" + result.channel + " content:" + result.content);
            }
        });

    </script>
</head>
<body>

</body>
</html>