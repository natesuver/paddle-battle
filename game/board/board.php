<?php
session_start();
if (!isset($_SESSION['username'])) {
	header( 'Location: ../../home/home.php' );
}
?>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width; initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5 user-scalable=no; " />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="board.css" />
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
    <script src="....//node_modules/lodash/lodash.min.js"> </script>
    <script src="assets/view.js"></script>
    <script src="assets/board.js"></script>
    <script src="assets/countdown.js"></script>
    <script src="assets/paddle.js"></script>
    <script src="assets/ball.js"></script>
</html>
