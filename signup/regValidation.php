<?php
/*
THIS SCRIPT IS A CHECK FOR WHETHER A SUBMITTED USERNAME ALREADY EXISTS
returns array
*/
$username = $_POST["username"];
$pw = $_POST["password"];

//$conn dependent on our DB host settings
$conn = mysqli_connect('mysql5.gear.host', 'paddlebattle', 'Nu7n472~Cj!k', 'paddlebattle');

//$query dependent on table name, column names
$query = "SELECT * FROM users WHERE username = '$username'";

$res = mysqli_query($conn, $query);

if(mysqli_num_rows($res) != 0){
		$data = array(
		'isValid'=> false,
		'feedback'=> 'Username unavailable.'
		);
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

		echo json_encode($data);
		exit;
	}else{
		$data = array(
			'isValid'=> false,
			'feedback'=> "Ut-oh! Something went wrong. We're really embarrassed now."
			);
		echo json_encode($data);
		exit;
	}
}

?>
