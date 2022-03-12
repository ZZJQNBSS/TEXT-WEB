<?php
    header("content-type:text/html;charset=utf-8");
    //链接数据库
    $link = mysqli_connect('localhost','root','root','2117');
    //设置中文编码
    mysqli_set_charset($link,"utf8");

    //获取传入的参数
    $u=$_GET['user'];
    $p=$_GET['pass'];

    //编写sql语句 添加至数据库
    $sql = "insert into user(name,pass) values('$u','$p')";
    //执行sql语句
    $result = mysqli_query($link,$sql);
    echo "alert('注册成功')";
    header("location:../html/login.html");
?>