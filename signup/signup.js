var pword = '';
var cPword = '';

$('input[type="password"]').keyup(function(){
	pword = $('input[name="password"]').val();
	cPword = $('input[name="password_confirm"]').val();

	if(pword === cPword){
		var text = "Passwords match";
		updateFeedback(text, 'green');
		$('input[name="submit"]').prop('disabled', false);
	}else{
		var text = "Passwords don't match!";
		updateFeedback(text, 'red');
		$('input[name="submit"]').prop('disabled', true);
	}
});

function updateFeedback(text, color='black'){
	$('#feedback_display').text(text);
	$('#feedback_display').css('color', color);
}