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

$query = "SELECT server_id, server_name, url, game_id FROM servers where game_started = false";

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