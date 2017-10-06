<?php

$conn = mysqli_connect(getenv('PB_SERVER_NAME'), getenv('PB_USER_NAME'), getenv('PB_DATABASE_PASSWORD'), getenv('PB_DATABASE_NAME'));

//$user could likely come from session variable; is post variable for now
$user = $_POST["username"];

$update = "UPDATE users SET isLoggedIn = false WHERE username = '$user'";

$res = mysqli_query($conn, $update);

if($res){
	return array(
		'isValid' => true,
		'feedback' => "You successfully logged out.  You will now be redirected back to the home page."
	);
}else{
	return array(
		'isValid' => false,
		'feedback' => 'Something went wrong.'
	);
}

?>
