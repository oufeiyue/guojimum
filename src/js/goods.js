jQuery(function($){
	var timer;
	var btn5 = document.getElementsByClassName("btn5")[0];
    var $i1=$(".i1");
    var $btn2=$(".btn2");
    var yonghuming= document.cookie;
     yonghuming = yonghuming.slice(11);
     console.log(yonghuming);
    // var yonghuming = decodeURI(location.search);
    // yonghuming = yonghuming.slice(12);
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
    var $ul=$(".milk").find("ul");
    $ul.on("click","li",function(e){
            console.log(666);
            var currentId =this.id;
            location.href = "list.html?currentId="+encodeURI(currentId)+"&yonghuming=" +yonghuming+"&";
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
        location.href="gouwuche.html";
    })
})