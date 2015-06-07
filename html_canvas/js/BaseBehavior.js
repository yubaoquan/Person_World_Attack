(function() {

    var BaseBehavior = {
        move: function(direction) {

            if (isNaN(this.stepCount)) {
                this.stepCount = 1;
            }

            if (this.stepCount !== this.moveInterval) {
                this.stepCount++;
                return false;
            }
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
                    return false;
            }
            this.stepCount = 1;
            return true;
        },
        setPosition: function(x, y) {
            this.x = x;
            this.y = y;
        },
        act: function(callback, params) {
        	if (this.isRemoved) {
        		return;
        	}
            if (params) {
                callback(params, this);
            } else {
                callback(this);
            }
        },
        moveInPath: function() {
        	if (this.isRemoved) {
        		return;
        	}
        	if (isNaN(this.pathIndex) || this.pathIndex === this.path.length) {
        		this.pathIndex = 0;
        	}
        	if (this.move(this.path[this.pathIndex])) {
        		this.pathIndex ++;
        	}
        }
    };

    window.BaseBehavior = BaseBehavior;

}());
