<?php
    require '../common/database.php';
    session_start();
    $error = logoutUser();
    session_destroy();
    function logoutUser() {
        if ($_SESSION['username']) {
            $user = $_SESSION['username'];
            $update = "UPDATE users SET isLoggedIn=false WHERE username = '$user'";
            $conn = getConnection();
            $success = mysqli_query($conn, $update);
            if($success){
                session_destroy();
                header( 'Location: ../home/home.php' ); 
                exit;
            }else{
                echo "Something went wrong on logout";
                exit;
            }
        }
        else {
            session_destroy();
            header( 'Location: ../home/home.php' ); 
        }
    }
    ?>