<?php
require '../common/database.php';

session_start();
if (isset($_SESSION['username'])) {
	header( 'Location: ../game/lobby.php' ); //user is already logged in, go right to lobby.
}

function returnFalse()
{
	$response = array(
		"success" => false
	);
	echo json_encode($response);
}

/*
first, get the user id for the user
*/
$conn = getConnection();

//$query = "SELECT id from users where username = ".$_SESSION['username'];
$query = "SELECT id from users where username = 'derf'"; //testing
$res = mysqli_query($conn, $query);

//$game_id = $_POST['game_id'];
$game_id = 1; //testing

$query = "SELECT * from teams where game_id = '$game_id'";
$res = mysqli_query($conn, $query);

if(!$res){
	returnFalse();
	exit;
}else{
	$arr = mysqli_fetch_all($res);

	$response = array(
		"success" => true,
		"results" => $arr
		);
	echo $response;
	exit;
}
?>
