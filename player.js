
function Player(opt) {
    this.size = {
        x: 20,
        y: 30
    };

    this.jumpPower = 10;

    this.state = 'onplanet';
    this.onPlanet = 0;
    this.landingSpin = 0;

    this.force = {
        x: 0,
        y: 0
    };

    this.position = {
        x: 0,
        y: 0
    };
}

Player.prototype.draw = function() {
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#0F0';

    if (this.state === 'onplanet' || this.state === 'jumping') {
        var planet = planets[this.onPlanet];

        var position = planet.getPlayerPosition(this);

        ctx.translate(position.position.x, position.position.y);

        ctx.rotate(position.direction);

        ctx.strokeRect(-15, -10, 30, 20);

    } else if (this.state === 'flying') {

        ctx.translate(this.position.x, this.position.y);

        ctx.rotate(Math.atan(player.force.y / player.force.x));

        ctx.strokeRect(-15, -10, 30, 20);

    }
};

Player.prototype.checkCollision = function(planets) {
    var that = this;
    var ii;

    if (planets.some(function(planet, i) {
        if (i !== that.onPlanet) {
            ii = i;
            var pl = {
                position: planet.calcPosition(),
                size: planet.size
            };

            return checkCollision(that, pl);
        }
    })) {
        return ii;
    }
};


function checkCollision(one, two) {
    if (one === two) {
        return false;
    }

    var byX = checkCollisionByAxis('x', one, two);
    var byY = checkCollisionByAxis('y', one, two);

    return byX && byY;
}

function checkCollisionByAxis(axis, object1, object2) {

    var size1 = object1.size[axis];

    var size2 = object2.size[axis];

    var pos1 = object1.position[axis] - size1 / 2;
    var pos2 = object2.position[axis] - size2 / 2;

    var delta = pos2 - pos1;

    return (delta > 0 && delta < size1 || delta < 0 && -delta < size2);
}
