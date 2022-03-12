<?php
header("content-type:text/html;charset=utf-8");
//连接数据库
$link=mysqli_connect('localhost','root','root','2117');
//设置中文编码
mysqli_set_charset($link,"utf8");
//获取参数
$id=$_GET['id'];
//编写SQL语句
$sql="select * from vans where id=$id";
//执行sql语句
$result=mysqli_query($link,$sql);
//获取结果集中的数据
$row=mysqli_fetch_assoc($result);
//返回结果集
echo json_encode($row);
?>