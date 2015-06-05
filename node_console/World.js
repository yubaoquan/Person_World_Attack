var Util = require('./Util');

function World(a, b) {
    this.ground = [];
    this.personRecord = [];
    this.width = a;
    this.height = b;
    this.tree = '△△△△';
    this.stone = '●●●●'
    this.wall = '▇▇▇▇';
    this.stoneNumber = 10;
    this.init();
}

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
        this.createTrees();
        this.createWalls();
        this.createStones();
    },
    createTrees: function() {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this.ground[i][j] = this.tree;
            }
        }
    },
    createWalls: function() {
        for (var i = 1; i < this.width; i += 2) {
            for (var j = 1; j < this.height; j += 2) {
                this.ground[i][j] = this.wall;
            }
        }
    },
    createStones: function() {
        for (var i = 0; i < this.stoneNumber; i++) {
            var x = Util.getRandomInt(0, this.width - 1);
            var y = Util.getRandomInt(0, this.height - 1);
            while (this.ground[x][y] === this.stone) {
                x = Util.getRandomInt(0, this.width);
                y = Util.getRandomInt(0, this.height);
            }
            this.ground[x][y] = this.stone;
        }
    },
    clear: function(x, y) {
        for (var i = 0; i < this.width; i++) {
            for (var j = 0; j < this.height; j++) {
                this.ground[i][j] = this.tree;
                this.personRecord[x][y] = null;
            }
        }
    },
    reset: function(x, y) {
        if (isNaN(x) || isNaN(y)) {
            return;
        }
        this.ground[x][y] = this.tree;
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
                if (this.ground[x1][i] === this.stone) {
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
                if (this.ground[i][y1] === this.stone) {
                    return true;
                }
            }
        }
        return false;
    }
};

module.exports = World;
