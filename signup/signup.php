<html>
<head>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" />
	<link rel="stylesheet" href="signup.css" />
	<title>Sign Up</title>
</head>

<body>
<div class="container">
	<div class="row" id="top_row">
		<div class="col-md-12 text-center">
			<h3>Sign Up</h3>
		</div>
	</div>
	<div id="login_form_wrapper">
		<div class="row text-center">
			<form action = "regValidation.php" method="POST">
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
					<div id="confirm_pword_col" class="col-md-12">
						Confirm Password:   <input id="login_pword" type='password' name='password_confirm'></input>
					</div>
				</div>
				<br>
				<div class="row">
					<div class="col-md-12">
						<input id ="login_button" type='submit' value="Sign Up" name='submit'></input>
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
					<li>Rule 1</li>
					<li>Rule 2</li>
					<li>Rule 3</li>
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
