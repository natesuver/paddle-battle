class sockManager {
    constructor(serverName,gameUrl, gameId, onBehavior) {
        this.serverName = serverName;
        this.gameUrl = gameUrl;
        this.gameId = gameId;
        this.onBehavior = onBehavior;
        this.socket = io.connect(gameUrl,{ query: "gameId=" + gameId }); 
        this.gameState = {started: false};
        var self = this;
        this.socket.on('handshake', function (data) {
            console.log("Connection Established");
            self.gameState = JSON.parse(data);
            self.socket.on('disconnect', function () {
                self.onBehavior("disconnect", {gameId:self.gameId});
            });
            self.socket.on('stateChange', function (stateInfo) {
                self.gameState = JSON.parse(stateInfo);
                self.onBehavior("stateChange", self.gameState);
            });
            self.socket.on('impact', function (impactInfo) {
                self.onBehavior("impact",JSON.parse(impactInfo));
            });
            self.socket.on('paddleChange', function (paddleInfo) {
                self.onBehavior('paddleChange', JSON.parse(paddleInfo));
            });
            self.socket.on('scoreChange', function (scoreData) {
                //Arguments: scoreData is a json encoded string e.g. {'a':0,'b':0 }.  'a' is the score for team a, 'b' is the score for team b
                self.onBehavior("score",JSON.parse(scoreData));
            });
            
            self.socket.on('gameOver', function(stateInfo) {
                self.onBehavior("gameOver",JSON.parse(stateInfo));
            });
            self.onBehavior("connect", JSON.parse(data));
        });
       
    }

    recordScore(team) {
        this.onBehavior("swapBall",null);
        this.socket.emit('score', team);
    }
    paddleMoved(position, playerId) {
        this.socket.emit('paddleChange', {l:position,p:playerId});
    }
    closeSocket() {
        this.socket.disconnect();
    }
    startGame() {
        this.socket.emit('gameStarted', null);
    }
    get connected() {
        return this.socket.connected;
    }
    get state() {
        return this.gameState;
    }

}

