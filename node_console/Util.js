module.exports = (function() {
    var util = {};
    // 返回给定范围内的随机整数
    util.getRandomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return util;
}());
