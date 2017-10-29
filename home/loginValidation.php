<?php
require '../common/database.php';
session_start();
if (isset($_SESSION['username'])) {
	header( 'Location: ../game/lobby.php' ); //user is already logged in, go right to lobby.
}

$user = $_POST["username"];
$pw = $_POST["password"];
$savedPw = "";

$conn = getConnection();
$query = "SELECT * from users where username = '$user'";

$res = mysqli_query($conn, $query);

if(mysqli_num_rows($res) != 1){
	$data = array(
		"isValid"=> false,
		"feedback"=> "User not found."
		);
		cleanupDBResources($conn,$res);
	echo json_encode($data);
	exit;
}else{
	$row = $res->fetch_row();
	$savedPw = $row[2];
	$userId = $row[0];
}

if(password_verify($pw,$savedPw)) { 
	$update = "UPDATE users SET isLoggedIn=true WHERE username = '$user'";
	$up = mysqli_query($conn, $update);
	if($up){
		$data = array(
			"isValid"=> true,
			"feedback"=>"Logged in!"
			);
		$_SESSION['username'] = $user;
		$_SESSION['userid'] = $userId;
		cleanupDBResources($conn,$res);
		echo json_encode($data);
		exit;
	}else{
		$data = array(
			"isValid"=> false,
			"feedback"=>"Something went wrong."
			);
		cleanupDBResources($conn,$res);
		echo json_encode($data);
		exit;
	}
}else{
	$data = array(
		"isValid"=> false,
		"feedback"=> "Incorrect password."
		);
		cleanupDBResources($conn,$res);
		echo json_encode($data);
	exit;
}

?>
