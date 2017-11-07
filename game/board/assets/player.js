class Player{
    constructor(playerIndex, teamCount, xStartingPosition, player) {
        this.colors = ['Red','Blue','DarkGoldenRod','BlueViolet','Cyan'];
        this.height = 100* Math.pow(1-.2,teamCount), //use a compounding function to determine height of each paddle, based on number of other players on my team
        this.width = 20;
        this.paddleBody = Physics.body('rectangle', {
            x: xStartingPosition,
            y: 50+ (100*playerIndex),
            width: this.width,
            height: this.height,
            styles: {
                fillStyle: this.colors[playerIndex]
            }
        });
        
        this.paddleBody.treatment = "static";
        this.color = this.colors[playerIndex];
        this.hitCount= 0;
        this.currentPlayer = player;
        this.paddleBody.id = player.id;
        this.paddleId = this.paddleBody.uid;
        this.currentPlayerName = this.player.username;
        this.team = this.player.team;
        //let this linger, in case we want to bind to images at some point.
        //paddle.view = new Image 
        //paddle.view.id = "blue";
        //paddle.view.src = 'img/polkadot.png';
    }

    
    get body() { return this.paddleBody;}
    get hits() {return this.hitCount;}
    addHit() { this.hitCount++;}
    get player() {return this.currentPlayer;}
}
