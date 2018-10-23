jQuery(function($){
	$("#lunbo").find(".lb").hh({imgs:["images/indexN_part2_tu1.jpg","images/indexN_part2_tu2.jpg","images/indexN_part2_tu3.jpg","images/indexN_part2_tu4.jpg"]});
	$("#lunbo").find(".left").hh({imgs:["images/1.PNG","images/2.PNG","images/3.PNG","images/4.PNG"],height:600});
	$('.carousel').carousel({
	  interval: 3000
	})
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
})