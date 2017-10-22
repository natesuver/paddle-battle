<?php
require '../common/database.php';

session_start();
if (isset($_SESSION['username'])) {
	header( 'Location: ../game/lobby.php' ); //user is already logged in, go right to lobby.
}

function returnFalse
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
$query = "SELECT id from users where username = '$_SESSION["username"]'";

$res = mysqli_query($conn, $query);

if($!res){
	returnFalse();
	exit;
}else{
	print($res);
	/*
	now add user to a team using user id
	*/

	$user_id = 4; //testing
	$team = $_POST['team'];
	$game_id = $_POST['game_id'];

	//look to see if the user has already joined a team
	$query = "SELECT * from teams where game_id = '$game_id' and user_id = '$user_id'";
	$exists = mysqli_query($conn, $query);

	if(!$exists){
		returnFalse();
		exit;
	}

	if(mysqli_num_rows($exists) == 1){
		//if user has already joined team in this game, UPDATE team
		$query = "UPDATE teams set team = '$team' where game_id = '$game_id' and user_id = '$user_id'";
		$exec = mysqli_query($conn, $query);

		if($exec){
			$response = array(
					"success" => true
				);
			echo json_encode($response);
			exit;
		}else{
			returnFalse();
			exit;
		}
	}elseif (mysqli_num_rows($exists) == 0) {
		//if user has not joined a team in this game, INSERT team
		$query = "INSERT INTO teams VALUES ('$game_id', '$team', '$user_id')";
		$exec = mysqli_query($conn, $query);

		if($exec){
			$response = array(
					"success" => true
				);
			echo json_encode($response);
			exit;
		}else{
			returnFalse();
			exit;
		}
	}else{
		returnFalse();
		exit;
	}
}
?>