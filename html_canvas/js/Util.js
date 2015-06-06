(function() {
    var util = {
        // 返回给定范围内的随机整数
        getRandomInt: function(min, max) {
            // console.info('min:' + min + ' max:' + max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        getAPicture: function(src) {
            var img = new Image();
            img.src = src;
            return img;
        }
    };

    Object.extend = function(des, source) {
        for (p in source) {
            des[p] = source[p];
        }
        return des;
    };

    Object.prototype.extend = function(object) {
        return Object.extend.apply(this, [this, object]);
    };
    Util = util;
}());
