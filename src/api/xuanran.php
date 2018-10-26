<?php
	$uname = isset($_GET['uname'])? $_GET['uname'] : "xx";
    // echo $uname;
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
    $sql = 'select * from gouwuche where uname="'.$uname.'"';
    $result = $conn->query($sql);
    $arr = $result->fetch_all(MYSQLI_ASSOC);
    // var_dump($arr);
    $result->close();
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $conn->close();
?>