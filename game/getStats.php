<?php
require '../common/database.php';

$username = $_POST['username'];
$query = "Select 
coalesce(sum(case when (team=1 and coalesce(teamAScore,0)>coalesce(teamBScore,0)) or (team=2 and coalesce(teamBScore,0)>coalesce(teamAScore,0)) then 1 else 0 end),0) as wins,
coalesce(sum(case when (team=1 and coalesce(teamAScore,0)<coalesce(teamBScore,0)) or (team=2 and coalesce(teamBScore,0)<coalesce(teamAScore,0)) then 1 else 0 end),0) as losses
 from users 
inner join teams on teams.user_id = users.id
inner join games on games.id = teams.game_id
where username = '$username'";
$result = execResults($query);
echo json_encode($result);
?>