<!DOCTYPE html>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" href="../home/home.css" type="text/css" />
    <title>Sign Up</title>

</head>
<body style="background-color: black;">
    <div class="right_paddle"></div>
    <div class="left_paddle"></div>
    <div class="ball"></div>
    <div class="container">
        <div class="row" style="margin-top: 150px;">
            <div class="col-md-12 text-center">
                <h1>Sign Up</h1>
            </div>
        </div>
        <div id="login_form_wrapper">
            <div class="row text-center">
                <form action="regValidation.php" method="POST">
                    <div class="row">
                        <div class="col-xs-1">
                            Username:
						</div>
						<div class="col-xs-11">
                            <input id="login_username" type='text' name='username'></input>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-1">
                            Password: 
						</div>
						<div class="col-xs-11">
                            <input id="login_pword" type='password' name='password'></input>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-xs-1">
                            Confirm Password:
						</div>
						<div class="col-xs-11">
                            <input id="login_pword" type='password' name='password_confirm'></input>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12" style="margin-top: 10px">
                            <input id="login_button" type="button" value="Sign Up" name='submit'></input> <!--  type='submit' -->
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row text-center" id="feedback_display">
        </div>
        <div id="game_rules">
            <div class="row text-center">
                <div class="col-md-12">
                    <h4>Game Rules</h4>
                </div>
            </div>
            <div class="row">
                <div class="col-md-4 col-md-offset-4">
                    <ol id="rules_list">
			            <li>When you enter the game room, you will choose a game and your team.</li>
                        <li>There can be no more than 5 players per team.</li>
                        <li>Once all players are ready, game play can begin.</li>
                        <li>During game play, you will control your paddle by clicking and dragging the slider up and down.</li>
                        <li>Once a team has accumulted 15 points, the game will end.</li>
                    </ol>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="signup.js"></script>
