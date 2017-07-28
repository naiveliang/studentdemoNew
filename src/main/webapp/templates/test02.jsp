<%@page contentType="text/html; charset=utf-8"%>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<%
    String name = request.getParameter("name");
    int age = Integer.valueOf(request.getParameter("age"));
%>
<p>我是test02.html</p>
<p>接收到的姓名是：<%=name%>, 年龄是：<%=age%></p>
</body>
</html>