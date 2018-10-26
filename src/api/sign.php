<?php
    $uname = isset($_GET['uname'])? $_GET['uname'] : 'xx';
    $passwords = isset($_GET['password'])? $_GET['password'] : 'xx';
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'mum';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die($conn->connect_error);
    }
    $conn->set_charset('utf8');
    $sql = 'select * from zhuce where uname="'.$uname.'" and passwords="'.$passwords.'"';
    $res = $conn->query($sql);
    if($res->num_rows > 0){
        $sql1 = 'select * from zhuce where uname="'.$uname.'"';
        $result = $conn->query($sql1);
        $arr = $result->fetch_all(MYSQLI_ASSOC);
        $result->close();
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }else{
        echo "not";
    }
    $conn->close();
?>