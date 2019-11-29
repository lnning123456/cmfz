<%@page pageEncoding="UTF-8" %>
<!doctype html>
<html lang="en">
<head>
    <title>GoEasy</title>
    <script src="../boot/js/jquery-2.2.1.min.js" type="text/javascript"></script>
    <script src="goeasy-1.0.3.js" type="text/javascript"></script>
    <script src="../goeasy/goeasy-1.0.3.js" type="text/javascript"></script>
    <script>
        $(function () {
            //初始化goeasy对象
            var goEasy = new GoEasy({
                host: 'hangzhou.goeasy.io', //应用所在的区域地址: 【hangzhou.goeasy.io |singapore.goeasy.io】
                appkey: "BC-c628a50f918e45cea1dbe2b63d8b226c", //替换为您的应用appkey
            });

            goEasy.publish({
                channel: "ln", //替换为您自己的channel
                message: "Hello,ln!!!!!" //替换为您想要发送的消息内容
            });
        })

    </script>
</head>
<body>

</body>
</html>