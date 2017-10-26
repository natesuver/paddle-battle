function sockManager(gameUrl, gameId, onBehavior) {
    sockManager.onBehavior = onBehavior;
    sockManager.gameUrl = gameUrl;
    sockManager.gameId = gameId;
    sockManager.initializeSocket = function() {
        //note, when the game concludes, the server will terminate the socket, so for that use case, connection management is not needed from the client side.
        //passing in the gameId into the url of the socket allows a single server to handle multiple games (future possible feature)
        sockManager.socket = io.connect(sockManager.gameUrl,{ query: "gameId=" + sockManager.gameId }); 
        sockManager.socket.on('handshake', function (data) {
            console.log("Connection Established");
            sockManager.onBehavior("connect", data);
        });
        sockManager.socket.on('stateChange', function (stateInfo) {
            sockManager.onBehavior("stateChange", JSON.parse(stateInfo));
        });
        sockManager.socket.on('impact', function (impactInfo) {
            sockManager.onBehavior("impact",JSON.parse(impactInfo));
        });
        sockManager.socket.on('paddleChange', function (paddleInfo) {
            sockManager.onBehavior('paddleChange', JSON.parse(paddleInfo));
        });
        sockManager.socket.on('scoreChange', function (scoreData) {
            //Arguments: scoreData is a json encoded string e.g. {'a':0,'b':0 }.  'a' is the score for team a, 'b' is the score for team b
            sockManager.onBehavior("score",JSON.parse(scoreData));
        });
        
        sockManager.socket.on('gameOver', function(stateInfo) {
            sockManager.onBehavior("gameOver",JSON.parse(stateInfo));
        });
    }
    
    sockManager.recordScore = function(team) {
        sockManager.socket.emit('score', team);
    }
    sockManager.paddleMoved = function(position, playerId) {
        sockManager.socket.emit('paddleChange', {l:position,p:playerId});
    }

    sockManager.closeSocket = function() {
        sockManager.socket.disconnect();
    }
    return sockManager;
}