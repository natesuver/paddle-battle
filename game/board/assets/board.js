var boardCanvas;
var game;
$(document).ready(function() { 
    //this stops that "refresh when you swipe down" action from happening
    document.body.addEventListener('touchmove', function(event) {
        event.preventDefault();
      }, false); 
    
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
