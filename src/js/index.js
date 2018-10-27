jQuery(function($){
	$("#lunbo").find(".lb").hh({imgs:["images/indexN_part2_tu1.jpg","images/indexN_part2_tu2.jpg","images/indexN_part2_tu3.jpg","images/indexN_part2_tu4.jpg"]});
	$("#lunbo").find(".left").hh({imgs:["images/1.PNG","images/2.PNG","images/3.PNG","images/4.PNG"],height:600});
	$('.carousel').carousel({
	  interval: 3000
	})
    var $btn2=$(".btn2");
    var $i1=$(".i1");
    var $tui =$(".tui");
	var timer;
    var $car_li =$(".car_li");
    var names =document.getElementsByClassName("names")[0];
    var $zhaoshangpin =$(".zhaoshangpin");
    var goodslist = document.getElementsByClassName("goodslist")[0];
    // var yonghuming = decodeURI(location.search);
    // yonghuming = yonghuming.slice(12);
    // console.log(yonghuming);
    var yonghuming = document.cookie;
    yonghuming = yonghuming.slice(11);
    // console.log(yonghuming);
	var btn5 = document.getElementsByClassName("btn5")[0];
    // console.log(yonghuming);
    if(yonghuming ==""){
    names.innerHTML ="请先登录";
    }else{
        names.innerHTML ="你好," +yonghuming;
    }
	btn5.onclick = function(){
	 	// console.log(666);
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
    $car_li.on("click",function(){
        location.href="html/gouwuche?yonghuming="+yonghuming;
    })
    $zhaoshangpin.on("click",function(){
        location.href="html/goods?yonghuming="+yonghuming;
    })
    $tui.on("click",function(){
        Cookie.removeCookie("yonghuming",yonghuming,"/");
        // console.log(666);
        location.href="index.html";
    })
    $.ajax({
            url:"../api/xuanran.php",
            type:"GET",
            // async:false,
            data:{
                uname:yonghuming
            },
            success:function(res){
                goodsArr = JSON.parse(res);
                var btn2_len = goodsArr.length;
                $i1.html(btn2_len);
            }
        })
    $btn2.on("click",function(){
        location.href="html/gouwuche.html";
    })
    $.ajax({
            url:"api/xuanran.php",
            type:"GET",
            // async:false,
            data:{
                uname:yonghuming
            },
            success:function(res){
                var goodsArr = JSON.parse(res);
                goodslist.innerHTML += goodsArr.map(function(item,idx){
                    var imgurl = item.img.slice(3);
                    console.log(imgurl);
                    return '<div class="list1">'+
                        '<p><img src="'+imgurl+'" alt=""></p>'+
                    '<p class="title1">'+item.title+'</p>'+
                    '<p class="p1">'+item.price+'</p>'+
                    '<p class="p1">'+item.qty+'</p>'+
                    '</div>'
                }).join("");
            }
        })
})