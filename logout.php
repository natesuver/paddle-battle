<? php

$conn = "??";

$user = $_POST["username"];

$update = "UPDATE db.table_name SET isLoggedIn = false WHERE table_name.username = $user";

$up = $conn->execute($update);

if($up){
	return array(
		'isValid' => true,
		'feedback' => 'Successfully logged out.'
	);
}else{
	return array(
		'isValid' => false,
		'feedback' => 'Something went wrong.'
	);
}

?>