<?php
	$currentId = isset($_GET['currentId'])? $_GET['currentId'] : 1;
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
    $sql = 'select * from brands where id='.$currentId;
    $result = $conn->query($sql);
    $arr = $result->fetch_all(MYSQLI_ASSOC);
 
    $result->close();
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>