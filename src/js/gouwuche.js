jQuery(function($){
	var $i1=$(".i1");
	// var yonghuming = decodeURI(location.search);
 //    yonghuming = yonghuming.slice(12);
 var $allBtn =$(".allBtn");
 $sCheckbox =$(".sCheckbox");
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
    var $dollar = $(".dollar");
    var $_dollar = Number($dollar.innerHTML);
    // var yonghuming = obj.yonghuming;
    var yonghuming = document.cookie;
    yonghuming = yonghuming.slice(11,21);
    console.log(yonghuming);
    var $tr1 = $(".tr1");
    var goodsArr;
    var $totals =0;
    var $btn2 = $(".btn2");
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
    // var $select =$(".select");
    // var $hh= $("tr:nth-of-type(n+1)");
    // console.log($hh);
	$.ajax({
			url:"../api/xuanran.php",
			type:"GET",
			async:false,
			data:{
				uname:yonghuming
			},
			success:function(res){
				goodsArr = JSON.parse(res);
				var res ="";
				res += goodsArr.map(function(item,idx){
					$totals += Number(item.price * item.qty);
					// console.log($totals);
					return '<tr id='+item.goodId+'>'+
				'<th><input class="select" type="checkbox" name=""></th>'+
				'<th>'+
					'<img src="'+item.img+'" class="shang">'+
					'<span class="title">'+item.title+'</span>'+
				'</th>'+
				'<th><span>自营自贸仓</span></th>'+
				'<th><span>'+item.price+'</span></th>'+
				'<th>'+
					'<span class="jian"><img src="../images/flow_icon_p-.png" class="gwc_jian"></span>'+
					'<input type="text" value='+item.qty+'>'+
					'<span class="jia"><img src="../images/flow_icon_add.png" class="gwc_add"></span>'+
				'</th>'+
				'<th><span class="xj">'+item.price * item.qty+'</span></th>'+
				'<th><span>税费补贴</span></th>'+
				'<th class="remove"><span>删除</span></th>'+
			'</tr>'
				});
				// console.log(res);
				$tr1.after(res);

			}
		})
	// console.log(goodsArr.length);
	for(var i=0;i<goodsArr.length;i++){
		$(".select").prop("checked",true);
	}
	changeAllChecked();
	$("tr:nth-of-type(n+1)").on("click",".jia",function(){
		// zongjia();
		// console.log(666);
		var $num= parseInt($(this).prev().val());
		var ids = $(this).closest('tr').attr('id');

		// var num= $(this).prev().val() +1;
		$(this).prev().val($num+1);
		var qtyy = Number($(this).prev().val());
		var $djia = $(this).parent().prev().find('span').html();
		var $totalPrice= ($num+1) * $djia;
		// console.log(qtyy,ids);
		$(this).parent().next().find('span').html($totalPrice);
			$.ajax({
                            url:"../api/qty.php",
                            type:"GET",
                            data:{
                                goodId:ids,
                                yonghuming:yonghuming,
                                qty:qtyy,
                            },
                            success:function(res){
								// console.log(666);
                        }

                    })
			zongjia();
	})
	$("tr:nth-of-type(n+1)").on("click",".jian",function(){
		// zongjia();
		// console.log(666);
		var jian_id =$(this).closest('tr').attr('id');
		var jian_qty = Number($(this).next().val());
		var $num1= parseInt($(this).next().val());
		if($num1 ==1){
			$.ajax({
			url:"../api/remove.php",
			type:"GET",
			// async:false,
			data:{
				goodId:jian_id,
				yonghuming:yonghuming
			},
			success:(res)=>{
				// console.log($(this));
				$(this).parent().parent().remove();
				location.href="gouwuche.html";
				zongjia();
			}
		})

			return;
	}
		// var num= $(this).prev().val() +1;
		$(this).next().val($num1-1);
		var $djia2= $(this).parent().prev().find('span').html();
		var $totalPrice2= ($num1-1) * $djia2;
		// console.log($djia2,$totalPrice2)
		$(this).parent().next().find('span').html($totalPrice2);
		
		$.ajax({
                            url:"../api/qty.php",
                            type:"GET",
                            data:{
                                goodId:jian_id,
                                yonghuming:yonghuming,
                                qty:jian_qty,
                            },
                            success:function(res){

                                // console.log(666);
                        }

                    })
		zongjia();
	})
	$("tr:nth-of-type(n+1)").on("click",".remove",function(){
		// zongjia();
		var ids= $(this).parent().attr('id');
		// console.log(ids);
		// $(this).parent().html("");
		// $("tr:nth-of-type(n+1)").html("");
		$.ajax({
			url:"../api/remove.php",
			type:"GET",
			async:false,
			data:{
				goodId:ids,
				yonghuming:yonghuming
			},
			success:function(res1){
			$(this).parent().parent().remove();
				location.href="gouwuche.html";
				zongjia();
			}
		})
		zongjia();
	})
 var $sCheckbox = $(":checkbox").not(".allBtn");
 // console.log($sCheckbox);

	$allBtn.on("click",function(){
		// console.log($(this));
		$sCheckbox.prop("checked",this.checked);
		changeAllChecked();
		// if($allBtn.prop("checked")){
		// 	$(".dollar").html($totals);
		// }else{
		// 	$(".dollar").html("00.00");
		// }
		zongjia();
	})
	$btn2.on("click",function(){
		$sCheckbox.prop("checked",this.checked);
		changeAllChecked();
		zongjia();
	})
	$sCheckbox.on("click",function(){
		changeAllChecked();
		zongjia();
		// if($(this).prop("checked")){
		// 	var jg = $(this).parent().parent().find('.xj').html();
		// 	// console.log(jg);
		// 	var $total =Number($(".dollar").html())+Number(jg);
		// 	$(".dollar").html($total);
		// 	// console.log($(".dollar").html());
		// }else{
		// 	var jg = $(this).parent().parent().find('.xj').html();
		// 	// console.log(jg);
		// 	var $total =Number($(".dollar").html())-Number(jg);
		// 	$(".dollar").html($total);
		// 	// console.log($(".dollar").html());
			
		// }
		
	})
	function changeAllChecked(){
                var len = $sCheckbox.length;
                var checkedlen = $sCheckbox.filter(":checked").length;
                if(len == checkedlen){
                    $allBtn.prop("checked",true);
                    $btn2.prop("checked",true);
                    $(".dollar").html($totals);
			// console.log($(".dollar").html());
                }else{
                    $allBtn.prop("checked",false);
                    // $(".dollar").html($totals);
                    $btn2.prop("checked",false);
                }
            }
            function zongjia(){
            	// var lens = $sCheckbox.filter(":checked").length;
            	var res=0;
            	$sCheckbox.filter(":checked").each(function(idx,item){
            		var zhi = $(item).parent().parent().find('.xj').html();
            		res += Number(zhi);
            		console.log(res);
            	})
            	$(".dollar").html(res);
            }
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
})
