var boardCanvas;
var game;
$(document).ready(function() { 
    boardCanvas = $("#gameSurface");
    boardCanvas.hide();
    game = new View($("#gameBoard"), [{"name":"Nate"}, {"name":"Steve"}, {"name":"Lil Billy"}, {"name":"Walde"}, {"name":"Torrit"}], [{"name":"Jenny"}, {"name":"Karen"}, {"name":"Tina"}, {"name":"Jack"}, {"name":"Jammer"}]);
    startCountdown();
});

function startGame() {
    boardCanvas.fadeIn(800);
    game.start();
}

function startCountdown() {
    var cd = new Countdown($("#countdown"),5,"Go!", startGame);
    cd.beginCountdown();
}
