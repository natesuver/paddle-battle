<?php
	session_start();
	if (isset($_SESSION['username'])) {
		header( 'Location: ../game/lobby.php' ); //user is already logged in, go right to lobby.
	}
?>

<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>

    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
    <link rel="stylesheet" href="home.css" type="text/css"/>
    <title>Welcome to Paddle Battle</title>

</head>
<body style="background-color: black;">
    <div class="board">
        <div class="right_paddle"></div>
        <div class="left_paddle"></div>
        <div class="ball"></div>
    </div>
    <div class="container">
        <div class="row" style="margin-top: 150px;">
            <div class="col-md-12 text-center">
                <h3>Welcome to</h3>
                <h1>Paddle Battle</h1>
            </div>
        </div>
        <div id="login_form_wrapper">
            <div class="row text-center">
                <form action="" method="POST">
                    <div class="row">
                        <div class="col-md-12">
                            Username: <input id="login_username" type='text' name='username'></input>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            Password:   <input id="login_pword" type='password' name='password'></input>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-12">
                            <input id="login_button" type='submit' value="Log In" name='submit'></input>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div>
            <div class="row text-center">
                <div class="col-md-12" id="signUp">
                    Not registered?  Sign up <a href="../signup/signup.php">here!</a>
                </div>
            </div>
        </div>
    </div>
</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="home.js"></script>