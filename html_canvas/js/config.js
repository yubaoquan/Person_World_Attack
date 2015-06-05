(function() {

	var worldWidth = 25;
	var worldHeight = 11;
	var brickWidth = 40;

    var config = {
    	worldWidth: worldWidth,
    	worldHeight: worldHeight,
    	brickWidth: brickWidth,
        canvasWidth: worldWidth * brickWidth,
        canvasHeight: worldHeight * brickWidth,
        
        grassColor: 'rgba(0,255,0,1)',
        wallColor: 'rgba(255,0,0,1)',
        refreshInterval: 500,

        stoneImg: Util.getAPicture('../image/stone.png'),
        wallImg: Util.getAPicture('../image/wall.png')
    };

    // confing.brickHeight : 25,
    window.Config = config;
}());
