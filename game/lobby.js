(function(){

var game_id;
var first_load;
var pollingInterval;
var username = $('#user').val();
var userid = $('#userid').val();
var sockets = [];

$(document).ready(function(){
	first_load = true;
	fillSelectBox();
	bindEvents();
	//getPlayerStats(username); //12-03-2017 feature removed by group consensus
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
				var id = item[3];
				var serverUrl =  item[2];
				sockets.push(new Networking(serverName, serverUrl, id,onBehavior ));
				$('select').append($("<option></option>")
					.attr("value", id)
					.attr("disabled", true)
					.attr("id", "game" + id)
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

function setMasterUser()
{
	stopPolling();
	showSpinner();
	$.ajax({
		type: "POST",
		url: "setMasterUser.php",
		data: {
			game_id: game_id
		},
		dataType: 'json',
		success: function(response){
			if(response['success'] == true){
				startGame();
			}
		},
		error: function(response){
			updateFeedback('Something went wrong', 'red');
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

	if(list1.length > 0 && list2.length > 0 && userIsInGame() && isServerAvailable(game_id)){
		$('#start_button').show();
	}else{
		$('#start_button').hide();
	}
}

function startGame() {
	var socket = getSelectedSocket(game_id);
	socket.startGame();
	window.location.href="board/board.php?gameId=" + game_id + "&playerId=" + userid;
}
function startPolling()
{
	pollingInterval = setInterval(pollForPlayers, 1000);
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
		
		game_id = $('select').find(":selected").attr("value");
		var sock = getSelectedSocket(game_id);
		if (sock.gameState.started) {
			if (confirm('This game has already started.  Do you wish to terminate it?')) {
				sock.cancelGame();
				endGame(game_id);
			} else {
				// Do nothing!  User decides this is not a good idea.
			}
			return;
		}
		stopPolling();
		showSpinner();
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
	$('#start_button').on('click', function(){
		setMasterUser();
	});
	


	window.addEventListener('unload', function(event) {
		for (var i = 0; i<sockets.length;i++) {
			sockets[i].closeSocket();
		}	
	});
	$('#displayUser').html("<b>Welcome " + username + "!</b>");
}

function isServerAvailable(gameId) {
	var socket = getSelectedSocket(gameId);
	return socket.connected && !socket.state.started;
}

function getSelectedSocket(gameId) {
	var socket = _.filter(sockets,function(o){
		return o.gameId==gameId});
	return socket[0]; //lodash returns an array, grab the first element.
}

function endGame(gameId) {
	$.ajax({
        type: "POST",
        url: "endGame.php",
        data: {
            gameId: gameId,
            teamAScore: -1, //terminating a game should result in all scores being set to something meaningless.. they should not be valid.
            teamBScore: -1
        },
        dataType: 'json',
        success: function(response){
            alert('Game was reset successfully!')
        },
        error: function(response){
            alert('Something went wrong');
        }
    });
}
/*  12-03-2017 feature removed by group consensus
function getPlayerStats(username) {
	$.ajax({
        type: "POST",
        url: "getStats.php",
        data: {
            username: username
		},
        dataType: 'json',
        success: function(response){
			var wins = response[0].wins;
			var losses = response[0].losses;
			$('#displayUser').html("<b>Welcome " + username + "!<br>( Record: " + wins + " win(s), " + losses + " loss(es) )</b>");
        },
        error: function(response){
            alert('Something went wrong');
        }
	});
    
}
*/

function onBehavior(name, data) {
	var id = data.gameId;
	var setGameState = function(data) {
		var started = data.started;
		var id = data.gameId;
		$("#game" + id).attr("disabled",false);
		if (started) {
			$("#game" + id).attr("style","color:blue");
		}
		else {
			$("#game" + id).attr("style","color:green");
		}		
		console.log("Connection established for game " + id);
	}
	switch (name ) {
		case "connect":
			setGameState(data);
			break;
		case "disconnect":
			$("#game" + id).attr("disabled",true);
			$("#game" + id).attr("style","color:red");
			console.log("Connection released for game " + id);
			break;
		case "stateChange":
			if (data.started && game_id==data.gameId) {
				window.location.href="board/board.php?gameId=" + game_id + "&playerId=" + userid;
			}
			break;
		case "gameOver":
			data.started = false; //
			setGameState(data);
			break;
		default:
			break;
	}
}

  })();