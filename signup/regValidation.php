<?php
require '../common/database.php';
/*
THIS SCRIPT IS A CHECK FOR WHETHER A SUBMITTED USERNAME ALREADY EXISTS
returns array
*/
session_start();
$username = $_POST["username"];
$pw = password_hash($_POST["password"], PASSWORD_DEFAULT);
//$conn dependent on our DB host settings
$conn = getConnection();

//$query dependent on table name, column names
$query = "SELECT * FROM users WHERE username = '$username'";

$res = mysqli_query($conn, $query);

if(mysqli_num_rows($res) != 0){
		$data = array(
		'isValid'=> false,
		'feedback'=> 'Username unavailable.'
		);
		cleanupDBResources($conn,$res);
		echo json_encode($data);
		exit;
}else{
	$insert = "INSERT into users (username, pass, isLoggedIn) VALUES ('$username', '$pw', true)";
	$ins = $conn->query($insert);
	
	if($ins){
		$data = array(
			'isValid' => true,
			'feedback' => "All good!"
			);
		$_SESSION['username'] = $username;
		$userResult = getSingleResult("Select id from users where username='$username'");
		$_SESSION['userid'] = $userResult["id"];
		cleanupDBResources($conn,$res);
		echo json_encode($data);
		exit;
	}else{
		$data = array(
			'isValid'=> false,
			'feedback'=> "Ut-oh! Something went wrong. We're really embarrassed now."
			);
		cleanupDBResources($conn,$res);	
		echo json_encode($data);
		exit;
	}
}

?>
