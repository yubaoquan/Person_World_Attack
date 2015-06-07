function Bullet(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction.toLowerCase();
}

Bullet.prototype = {
    direction: 'u',
    setPosition: BaseBehavior.setPosition,
    act: BaseBehavior.act,
    move: function() {
    	BaseBehavior.move.call(this, this.direction);
    },
    draw: function() {
        var drawX, drawY, drawW, drawH, circleX, circleY;
        var baseX = this.x * Config.brickWidth;
        var baseY = this.y * Config.brickWidth;
        var radius = Config.bulletHeight / 2;
        var startAngle;
        switch (this.direction) {
            case 'left':
                drawX = baseX + (Config.brickWidth - Config.bulletWidth) / 2;
                drawY = baseY + (Config.brickWidth - Config.bulletHeight) / 2;
                drawW = Config.bulletWidth;
                drawH = Config.bulletHeight;

                circleX = drawX;
                circleY = baseY + Config.brickWidth / 2;
                startAngle = Math.PI / 2;
                break;

            case 'right':
                drawX = baseX + (Config.brickWidth - Config.bulletWidth) / 2;
                drawY = baseY + (Config.brickWidth - Config.bulletHeight) / 2;
                drawW = Config.bulletWidth;
                drawH = Config.bulletHeight;

                circleX = drawX + Config.bulletWidth;
                circleY = baseY + Config.brickWidth / 2;
                startAngle = -Math.PI / 2;
                break;

            case 'up':
                drawX = baseX + (Config.brickWidth - Config.bulletHeight) / 2;
                drawY = baseY + (Config.brickWidth - Config.bulletWidth) / 2;
                drawW = Config.bulletHeight;
                drawH = Config.bulletWidth;

                circleX = baseX + Config.brickWidth / 2;
                circleY = drawY;
                startAngle = -Math.PI;
                break;
            case 'down':
                drawX = baseX + (Config.brickWidth - Config.bulletHeight) / 2;
                drawY = baseY + (Config.brickWidth - Config.bulletWidth) / 2;
                drawW = Config.bulletHeight;
                drawH = Config.bulletWidth;

                circleX = baseX + Config.brickWidth / 2;
                circleY = drawY + Config.bulletWidth;
                startAngle = 0;
                break;


            default:
                console.warn('Illegal direction:' + this.direction);
        }

        var pen = window.pen;
        pen.fillStyle = '#000000';
        pen.stokeStyle = '#000000';

        pen.strokeRect(drawX, drawY, drawW, drawH);

        pen.beginPath();
        pen.arc(circleX, circleY, radius, startAngle, startAngle + Math.PI, false);
        pen.closePath();
        pen.stroke();
    }
}
