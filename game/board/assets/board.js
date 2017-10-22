var boardCanvas;
var game;
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
    game = new View($("#gameBoard"), teamA, teamB, 1, "http://localhost:3000",function() {
        startCountdown();
    });
});

function startGame() {
    boardCanvas.fadeIn(800);
    game.start();
}

function startCountdown() {
    var cd = new Countdown($("#countdown"),0,"Go!", startGame);
    cd.beginCountdown();
}
