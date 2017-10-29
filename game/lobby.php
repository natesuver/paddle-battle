<?php
session_start();
if (isset($_SESSION['username'])) {
	header( 'Location: ../../home/home.php' );
}
?>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" href="lobby.css" type="text/css" />
    <title>Game Lobby</title>
</head>
<body>

    <div class="container">
        <div class="row text-center">
            <div class="col-md-12">
                <h1>Available Servers</h1>
            </div>
        </div>
        
        <!--This is going to be the menu for selecting games-->
        <div class='row text-center'>
            <div class="form-group">
                <div class="col-sm-12 col-md-12 text-center">
                    <select class="form-control" id="server-select">
                        <option selected disabled>Choose from a list of game servers</option>
                    </select>
                </div>
            </div>
        </div>
            <div class="row" id="Teams">
                <div class="col-sm-5" id="Team1">
                    <!--will hopefully post username-->
                    Team 1
                    <ol id="1_list"> <!--Empty list for team A-->
                    </ol>
                </div>
                <div class="col-sm-2"></div>
                <div class="col-sm-5" id="Team2">
                    <!--will hopefully post username-->
                    Team B
                    <ol id="2_list"> <!--Empty list for team B-->
                    </ol>
                </div>
            </div>
    </div>

    <div class='row text-center'>
        <button id="leaveTeam">Leave Team</button>
    </div>

    <div class='row text-center'>
        <button id="start_button">Start Game!</button>
    </div>

    <div id="fade"></div>
    <div id="modal">
        <img id="loader" src="../common/loading.gif" />
    </div>
</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="lobby.js"></script>
