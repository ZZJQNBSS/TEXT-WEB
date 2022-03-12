//关键字搜索
        //获取ul操作对象
        var ul1=document.querySelector('.search-top>ul');
        //获取input操作对象
        var inp=document.querySelector(".text1");
        //给输入框绑定输入事件
        inp.oninput = function(){
            //让ul对象显示
            ul1.style.display='block';
            //获取表单中的value的值
            var val = this.value;
            //判断val是否为null
            if(val){
                Ajax({
                    url:'../php/seach.php',
                    data:`wd=${val}&cb=fn1`,
                    success:function(dt){
                        //截取当前返回值
                        var ar1 = dt.split(':');
                        //获取数组中的第四组,然后根据}来截取
                        var ar2 = ar1[3].split('}');
                        //把字符串数组转为数组对象
                        var ar3=eval('('+ar2[0]+')');
                        //创建存放所有的内容字符串
                        var str = '';
                        //遍历数组元素
                        for(var attr in ar3){
                            str+=`
                            <li>${ar3[attr]}</li>
                            `
                        }
                        //把拼接好的字符串添加到ul中
                        ul1.innerHTML = str
                    }
                })
            }else{
                ul1.style.display='none';
            }
        }