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
    var goodId = obj.goodId;
    var yonghuming = obj.yonghuming;
    // console.log(goodId,yonghuming);
	var exzoom_img_ul = document.getElementsByClassName("exzoom_img_ul")[0];
	var btn5 = document.getElementsByClassName("btn5")[0];
	var timer;
	var name = document.getElementsByClassName("name")[0];
	var jiage = document.getElementsByClassName("jiage")[0];
	var $gou = $(".gou");
	var $buy=$(".buy");
	var $clear = $(".clear");
	var $box = $(".box");
	var $close = $(".close");
	var $number = $("#number");
	var $add =$(".add");
	var $jian = $(".jian");
    var $btn_buy=$(".btn_buy");
    var $gou =$(".gou");
    var goodsPrice =document.getElementsByClassName("goodsPrice")[0];
    var $photo = $(".photo");
    var img;
    var price;
    var title;
    var btn_gwc =document.getElementsByClassName("btn_gwc")[0];
	// var goodId = decodeURI(location.search);
 //    goodId = goodId.slice(8);
    $.ajax({
		url:"../api/xiangqing.php",
		type:"GET",
		data:{
			goodId:goodId
		},
		success:function(res){
			var goodsArr = JSON.parse(res);
            title=goodsArr[0].title;
			name.innerHTML= goodsArr[0].title;
			jiage.innerHTML='￥'+goodsArr[0].price;
		}
	})
    $gou.on("click",function(){
        $.ajax({
            url:"../api/xiangqing.php",
            type:"GET",
            data:{
                goodId:goodId
            },
            success:function(res){
                var goodsArr = JSON.parse(res);
                img = goodsArr[0].img;
                price= goodsArr[0].price;
                $photo.find('img').attr("src", goodsArr[0].img);
                goodsPrice.innerHTML='￥'+goodsArr[0].price;
            }
        })
    })
	btn5.onclick = function(){
	 	console.log(666);
                dsq();
            }
    $gou.on("click",function(){
    	$buy.css("display","none");
    	$clear.css("display","block");
    	$box.css("display","block");
    })
    $close.on("click",function(){
    	$clear.css("display","none");
    	$buy.css("display","block");
    	$box.css("display","none");
    })
    $add.on("click",function(){
    	var $_number = $number.val();
    	$_number++;
    	// console.log($_number);
    	$number.val($_number);
    })
    $jian.on("click",function(){
    	var $_num = $number.val();
    	if($_num == 0){
    		return;
    	}
    	$_num--;
    	$number.val($_num);
    })
    $btn_buy.on("click",function(){
        var qty = $number.val();
        console.log(qty,yonghuming);
        if(yonghuming == ""){
            alert("添加失败,请先登录");
            $clear.css("display","none");
            $buy.css("display","block");
            $box.css("display","none");
            return;
        }
        $.ajax({
            url:"../api/gouwuche.php",
            type:"GET",
            data:{
                goodId:goodId,
                yonghuming:yonghuming,
                img:img,
                price:price,
                qty:qty,
                title:title
            },
            success:function(res){
                if(res == "cheng"){
                    $clear.css("display","none");
                    $buy.css("display","block");
                    $box.css("display","none");
                }else if(res=="bai"){
                    alert("添加失败");
                }else{
                    var shujuArr = JSON.parse(res);
                    var qtys = shujuArr[0].qty;
                    console.log(qtys);
                    qty = Number(qty) + Number(qtys);
                    $.ajax({
                            url:"../api/qty.php",
                            type:"GET",
                            data:{
                                goodId:goodId,
                                yonghuming:yonghuming,
                                img:img,
                                price:price,
                                qty:qty,
                                title:title
                            },
                            success:function(res){
                                if(res == "cheng"){
                                    $clear.css("display","none");
                                    $buy.css("display","block");
                                    $box.css("display","none");
                                }else if(res=="bai"){
                                    alert("添加失败");
                            }
                        }

                    })
                }
            }
        })

	
    })
    btn_gwc.onclick=function(){
        console.log(222);
        location.href="gouwuche.html?yonghuming="+yonghuming+"&goodId="+goodId+"&";
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