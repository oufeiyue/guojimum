<?php
	$currentId = isset($_GET['currentId'])? $_GET['currentId'] : 1;
    $currentPage = isset($_GET["currentPage"])? $_GET["currentPage"]:1;
    $qty = isset($_GET["qty"])? $_GET["qty"]:24;
    $shows = isset($_GET["shows"])? $_GET["shows"]:"";
    // echo $shows;

    // echo $currentId;
	$servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'mum';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die($conn->connect_error);
    }
    $conn->set_charset('utf8');
    // echo "连接成功";
     if($shows === ""){
         $sql = 'select * from list where id='.$currentId.' limit '.($currentPage-1)*$qty.','.$qty;
    }else{
        if($shows == "true"){
            $sql = 'select * from list where id='.$currentId.' order by price asc'.' limit '.($currentPage-1)*$qty.','.$qty;
        }else if($shows == "false"){
            $sql = 'select * from list where id='.$currentId.' order by price desc'.' limit '.($currentPage-1)*$qty.','.$qty;
        }
        // echo 666;
    }
    $result = $conn->query($sql);
    $arr = $result->fetch_all(MYSQLI_ASSOC);
    $sql1 = 'select * from list where id='.$currentId;
    $result1 = $conn->query($sql1);
    $resArr = array(
        "data" => $arr,
        "len" => $result1->num_rows,
        "currentPage" => $currentPage,
        );
    $result->close();
    $result1->close();
    echo json_encode($resArr,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>