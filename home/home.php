<?php
	session_start();
	if (isset($_SESSION['username'])) {
		header( 'Location: ../game/lobby.php' ); //user is already logged in, go right to lobby.
	}
?>

<html>
<head>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
	<link rel="stylesheet" href="home.css" />
	<title>Welcome to Paddle Battle</title>
</head>

<body>
<div class="container login">
	<div class="row" id="top_row">
		<div class="col-md-12 text-center">
			<h3>Welcome to</h3>
			<h1>Paddle Battle</h1>
		</div>
	</div>
	<div id="login_form_wrapper">
		<div class="row text-center">
				<div class="row">
					<div class="col-md-12">
						Username: <input class="input-control" id="login_username" type='text' name='username'></input>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-md-12">
						Password:   <input class="input-control" id="login_pword" type='password' name='password'></input>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-md-12">
						<button id ="submit_button" class="btn btn-primary">Log In</button>
					</div>
				</div>
		</div>
	</div>
	<div class="row text-center">
		<div id="feedback_display" class="col-md-12">
	</div>
	<br>
	<div class="row text-center">
		<div class="col-md-12">
			Not registered?  Sign up <a href="../signup/signup.php">here!</a>
		</div>
	</div>
	
	
</div>
</body>
</html>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
<script src="home.js"></script>