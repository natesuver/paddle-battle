var boardCanvas, sockMgr, gameId, playerId, gameView;

document.getElementById('gameSurface').style.visibility = "hidden";


$(document).ready(function() { 
    //this stops that "refresh when you swipe down" action from happening
    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
      }, false); 

      let params = (new URL(document.location)).searchParams;
      gameId = parseInt(params.get("gameId"));
      playerId = parseInt(params.get("playerId"));
      getData(gameId);
      boardCanvas = $("#gameSurface");

});

function getData(game_id) {
    //use promise chaining to grab data needed to begin game.
    $.when(
        $.ajax({
            type: "POST",
            url: "../getTeams.php",
            data: {
                game_id: game_id
            }}),
            $.ajax({
                type: "POST",
                url: "../getServer.php",
                data: {
                    game_id: game_id
                }})
            )
        .done(function(players, serverData){
            var server = JSON.parse(serverData[0]);
            initBoard(JSON.parse(players[0]), server[0].url, server[0].server_name);
           
        }); 
}


function initBoard(gameData, url, serverName) {
    var teamA = _.filter(gameData,function(o){
        return o.team==1});
    var teamB = _.filter(gameData,function(o){
        return o.team==2});
    sockMgr = new sockManager(serverName,url, gameId, onBehavior);
    gameView = view($("#gameBoard"), teamA, teamB, sockMgr)
    addListeners();
}

//Setup listeners for the paddle position slider.  Supported by both touch and mouse.
function addListeners() {
    var obj = document.getElementById('slider');
    obj.addEventListener('touchmove', function(event) {
      // If there's exactly one finger inside this element
      if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        gameView.moveMyPaddle(playerId,touch.pageY); 
      }
    }, false);
    obj.addEventListener('mousemove', function(event) {
        gameView.moveMyPaddle(playerId,event.pageY-40); 
    }, false);
}

function startGame() {
    document.getElementById('gameSurface').style.visibility = "visible";
    gameView.start();
}

function onBehavior(name, data) {
    switch (name) {
        case "connect": //occurs on successful handshake with game server
            var cd = new Countdown($("#countdown"),5,"Go!", startGame);
            cd.beginCountdown();
            break;
        case "resetBall": //occurs after a team gets a point.
           
        case "gameOver": //occurs when the server determines the game is over
            var gameState = data; 
            console.log("Game Over: " + JSON.stringify(gameState));
            //TODO: record game score.
            window.location.href="gameOver.php";
            break;
        case "paddleChange": //occurs when another player changes their paddle position (not your own)
            var paddleData = data; //paddleData is a json object e.g. {'l':0,'p':0 }.  'l' is the location (Y coordinate) of the paddle, 'p' is the player id
            gameView.moveOtherPaddle(paddleData.p,paddleData.l);
            break;
        case "stateChange":
            var state = data; //var gameState={score: {'a':0,'b':0 },players:[], started:false};
            $("#Status").text = "Team A: " + state.score.a + " Team B: " + state.score.b;
            break;
        case "swapBall": //occurs when a team successfully gets a score.  Note that resetball is called immediately after this.
           // var scoreData = data; //scoreData is a json object e.g. {'a':0,'b':0 }.  'a' is the score for team a, 'b' is the score for team b
           // console.log("Score is now: " + JSON.stringify(scoreData))
           // $("#Status").text = "Team A: " + scoreData.a + " Team B: " + scoreData.b;
             //here is an example something we could do when the ball is reset..
            //change the balls's color to red, and move it off the screen, and create a new ball.
            var ballBody = gameView.ballBody; //ballBody is a reference to the ball body from physicsJS
            ballBody.state.vel.x = 0;
            ballBody.state.vel.y = .5;
            ballBody.styles.fillStyle = 'red';
            ballBody.treatment = 'kinematic';
            ballBody.recalc();
            ballBody.view = undefined; // re-creates new view on next render
            gameView.world.render();
            gameView.addBall();
            break;
        case "impact": //occurs whenever the ball hits something, either a paddle, or any of the walls.  This action should update game state for all players.
            var gameState = data;
        break;
            default:
    }
} 