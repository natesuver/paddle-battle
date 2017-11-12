var activeGameInstance, activeEngine;
var playersArray;
var game = function(game_id, playerId){
    this.game_id = game_id;
    this.playerId = playerId;
    this.isMasterUser = false;
  }

game.prototype.endGame = function(state) {
    var self = this;
    self.state = state;
    console.log(state);
    console.log('try');
    $.ajax({
        type: "POST",
        url: "../endGame.php",
        data: {
            gameId: this.game_id,
            teamAScore: this.state.score.a,
            teamBScore: this.state.score.b
        },
        dataType: 'json',
        success: function(response){
            if(response.isValid){
                activeGameInstance.gameOverModal(self.state);
            }
        },
        error: function(response){
            alert('Something went wrong');
        }
    });
}

game.prototype.gameOverModal = function(state) {
    //whatever with score  state={score: {'a':0,'b':0 },players:{}, started:false, gameId: 0};
    $("#game-over-modal").css("display", "block");
}

game.prototype.redirectToLobby = function() {
    window.location.href="../lobby.php";
}
$('#logout-from-game').on('click', function(){
    logout();
});

function logout()
{
    $.ajax({
        type: "POST",
        url: "../logout.php",
        success: function(response){
            window.location = '../../../home/home.php';
        }
    });
}

game.prototype.getData = function() {
    var self = this;
//use promise chaining to grab data needed to begin game.
$.when(
    $.ajax({
        type: "POST",
        url: "../getTeams.php",
        data: {
            game_id: this.game_id
        }}),
        $.ajax({
            type: "POST",
            url: "../getServer.php",
            data: {
                game_id: this.game_id
            }})
        )
    .done(function(players, serverData){
        var server = JSON.parse(serverData[0]);
        if (server.length==0) { //if the server cannot be loaded here, it's likely it went down or the game is over, redirect to the lobby.
            activeGameInstance.redirectToLobby();
            return;
        }
    
        self.isMasterUser = (self.playerId==server[0].master_user);
        self.initBoard(JSON.parse(players[0]), server[0].url, server[0].server_name);
        playersArray = activeEngine.paddleDictionary;

        for(var key in playersArray){
            
            var player = playersArray[key];
            var color = player.color;
            var name = player.currentPlayerName;
            var team = parseInt(player.team);

            if(team === 1){
                $('#1_table').append("<li class='player-item'>"+name+" <div class='player-color' style='background:"+color+"'></div></li>");
            }else if(team === 2){
                $('#2_table').append("<li class='player-item'>"+name+" <div class='player-color' style='background:"+color+"'></div></li>");
            }
        }
    }); 
}


game.prototype.initBoard = function(gameData, url, serverName) {
    var teamA = _.filter(gameData,function(o){
        return o.team==1});
    var teamB = _.filter(gameData,function(o){
        return o.team==2});
    this.networking = new Networking(serverName,url, gameId, this.onBehavior);
    this.engine = new physicsEngine($("#gameBoard"), teamA, teamB, this.networking, this.isMasterUser);
    activeEngine = this.engine;
    this.addListeners();
}

//Setup listeners for the paddle position slider.  Supported by both touch and mouse.
game.prototype.addListeners = function() {
    //var obj = document.getElementById('slider');
    var self = this;
    window.addEventListener('touchmove', function(event) {
      // If there's exactly one finger inside this element
      if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        self.engine.moveMyPaddle(self.playerId,touch.pageY); 
      }
    }, false);
    window.addEventListener('mousemove', function(event) {
        self.engine.moveMyPaddle(self.playerId,event.pageY-40); 
    }, false);
}
game.prototype.getRandomBallStartPosition= function() {
    var rand = Math.floor(Math.random() * 2) + 1  
    return (rand==1?.25:-.25); //start with a value of either .25 or -.25, determined randomly.
}
game.prototype.onBehavior = function(name, data) {
    switch (name) {
        case "connect": //occurs on successful handshake with game server
            console.log("connection");
            var cd = new Countdown($("#countdown"),1,"Go!", activeGameInstance.engine.start);
            cd.beginCountdown();
            $('#game-over-modal').css("display", "none");
            break;
        case "gameOver": //occurs when the server determines the game is over
            activeEngine.stop();
            if (activeGameInstance.isMasterUser)
                activeGameInstance.endGame(data); //data is a json object, contains an 'a' and 'b' property, with the integer score
            else {
                activeGameInstance.gameOverModal(data);
            }
            

            break;
        case "paddleChange": //occurs when another player changes their paddle position (not your own)
            var paddleData = data; //paddleData is a json object e.g. {'l':0,'p':0 }.  'l' is the location (Y coordinate) of the paddle, 'p' is the player id
            activeEngine.moveOtherPaddle(paddleData.p,paddleData.l);
            break;
        case "stateChange":
            var state = data; //var gameState={score: {'a':0,'b':0 },players:[], started:false};
            $("#status").html("Team A: " + data.score.a + " Team B: " + data.score.b);
            break;
        case "swapBall": //occurs when a team successfully gets a score.  Note that resetball is called immediately after this.
            var cd = new Countdown($("#countdown"),0,"HIT!", null);
            cd.beginCountdown();   
        // var scoreData = data; //scoreData is a json object e.g. {'a':0,'b':0 }.  'a' is the score for team a, 'b' is the score for team b
           // console.log("Score is now: " + JSON.stringify(scoreData))
           // $("#Status").text = "Team A: " + scoreData.a + " Team B: " + scoreData.b;
             //here is an example something we could do when the ball is reset..
            //change the balls's color to red, and move it off the screen, and create a new ball.
           // var ballBody = activeEngine.ballBody; //ballBody is a reference to the ball body from physicsJS
          //  ballBody.state.vel.x = 0;
          //  ballBody.state.vel.y = .5;
          //  ballBody.styles.fillStyle = 'red';
           // ballBody.treatment = 'kinematic';
          //  ballBody.recalc();
          //  ballBody.view = undefined; // re-creates new view on next render
          //  activeEngine.world.render();
          //  activeEngine.removeBall(ballBody);
           // activeEngine.removeBall();
           // var x = activeGameInstance.getRandomBallStartPosition();
           // var y = activeGameInstance.getRandomBallStartPosition();
           
           // activeEngine.addBall(x,y);
           // setTimeout(function() {
                
           // },500);
            //use this function to determine the starting x and y vector of the ball
            
            break;
        case "impact": //occurs whenever the ball hits something, either a paddle, or any of the walls.  This action should update game state for all players.
            if (!activeGameInstance.isMasterUser) {
                activeEngine.adjustState(data);
            }
            break;
        case "score":
            var teamAScore = data.a;
            var teamBScore = data.b;
            $("#status").html("Team A: " + teamAScore + " Team B: " + teamBScore);
            this.onBehavior("swapBall",null);
            break;
        default:
            break;
    }
} 

$(document).ready(function() { 
//this stops that "refresh when you swipe down" action from happening
document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
    }, false); 

    let params = (new URL(document.location)).searchParams;
    gameId = parseInt(params.get("gameId"));
    playerId = parseInt(params.get("playerId"));
    activeGameInstance= new game(gameId,playerId);
    activeGameInstance.getData(gameId, playerId);
});
