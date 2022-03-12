//获取大盒子对象
var shopping = document.querySelector('.shopping');
//获取地址栏中的参数信息
var path1= location.search
//显示详情信息显示的数据
var dt;
//判断该参数是否存在
if(path1){
    //获取参数信息
    var id1 = path1.split('?')[1].split('=')[1];
    //使用异步函数发送请求，并获取响应结果
    (async function(){
        var p1 = await promiseAjax({
            url:'../php/details.php',
            data:'id='+id1,
        })
        //转换格式
        dt = eval('('+p1+')');
        //设置内容
        var str = `
            <div class="shopping-nav">
                <p>
                    <span><a href="./home.html">首页</a></span>
                    <span>></span>
                    <span><a href="./list.html">VANS鞋</a></span>
                    <span>></span>
                    <span><a href="#">${dt.name}</a></span>
                </p>
            </div>
            <div class="shopping-photo">
                <img src="${dt.img}" class="img">
                <div class='mark'></div>
            </div>
            <div class='rightBox'>
                <img src="${dt.img}">
            </div>
            <div class="shopping-choose">
                <h1>${dt.name}</h1>
                <p>官网价：￥<span>${dt.pirce}</span></p>
                <dl>
                    <dt>尺码：</dt>
                    <dd>35</dd>
                    <dd>36</dd>
                    <dd>37</dd>
                    <dd>38</dd>
                    <dd>39</dd>
                    <dd>40</dd>
                    <dd>41</dd>
                    <dd>42</dd>
                    <dd>43</dd>
                    <dd>44</dd>
                    <dd>45</dd>
                </dl>
            </div>
            <div class="buybox">
                <a href="./cart.html" class="buy">立即购买</a>
                <a class="pushcart">加入购物车</a>
            </div>
        `
        shopping.innerHTML = str;
    })()
}else{
    alert("非法进入")
    location.href='../html/login.html';
}



//加入购物车
//给大盒子绑定点击事件
shopping.onclick=function(e){
  var e = e || window.event
  var target=e.target || e.srcElement
  //判断点击的对象是否为“加入购物车”
  if(target.innerHTML=="加入购物车"){
     //获取localStrong中的cartList
     var cartList=localStorage.getItem("cartList")
     if(cartList){
        var a=0 //判断要添加的数据是否存在
        //把字符串转为数组对象
        cartList=JSON.parse(cartList)
        //遍历cartlist数组中所有数据
        cartList.forEach((item)=>{
          //当前满足条件时，代表当前添加的数据在localStorage中存在
           if(item.id==dt.id){
             item.cart_number=++item.cart_number
             a++
             localStorage.setItem('cartList',JSON.stringify(cartList))
           }
        })
        //判断当前添加的商品是否存在
        if(a==0){
          //修改添加的商品数量
          dt.cart_number=1
          //把当前商品追加到cartList数组中
          cartList.push(dt)
          //更新localStorage中的数据
          localStorage.setItem('cartList',JSON.stringify(cartList))
        }
     }else{
       //修改添加的商品数量
       dt.cart_number=1
       //在localStrong设置一个cartList属性
       localStorage.setItem('cartList',JSON.stringify([dt]))
     }
  }
}




// 放大镜
//移动函数
function move(e){
    var rightbox=document.getElementsByClassName('rightBox')[0];
    var box=document.getElementsByClassName('shopping-photo')[0];
    var rightImg=rightbox.getElementsByTagName('img')[0];
    var mark=document.getElementsByClassName('mark')[0];

    //获取当坐标点
    var x1=e.pageX-box.offsetLeft-parseInt(mark.offsetWidth/2)
    var y1=e.pageY-box.offsetTop-parseInt(mark.offsetHeight/2)
    //设置遮藏层的移动范围
    var maxX=box.offsetWidth-mark.offsetWidth
    var maxY=box.offsetHeight-mark.offsetHeight
    var minX=minY=0
    //设置右边图片的移动距离
    var x2,y2
    //判断当前是否在大盒子中移动
    if(x1<minX){
        mark.style.left=minX+'px'
        x2=0
    }else if(x1>maxX){
        mark.style.left=maxX+'px'
        x2=maxX
    }else{
        mark.style.left=x1+'px'
        x2=x1
    }
    if(y1<minY){
        mark.style.top=minY+'px'
        y2=0
    }else if(y1>maxY){
        mark.style.top=maxY+'px'
        y2=maxY
    }else{
        mark.style.top=y1+'px'
        y2=y1
    }
    //让右边图片进行移动
    rightImg.style.left=-2*x2+'px'
    rightImg.style.top=-2*y2+'px'
}

//给box对象绑定三个事件
shopping.onmouseover=function(e){
    var e = e || window.event
    var target = e.target || e.srcElement
    if(target.className=='img'){
        var mark=document.getElementsByClassName('mark')[0];
        var rightbox=document.getElementsByClassName('rightBox')[0];
        mark.style.display='block'
        rightbox.style.display='block'
    }
    //移动函数
    move(e)
}
shopping.onmousemove=function(e){
    var e = e || window.event
    move(e)
}
shopping.onmouseleave=function(e){
    var e = e || window.event
    var target = e.target || e.srcElement
        var mark=document.getElementsByClassName('mark')[0];
        var rightbox=document.getElementsByClassName('rightBox')[0];
        mark.style.display='none'
        rightbox.style.display='none'   
}
