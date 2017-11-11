<?php
session_start();
if (!isset($_SESSION['username'])) {
	header( 'Location: ../home/home.php' );
}
?>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=0.5,maximum-scale=0.5,minimum-scale=0.5,user-scalable=no" />
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-touch-fullscreen" content="yes">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
        <link rel="stylesheet" href="board.css" />
        <title>Paddle Battle!!</title>
    </head>
	<div class="modal fade" id="game-over-modal">
    <div class="modal-dialog">
    <div class="modal-content">

                <!-- header -->
    <div class="modal-header">
        <img src="images/game_over.jpg" class="img-responsive center-block">
    </div>
				
				
	<div class="container-fluid">
		<div class="col-md-12 text-center">Team Win goes here</div>
	</div>	

                <!-- body (form) -->
    <div class="modal-body">
    <div class = "container">
		
		<div class= "row">
			<div class="col-md-2">Team A Score:</div>
			<div class="col-md-2 text-right" >Team B Score:</div>
		</div>
		
		<br>
		
		<div class= "row">
			<div class="col-md-2">Blocked Shots</div>
			<div class="col-md-2 text-right">Blocked Shots</div>
		</div>
		
		<div class= "row">
			<div class="col-md-2">Player 1:</div>
			<div class="col-md-2 text-right">Player 1:</div>
		</div>
		
		<div class= "row">
			<div class="col-md-2">Player 2:</div>
			<div class="col-md-2 text-right">Player 2:</div>
		</div>
		
		<div class= "row">
			<div class="col-md-2">Player 3:</div>
			<div class="col-md-2 text-right">Player 3:</div>
		</div>
		
		<div class= "row">
			<div class="col-md-2">Player 4:</div>
			<div class="col-md-2 text-right">Player 4:</div>
		</div>
		
		<div class= "row">
			<div class="col-md-2">Player 5:</div>
			<div class="col-md-2 text-right">Player 5:</div>
		</div>
    </div>

                <!-- button -->
    <div class="modal-footer">
		<a class="btn btn-primary btn-block" href="lobby.php">Return to Lobby</a>
		<a class="btn btn-danger btn-block" href="lobby.php">Logout</a>
	</div>

    </div>
    </div>
    </div>
	</div>

    <div id="countdown"> 
        
    </div>
    <div id="gameSurface">
        <div id="status"class="gameTitle"> </div>
       <!--  <div id="slider" class="touchSurface"> </div> -->
        <canvas id="gameBoard" ></canvas>
        <div  class="gameStatus"> </div>
    </div>  
	
	
	
      <script src="http://wellcaffeinated.net/PhysicsJS/assets/scripts/vendor/physicsjs-0.6.0/physicsjs-full-0.6.0.min.js"></script>
	  
	  
	  
	  
	  
	  
  
    <script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
    <script src="../../node_modules/socket.io-client/dist/socket.io.js"> </script>
    <script src="../../node_modules/lodash/lodash.min.js"> </script>
    <script src="assets/networking.js"></script>
    <script src="assets/physicsEngine.js"></script>
    <script src="assets/game.js"></script>
    <script src="assets/countdown.js"></script>
    <script src="assets/player.js"></script>
    <script src="assets/ball.js"></script>
</html>
