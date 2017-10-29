var game_id;
var first_load;
var pollingInterval;
var username = $('#user').val();
var sockets = [];

$(document).ready(function(){
	first_load = true;
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
			if(response['success'] == true){
			var arr = response['results'];

			for(var i=0; i < arr.length; i++){
				var item = arr[i];
				var serverName = item[1];
				var game_id = item[3];
				var serverUrl =  item[2];
				sockets.push(new sockManager(serverName, serverUrl, game_id,onBehavior ));
				$('select').append($("<option></option>")
					.attr("value", game_id)
					.attr("disabled", true)
					.attr("id", "game" + game_id)
					.attr("style","color:red")
                    .text(serverName));
			}
			hideSpinner();
			}
		}
	});
}

function populatePlayers()
{
	if(first_load){
		showSpinner();
		first_load = false;
	}

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
			if(response['success'] == true){
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
			startButton();
			leaveButton();
			hideSpinner();
			}
		}
	});
}

function pollForPlayers()
{
	$.ajax({
		type: "POST",
		url: "pollPlayers.php",
		data: {
			game_id: game_id
		},
		dataType: 'json',
		success: function(response){
			if(response['success'] == true){
				var arr = response['results'];
				var polledNames1 = [];
				var polledNames2 = [];
				var team1Names = [];
				var team2Names = [];

				//here, we're getting the names of each player pulled in from php and adding them to respective arrays
				for(var i=0; i < arr.length; i++){
					var item = arr[i];
					var team = item[0];
					var name = item[1];

					if(team == 1){
						polledNames1.push(name);
					}else if(team == 2){
						polledNames2.push(name);
					}
				}

				//now we grab the actual names that are currently in the <ol>s and turn them into arrays
				$('#1_list li').each(function(i, elem) {
    				team1Names.push($(elem).text());
				});

				$('#2_list li').each(function(i, elem) {
    				team2Names.push($(elem).text());
				});

				//if there's any differences in the team1 array, re-populate team 1 list
				var team1comp = compareNames(team1Names, polledNames1);
				if(!team1comp){
					$('#1_list').empty();
					for(var i=0; i < polledNames1.length; i++){
						var item = polledNames1[i];
						$('#1_list').append("<li>"+item+"</li>");
					}
				}

				var team2comp = compareNames(team2Names, polledNames2);
				//if there's any differences in the team2 array, re-populate team 2 list
				if(!team2comp){
					$('#2_list').empty();
					for(var i=0; i < polledNames2.length; i++){
						var item = polledNames2[i];
						$('#2_list').append("<li>"+item+"</li>");
					}
				}

				leaveButton();
				startButton();
			}
		}
	});
}

function compareNames(displayed_names, polled_names)
{
	var count = 0;
	if(displayed_names.length != polled_names.length){
		return false;
	}

	for(var i = 0; i < polled_names; i++){
		var disp = displayed_names[i];
		var poll = polled_names[i];

		if(disp != poll){
			count++;
		}
	}

	if(count != 0){
		return false;
	}else{
		return true;
	}
}

function joinTeam1()
{
	var list1 = $('#1_list li');
	if(list1.length > 4){
		alert("Only 5 players per side allowed!");
	}else{
		showSpinner();

		$.ajax({
			type: "POST",
			url: "joinTeam.php",
			data: {
				team: 1,
				game_id: game_id
			},
			success: function(response){
				var response = JSON.parse(response);
				if(response['success'] == true){
					populatePlayers();
					showLeaveButton();
					hideSpinner();
					setTimeout(startPolling, 2000);
				}
			}
		});
	}
}

function joinTeam2()
{
	var list2 = $('#2_list li');

	if(list2.length > 4){
		alert("Only 5 players per side allowed!");
	}else{
		showSpinner();

		$.ajax({
			type: "POST",
			url: "joinTeam.php",
			data: {
				team: 2,
				game_id: game_id
			},
			success: function(response){
				var response = JSON.parse(response);
				if(response['success'] == true){
					populatePlayers();
					showLeaveButton();
					hideSpinner();
					setTimeout(startPolling, 2000);
				}
			}
		});
	}
}

function leaveTeam()
{
	showSpinner();
	$.ajax({
		type: "POST",
		url: "leaveTeam.php",
		data: {
			game_id: game_id
		},
		dataType: 'json',
		success: function(response){
			if(response['success'] == true){
				populatePlayers();
				hideLeaveButton();
				setTimeout(startPolling, 2000);
			}
		}
	});
}

function leaveButton()
{
	if(userIsInGame()){
		showLeaveButton();
	}else{
		hideLeaveButton();
	}
}

function showLeaveButton()
{
	$('#leaveTeam').show();
}

function hideLeaveButton()
{
	$('#leaveTeam').hide();
	$('#leaveTeam').attr('display', 'none');
}

function userIsInGame()
{
	var result = false;
	$('#1_list li').each(function(i, elem) {
    	if($(elem).text() === username){
    		result =  true;
    	}
	});

	$('#2_list li').each(function(i, elem) {
    	if($(elem).text() === username){
    		result =  true;
    	}
	});

	return result;
}

function startButton()
{
	var list1 = $('#1_list li');
	var list2 = $('#2_list li');

	if(list1.length > 0 && list2.length > 0 && userIsInGame() && isSocketOpen(game_id)){
		$('#start_button').show();
	}else{
		$('#start_button').hide();
	}
}

function startPolling()
{
	pollingInterval = setInterval(pollForPlayers, 3000);
}

function stopPolling()
{
	clearInterval(pollingInterval);
}

function logout()
{
	showSpinner();
	$.ajax({
		type: "POST",
		url: "logout.php",
		success: function(response){
			hideSpinner();
			window.location = '../home/home.php';
		}
	});
}

function bindEvents()
{
	//when server select box changes, populate it with players currently joined to game
	$('select').on("change", function(){
		stopPolling();
		showSpinner();
		game_id = $('select').find(":selected").attr("value");
		populatePlayers();

		setTimeout(startPolling, 2000);
		$('#Teams').show();
	});

	//when player clicks on team 1, join player to team 1
	$('#Team1').on('click', function(){
		stopPolling();
		joinTeam1();
	});

	//when player clicks on team 1, join player to team 1
	$('#Team2').on('click', function(){
		stopPolling();
		joinTeam2();
	});

	$('#leaveTeam').on('click', function(){
		stopPolling();
		leaveTeam();
	});

	$('#logout').on('click', function(){
		stopPolling();
		logout();
	});
	window.addEventListener('unload', function(event) {
		for (var i = 0; i<sockets.length;i++) {
			sockets[i].closeSocket();
		}	
	});
	$('#displayUser').html("<b>Welcome " + username + "!</b>");
}

function isSocketOpen(gameId) {
	var socket = _.filter(sockets,function(o){
		return o.gameId==gameId});
	return socket[0].connected;
}
function onBehavior(name, data) {
	var id = data.gameId;
	switch (name ) {
		case "connect":
			$("#game" + id).attr("disabled",false);
			$("#game" + id).attr("style","color:green");
			console.log("Connection established for game " + id);
			break;
		case "disconnect":
			$("#game" + id).attr("disabled",true);
			$("#game" + id).attr("style","color:red");
			console.log("Connection released for game " + id);
			break;
	}
}

