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
                //get user_id
                $query = "SELECT id from users where username = '$user'";
                $success2 = mysqli_query($conn, $query);

                $user_id = '';

                //assign $user_id
                while($row = mysqli_fetch_row($success2)){
                    $user_id = $row[0];
                }

                $delete = "DELETE from teams WHERE user_id = '$user_id'";
                $deleteSuccess = mysqli_query($conn, $delete);

                if($deleteSuccess){
                    $conn->close();
                    session_destroy();
                    header( 'Location: ../home/home.php' ); 
                    exit;
                }else{
                    echo "Something went wrong on logout";
                    $conn->close();
                    exit;
                }
            }else{
                echo "Something went wrong on logout";
                $conn->close();
                exit;
            }
        }
        else {
            session_destroy();
            header( 'Location: ../home/home.php' ); 
        }
    }
    ?>
