jQuery(function($){
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
	var goodId = decodeURI(location.search);
    goodId = goodId.slice(8);
    $.ajax({
		url:"../api/xiangqing.php",
		type:"GET",
		data:{
			goodId:goodId
		},
		success:function(res){
			var goodsArr = JSON.parse(res);
			name.innerHTML= goodsArr[0].title;
			jiage.innerHTML='￥'+goodsArr[0].price;
		}
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
    	console.log($_number);
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