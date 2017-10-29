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
	$conn->close();
	exit;
}else{
	$user_id = '';

	//assign $user_id
	while($row = mysqli_fetch_row($res)){
		$user_id = $row[0];
	}

	$team = $_POST['team'];
	//$team = 1; //test
	$game_id = $_POST['game_id'];
	//$game_id = 1; //test

	//look to see if the user has already joined a team
	$query = "SELECT * from teams where game_id = '$game_id' and user_id = '$user_id'";
	$exists = mysqli_query($conn, $query);

	//if query doesn't go through, exit
	if(!$exists){
		returnFalse();
		$conn->close();
		exit;
	}

	if(mysqli_num_rows($exists) == 1){
		//if user has already joined a team in this game, UPDATE team
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
			$conn->close();
			exit;
		}
	}elseif(mysqli_num_rows($exists) == 0){
		//if user has not joined a team in this game, INSERT team
		$query = "INSERT INTO teams VALUES ('$user_id', '$team', '$game_id')";
		$exec = mysqli_query($conn, $query);

		if($exec){
			$response = array(
					"success" => true
				);
			echo json_encode($response);
			$conn->close();
			exit;
		}else{
			returnFalse();
			$conn->close();
			exit;
		}
	}else{
		//if num_rows is not 0 or 1, exit, something went wrong
		returnFalse();
		$conn->close();
		exit;
	}
}
?>
