(function() {

    var BaseBehavior = {
        move: function(direction) {
            switch (direction.toLowerCase()) {
                case 'up':
                    this.y--;
                    break;
                case 'down':
                    this.y++;
                    break;
                case 'left':
                    this.x--;
                    break;
                case 'right':
                    this.x++;
                    break;
                default:
                    console.warn('Invalid direction:' + direction);
                    return;
            }
            // this.draw();
        },
        setAttribute: function(attName, attribute) {
            this[attName.toString()] = attribute;
        },
        setPosition: function(x, y) {
            this.x = x;
            this.y = y;
        },
        act: function(callback, params) {
            if (params) {
                callback(params, this);
            } else {
                callback(this);
            }
        }
    };

    window.BaseBehavior = BaseBehavior;

}());
