var pword = '';
var cPword = '';
var username = '';

//set submit button to disabled to start
$('#submit_button').prop('disabled', true);

$('input').keyup(function(){
	verifyForm();
});

$('#submit_button').click(function(){
	submit();
});

$('input[type="password"]').keyup(function(){
	var passwordMatch = checkPasswords();
	if(passwordMatch){
		var text = "Passwords match";
		updateFeedback(text, 'green');
	}else{
		var text = "Passwords don't match!";
		updateFeedback(text, 'red');
	}
});

function verifyForm(){
	pword = $('input[name="password"]').val();
	cPword = $('input[name="password_confirm"]').val();
	username = $('#login_username').val();

	if(pword && cPword && username){
		var passwordsMatch = checkPasswords();
		if(passwordsMatch){
			$('#submit_button').prop('disabled', false);
		}else{
			$('#submit_button').prop('disabled', true);
		}
	}else{
		$('#submit_button').prop('disabled', true);
	}
}

function updateFeedback(text, color='black'){
	$('#feedback_display').text(text);
	$('#feedback_display').css('color', color);
}

function checkPasswords(){
	pword = $('input[name="password"]').val();
	cPword = $('input[name="password_confirm"]').val();
	if(pword && cPword){
		if(pword === cPword){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function submit(){
	pword = $('input[name="password"]').val();
	cPword = $('input[name="password_confirm"]').val();
	username = $('#login_username').val();

	$.ajax({
		type: "POST",
		url: "regValidation.php",
		data: {
			username: username,
			password: pword,
		},
		dataType: 'json',
		success: function(response){
			if(response['isValid'] == false){
				updateFeedback(response['feedback'], 'red');
			}else{
				window.location = '../game/lobby.php';
			}
		},
		error: function(response){
			updateFeedback('Something went wrong', 'red');
		}
	})
}
