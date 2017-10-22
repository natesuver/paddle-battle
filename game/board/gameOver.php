<?php
session_start();
if (!isset($_SESSION['username'])) {
	header( 'Location: ../home/home.php' );
}
?>
<a href="logout.php">Logout</a>
<br>
GAME OVER
