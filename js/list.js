//获取操作对象
var pagination=document.querySelector('.Pagination');
var divRow=document.querySelector('.shopping');
//使用自执行函数获取数据中对应的数据
(async function(){
    var p1 = await promiseAjax({
        url:'../php/list.php'
    })
    //转成数据类型
    var dt=eval('('+p1+')')

    //编写传入的数据
    var obj = {
        pageInfo:{
            pagenum:1,//当前页
            pagesize:20,//每页显示的条数
            totalsize:dt.length,//总条数
            totalpage:Math.ceil(dt.length/20)//总页数
        },
        textInfo:{
            first:'首页',
            prev:'上一页',
            next:'下一页',
            last:'尾页'
        },
        change(m){
            //截取指定长度的数据
            let ar2 = dt.slice((m - 1) * 20,m * 20);
            //拼接所有内容
            var str = '';
            //遍历新数组中的所有数据
            for(var attr in ar2){
                str+=`
                <ul>
                <li>
                    <div class="shopping-img">
                        <img src="${ar2[attr].img}" alt="">
                    </div>
                    <div class="shopping-info">
                        <i>${ar2[attr].name}</i>
                        <h3>￥:<span class="red">${ar2[attr].pirce}</span></h3>
                        <h4>
                            总销量：<span class="red">${ar2[attr].number}</span>
                        </h4>
                        <p>
                            <a class="btn1">收藏</a>
                            <a href="./details.html?id=${ar2[attr].id}" class="btn2">查看商品详情</a>
                        </p>
                    </div>
                </li>
            </ul>
            `
            }
            divRow.innerHTML = str;
        }
    }
    //创建分页器对象
    new Pagination(pagination,obj)
})()
