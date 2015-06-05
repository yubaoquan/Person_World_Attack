var Person = require('./Person');
var Util = require('./Util');
var Seat = require('./Seat');
var World = require('./World');
var Shoot = require('./Skill');

var hantingyi = new Person('韩xx', 18, '吹牛逼');
var dengqinglin = new Person('邓xx', 19, '敲代码');
var zhangbin = new Person('张x', 20, '假摔');

var sofa = new Seat(null);

// hantingyi.setTargetSeat(sofa);
// dengqinglin.setTargetSeat(sofa);

function peronsAct() {
    var index = Util.getRandomInt(0, Person.persons.length - 1);
    Person.persons[index].action();
}

var world = new World(10, 10);


for (var i = 0, len = Person.persons.length; i < len; i++) {
	var person = Person.persons[i];
	console.info(person.toString());
	person.setAttribute('world', world);
	person.setAttribute('action', Person.prototype.walkInWorld);
	person.addAttackSkill(new Shoot(i));
}

function showPersonStatus() {
	for (var i = 0, len = Person.persons.length; i < len; i++) {
		var person = Person.persons[i];
		console.info(person.name + ':' + person.blood);
	}
	
}

setInterval(function () {
	peronsAct();
	world.show();
	showPersonStatus();
}, 800);
