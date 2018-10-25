<?php
    $uname = isset($_GET['uname'])? $_GET['uname'] : 'xx';
    $tel = isset($_GET['tel'])? $_GET['tel'] : 1;
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
    $sql = "select * from zhuce where uname='" . $uname . "'";
    $res = $conn->query($sql);
    if($res->num_rows > 0){
        echo "not";
    }else{
        $sql1 = 'insert into zhuce (uname,tel,passwords) values ("'.$uname.'",'.$tel.',"'.$passwords.'")';
        $res1 = $conn->query($sql1);
        // echo(666);
        if($res1){
            echo "can";
        }else{
            echo "not";
        }
    }
    $conn->close();
?>