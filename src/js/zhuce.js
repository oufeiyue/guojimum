jQuery(function(){
	var verifyCode = new GVerify("v_container");
	var $first= $(".first");
	var $second= $(".second");
	var $third= $(".third");
	var $four =$(".four");
	var $five =$(".five");
	var yzm= document.getElementsByClassName("yzm")[0];
	var phone= document.getElementsByClassName("phone")[0];
	var mima= document.getElementsByClassName("mima")[0];
	var remima= document.getElementsByClassName("remima")[0];
	var gou= document.getElementsByClassName("gou")[0];
	var name= document.getElementsByClassName("name")[0];
	var $tj = $(".tj");
	var _second;
	var _four;
	var _first;
	$first.on("blur",function(){
		_first = $first.val();
		if(!/^1[3-9]\d{9}$/.test(_first)){
			phone.innerHTML="请输入正确的手机号";
			$first.val("");
			phone.className ="red";
		}
		else{
			phone.innerHTML="手机格式正确";
			phone.className ="green";
		}
	})
	$first.on("focus",function(){
		phone.innerHTML="";
	})
	$second.on("focus",function(){
		mima.innerHTML="";
	})
	$third.on("focus",function(){
		remima.innerHTML="";
	})
	$five.on("focus",function(){
		yzm.innerHTML="";
	})
	$second.on("blur",function(){
		_second = $second.val();
		if(!/^[a-z]\w{5,19}$/.test(_second)){
			mima.innerHTML="请输入正确的密码";
			$second.val("");
			mima.className ="red";
		}else{
			mima.innerHTML="密码格式正确";
			mima.className ="green";
		}
	})
	$third.on("blur",function(){
		var _third = $third.val();
		if(_second != _third){
			remima.innerHTML="两次密码不一样";
			$third.val("");
			remima.className ="red";
		}else{
			remima.innerHTML="两次密码相同";
			remima.className ="green";
		}
	})
	$four.on("blur",function(){
		_four = $four.val();
		var reg = /\s+/g;
		var res =_four.replace(reg,"");
        $four.val(res);
        _four = $four.val();
        $.ajax({
			url:"../api/zhuce2.php",
			type:"GET",
			data:{
				uname:_four
			},
			success:function(res){
				if(res == "can"){
					name.innerHTML="可以使用该用户名";
					name.className ="green";
				}else if(res =="not"){
					name.innerHTML="该用户名已被占用";
					name.className ="red";
					$four.val("");
				}
			}
		})
	})
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
		if($four.val() !== "" && phone.innerHTML=="手机格式正确" && mima.innerHTML=="密码格式正确" && remima.innerHTML=="两次密码相同" && yzm.innerHTML =="验证码正确" && name.innerHTML=="可以使用该用户名" && gou.checked){
	console.log(666);
			$.ajax({
			url:"../api/zhuce.php",
			type:"GET",
			data:{
				uname:_four,
				tel:_first,
				password:_second
			},
			success:function(res){
				if(res == "cheng"){
					alert("注册成功");
				}else if(res =="bai"){
					alert("注册失败");
				}
			}
		})
		}else{
			alert("滚去填信息");
		}
	})
	
})