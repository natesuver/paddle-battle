<? php
/*
THIS SCRIPT IS A CHECK FOR WHETHER A SUBMITTED USERNAME ALREADY EXISTS
returns array
*/
$username = $_POST['username'];
$pw = $_POST['pw'];
//$conn dependent on our DB host settings
$conn = new mysqli('mysql5.gear.host', 'paddlebattle', 'Nu7n472~Cj!k', 'paddlebattle');
//$query dependent on table name, column names
$query = "SELECT * FROM paddlebattle.users WHERE username = ".$username;
$res= $conn->query($query);
if($res->num_rows > 0){
	return array(
		'isValid'=> false,
		'feedback'=> 'Username unavailable.'
		);
}else{
	//$insert dependent on table name
	$insert = "INSERT into paddlebattle.users ('username', 'pass', 'isLoggedIn') VALUES (".$username.", ".$pw.", true)";
	$ins = $conn->execute($insert);
	
	if($ins){
		return array(
		'isValid'=> true,
		'feedback'=> 'Success!  You will now be redirected to the game lobby.'
		);
	}else{
		return array(
			'isValid'=> false,
			'feedback'=> "Ut-oh! Something went wrong. We're really embarrassed now."
			);
	}
}
?>
