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

$conn = getConnection();

/*
first, get the user id for the user
*/
$conn = getConnection();

//$query = "SELECT id from users where username = ".$_SESSION['username'];
$query = "SELECT id from users where username = 'derf'"; //testing
$res = mysqli_query($conn, $query);

$user_id = ??;

//$game_id = $_POST['game_id'];
$game_id = 1; //testing

$query = "DELETE FROM users where username = 'derf' and game_id = '$game_id'";
$del = mysqli_query($conn, $query);

if(!$del){
	returnFalse();
	exit;
}else{
	$response = array(
			"success" => true
		);
	echo json_encode($response);
	exit;
}
