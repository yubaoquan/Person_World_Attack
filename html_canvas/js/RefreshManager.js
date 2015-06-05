function RefreshManager() {

}

RefreshManager.prototype = {
	thingsToDraw: [],
	refresh: function() {
		window.pen.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
		for (var i = 0, len = this.thingsToDraw.length; i < len; i ++) {
			// console.info(this.thingsToDraw[i]);
			this.thingsToDraw[i].draw();
		}
	},
	add: function(thing) {
		this.thingsToDraw.push(thing);
		return this;
	}
};