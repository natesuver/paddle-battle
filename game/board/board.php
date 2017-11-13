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

   <div id="fade"></div>
   <div class="modal" id="game-over-modal">
      <div class="modal-dialog">
         <div class="modal-content">
            <!-- header -->
            <div class="modal-header">
               <img src="images/game_over.jpg" class="img-responsive center-block">
            </div>
            <div class="container-fluid">
            <div id="teamWin" class="col-md-12 text-center">Team Win goes here</div>
            </div>
            <!-- body (form) -->
            <div class="modal-body">
               <div class = "container">
                  <div class= "row">
                     <div class="col-md-3 text-center">Team A Score: <span id="scoreTeamA"></span></div>
                     <div class="col-md-3 text-center">Team B Score: <span id="scoreTeamB"></span></div>
                  </div>
                  <br>
                  <div class= "row">
                     <div class="col-md-3 text-center">Blocked Shots</div>
                     <div class="col-md-3 text-center">Blocked Shots</div>
                  </div>
                  <div class= "row">
                     <ul id="team1Hits" class="col-md-3 text-center"></ul>
                     <ul id="team2Hits" class="col-md-3 text-center"></ul>
                  </div>
               </div>
               <!-- button -->
               <div class="modal-footer">
                  <a class="btn btn-primary btn-block" href="../lobby.php">Return to Lobby</a>
                  <a id="logout-from-game" class="btn btn-danger btn-block">Logout</a>
               </div>
            </div>
         </div>
      </div>
   </div>

   <div id="countdown"></div>

   <div class="container">
        <div class="row">
            <div class="col-md-12 text-center">
                <h1>Fight!</h1>
            </div>
        </div>

        <!--row for team tables-->
        <div class="row" id="score">
            <div class="col-md-6 text-center">
               <div id="team1_score">Team A Score: <span id="teamAScore"></span></div> <!--team 1 score-->
            </div>
            <div class="col-md-6 text-center">
               <div id="team2_score">Team B Score: <span id="teamBScore"></span></div> <!--team 2 score-->
            </div>
        </div>

        <div class="row">
            <!--team 1 names display-->
            <div class="col-md-2 text-center" id="Team1">
                <!--team 1 table-->
                <ul id="1_table">Team A Players</ul>
            </div>

            <!--actual canvas for game-->
            <div class="col-md-8 col-xs-8 text-center" id="gameSurface">
                <canvas id="gameBoard"></canvas>
            </div>

            <!--team 2 names display-->
            <div class="col-md-2 text-center" id="Team2"> 
                <!--team 2 table-->
                <ul id="2_table">Team B Players</ul>
            </div>
        </div>
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
