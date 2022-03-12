<?php
    header("content-type:text/html;charset=utf-8");
    //链接数据库
    $link = mysqli_connect('localhost','root','root','2117');
    //设置中文编码
    mysqli_set_charset($link,"utf8");

    //获取传入的参数
    $u = $_GET['usernamer'];
    $p = $_GET['password'];
 
    //编写sql语句
    $sql = "select * from user where name='$u' and pass='$p'";
    //执行sql语句
    $result = mysqli_query($link,$sql);

    //获取结果集中的数据,并判断是否有值
    if(mysqli_fetch_assoc($result)){
        echo 1;
    }else{
        echo 0; 
    }
?>