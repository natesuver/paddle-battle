class View {
    constructor(boardElement, teamA, teamB, gameId, gameUrl, onConnect) {
        this.boardElement = boardElement;
        this.teamAPlayers = teamA; //an array of objects, each object is a player
        this.teamBPlayers = teamB; //an array of objects, each object is a player
        View.paddleDictionary={}; //a convenience member to help with extremely fast lookups of paddle bodies
        this.initializePhysics();
        this.initializeSocket(gameId,gameUrl);
        View.onConnect = onConnect;
        this.addGameAssets();
        
    }
   

     initializeSocket(gameId, gameUrl) {
         //note, when the game concludes, the server will terminate the socket, not needed from the client side.
         //passing in the gameId into the url of the socket allows a single server to handle multiple games.
         View.socket = io.connect(gameUrl,{ query: "gameId=" + gameId }); 
        // var self = this;
         View.socket.on('handshake', function (data) {
            console.log("Connection Established");
            View.onConnect();
         });
         View.socket.on('stateChange', function (stateInfo) {
            View.onUpdateState(JSON.parse(stateInfo));
         });
         View.socket.on('impact', function (impactInfo) {
            View.onImpact(JSON.parse(impactInfo));
         });
         View.socket.on('paddleChange', function (paddleInfo) {
            View.onPaddleChange(JSON.parse(paddleInfo));
         });
         View.socket.on('scoreChange', function (scoreData) {
            View.onScoreChange(JSON.parse(scoreData));
         });
         
         View.socket.on('gameOver', function(stateInfo) {
            View.onGameOver(JSON.parse(stateInfo))
         });
     }

    initializePhysics() {
        View.paddleColissionQuery= Physics.query({
            $or: [
                { bodyA: { name: 'circle' } }
                ,{ bodyB: { name: 'circle' } }
            ]
        });
        View.world = Physics();
        var that = this;
        var renderer = Physics.renderer("canvas",{
            el: this.boardElement[0].id,	// canvas element id
            width: this.boardElement.width(),		// canvas width
            height: this.boardElement.height(),		// canvas height
            meta: false // setting this to "true" will display metrics (frames per second)
        });	

        View.world.add(renderer);    
        View.world.add( Physics.behavior('sweep-prune') );
        var bounds = Physics.aabb(0, 0, this.boardElement.width(), this.boardElement.height()); //define the boundaries of our container.
        View.world.add( Physics.behavior('edge-collision-detection', {
            aabb: bounds,
            restitution: 1
        }) );
        View.world.add( Physics.behavior('body-collision-detection') );
        View.world.add( Physics.behavior('sweep-prune') );
        // ensure objects bounce when edge collision is detected
        View.world.add( Physics.behavior('body-impulse-response') );
    
        Physics.util.ticker.on(function( time, dt ){
            View.world.step( time );
        });

        View.world.on('collisions:detected', function( data ){
            var found = Physics.util.find( data.collisions, View.paddleColissionQuery );
            if ( found ){
                var resolveBall = found.bodyA.radius?found.bodyA:found.bodyB;
                    if (resolveBall.state.pos.x<=12) {
                        View.onWallCollideTeamA();
                    }
                    if (resolveBall.state.pos.x>=538) {
                        View.onWallCollideTeamB();
                    }
                    //console.log("Strike!");    //TODO: do something with this data.  something nice.  
            }
        });

        View.onWallCollideTeamA = function() {
            View.socket.emit('teamBScore', null);
        }
        View.onWallCollideTeamB = function() {
            View.socket.emit('teamAScore', null);
        }
        View.onPaddleChange = function(paddleInfo) {
            var targetPaddle = View.paddleDictionary["p" + paddleInfo.p];
            targetPaddle.paddleBody.state.pos.y = paddleInfo.l;
           // console.log("paddleInfo data: " + JSON.stringify(paddleInfo));
        }
        View.onGameOver = function(stateInfo) {
            console.log("Game Over: " + JSON.stringify(stateInfo));
        }
        //Arguments: scoreData is a json encoded string e.g. {'a':0,'b':0 }.  'a' is the score for team a, 'b' is the score for team b
        View.onScoreChange = function(scoreData) {
            console.log("Score is now: " + JSON.stringify(scoreData))
        }
        /*
        Physics.body.mixin('collide', function( entity ){
            if ( entity.id === "ball"){
                if (Math.round(entity.state.pos.x,2) <=10) {
                    console.log("Team B point");       
                }
                if (Math.round(entity.state.pos.x,2) >=535) {
                    console.log("Team A point");
                }
            }
            return true;
        });
*/
        View.world.on('step', function(){
            View.world.render();
        });
        
    }
    addGameAssets() {
        this.addPaddles(this.teamAPlayers,this.TeamAStartXPosition);
        this.addPaddles(this.teamBPlayers,this.TeamBStartXPosition);
        this.addBall();
    }
    addPaddles(players, startPosition) {
        var paddle= null;
        var player = null;
        for (var i=0;i<players.length; i++) {
            player =players[i];
            paddle = new Paddle(i, players.length, startPosition, player);
            View.paddleDictionary["p" + player.id] = paddle; //this is simple a convenient dictionary for fast paddle lookup when the socket receives a new position from another player.
            View.world.add(paddle.body);
        }
    }
    addBall() {
        var ball = new Ball(this.boardElement.width()/2, this.boardElement.height()/2)
        View.world.add(ball.body);
    }
    
    start() {
        Physics.util.ticker.start();
    }

    get TeamAStartXPosition() {return 10;}
    get TeamBStartXPosition() {return 540;}

    onUpdateState(stateInfo) {
        console.log("game state: " + JSON.stringify(stateInfo));
    }
    onImpact(impactInfo) {
        console.log("impact data: " + JSON.stringify(impactInfo));
    }

    //Summary: This function fires when another player sends a paddleChange message.  When the message is received, move the desired player's paddle to the location specified by the server.
    //Arguments:  paddleData is a json object e,g. {l:999,p:999}.  l is the location of the paddle on the board, p is the player id.  Both are integers.
   
   
   
}