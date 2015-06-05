(function() {
    function draw() {
        var c = document.getElementById("world");
        var wrapperDiv = c.parentNode;
       
        wrapperDiv.style.width = Config.canvasWidth + 'px';
        wrapperDiv.style.height = Config.canvasHeight + 'px';
        
        c.setAttribute('width', Config.canvasWidth);
        c.setAttribute('height', Config.canvasHeight);
       
        window.pen = c.getContext("2d");

        var refresher = new RefreshManager();
        var world = new World(Config.worldWidth, Config.worldHeight);
        var guy = new Person('邓xx', 18, '敲代码');

        refresher.add(world);
        refresher.add(guy);
        var step = 0;
       // Person.draw(guy);
        var handle = setInterval(function() {
            //Person.draw(guy);
            guy.move('right');
            guy.move('down');
            refresher.refresh();
            if (step !== 1) {
                step ++;
                // clearInterval(handle);
            } else {
                clearInterval(handle);
            }
        }, Config.refreshInterval);
        
    }

    window.onload = draw;
}());
