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

$game_id = $_POST['game_id'];

$query = "SELECT teams.team, users.username from teams join users where teams.user_id = users.id and game_id = '$game_id'";

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
	echo json_encode($response);
	exit;
}
?>
