jQuery(function($){
	var currentId=decodeURI(location.search);
    currentId = currentId.slice(11);
    var u1 =document.getElementsByClassName("brand_u1")[0];
    var jia = document.getElementsByClassName("jia")[0];
    var miaoshu_t = document.getElementsByClassName("miaoshu_t")[0];
    var pname = document.getElementsByClassName("pname")[0];
    var tp = document.getElementsByClassName("u1")[0];
    var page = document.querySelector(".page");
	var len;
	$.ajax({
		url:"../api/brands.php",
		type:"GET",
		data:{
			currentId:currentId
		},
		success:function(res){
			var brandsArr = JSON.parse(res);
			len = brandsArr.length;
			console.log(brandsArr);
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
	$.ajax({
		url:"../api/goods.php",
		type:"GET",
		data:{
			currentId:currentId,
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
    			console.log(goodsArr.len);
			 page.innerHTML = "";
                    for(var i=1;i<=total;i++){
                        var span = document.createElement("span");
                        span.innerHTML = i;
                        if(i == res.currentPage){
                            span.classList.add("active");
                        }
                        page.appendChild(span);
                    }
		}
	})
})