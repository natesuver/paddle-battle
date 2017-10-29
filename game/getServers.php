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

$conn = getConnection();

$query = "SELECT id, server_name, url, game_id FROM servers where game_started = false";

$res = mysqli_query($conn, $query);

if(!$res){
	returnFalse();
	$res->close();
	$conn->close();
	exit;
}else{
	$arr = mysqli_fetch_all($res);

	$response = array(
		"success" => true,
		"results" => $arr
		);
	echo json_encode($response);
	$res->close();
	$conn->close();
	exit;
}
