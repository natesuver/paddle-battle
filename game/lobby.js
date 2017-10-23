var select = $('select');
var game_id;

$(document).ready(function(){
	fillSelectBox();

	bindEvents();
});

function fillSelectBox()
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

function populatePlayers()
{
	//clear out ordered lists, as server will change
	$('#1_list').empty();
	$('#2_list').empty();

	$.ajax({
		type: "POST",
		url: "getPlayers.php",
		data: {
			game_id: game_id
		},
		dataType: 'json',
		success: function(response){
			var arr = response['results'];

			for(var i=0; i < arr.length; i++){
				var item = arr[i];
				var team = item[0];
				var name = item[1];

				if(team == 1){
					$('#1_list').append("<li>"+name+"</li>");
				}else if(team == 2){
					$('#2_list').append("<li>"+name+"</li>");
				}
			}

		},
		error: function(response){
			alert("Something went wrong.  We REALLY suck. =(");
		}
	});
}

function bindEvents()
{
	$('select').on("change", function(){
		game_id = $('select').find(":selected").attr("value");
		populatePlayers();
	});
}
