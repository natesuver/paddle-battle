var countdownDuration = 1000;

$(document).ready(function() { 
    var cd = new Countdown($("#countdown"),6,"FIGHT");
    cd.beginCountdown();
});

