function Person(name, age, skill) {
    this.name = name || '人';
    this.age = age;
    this.skill = skill;
    Person.persons.push(this);

}



Person.persons = [];

Person.prototype = {
    x: 0,
    y: 0,
    blood: 10,
    attackSkills: [],
    //用于控制移动速度
    moveInterval: 1,
    toString: function() {
        return ('我是' + this.name + ', 今年' + this.age + '岁.' + '我最擅长' + this.skill);
    },
    changeBlood: function(bloodNumber) {
        if (this.blood <= 0) {
            console.info(this.name + '已经死了.');
            return;
        }

        this.blood += bloodNumber;
        if (this.blood <= 0) {
            console.info(this.name + '死了_(:з」∠)_');
        }
    },
    robSeat: function() {
        this.targetSeat.setOwner(this);
    },
    canStand: function(place) {
        return place === this.world.grass || place === this.name;
    },
    walkInWorld: function() {

        var x = Util.getRandomInt(0, this.world.width - 1);
        var y = Util.getRandomInt(0, this.world.height - 1);
        var place = this.world.ground[x][y];
        var counter = 0;
        while (!this.canStand(place)) {
            counter++;
            if (counter > 1000) {
                console.info('dead loop');
                console.info(x + ', ' + y + ':' + place);
                console.info(this.name + ':' + this.x + ', ' + this.y);
            }
            x = Util.getRandomInt(0, this.world.width - 1);
            y = Util.getRandomInt(0, this.world.height - 1);
            place = this.world.ground[x][y];
        }
        this.scan();
        this.world.reset(this.x, this.y);
        this.world.setPerson(x, y, this);
        this.setPosition(x, y);
    },
    setPosition: BaseBehavior.setPosition,
    move: function(direction) {

        if (isNaN(this.stepCount)) {
            this.stepCount = 1;
        }

        if (this.stepCount !== this.moveInterval) {
            this.stepCount++;
            return false;
        }
        var newX = this.x
        var newY = this.y;
        switch (direction.toLowerCase()) {
            case 'up':
                newY = this.y - 1;
                break;
            case 'down':
                newY = this.y + 1;
                break;
            case 'left':
                newX = this.x - 1;
                break;
            case 'right':
                newX = this.x + 1;
                break;
            default:
                console.warn('Invalid direction:' + direction);
                return false;
        }
        if (!Util.isInWorld(newX, newY)) {
            console.info('Not in world');
            return false;
        }
        if (this.world.ground[newX][newY] !== World.grass) {
            return false;
        }
        this.x = newX;
        this.y = newY;
        this.stepCount = 1;
        return true;
    },
    scan: function() {
        var enemies = [];
        for (var i = 0; i < this.world.width; i++) {
            for (var j = 0; j < this.world.height; j++) {
                this.detectEnemy(i, j, enemies);
            }
        }
        var me = this;
        enemies.forEach(function(enemy, key) {
            me.attack(enemy);
        });
        return enemies;
    },
    isEnemy: function(name) {
        return name !== this.world.grass && name !== this.name && name !== this.world.stone && name !== this.world.wall;
    },
    detectEnemy: function(x, y, enemies) {
        var enemyName = this.world.ground[x][y];
        if (this.isEnemy(enemyName)) {
            if (x === this.x || y === this.y) {
                var selfX = this.x;
                var selfY = this.y;
                if (!this.world.stoneBetweenPersons(x, y, this.x, this.y)) {
                    console.info(this.name + '在(' + x + ', ' + y + ')发现敌人' + enemyName);
                    enemies.push(this.world.personRecord[x][y]);
                } else {
                    console.info(this.name + '探查中,由于' + enemyName + '被石头挡住,没被发现...');
                }

            } else if (Math.abs(x - this.x) === 1 || Math.abs(y - this.y) === 1) {
                console.info(this.name + '感觉附近有动静,但是没发现敌人,蛋疼菊紧...');
            }

        }
    },
    addAttackSkill: function(skill) {
        this.attackSkills.push(skill);
    },
    attack: function(enemy) {
        this.attackSkills[0].attack(this, enemy);
    },
    draw: function() {
        if (this.isRemoved) {
            return;
        };
        var circleX = (this.x + 0.5) * Config.brickWidth;
        var circleY = (this.y + 0.5) * Config.brickWidth;
        var circleRadias = Config.brickWidth / 2;
        var pen = window.pen;
        pen.beginPath();
        pen.arc(circleX, circleY, circleRadias, 0, Math.PI * 2, false);
        pen.closePath();
        pen.fillStyle = '#000000';
        pen.fill();

        var textX = this.x * Config.brickWidth + 5;
        var textY = (this.y + 1) * Config.brickWidth - 10;
        pen.fillStyle = '#ffffff';
        pen.font = "italic 25px sans-serif";

        pen.fillText(this.name[0], textX, textY);
    },
    act: BaseBehavior.act,
    moveInPath: BaseBehavior.moveInPath


};
