<?php
require '../common/database.php';

$query = "SELECT teams.team, users.username from teams join users where teams.user_id = users.id and game_id = '$game_id'";
$query = "SELECT teams.team, users.username, users.id from teams join users where teams.user_id = users.id and game_id = '$game_id'";
$result = execResults($query);
echo json_encode($result);

?>