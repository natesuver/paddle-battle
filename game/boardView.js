class boardView {
    constructor(boardElement, teamA, teamB) {
        this.boardElement = boardElement;
        this.initialize();
        this.colors = ['Red','Blue','DarkGoldenRod','BlueViolet','Cyan'];
        this.teamAPaddles = [];
        this.teamBPaddles = [];
        this.teamA = teamA; //an array of objects, each object is a player
        this.teamB = teamB; //an array of objects, each object is a player
    }

    initialize() {
        
        boardView.world = Physics(); //world must be static
        var that = this;
        var renderer = Physics.renderer("canvas",{
            el: this.boardElement[0].id,	// canvas element id
            width: this.boardElement.width(),		// canvas width
            height: this.boardElement.height(),		// canvas height
            meta: false // setting this to "true" will display metrics (frames per second)
        });	
        boardView.world.add(renderer);    
        boardView.world.add( Physics.behavior('sweep-prune') );
        var bounds = Physics.aabb(0, 0, this.boardElement.width(), this.boardElement.height()); //define the boundaries of our container.
        boardView.world.add( Physics.behavior('edge-collision-detection', {
            aabb: bounds,
            restitution: 1
        }) );
        boardView.world.add( Physics.behavior('body-collision-detection') );
        boardView.world.add( Physics.behavior('sweep-prune') );
        // ensure objects bounce when edge collision is detected
        boardView.world.add( Physics.behavior('body-impulse-response') );
    
        Physics.util.ticker.on(function( time, dt ){
            boardView.world.step( time );
        });
        
        boardView.world.on('collisions:detected', function( data ){
           /*  if (data.collisions.length>0) {
                recordCollission(data.collisions[ 0 ]);
            }
            */
        });
        
        boardView.world.on('step', function(){
            boardView.world.render();
        });
    }

    addBall() {
        var ball = Physics.body('circle', {
            x: this.boardElement.width()/2, //starting x coordinate
            y: this.boardElement.height()/2, //starting y coordinate
            vx: 0.3, //starting x velocity
            vy: 0.4, //starting y velocity
            radius: 10,
            cof: 0.00, //drag coefficient
            styles: {
                fillStyle: 'black'
            }
        });
        boardView.world.add(ball);
    }

    addPaddle(teamPaddles, teamArray, xPosition) {
        var paddleIndex = teamPaddles.length;
        var paddle = Physics.body('rectangle', {
            x: xPosition, //either 0 or canvas.width-offset
            y: 50+ (100*paddleIndex),
            width: 50,
            height: 100* Math.pow(1-.2,teamArray.length+1), //use a compounding function to determine height of each paddle, based on number of other players on my team
            styles: {
                fillStyle: this.colors[paddleIndex]
            }
        })
        paddle.treatment ="static";
        paddle.color = this.colors[paddleIndex];
        paddle.hits= 0;
        //paddle.view = new Image
        //paddle.view.id = "blue";
        //paddle.view.src = 'img/polkadot.png';
        teamPaddles.push(paddle);
        boardView.world.add(paddle);
    }
    
    start() {
        Physics.util.ticker.start();
    }
}