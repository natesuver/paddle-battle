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
	$conn->close();
}

/*
first, get the user id for the user
*/
$username = $_SESSION['username'];
//$username = 'stif'; //test

$conn = getConnection();
$query = "SELECT id from users where username = '$username'";
$res = mysqli_query($conn, $query);

if(!$res){
	returnFalse();
	exit;
}else{
	$user_id = '';

	//assign $user_id
	while($row = mysqli_fetch_row($res)){
		$user_id = $row[0];
	}

	$game_id = $_POST['game_id'];
	//$game_id = 1;

	$query = "DELETE FROM teams where user_id = '$user_id' and game_id = '$game_id'";
	$del = mysqli_query($conn, $query);
	if(!$del){
		returnFalse();
		exit;
	}else{
		$response = array(
			"success" => true
		);
		echo json_encode($response);
		$conn->close();
		exit;
	}
}
