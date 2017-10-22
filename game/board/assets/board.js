var boardCanvas;
$(document).ready(function() { 
    //this stops that "refresh when you swipe down" action from happening
    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
      }, false); 
    
    boardCanvas = $("#gameSurface");
    boardCanvas.hide();
    //boardElement, teamA, teamB, gameId, gameUrl, onConnect)
    var teamA = [{"name":"Nate","id": 1}, {"name":"Steve","id": 2}, {"name":"Lil Billy","id": 3}, {"name":"Walde","id": 4}, {"name":"Torrit","id": 5}];
    var teamB = [{"name":"Jenny","id": 6}, {"name":"Karen","id": 7}, {"name":"Tina","id": 8}, {"name":"Jack","id": 9}, {"name":"Jammer","id": 10}];
    view($("#gameBoard"), teamA, teamB, 1, "http://battle-server-dev.us-east-1.elasticbeanstalk.com",function() { //http://localhost:3000 //http://battle-server-dev.us-east-1.elasticbeanstalk.com
        startCountdown();
    }, onBehavior);
    addListeners();
});

//Setup listeners for the paddle position slider.  Supported by both touch and mouse.
function addListeners() {
    var obj = document.getElementById('slider');
    obj.addEventListener('touchmove', function(event) {
      // If there's exactly one finger inside this element
      if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        view.movePaddle(1,touch.pageY); //TODO: figure out which player i am.
      }
    }, false);
    obj.addEventListener('mousemove', function(event) {
        view.movePaddle(1,event.pageY-40); //TODO: figure out which player i am.
    }, false);
}

function startGame() {
    boardCanvas.fadeIn(800);
    view.start();
}

function startCountdown() {
    var cd = new Countdown($("#countdown"),5,"Go!", startGame);
    cd.beginCountdown();
}

function onBehavior(name, data) {
    switch (name) {
        case "resetball": //occurs after a team gets a point.
            //here is an example something we could do when the ball is reset..
            //change the balls's color to red, and move it off the screen, and create a new ball.
            var ballBody = data; //ballBody is a reference to the ball body from physicsJS
            ballBody.state.vel.x = 0;
            ballBody.state.vel.y = .5;
            ballBody.styles.fillStyle = 'red';
            ballBody.treatment = 'kinematic';
            ballBody.recalc();
            ballBody.view = undefined; // re-creates new view on next render
            view.world.render();
            view.addBall();
            break;
        case "gameover": //occurs when the server determines the game is over
            var gameState = data; 
            console.log("Game Over: " + JSON.stringify(gameState));
            //TODO: record game score.
            window.location.href="gameOver.php";
            break;
        case "paddlechange": //occurs when another player changes their paddle position (not your own)
            var paddleData = data; //paddleData is a json object e.g. {'l':0,'p':0 }.  'l' is the location (Y coordinate) of the paddle, 'p' is the player id
            break;
        case "score": //occurs when a team successfully gets a score.  Note that resetball is called immediately after this.
            var scoreData = data; //scoreData is a json object e.g. {'a':0,'b':0 }.  'a' is the score for team a, 'b' is the score for team b
            console.log("Score is now: " + JSON.stringify(scoreData))
        case "impact": //occurs whenever the ball hits something, either a paddle, or any of the walls.  This action should update game state for all players.
            var gameState = data;
        break;
            default:
    }
} 