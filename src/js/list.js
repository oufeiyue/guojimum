jQuery(function($){
	var params = decodeURI(location.search);
	params = params.slice(1,-1);

	// 2.将字符串转成对象
	var paramsArr = params.split("&");
	var obj = {};
	paramsArr.forEach(function(item){
			// "age=18" ====>[age,18]
			var arr = item.split("=");
			obj[arr[0]] = arr[1];
		})
    var currentId = obj.currentId;
    // var yonghuming = obj.yonghuming;
    var yonghuming = document.cookie;
     yonghuming = yonghuming.slice(11);
    console.log(currentId,yonghuming);
    var u1 =document.getElementsByClassName("brand_u1")[0];
    var jia = document.getElementsByClassName("jia")[0];
    var miaoshu_t = document.getElementsByClassName("miaoshu_t")[0];
    var pname = document.getElementsByClassName("pname")[0];
    var tp = document.getElementsByClassName("u1")[0];
    var page = document.querySelector(".page");
	var len;
	var timer;
	var btn5 = document.getElementsByClassName("btn5")[0];
	var $price =$(".price");
	var jgdef = document.querySelector(".jgdef");
	$.ajax({
		url:"../api/brands.php",
		type:"GET",
		data:{
			currentId:currentId
		},
		success:function(res){
			var brandsArr = JSON.parse(res);
			len = brandsArr.length;
			// console.log(brandsArr);
			u1.innerHTML += brandsArr.map(function(item,idx){
				return "<li>"+item.brands+"</li>"
			}).join("");
			pname.innerHTML += brandsArr[0].classfy;
		}
	})
	var show =true;
	jia.onclick=function(){
		if(show){
			miaoshu_t.style.height=Math.ceil(len/5)*82+"px";
			show=!show;
			}else{
				miaoshu_t.style.height=80+"px";
				show=!show;
				}
		
	}
	var currentPage=1;
	pages();
	page.onclick=function(e){
		if(e.target.tagName.toLowerCase() =="span"){
			tp.innerHTML="";
			currentPage=e.target.innerHTML;
			pages();
		}
		dsq();
	}
	btn5.onclick = function(){
	 	console.log(666);
                dsq();
            }
    var shows =true;
    $price.on("click",function(){
    	tp.innerHTML="";
		pages();
		if(shows){
			console.log("xxx");
			jgdef.style.background= "url(../images/category_icon_jg_desc.png) 0px 0px/14px no-repeat";
		}else{
			jgdef.style.background= "url(../images/category_icon_jg_asc.png) 0px 0px/14px no-repeat";
		}
		shows=!shows;
    })
    tp.onclick=function(e){
    	if(e.target.tagName.toLowerCase() == "img"){
    		var goodId = e.target.parentElement.id;
    		location.href = "xiangqing.html?goodId="+encodeURI(goodId)+"&yonghuming="+yonghuming+"&";
    	}
    }
	function pages(){
		$.ajax({
			url:"../api/goods.php",
			type:"GET",
			data:{
				currentId:currentId,
				currentPage:currentPage,
				shows:shows
			},
			success:function(res){
				var goodsArr=JSON.parse(res);
				 tp.innerHTML += goodsArr.data.map(function(item,idx){
	                        return '<li id='+item.idx+'>'+
									'<img src="'+item.img+'" alt="">'+
									'<p class="title">'+item.title+'</p>'+
									'<span class="sp1">特卖中</span>'+
									'<span class="sp2">满减</span>'+
									'<span class="sp3">清仓</span>'+
									'<p class="price">'+item.price+'</p>'+
								'</li>'
	                }).join("");
				 var total = Math.ceil(goodsArr.len/24);
	    			console.log(goodsArr.currentPage);
				 page.innerHTML = "";
	                    for(var i=1;i<=total;i++){
	                        var span = document.createElement("span");
	                        span.innerHTML = i;
	                        if(i == goodsArr.currentPage){
	                            span.classList.add("active");
	                            console.log(666);
	                        }
	                        page.appendChild(span);
	                    }
			}
		})
	}
	
	
            function dsq (){
            	clearInterval(timer);
                timer = setInterval(function(){
                    var currentPos = window.scrollY;
                    if(currentPos <= 0){
                        currentPos = 0;
                        clearInterval(timer);
                    }
                    //3.1 通过当前位置改变返回的速度。最好取整
                    var speed = Math.ceil(currentPos/10);
                    // currentPos -= speed;
                    window.scrollBy(0,-speed);
                }, 30)
            }

})