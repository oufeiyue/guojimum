jQuery(function($){
	var verifyCode = new GVerify("v_container");
	var $tj = $(".tj");
	var $four = $(".four");
	var $second =$(".second");
	var $five = $(".five");
	var yzm =document.getElementsByClassName("yzm")[0];
	var timer;
	var btn5 = document.getElementsByClassName("btn5")[0];
	btn5.onclick = function(){
	 	console.log(666);
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
	$five.on("blur",function(){
		var res = verifyCode.validate($five.val());
			if(res){
				yzm.innerHTML ="验证码正确";
				yzm.className ="green";
			}else{
				yzm.innerHTML ="验证码错误";
				yzm.className ="red";
				$five.val("");
			}
		
	})
	$tj.on("click",function(){
		var $_four = $four.val();
		var $_second = $second.val();
		if(yzm.innerHTML == "验证码正确"){
			$.ajax({
			url:"../api/sign.php",
			type:"GET",
			data:{
				uname:$_four,
				password:$_second
			},
			success:function(res){
				if(res == "not"){
					alert("登录失败");
				}else{
					var goodsArr=JSON.parse(res);
					var yonghuming = goodsArr[0].uname;
					// console.log(yonghuming);
					location.href="../index.html?yonghuming="+encodeURI(yonghuming);
					document.cookie="yonghuming="+yonghuming+";path= /";
					// Cookie.setCookie("yonghuming","/")
				}
			}
		})
		}else{
			alert("请填写验证码");
		}
	})
})