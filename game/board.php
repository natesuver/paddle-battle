<?php
session_start();
if (!isset($_SESSION['username'])) {
	header( 'Location: ../home/home.php' );
}
?>
<html>
    <head>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="../home/home.css" />
        <title>Paddle Battle!!</title>
    </head>

    <div id="countdown"> 
        
    </div>
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
    <script src="board.js"></script>
    <script src="countdown.js"></script>
</html>
