//获取地址栏中的信息
var seach1 = location.search;
//获取操作对象
var checkboxs = document.querySelector('#btn');
var btn1 = document.querySelector('#btn2');
//给选中框绑定点击事件
checkboxs.onclick = function(){
    //判断当前选中款是否被选中
    if(checkboxs.checked){
        btn1.disabled = false;
    }else{
        btn1.disabled = true;
    }
}

//给登录按钮绑定点击事件
btn1.onclick = function(){
    //获取输入框中的value值
    var user = document.getElementById('input1').value;
    var pass = document.getElementById('input2').value;

    //加一个value里面是否有值，没有值禁止跳转（没写）

    //使用ajax1中的promiseAjax发送登录请求
    (async function(){
        var p1 = await promiseAjax({
            url:'../php/login.php',
            data:`usernamer=${user}&password=${pass}`
        })
        //判断返回结果是否为1
        if(p1 == 1){
            //判断地址中是否有参数
            if(seach1){
                //获取传入的参数
                var newUrl = seach1.split('=')[1];
                //设置cookie
                setCookie('name',user);
                location.href = newUrl;
            }else{
                //设置cookie
                setCookie('name',user);
                location.href = './home.html';
            }
        }else{
            alert('账号或密码有误')
        }
    })()
    //阻止表单的默认提交行为
    return false;
}
