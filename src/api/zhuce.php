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
        $sql = 'insert into zhuce (uname,tel,passwords) values ("'.$uname.'",'.$tel.',"'.$passwords.'")';
        $res = $conn->query($sql);
        // echo(666);
        if($res){
            echo "cheng";
        }else{
            echo "bai";
        }
    
    $conn->close();
?>