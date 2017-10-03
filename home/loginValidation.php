<? php
$user = $_POST["username"];
$pw = $_POST["password"];
$savedPw = "";

$conn = "???";
$query = "SELECT * from db.table_name where table_name.username = $user";

$res = $conn->query($query);

if($res->num_rows == 0){
	return array(
		"isValid"=> false,
		"feedback"=> "User not found."
		);
}else{
	$savedPw = $res["pw"];
}

if($pw === $savedPw){
	$update = "UPDATE db.table SET isLoggedIn=true WHERE table_name.user = $user";
	$up = $conn->execute($update);

	if($up){
		return array(
			"isValid"=> true,
			"feedback"=>"Logged in!"
			);
	}else{
		return array(
			"isValid"=> false,
			"feedback"=>"Something went wrong."
			);
	}
}else{
	return array(
		"isValid"=> false,
		"feedback"=> "Incorrect password."
		);
}

?>
