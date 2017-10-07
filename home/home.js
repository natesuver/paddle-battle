$('#submit_button').click(function(){
	submit();
});

var canv = document.createElement('canvas');
canv.id = 'board';

document.body.appendChild(canv); // adds the canvas to the body element

function updateFeedback(text, color='black'){
	$('#feedback_display').text(text);
	$('#feedback_display').css('color', color);
}

function submit(){
	pword = $('input[name="password"]').val();
	username = $('input[name="username"]').val();
	$.ajax({
		type: "POST",
		url: "loginValidation.php",
		data: {
			username: username,
			password: pword,
		},
		dataType: 'json',
		success: function(response){
			if(response['isValid'] == false){
				updateFeedback(response['feedback'], 'red');
			}else{
				window.location = '../game/lobby.php';
			}
		},
		error: function(response){
			updateFeedback('Something went wrong', 'red');
		}
	});
}
function createBall(Physics, i) {
	var ball = Physics.body('circle', {
        x: 250+i, //starting x coordinate
        y: 250+i, //starting y coordinate
        vx: 0.5	, //starting x velocity
        vy: 0.5, //starting y velocity
        radius: 15,
        cof: 0.00, //drag coefficient
        styles: {
            fillStyle: 'black'
        }
    });
	ball.id = "ball";
	return ball;
}
$(document).ready(function() { //begin rendering only when the document has completely loaded
	var board = document.getElementById("board");

	var width = $(board).width();
	var height = $(board).height();
    world = Physics();
    var renderer = Physics.renderer("canvas",{
        el: "board",	// canvas element id
        width: width,		// canvas width
        height: height,		// canvas height
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

	for (i=0;i<100;i++) {
		world.add( createBall(Physics,i) );
	}
    

	world.add( Physics.behavior('sweep-prune') );
    var bounds = Physics.aabb(0, 0, width, height); //define the boundaries of our container.
    world.add( Physics.behavior('edge-collision-detection', {
        aabb: bounds,
        restitution: 1
    }) );
    world.add( Physics.behavior('body-collision-detection') );
    // ensure objects bounce when edge collision is detected
    world.add( Physics.behavior('body-impulse-response') );

    Physics.util.ticker.on(function( time, dt ){
        world.step( time );
    });

    // start the ticker
    Physics.util.ticker.start();
    world.on('step', function(){
        world.render();
    });

    
  });

