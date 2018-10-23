jQuery(function($){
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
    var $ul=$(".milk").find("ul");
    $ul.on("click","li",function(e){
            console.log(666);
            var currentId =this.id;
            location.href = "list.html?currentId="+encodeURI(currentId);
    })
})