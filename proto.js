var paddles=[];
var world;
const defaultHeight = 70;
var teamAScore = 0;
var teamBScore = 0;
window.onresize = function() {
    $(document.body).width(window.innerWidth).height(window.innerHeight);
  }

  $(function() {
    window.onresize();
  });

 

var ws = new WebSocket('ws://eeffb195.ngrok.io'); //ws://d08ae3c8.ngrok.io //ws://localhost:8080
  
ws.onmessage = function (event) {
    var position = parseInt(event.data);
    paddles[1].state.pos.y = position+40;
};

function killSocket() {
    ws.close();
}

  document.body.addEventListener('touchmove', function(event) {
    event.preventDefault();
  }, false); 


function getGameData() {
    $.Deferred();
    
}

function addPaddle(Physics,world, startPosition, height, color) {
    var paddle = Physics.body('rectangle', {
        x: 0,
        y: startPosition,
        width: 50,
        height: height,
        styles: {
            fillStyle: color
        }
    })
    paddle.treatment ="static";
    paddle.color = color;
   // paddle.name = "paddle";
    paddle.hits= 0;
    //paddle.view = new Image
    //paddle.view.id = "blue";
    //paddle.view.src = 'img/polkadot.png';
    paddles.push(paddle);
    world.add(paddle);
    return paddle;
}

function addBall(Physics,world) {
    var ball = Physics.body('circle', {
        x: 250, //starting x coordinate
        y: 250, //starting y coordinate
        vx: 0.1, //starting x velocity
        vy: 0.0, //starting y velocity
        radius: 10,
        cof: 0.00, //drag coefficient
        styles: {
            fillStyle: 'black'
        }
    });
    world.add(ball);
    return paddle;
}
function beginGame()
 {
    Physics.util.ticker.start();
 }

 function recordCollission(collision) {
    var targetBody = collision.bodyB;
    if (collision.bodyA.id == "ball" && !collision.bodyB.color) {
        var x = Math.round(collision.bodyA.state.pos.x,2);
        
        if (x<=10) teamBScore++;
        if (x>=630) teamAScore++;
        document.getElementById("hits").innerHTML = "ball hit wall @ " + x + ", " + Math.round(collision.bodyA.state.pos.y,2) + "<br>Team A Score: " + teamAScore + "<br> Team B Score: " + teamBScore;
    }
     if (collision.bodyA.color)
     {
        ++collision.bodyA.hits;
        document.getElementById("score").innerHTML = "<b>" + collision.bodyA.color + " has been hit " + collision.bodyA.hits/2 + " times</b>"
     }
    
 }


  $(document).ready(function() { //begin rendering only when the document has completely loaded
    
    var obj = document.getElementById('slider');
    obj.addEventListener('touchmove', function(event) {
      // If there's exactly one finger inside this element
      if (event.targetTouches.length == 1) {
        var touch = event.targetTouches[0];
        // Place element where the finger is
        document.getElementById('touch').innerHTML = "Touch Position-> X: " + touch.pageX + " Y: " + touch.pageY;
        obj.style.left = touch.pageX + 'px';
        obj.style.top = touch.pageY + 'px';
        paddles[0].state.pos.y = touch.pageY;
        ws.send(touch.pageY);
      }
    }, false);
   /*
    $( "#slider" ).slider({
        orientation: "vertical",
        min: 0,
        max: 600,
        value: 640,
        slide: function( event, ui ) {
            paddles[0].state.pos.y = (640-ui.value) -30;
            ws.send((640-ui.value) -30);
          }
    }); */
    
    world = Physics();
    var renderer = Physics.renderer("canvas",{
        el: "gameboard",	// canvas element id
        width: 640,		// canvas width
        height: 480,		// canvas height
        meta: false,		// setting it to "true" will display FPS
        styles: {
            // set colors for the circle bodies
            'circle' : {
                strokeStyle: 'white',
                lineWidth: 1,
                fillStyle: 'blue',
                angleIndicator: 'none'
            }
        }
    });	
    world.add(renderer);
    var ball = Physics.body('circle', {
        x: 250, //starting x coordinate
        y: 250, //starting y coordinate
        vx: 0.5, //starting x velocity
        vy: 0.5, //starting y velocity
        radius: 10,
        cof: 0.00, //drag coefficient
        styles: {
            fillStyle: 'black'
        }
    });
    ball.id = "ball";
    world.add( ball );
    //ball.view = new Image
   // ball.view.src = 'img/ball.png';

    addPaddle(Physics, world, 230, defaultHeight,'blue');
    addPaddle(Physics, world, 100, defaultHeight,'yellow');
    addPaddle(Physics, world, 230, defaultHeight,'green');

   
    //world.render(); 

    world.add( Physics.behavior('sweep-prune') );
    var bounds = Physics.aabb(0, 0, 640, 480); //define the boundaries of our container.
    world.add( Physics.behavior('edge-collision-detection', {
        aabb: bounds,
        restitution: 1
    }) );
    world.add( Physics.behavior('body-collision-detection') );
    world.add( Physics.behavior('sweep-prune') );
    // ensure objects bounce when edge collision is detected
    world.add( Physics.behavior('body-impulse-response') );

    Physics.util.ticker.on(function( time, dt ){
        world.step( time );
    });
    
    world.on('collisions:detected', function( data ){
       // var c;
       /* if (data.collisions.length>0) {
            recordCollission(data.collisions[ 0 ]);
        } */
        //for (var i = 0, l = data.collisions.length; i < l; i++){
        //    c = data.collisions[ i ];
            
           
        //}
    });



    // start the ticker
    Physics.util.ticker.start();
    world.on('step', function(){
        world.render();
    });

    
  });