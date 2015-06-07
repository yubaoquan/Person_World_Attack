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

        deng.world = world;
        han.world = world;
        var movePath = ['right', 'right', 'down', 'down', 'left', 'left', 'up', 'up'];
        deng.path = movePath;
        han.path = movePath;

        var bulletL = new Bullet(Config.worldWidth - 1, 0, 'left');
        var bulletR = new Bullet(Config.worldWidth - 1, 1, 'right');
        var bulletU = new Bullet(Config.worldWidth - 1, 2, 'up');
        var bulletD = new Bullet(Config.worldWidth - 1, 3, 'down');


        han.setPosition(10, 0);

        deng.moveInterval = 2;
        han.moveInterval = 1;
        bulletL.moveInterval = 1;
        bulletD.moveInterval = 3;

        refresher.add(world);
        refresher.add(deng).add(han);
        refresher.add(bulletL).add(bulletR).add(bulletU).add(bulletD);


        var handle = setInterval(function() {

            deng.moveInPath();
            han.moveInPath();
            bulletL.move();
            bulletD.move();
            refresher.refresh();
            if (window.option === true) {
                Util.remove(han);
            }
            if (window.stop === true) {
                clearInterval(handle);
            }
        }, Config.refreshInterval);

    }

    window.onload = draw;
}());
