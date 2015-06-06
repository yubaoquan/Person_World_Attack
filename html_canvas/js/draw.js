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
        var deng = new Person('邓xx', 18, '敲代码');
        var han = new Person('韩xx', 19, '吹牛逼');

        var bulletL = new Bullet(Config.worldWidth - 1, 0, 'left');
        var bulletR = new Bullet(Config.worldWidth - 1, 1, 'right');
        var bulletU = new Bullet(Config.worldWidth - 1, 2, 'up');
        var bulletD = new Bullet(Config.worldWidth - 1, 3, 'down');
        

        han.setPosition(10, 0);

        deng.setAttribute('moveInterval', 2);
        han.setAttribute('moveInterval', 1);
        bulletL.setAttribute('moveInterval', 0);

        refresher.add(world);
        refresher.add(deng).add(han);
        refresher.add(bulletL).add(bulletR).add(bulletU).add(bulletD);


        var handle = setInterval(function() {
            
            deng.act(walkAround);
            han.act(walkAround);
            bulletL.move();
            refresher.refresh();
            if (window.stop === true) {
                clearInterval(handle);
            }
        }, Config.refreshInterval);
        
    }

    function walkAround(person) {
        if (isNaN(person.stepCount)) {
            person.stepCount = 1;
        }

        if (person.stepCount !== person.moveInterval) {
            person.stepCount ++;
            return;
        }

        if (isNaN(person.step) || person.step >= 8) {
            person.step = 0;
        }

        switch (person.step) {
            case 0:
            case 1:
                person.move('right');
                break;
            case 2:
            case 3:
                person.move('down');
                break;
            case 4:
            case 5:
                person.move('left');
                break;
            case 6:
            case 7:
                person.move('up');
                break;
            default:
                console.warn("Illegal param:" + m);
        }
        person.step ++;
        person.stepCount = 1;
    }

    window.onload = draw;
}());
