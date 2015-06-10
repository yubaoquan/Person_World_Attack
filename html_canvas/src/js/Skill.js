function Skill(lethality) {
    this.lethality = lethality;
}

Skill.prototype = {
    decreseBlood: function(person) {
        person.changeBlood(this.lethality * -1);
    },
    attack: function() {}
};

function Shoot(lethality) {
	this.lethality = lethality;
}

Shoot.prototype = (new Skill()).extend({
    attack: function(person, enemy) {
        console.info(person.name + '向' + enemy.name + '开了一枪,' + enemy.name + '流了' + this.lethality + '滴血');
        this.decreseBlood(enemy);
    }
});
