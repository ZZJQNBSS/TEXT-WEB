<?php
    header("Access-Control-Allow-Origin:*");
    header("content-type:text/html;charset=utf-8");
    //获取参数
    $wd = $_GET["wd"];
    $cb = $_GET["cb"];
    //发送请求，请获取结果
    $result=file_get_contents("http://suggestion.baidu.com/su?wd=$wd&cb=$cb");
    //将获取的数据GBK编码转为utf-8编码
    $data = iconv("GBK","UTF-8",$result);
    echo $data;
?>