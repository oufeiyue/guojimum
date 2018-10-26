<?php
    $uname = isset($_GET['yonghuming'])? $_GET['yonghuming'] : 'xx';
    $goodId = isset($_GET['goodId'])? $_GET['goodId'] : 1;
    $img = isset($_GET['img'])? $_GET['img'] : 'xx';
    $price = isset($_GET['price'])? $_GET['price'] : 1;
    $qty = isset($_GET['qty'])? $_GET['qty'] : 1;
    $title = isset($_GET['title'])? $_GET['title'] : 'xx';
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'mum';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die($conn->connect_error);
    }
    $conn->set_charset('utf8');
    $sql1 = 'select * from gouwuche where uname="'.$uname.'" and goodId='.$goodId;
    $res1 = $conn->query($sql1);
    if($res1->num_rows > 0){
        $sql2 = 'select * from gouwuche where uname="'.$uname.'" and goodId='.$goodId;
        $res2 = $conn->query($sql2);
        $arr = $res1->fetch_all(MYSQLI_ASSOC);
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }else{
        $sql = 'insert into gouwuche (uname,title,img,price,qty,goodId) values ("'.$uname.'","'.$title.'","'.$img.'",'.$price.','.$qty.','.$goodId.')';
        $res = $conn->query($sql);
        if($res){
            echo "cheng";
        }else{
            echo "bai";
        }
    }
    
    $conn->close();
?>