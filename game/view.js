class View {
    constructor(boardElement, teamA, teamB) {
        this.boardElement = boardElement;
        this.teamAPlayers = teamA; //an array of objects, each object is a player
        this.teamBPlayers = teamB; //an array of objects, each object is a player
        this.initialize();
        
    }

    initialize() {
        
        View.world = Physics(); //world must be static
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
           /*  if (data.collisions.length>0) {
                recordCollission(data.collisions[ 0 ]);
            }
            */
        });
        
        View.world.on('step', function(){
            View.world.render();
        });
        var paddle;
        var teamA
        for (var i=0;i<this.teamAPlayers.length; i++) {
            paddle = new Paddle(i, this.teamAPlayers.length, this.__TeamAStartXPosition, this.teamAPlayers[i]);
            View.world.add(paddle.body);
        }
        for (var i=0;i<this.teamBPlayers.length; i++) {
            paddle = new Paddle(i, this.teamBPlayers.length, this.__TeamBStartXPosition, this.teamBPlayers[i]);
            View.world.add(paddle.body);
        }
        this.addBall();
    }

    addBall() {
        var ball = new Ball(this.boardElement.width()/2, this.boardElement.height()/2)
        View.world.add(ball.body);
    }
    
    start() {
        Physics.util.ticker.start();
    }

    get __TeamAStartXPosition() {return 10;}
    get __TeamBStartXPosition() {return 540;}
}