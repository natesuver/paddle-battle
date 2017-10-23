var game_id;

$(document).ready(function(){
	fillSelectBox();

	bindEvents();
});

function showSpinner()
{
	$('#modal').css('display', 'block');
	$('#fade').css('display', 'block');
}

function hideSpinner()
{
	$('#modal').css('display', 'none');
	$('#fade').css('display', 'none');
}

function fillSelectBox()
{
	showSpinner();
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
			hideSpinner();
		},
		error: function(response){
			alert("Something went wrong.  We REALLY suck. =(");
		}
	});
}

function populatePlayers()
{
	showSpinner();
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
			hideSpinner();
		},
		error: function(response){
			alert("Something went wrong.  We REALLY suck. =(");
		}
	});
}

function joinTeam1()
{
	$.ajax({
		type: "POST",
		url: "joinTeam.php",
		data: {
			team: 1,
			game_id: game_id
		},
		success: function(response){
			populatePlayers();
		},
		error: function(response){
			alert("Something went wrong.  We REALLY suck. =(");
		}
	});
}

function joinTeam2()
{
	$.ajax({
		type: "POST",
		url: "joinTeam.php",
		data: {
			team: 2,
			game_id: game_id
		},
		success: function(response){
			populatePlayers();
		},
		error: function(response){
			alert("Something went wrong.  We REALLY suck. =(");
		}
	});
}

function bindEvents()
{
	//when server select box changes, populate it with players currently joined to game
	$('select').on("change", function(){
		game_id = $('select').find(":selected").attr("value");
		populatePlayers();
	});

	//when player clicks on team 1, join player to team 1
	$('#Team1').on('click', function(){
		joinTeam1();
	});

	//when player clicks on team 1, join player to team 1
	$('#Team2').on('click', function(){
		joinTeam2();
	});
}
