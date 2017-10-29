<?php
require '../common/database.php';

$game_id = $_POST['game_id'];
$query = "SELECT url,server_name FROM servers where game_id = '$game_id'";
$result = execResults($query);
echo json_encode($result);
?>