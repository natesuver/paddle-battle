var select = $('select');
var game_id;

$(document).ready(function(){
	fillSelect();
});

function fillSelect()
{
	$.ajax({
		type: "POST",
		url: "getServers.php",
		dataType: 'json',
		success: function(response){
			var arr = response['results'];

			for(var i=0; i < arr.length; i++){
				var item = arr[i];
				var serverName = item[1];
				var game_id = item[3];

				$('select').append($("<option></option>")
                    .attr("value", game_id)
                    .text(serverName));
			}

		},
		error: function(response){
			alert("Something went wrong.  We REALLY suck. =(");
		}
	});
}