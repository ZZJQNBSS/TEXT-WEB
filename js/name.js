// 登录成功后显示名字
//获取操作对象
var li1 = document.querySelector('.nicheng');
var li2 = document.querySelector('.zhuce')
//获取账号名称
var name = getCookie('name');
//判断当前值是否存在
if(name){
    //把账号名称赋值给span对象
    li1.innerHTML = decodeURI(name);
    li2.innerHTML = '<a href="../html/login.html">切换账号</a>';
}
if(li1.innerHTML=="undefined"){
    li1.innerHTML = '<a href="../html/login.html">登录</a>';
    li2.innerHTML = '<a href="./zhuce.html">注册</a>';
}
li2.onclick = function(){
    delCookie('name','',-1);
    li1.innerHTML = '<a href="../html/login.html">登录</a>';
    li2.innerHTML = '<a href="./zhuce.html">注册</a>';
}
li1.onmouseover = function(){
    li1.style.cursor = 'pointer';
}
li2.onmouseover = function(){
    li2.style.cursor = 'pointer';
}
li1.onclick = function(){
    self.location='./login.html';
}