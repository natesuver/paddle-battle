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
    targetPaddle.paddleBody.state.pos.y = position;
    this.networking.paddleMoved(position,playerId);
}
physicsEngine.prototype.moveOtherPaddle = function(playerId, position) {
    var targetPaddle = this.paddleDictionary["p" + playerId];
    targetPaddle.paddleBody.state.pos.y = position;
}

physicsEngine.prototype.adjustState = function(ball, paddles) {
    var ballBody = this.ballBody; //ballBody is a reference to the ball body from physicsJS
    ballBody.state.vel.x = ball.xv;
    ballBody.state.vel.y = ball.yv;
    ballBody.state.pos.x = ball.x;
    ballBody.state.pos.y = ball.y;
    activeEngine.world.render();
    //todo: add paddle support
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
    this.world.add( Physics.behavior('sweep-prune') );
    var bounds = Physics.aabb(0, 0, this.boardElement.width(), this.boardElement.height()); //define the boundaries of our container.
    this.world.add( Physics.behavior('edge-collision-detection', {
        aabb: bounds,
        restitution: 1
    }) );
    this.world.add( Physics.behavior('body-collision-detection') );
    this.world.add( Physics.behavior('sweep-prune') );
    // ensure objects bounce when edge collision is detected
    this.world.add( Physics.behavior('body-impulse-response') );

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
            }
            if (resolveBall.state.pos.x>=538) {
                activeEngine.networking.recordScore('a');
            }
            var ballBody = activeEngine.ballBody;
            activeEngine.networking.ballImpact({x:ballBody.state.pos.x,y:ballBody.state.pos.y,xv:ballBody.state.vel.x,yv:ballBody.state.vel.y});
        }
    });

    this.world.on('step', function(){
        self.world.render();
    });
    
}

physicsEngine.prototype.addPaddles = function(players, startPosition) {
    var paddle= null;
    var player = null;
    for (var i=0;i<players.length; i++) {
        player =players[i];
        paddle = new Player(i, players.length, startPosition, player);
        this.paddleDictionary["p" + player.id] = paddle; //a dictionary for fast paddle lookup when the socket receives a new position from another player.
        this.world.add(paddle.body);
    }
}

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
   
  
   
   
    
    
   