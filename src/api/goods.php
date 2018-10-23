<?php
	$currentId = isset($_GET['currentId'])? $_GET['currentId'] : 1;
    $currentPage = isset($_GET["currentPage"])? $_GET["currentPage"]:1;
    $qty = isset($_GET["qty"])? $_GET["qty"]:24;
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
    $sql = 'select * from goods where id='.$currentId.' limit '.($currentPage-1)*$qty.','.$qty;
    $result = $conn->query($sql);
    $arr = $result->fetch_all(MYSQLI_ASSOC);
    $resArr = array(
        "data" => $arr,
        "len" => $result->num_rows,
        );
    $result->close();
    echo json_encode($resArr,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>