//node bot.js "http://localhost:3000" 1 1,2,3,4,5,6,7,8,9,10
var serverUrl = process.argv[2];
var gameId = parseInt(process.argv[3]);
var players = process.argv[4].split(",");
console.log("Server: " + serverUrl);
console.log("gameId: " + gameId);
console.log("players: " + players.length);

var io = require('socket.io-client');
var socket = io.connect(serverUrl, {query: "gameId=" + gameId, reconnect: true});
socket.on('handshake', function (socket) {
    console.log('Connection Established!');
});
for (var i=0; i<players.length;i++) {
    movePlayer(players[i]);
}
   

function movePlayer(playerId) {
    var lastPosition = getRandomStart();
    var direction = 1;
    setInterval(function() {
        console.log('Moving player: ' + playerId + " to position " + lastPosition);
        socket.emit('paddleChange',{p: playerId, l: lastPosition});
        lastPosition+=(10*direction);
        if (Math.random() <.07) {
            direction=-direction;
        }
        if (lastPosition>600 || lastPosition<10) {
            lastPosition = 10;
            direction=1;
        }
    },45);
}

function getRandomStart() {
    return Math.floor(Math.random() * (600 - 10 + 1)) + 10;
}