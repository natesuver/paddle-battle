var boardCanvas;
var game;
$(document).ready(function() { 
    boardCanvas = $("#gameSurface");
    boardCanvas.hide();
    game = new boardView($("#gameBoard"));
    startCountdown();
});

function startGame() {
    boardCanvas.fadeIn(800);
    game.addBall();
    game.start();
}

function startCountdown() {
    var cd = new Countdown($("#countdown"),0,"Go!", startGame);
    cd.beginCountdown();
}
