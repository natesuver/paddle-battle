<?php
require '../common/database.php';

session_start();

function returnFalse()
{
	$response = array(
		"success" => false
	);
	echo json_encode($response);
}

$username = $_SESSION['username'];
$userid = $_SESSION['userid'];
$game_id = $_POST['game_id'];

$conn = getConnection();
$query = "UPDATE games set master_user = $userid where id = $game_id";
$update = mysqli_query($conn, $query);
if(!$update){
    returnFalse();
    $conn->close();
    exit;
}else{
    $response = array(
        "success" => true
    );
    echo json_encode($response);
    $conn->close();
    exit;
}
?>