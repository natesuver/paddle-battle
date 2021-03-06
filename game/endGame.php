<?php
require '../common/database.php';

session_start();
$gameId = $_POST["gameId"];
$teamAScore = $_POST["teamAScore"];
$teamBScore = $_POST["teamBScore"];
$serverId = getSingleResult("Select id from servers where game_id=$gameId")["id"];
$conn = getConnection();
$sql = "INSERT into games (game_status) VALUES ('selecting players')";
$ins = $conn->query($sql);
if (outputError($ins)) {exit;}
$sql = "update games set teamAScore=$teamAScore, teamBScore=$teamBScore where id=$gameId";
$update = $conn->query($sql);
if (outputError($update)) {exit;}

$newGameId = getSingleResult("Select max(id) as id from games")["id"];
$sql = "update servers set game_id=$newGameId WHERE id=$serverId";
$update = $conn->query($sql);
if (outputError($update)) {exit;}
$conn->close();
$data = array(
    'isValid' => true,
    'feedback' => "All good!"
    );
echo json_encode($data);
exit;

?>
