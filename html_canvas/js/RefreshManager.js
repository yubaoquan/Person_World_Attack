function RefreshManager() {

}

RefreshManager.prototype = {
    thingsToDraw: [],
    infoPanel: document.querySelector('.status-content'),
    infoRows: 0,
    printInfo: function(info) {
        if (this.infoRows >= 50) {
        	this.infoPanel.innerHTML = '';
        	this.infoRows = 0;
        }
        this.infoPanel.innerHTML += new Date().toLocaleTimeString() + ':<br>';
        this.infoPanel.innerHTML += info + '<br>';
        this.infoPanel.scrollTop = this.infoPanel.scrollHeight;
        this.infoRows ++;
    },
    refresh: function() {
        this.printInfo('xxxxxx');
        
        window.pen.clearRect(0, 0, Config.canvasWidth, Config.canvasHeight);
        for (var i = 0, len = this.thingsToDraw.length; i < len; i++) {
            this.thingsToDraw[i].draw();
        }
    },
    add: function(thing) {
        this.thingsToDraw.push(thing);
        return this;
    }
};
