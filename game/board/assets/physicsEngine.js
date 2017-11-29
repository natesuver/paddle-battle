var physicsEngine = function(boardElement, teamA, teamB, networking, isMasterUser) {
    this.isMasterUser = isMasterUser;
    this.boardElement = boardElement;
    this.teamA = teamA;
    this.teamB = teamB;
    this.networking = networking;
    this.paddleDictionary = {}; //a convenience member to help with extremely fast lookups of paddle bodies
    this.paddleCollideQuery= Physics.query({
        $or: [
            { bodyA: { name: 'circle' } }
            ,{ bodyB: { name: 'circle' } }
        ]
    });
    this.TeamAStartXPosition=10;
    this.TeamBStartXPosition=540;

    this.initializePhysics();
    this.addPaddles(teamA,this.TeamAStartXPosition);
    this.addPaddles(teamB,this.TeamBStartXPosition);
    this.addBall(.3,.4);
}

physicsEngine.prototype.moveMyPaddle = function(playerId, position) {
    var targetPaddle = this.paddleDictionary["p" + playerId];
    if (this.paddlePositionWithinBounds(targetPaddle,position)) {
        targetPaddle.paddleBody.state.pos.y = position;
        if (position % 2==0) { //only transmit paddle moves every other pixel, this helps with performance and doesn't impact game play.
            this.networking.paddleMoved(position,playerId);
        }
        
    }
   
}
///Compute if the paddle location is within the bounds of the board.  We do not wish to move a paddle if any part of it will move it off the board.
physicsEngine.prototype.paddlePositionWithinBounds = function(targetPaddle, desiredPosition) {
    var max = this.boardElement.height() - (targetPaddle.height/2);
    var min = targetPaddle.height/2;
    return (desiredPosition < max && desiredPosition>min);
}


physicsEngine.prototype.moveOtherPaddle = function(playerId, position) {
    var targetPaddle = this.paddleDictionary["p" + playerId];
    targetPaddle.paddleBody.state.pos.y = position;    
}

physicsEngine.prototype.adjustState = function(ballState) {
   // activeEngine.stop();
    var state = this.ballBody.state; //ballBody is a reference to the ball body from physicsJS
    var setValues = function(stateObject, targetObject) {
        targetObject.pos.x = stateObject.pos._[0];
        targetObject.pos.y = stateObject.pos._[1];
        targetObject.vel.x = stateObject.vel._[0];
        targetObject.vel.y = stateObject.vel._[1];
        targetObject.angular.pos = stateObject.angular.pos;
        targetObject.angular.vel = stateObject.angular.vel;
    }
    setValues(ballState,state);
    setValues(ballState.old,state.old);
   
    activeEngine.world.render();

}

physicsEngine.prototype.initializePhysics = function() {
    var self = this;
   
    this.world = Physics();
    var renderer = Physics.renderer("canvas",{
        el: self.boardElement[0].id,	// canvas element id
        width: self.boardElement.width(),		// canvas width
        height: self.boardElement.height(),		// canvas height
        meta: false // setting this to "true" will display metrics (frames per second)
    });	

    this.world.add(renderer);    
   // this.world.add( Physics.behavior('sweep-prune') );
    var bounds = Physics.aabb(0, 0, this.boardElement.width(), this.boardElement.height()); //define the boundaries of our container.
    this.world.add( Physics.behavior('edge-collision-detection', {
        aabb: bounds,
        restitution: 1
    }) );
    this.world.add( Physics.behavior('body-collision-detection') );
    
    // ensure objects bounce when edge collision is detected
    this.world.add( Physics.behavior('body-impulse-response') );
    this.world.add( Physics.behavior('sweep-prune') );
    Physics.util.ticker.on(function( time, dt ){
        self.world.step( time );
    });
    
    self.world.on('collisions:detected', function( data ){
        if (!activeEngine.isMasterUser) return; //only the master user needs to worry about detecting collisions.
        var found = Physics.util.find( data.collisions, activeEngine.paddleCollideQuery );
        if ( found ){
            var resolveBall = found.bodyA.radius?found.bodyA:found.bodyB;
            if (resolveBall.state.pos.x<=12) {
                activeEngine.networking.recordScore('b');
               // activeEngine.removeBall();
            }
            if (resolveBall.state.pos.x>=538) {
                activeEngine.networking.recordScore('a');
               // activeEngine.removeBall();
            }
            activeEngine.recordBallImpact();
            var resolvePaddle = found.bodyA.radius?found.bodyB:found.bodyA;

            if(resolvePaddle.uid > 1){ //something other than 1 should be a paddle
                for(var key in activeEngine.paddleDictionary){
                    var player = activeEngine.paddleDictionary[key];
                    if(player.paddleId == resolvePaddle.uid){
                        activeEngine.networking.recordHit(player.currentPlayer.id);
                        player.addHit();
                    }
                }
            }
        }
    });

    this.world.on('step', function(){
        self.world.render();
    });    
}

physicsEngine.prototype.recordBallImpact = function() {
    var ballBody = this.ballBody;
    if (ballBody) {
        var self = this;
        setTimeout(function() { //delay transmission of ball location until after the actual collision to appease physics engine.
            self.networking.ballImpact(ballBody.state);
        },50)
        
    }
}

physicsEngine.prototype.addPaddles = function(players, startPosition) {
    var paddle= null;
    var player = null;
    for (var i=0;i<players.length; i++) {
        player =players[i];
        paddle = new Player(i, players.length, startPosition, player);
        this.paddleDictionary["p" + player.id] = paddle; //a dictionary for fast paddle/player lookup when the socket receives a new position from another player.
        this.world.add(paddle.body);
    }
}
/*
physicsEngine.prototype.removeBall = function() {
    if (this.ballBody) {
        this.world.removeBody(this.ballBody);
        this.ballBody = null;
    }
}
*/
physicsEngine.prototype.addBall = function(xVelocity, yVelocity) {
    var ball = new Ball(this.boardElement.width()/2, this.boardElement.height()/2, xVelocity, yVelocity)
    this.world.add(ball.body);
    this.ballBody=ball.body;
}

physicsEngine.prototype.start = function() {
    Physics.util.ticker.start();
}
physicsEngine.prototype.stop = function() {
    Physics.util.ticker.stop();
}
