<?php
    $uname = isset($_GET['yonghuming'])? $_GET['yonghuming'] : 'xx';
    $goodId = isset($_GET['goodId'])? $_GET['goodId'] : 1;
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = 'mum';
    $conn = new mysqli($servername, $username, $password, $dbname);
    if ($conn->connect_error) {
        die($conn->connect_error);
    }
    $conn->set_charset('utf8');
    $sql = 'delete from gouwuche where uname= "'.$uname.'" and goodId='.$goodId;
    $res = $conn->query($sql);
    // if($res){
    //     $sql1 = 'select * from gouwuche where uname="'.$uname.'"';
    //     $result = $conn->query($sql1);
    //     $arr = $result->fetch_all(MYSQLI_ASSOC);
     
    //     $result->close();
    //     echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    //     }else{
    //         echo "not";
    //     }
    $conn->close();
?>