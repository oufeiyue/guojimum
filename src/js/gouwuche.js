jQuery(function($){
	// var yonghuming = decodeURI(location.search);
 //    yonghuming = yonghuming.slice(12);
 var $allBtn =$(".allBtn");
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
    var yonghuming = obj.yonghuming;
    var $tr1 = $(".tr1");
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
				var goodsArr = JSON.parse(res);
				var res ="";
				res += goodsArr.map(function(item,idx){
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
	$("tr:nth-of-type(n+1)").on("click",".jia",function(){
		// console.log(666);
		var $num= parseInt($(this).prev().val());
		var ids = $(this).closest('tr').attr('id');

		// var num= $(this).prev().val() +1;
		$(this).prev().val($num+1);
		var qtyy = Number($(this).prev().val());
		var $djia = $(this).parent().prev().find('span').html();
		var $totalPrice= ($num+1) * $djia;
		console.log(qtyy,ids);
		$(this).parent().next().find('span').html("￥"+$totalPrice);
			$.ajax({
                            url:"../api/qty.php",
                            type:"GET",
                            data:{
                                goodId:ids,
                                yonghuming:yonghuming,
                                qty:qtyy,
                            },
                            success:function(res){
								console.log(666);
                        }

                    })
	})
	$("tr:nth-of-type(n+1)").on("click",".jian",function(){
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
				console.log($(this));
				$(this).parent().parent().html("");
			}
		})
			return;
	}
		// var num= $(this).prev().val() +1;
		$(this).next().val($num1-1);
		var $djia2= $(this).parent().prev().find('span').html();
		var $totalPrice2= ($num1-1) * $djia2;
		// console.log($djia2,$totalPrice2)
		$(this).parent().next().find('span').html("￥"+$totalPrice2);
		
		$.ajax({
                            url:"../api/qty.php",
                            type:"GET",
                            data:{
                                goodId:jian_id,
                                yonghuming:yonghuming,
                                qty:jian_qty,
                            },
                            success:function(res){

                                console.log(666);
                        }

                    })
	})
	$("tr:nth-of-type(n+1)").on("click",".remove",function(){
		var ids= $(this).parent().attr('id');
		console.log(ids);
		$(this).parent().html("");
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
			// 	var goodsArrs = JSON.parse(res1);

			// 	var res1 ="";
			// 	res1 += goodsArrs.map(function(item,idx){
			// 		return '<tr id='+item.id+'>'+
			// 	'<th><input class="select" type="checkbox" name=""></th>'+
			// 	'<th>'+
			// 		'<img src="'+item.img+'" class="shang">'+
			// 		'<span class="title">'+item.title+'</span>'+
			// 	'</th>'+
			// 	'<th><span>自营自贸仓</span></th>'+
			// 	'<th><span>'+item.price+'</span></th>'+
			// 	'<th>'+
			// 		'<span class="jian"><img src="../images/flow_icon_p-.png" class="gwc_jian"></span>'+
			// 		'<input type="text" value='+item.qty+'>'+
			// 		'<span class="jia"><img src="../images/flow_icon_add.png" class="gwc_add"></span>'+
			// 	'</th>'+
			// 	'<th><span>'+item.price+'</span></th>'+
			// 	'<th><span>税费补贴</span></th>'+
			// 	'<th class="remove"><span>删除</span></th>'+
			// '</tr>'
			// 	});
			// 	console.log(res1);
			// 	$tr1.after(res1);
			}
		})
	})
 var $sCheckbox = $(":checkbox").not(".allBtn");
 console.log($sCheckbox);

	$allBtn.on("click",function(){
		// console.log($(this));
		$sCheckbox.prop("checked",this.checked);
	})
	$sCheckbox.on("click",function(){
		if($(this).prop("checked")){
			var jg = $(this).parent().parent().find('.xj').html();
			console.log(jg);
			$(".xj")
		}
	})
})
