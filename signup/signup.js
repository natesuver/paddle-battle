
var pword = '';
var cPword = '';
var username = '';

//set submit button to disabled to start
$('input[name="submit"]').prop('disabled', true);

//verify form on any input keyup
$('input').keyup(function(){
	verifyForm();
});

//check for password match on any password input keyup
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
			$('input[name="submit"]').prop('disabled', false);
		}
	}else{
		$('input[name="submit"]').prop('disabled', true);
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
