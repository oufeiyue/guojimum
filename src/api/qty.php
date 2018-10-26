<?php
    $uname = isset($_GET['yonghuming'])? $_GET['yonghuming'] : 'xx';
    $goodId = isset($_GET['goodId'])? $_GET['goodId'] : 1;
    $qty = isset($_GET['qty'])? $_GET['qty'] : 1;
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'mum';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die($conn->connect_error);
    }
    $conn->set_charset('utf8');
    $sql = 'update gouwuche set qty='.$qty.' where uname="'.$uname.'" and goodId='.$goodId;
    $res = $conn->query($sql);
    if($res){
        echo "cheng";
    }else{
        echo "bai";
    }
    $conn->close();
?>