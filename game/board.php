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

    <div id="countdown" class="text-center"> 
        
    </div>
    <div id="gameSurface" style="visible: hidden;">
        <div class="gameTitle"> </div>
        <div class="touchSurface"> </div>
        <canvas id="gameBoard" ></canvas>
        <div class="gameStatus"> </div>
    </div>  
      <script src="http://wellcaffeinated.net/PhysicsJS/assets/scripts/vendor/physicsjs-0.6.0/physicsjs-full-0.6.0.min.js"></script>
  
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
    <!-- <script src="../node_modules/lodash/lodash.min.js"> </script> -->
    <script src="view.js"></script>
    <script src="board.js"></script>
    <script src="countdown.js"></script>
    <script src="paddle.js"></script>
    <script src="ball.js"></script>
</html>
