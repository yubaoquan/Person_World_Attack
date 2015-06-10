(function() {

    function World(a, b) {
        this.ground = [];
        this.personRecord = [];
        this.width = a;
        this.height = b;
        this.stoneNumber = 10;
        this.init();
    }

    World.stone = '●●●●';
    World.grass = '△△△△';
    World.wall = '▇▇▇▇';

    World.prototype = {
        init: function() {
            for (var i = 0; i < this.width; i++) {
                this.personRecord[i] = [];
                this.ground[i] = [];
                for (var j = 0; j < this.height; j++) {
                    this.personRecord[i][j] = null;
                    this.ground[i][j] = null;
                }
            }
            this.createGrass();
            this.createWalls();
            this.createStones();
        },
        createGrass: function() {
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    this.ground[i][j] = World.grass;
                    //World.drawGrass(i, j);
                }
            }
        },
        createWalls: function() {
            for (var i = 1; i < this.width; i += 2) {
                for (var j = 1; j < this.height; j += 2) {
                    this.ground[i][j] = World.wall;
                    //World.drawWall(i, j);
                }
            }
        },
        createStones: function() {
            for (var i = 0; i < this.stoneNumber; i++) {
                var x = Util.getRandomInt(0, this.width - 1);
                var y = Util.getRandomInt(0, this.height - 1);
                
                while (!canPutStone(this.ground[x][y])) {
                    x = Util.getRandomInt(0, this.width - 1);
                    y = Util.getRandomInt(0, this.height - 1);
                }
                // console.info('Create stone:' + x + ', ' + y);
                this.ground[x][y] = World.stone;
            }
        },
        clear: function(x, y) {
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    this.ground[i][j] = World.grass;
                    this.personRecord[x][y] = null;
                }
            }
        },
        reset: function(x, y) {
            if (isNaN(x) || isNaN(y)) {
                return;
            }
            this.ground[x][y] = World.grass;
            this.personRecord[x][y] = null;
        },
        show: function() {
            console.info();
            for (var i = 0; i < this.width; i++) {
                var row = '';
                for (var j = 0; j < this.height; j++) {
                    row += this.ground[i][j] + ' ';
                }
                console.info(row);
            }
        },
        setPerson: function(x, y, person) {
            this.ground[x][y] = person.name;
            this.personRecord[x][y] = person;
        },
        stoneBetweenPersons: function(x1, y1, x2, y2) {
            if (x1 === x2) {
                if (Math.abs(y1 - y2) <= 1) {
                    return false;
                }
                var yMin = y1 < y2 ? y1 : y2;
                var yMax = y1 < y2 ? y2 : y1;
                for (var i = yMin + 1; i < yMax; i++) {
                    if (this.ground[x1][i] === World.stone) {
                        return true;
                    }
                }
            } else {
                if (Math.abs(x1 - x2) <= 1) {
                    return false;
                }
                var xMin = x1 < x2 ? x1 : x2;
                var xMax = x1 < x2 ? x2 : x1;
                for (var i = xMin + 1; i < xMax; i++) {
                    if (this.ground[i][y1] === World.stone) {
                        return true;
                    }
                }
            }
            return false;
        },
        draw: function() {
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    // console.info(i + ', ' + j);
                    switch (this.ground[i][j]) {
                        case World.grass:
                            this.drawGrass(i, j);
                            break;
                        case World.wall:
                            this.drawWall(i, j);
                            break;
                        case World.stone:
                            this.drawStone(i, j);
                            break;
                        default:
                            console.info('Illegal thing:' + this.ground[i][j]);
                    }
                }
            }
        },
        drawGrass: function(x, y) {
            var pen = window.pen;
            pen.fillStyle = Config.grassColor;
            pen.fillRect(x * Config.brickWidth, y * Config.brickWidth, Config.brickWidth, Config.brickWidth);
            pen.strokeRect(x * Config.brickWidth, y * Config.brickWidth, Config.brickWidth, Config.brickWidth);
        },
        drawWall: function(x, y) {
            // var pen = window.pen;
            // pen.fillStyle = Config.wallColor;
            // pen.fillRect(x * Config.brickWidth, y * Config.brickWidth, Config.brickWidth, Config.brickWidth);
            // pen.strokeRect(x * Config.brickWidth, y * Config.brickWidth, Config.brickWidth, Config.brickWidth);

            var pen = window.pen;
            var imgX = x * Config.brickWidth;
            var imgY = y * Config.brickWidth;
            pen.drawImage(Config.wallImg, imgX, imgY, Config.brickWidth, Config.brickWidth);
        },
        drawStone: function(x, y) {
            var pen = window.pen;
            var imgX = x * Config.brickWidth;
            var imgY = y * Config.brickWidth;
            pen.drawImage(Config.stoneImg, imgX, imgY, Config.brickWidth, Config.brickWidth);
        }

    };

    World.drawGrass = function(x, y) {
        var pen = window.pen;
        pen.fillStyle = Config.grassColor;
        pen.fillRect(x * Config.brickWidth, y * Config.brickWidth, Config.brickWidth, Config.brickWidth);
        pen.strokeRect(x * Config.brickWidth, y * Config.brickWidth, Config.brickWidth, Config.brickWidth);
    };

    World.drawWall = function(x, y) {
        var pen = window.pen;
        pen.fillStyle = Config.wallColor;
        pen.fillRect(x * Config.brickWidth, y * Config.brickWidth, Config.brickWidth, Config.brickWidth);
    };
    
    function canPutStone(field) {
        return field === World.grass;
    }

    window.World = World;
}());
