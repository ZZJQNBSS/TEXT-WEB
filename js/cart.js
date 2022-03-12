//获取用户名
var name1=getCookie('name');
//获取当前地址
var url2=location.href;
//判断当前cookie是否存在
if(!name1){
    alert('请您先登录账号');
    location.href='./login.html?url=' + url2;
}
//获取大盒子操作对象
var container=document.querySelector(".container");
//获取localStrong的数据
var cartlist=localStorage.getItem("cartList") || "[]";
//转为数据对象
cartlist=JSON.parse(cartlist);

show1()
function show1(){
    if(cartlist.length > 0){
        //验证全选框是否被选中
        var quan1=cartlist.every(item=>{
            return item.is_select==1;
        })
        //拼接所有商品信息
        var str2=`
            <div class="container-top">
                <p>
                    <span>Hi，欢迎来到您的购物车</span>
                    <span><a href="./list.html">继续购物</a></span>
                </p>   
            </div>
            <div class="container-box">
                <div class="container-header">
                    <h4><input type="checkbox" name="quan" ${quan1?'checked':''}></h4>
                    <h4>商品信息</h4>
                    <h4>售价</h4>
                    <h4>购买数量</h4>
                    <h4>小计</h4>
                    <h4>操作</h4>
                </div>
        `
    //遍历数组当中的所有商品信息，拼接商品信息
    cartlist.forEach(item=>{
            str2+=`
                <div class="container-shopping">
                    <h4><input type="checkbox" ${item.is_select==1?'checked':''} name="xuan" data-id="${item.id}"></h4>
                    <h4>
                        <a href=""><img src="${item.img}" alt=""></a>
                        <p>${item.name}</p>
                        <p>尺码：<span>42</span></p>
                    </h4>
                    <h4>￥<span>${item.pirce}</span></h4>
                    <h4>
                    <button type="button" data-id=${item.id} ${item.cart_number<=1? 'disabled':''}>-</button>
                    <input type="text" value="${item.cart_number}">
                    <button data-id=${item.id} ${item.cart_number>=item.kucun_number?'disabled':''}">+</button>
                    </h4>
                    <h4>￥<span>${(item.pirce*item.cart_number).toFixed(2)}</span></h4>
                    <h4>
                    <button id="btn3" data-id=${item.id}>删除</button>
                    </h4>
                </div>
                <div class="container-bottom">
            ` 
        })
            var aa=total1()
            //创建变量，拼接商品信息
            str2+=`
                    <div class="container-del">
                        <p class="iconfont icon-shanchuxuanzhongxiang">删除勾选商品</p>
                        <p class="iconfont icon-lajixiang">清空购物车</p>
                    </div>

                    <div class="container-close">
                        <p><span>${aa[0]}</span>件商品</p>
                        <p>总价:￥<span>${aa[1]}</span></p>
                    </div>

                    <div class="container-anniu">
                        <button><a href="./list.html">继续购物</a></button>
                        <button>去下单</button>
                    </div>
                </div>
            </div> 
        `
        //把拼接好的内容添加到大盒子当中
        container.innerHTML=str2;
    }else{
        var str=`
            <div class="container-top">
                <p>
                    <span>Hi，欢迎来到您的购物车</span>
                    <span><a href="./list.html">继续购物</a></span>
                </p>
            </div>
            <div class="kong">
                <h1>你的空购物车空空如也！！！</h1>
                <h1>点击右上方继续购物，快去选购吧！^_^</h1>
            </div>
        `
        //把当前字符串追加到大盒子当中
        container.innerHTML=str;
    }
}
//给大盒子绑定点击事件
container.onclick=function(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    //商品数量加法运算
    if(target.innerHTML=="+"){
        //获取当前商品id
        var id1=target.getAttribute('data-id');
        //当前商品小计
        var xiaoji=0;
        //遍历数组元素
        cartlist.forEach(item=>{
            //判断是否为当前操作商品
            if(item.id==id1){
                item.cart_number+=1;
            }
        })
        
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist));
        show1();
    }
    //商品数量减法运算
    if(target.innerHTML=="-"){
        //获取id
        var id1=target.getAttribute('data-id')
         //遍历数组元素
         cartlist.forEach(item=>{
            //判断是否为当前操作商品
            if(item.id==id1){
                item.cart_number-=1;
                
            }
            
        })
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist));
        show1();
    }
    //删除一件商品的操作
    if(target.innerHTML=="删除"){
        //获取id
        var id1=target.getAttribute('data-id');
        //遍历数组元素，把满足条件的数据过滤，不满足条件的元素保留
        cartlist2=cartlist.filter(item=>{
            return item.id!=id1
        })
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist2));
        //刷新
        location.reload()
    }
    //全选
    if(target.getAttribute("name")=="quan"){
        //遍历数组中的所有数据
        cartlist.forEach(item=>{
            //判断全选狂是否被选中
            if(target.checked){
                //修改所有商品选中框的is_select
                item.is_select=1;
            }else{
                item.is_select=0;
            }
        })
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist));
        show1();
    }
    //选中框
    if(target.getAttribute("name")=="xuan"){
        //获取当前商品id
        var id1 = target.getAttribute('data-id');
        //遍历数组元素
        cartlist.forEach(item=>{
            //判断是否为当前操作商品
            if(item.id==id1){
                //item.is_select=item.is_select?0:1  解决第二次点击出现的不能点击问题
                if(item.is_select==1){
                    item.is_select=0;
                }else{
                    item.is_select=1;
                }
            }
        })
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist));
        show1();
    }
    //结算
    if(target.innerHTML=='去下单'){
        //确认是否购买
        if(confirm("你确定要购买吗？")){
            alert("你要支付："+total1()[1])
            //过滤数组元素
            var cartlist3=cartlist.filter(item=>{
                return item.is_select!=1
            })
            //重置localStrong
            localStorage.setItem('cartList',JSON.stringify(cartlist3))
            location.reload()
        }
    
       
    }
    //清空购物车
    if(target.innerHTML=='清空购物车'){
        localStorage.removeItem('cartList')
        location.reload()
    }
    
    if(target.innerHTML=='删除勾选商品'){
        //过滤数组元素
        var cartlist4=cartlist.filter(item=>{
            return item.is_select!=1
        })
        //重置localStrong
        localStorage.setItem('cartList',JSON.stringify(cartlist4))
        location.reload()
    }

}


function total1(){
    var num=0 //商品总数量
    var pirce=0  //总价格
    //遍历cartlist数组
    cartlist.forEach(item=>{
        //遍历该商品是否被选中
        if(item.is_select==1){
            //统计该商品总数量
            num+=item.cart_number
            //统计总计
            pirce+=parseInt(item.cart_number)*parseFloat(item.pirce);
        }
    })
    return [num,pirce.toFixed(2)]
}
