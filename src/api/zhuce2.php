<?php
    $uname = isset($_GET['uname'])? $_GET['uname'] : 'xx';
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'mum';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die($conn->connect_error);
    }
    $conn->set_charset('utf8');
    $sql = "select * from zhuce where uname='" . $uname . "'";
    $res = $conn->query($sql);
    if($res->num_rows > 0){
        echo "not";
    }else{
        echo "can";
    }
    $conn->close();
?>