var view = function(boardElement, teamA, teamB, sockMgr) {
    
    view.sockMgr = sockMgr;
    view.moveMyPaddle = function(playerId, position) {
        var targetPaddle = view.paddleDictionary["p" + playerId];
        targetPaddle.paddleBody.state.pos.y = position;
        view.sockMgr.paddleMoved(position,playerId);
     }
    view.moveOtherPaddle = function(playerId, position) {
        var targetPaddle = view.paddleDictionary["p" + paddleInfo.p];
        targetPaddle.paddleBody.state.pos.y = paddleInfo.l;
    }
    view.initializePhysics = function() {
        view.paddleColissionQuery= Physics.query({
            $or: [
                { bodyA: { name: 'circle' } }
                ,{ bodyB: { name: 'circle' } }
            ]
        });
        view.world = Physics();
        var renderer = Physics.renderer("canvas",{
            el: view.boardElement[0].id,	// canvas element id
            width: view.boardElement.width(),		// canvas width
            height: view.boardElement.height(),		// canvas height
            meta: false // setting this to "true" will display metrics (frames per second)
        });	

        view.world.add(renderer);    
        view.world.add( Physics.behavior('sweep-prune') );
        var bounds = Physics.aabb(0, 0, view.boardElement.width(), view.boardElement.height()); //define the boundaries of our container.
        view.world.add( Physics.behavior('edge-collision-detection', {
            aabb: bounds,
            restitution: 1
        }) );
        view.world.add( Physics.behavior('body-collision-detection') );
        view.world.add( Physics.behavior('sweep-prune') );
        // ensure objects bounce when edge collision is detected
        view.world.add( Physics.behavior('body-impulse-response') );
    
        Physics.util.ticker.on(function( time, dt ){
            view.world.step( time );
        });
       
        view.world.on('collisions:detected', function( data ){
            var found = Physics.util.find( data.collisions, view.paddleColissionQuery );
            if ( found ){
                var resolveBall = found.bodyA.radius?found.bodyA:found.bodyB;
                    if (resolveBall.state.pos.x<=12) {
                        view.sockMgr.recordScore('b');
                    }
                    if (resolveBall.state.pos.x>=538) {
                        view.sockMgr.recordScore('a');
                    }
            }
        });

        view.world.on('step', function(){
            view.world.render();
        });
        
    }

    view.addPaddles = function(players, startPosition) {
        var paddle= null;
        var player = null;
        for (var i=0;i<players.length; i++) {
            player =players[i];
            paddle = new Paddle(i, players.length, startPosition, player);
            view.paddleDictionary["p" + player.id] = paddle; //a dictionary for fast paddle lookup when the socket receives a new position from another player.
            view.world.add(paddle.body);
        }
    }

    view.addBall = function() {
        var ball = new Ball(view.boardElement.width()/2, view.boardElement.height()/2)
        view.world.add(ball.body);
        view.ballBody=ball.body;
    }

    view.start = function() {
        Physics.util.ticker.start();
    }
    
    
    view.TeamAStartXPosition=10;
    view.TeamBStartXPosition=540;

    view.boardElement = boardElement;
    view.teamAPlayers = teamA; //an array of objects, each object is a player
    view.teamBPlayers = teamB; //an array of objects, each object is a player
    view.paddleDictionary={}; //a convenience member to help with extremely fast lookups of paddle bodies
    view.initializePhysics();
    view.ballBody = null;
    view.addPaddles(view.teamAPlayers,view.TeamAStartXPosition);
    view.addPaddles(view.teamBPlayers,view.TeamBStartXPosition);
    view.addBall();
    return view;
} 



  
   
   
    
    
   