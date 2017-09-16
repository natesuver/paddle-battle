

  $(document).ready(function() { //begin rendering only when the document has completely loaded
    var world = Physics();
    var renderer = Physics.renderer("canvas",{
        el: "gameboard",	// canvas element id
        width: 640,		// canvas width
        height: 480,		// canvas height
        meta: true		// setting it to "true" will display FPS
    });	
    world.add(renderer);
    var ball = Physics.body('circle', {
        x: 250, //starting x coordinate
        y: 250, //starting y coordinate
        vx: 0.5, //starting x velocity
        vy: 0.3, //starting y velocity
        radius: 10,
        cof: 0.9, //drag coefficient
    });
    
    world.add( ball );
    world.render(); 

    world.add( Physics.behavior('sweep-prune') );
    var bounds = Physics.aabb(0, 0, 640, 480); //define the boundaries of our container.
    world.add( Physics.behavior('edge-collision-detection', {
        aabb: bounds
    }) );
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