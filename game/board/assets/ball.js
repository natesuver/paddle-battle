class Ball {
    constructor(startingXCoord, startingYCoord) {
        this.ballBody = Physics.body('circle', {
            x: startingXCoord, //this.boardElement.width()/2, //starting x coordinate
            y: startingYCoord, //this.boardElement.height()/2, //starting y coordinate
            vx: 0.3, //starting x velocity
            vy: 0.4, //starting y velocity
            radius: 10,
            cof: 0.00, //drag coefficient
            styles: {
                fillStyle: 'black'
            }
        });
        this.collides = 0;
    }

    get body() {return this.ballBody;}
    get collisions() {return this.collides;}
    addCollision() {this.collisions++;}
}