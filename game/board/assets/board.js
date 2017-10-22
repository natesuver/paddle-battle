var boardCanvas;
var gameView;
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
    gameView = new View($("#gameBoard"), teamA, teamB, 1, "http://localhost:3000",function() {
        startCountdown();
    });
    var obj = document.getElementById('slider');
    obj.addEventListener('touchmove', function(event) {
      // If there's exactly one finger inside this element
      if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        View.movePaddle(1,touch.pageY); //TODO: figure out which player i am.
      }
    }, false);
    obj.addEventListener('mousemove', function(event) {
        View.movePaddle(1,event.pageY-40); //TODO: figure out which player i am.
    }, false);
});

function startGame() {
    boardCanvas.fadeIn(800);
    gameView.start();
}

function startCountdown() {
    var cd = new Countdown($("#countdown"),5,"Go!", startGame);
    cd.beginCountdown();
}
