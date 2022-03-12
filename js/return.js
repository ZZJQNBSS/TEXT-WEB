//获取回到顶部操作对象
var nav1 = document.querySelector('.bignav');
var btn = document.querySelector('.return1');
var top1;
//给window对象绑定滚动事件
window.onscroll = function(){
    //获取滚动距离
    top1 = document.body.scrollTop || document.documentElement.scrollTop;
    //判断滚动距离
    if(top1 >= 100){
        //显示顶部通栏
        nav1.style.lineHeight='50px';
        //显示回到顶部按钮对象
        nav1.style.display="block";
    }else{
        //隐藏显示内容
        nav1.style.lineHeight='0px';
        //隐藏导航栏
        nav1.style.display='none';   
    }
}
//给回到顶部按钮添加点击事件
btn.onclick = function(){
    var dsq=setInterval(function(){
        //判断滚动距离是否大于0
        if(top1 <= 0){
            clearInterval(dsq)
            return;
        }
        //重新设置滚动距离
        document.documentElement.scrollTop=top1-40;
    },20)
}