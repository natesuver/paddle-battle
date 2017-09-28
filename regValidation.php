<? php
\
/*
THIS SCRIPT IS A CHECK FOR WHETHER A SUBMITTED USERNAME ALREADY EXISTS
returns array
*/
$username = $_POST['username'];
$pw = $_POST['pw'];

//$conn dependent on our DB host settings
$conn = '???';

//$query dependent on table name, column names
$query = "SELECT * FROM db.table WHERE username = $username";

$res= $conn->query($query);

if($res->num_rows > 0){
	return array(
		'isValid'=> false,
		'feedback'=> 'Username unavailable.'
		);
}else{
	//$insert dependent on table name
	$insert = "INSERT into db.table VALUES ($username, $pw)";

	$ins = $conn->execute($insert);\
	
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