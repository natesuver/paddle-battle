<?php

$user = $_POST["username"];
$pw = $_POST["password"];
$savedPw = "";

$conn = mysqli_connect(getenv('PB_SERVER_NAME'), getenv('PB_USER_NAME'), getenv('PB_DATABASE_PASSWORD'), getenv('PB_DATABASE_NAME'));
$query = "SELECT * from users where username = '$user'";

$res = mysqli_query($conn, $query);

if(mysqli_num_rows($res) != 1){
	$data = array(
		"isValid"=> false,
		"feedback"=> "User not found."
		);
	echo json_encode($data);
	exit;
}else{
	$row = $res->fetch_row();
	$savedPw = $row[2];
}

if($pw === $savedPw){
	$update = "UPDATE users SET isLoggedIn=true WHERE username = '$user'";
	$up = mysqli_query($conn, $update);
	if($up){
		$data = array(
			"isValid"=> true,
			"feedback"=>"Logged in!"
			);
		echo json_encode($data);
		exit;
	}else{
		$data = array(
			"isValid"=> false,
			"feedback"=>"Something went wrong."
			);
		echo json_encode($data);
		exit;
	}
}else{
	$data = array(
		"isValid"=> false,
		"feedback"=> "Incorrect password."
		);
	echo json_encode($data);
	exit;
}

?>
