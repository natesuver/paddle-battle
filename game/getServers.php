<?php
require '../common/database.php';

function returnFalse()
{
	$response = array(
		"success" => false
	);
	echo json_encode($response);
	$conn->close();
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
	$conn->close();
	exit;
}
