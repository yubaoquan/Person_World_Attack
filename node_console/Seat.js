function Seat(owner) {
    this.owner = owner;
}

Seat.prototype = {
    showStatus: function() {
        console.info('Current owner is ' + this.owner.name);
    },
    setOwner : function(owner) {
        this.owner = owner;
    }
};


module.exports = Seat;
