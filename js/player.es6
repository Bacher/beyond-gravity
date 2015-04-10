
class Player {
    constructor() {
        this.size = {
            x: 20,
            y: 30
        };

        this.jumpPower = 16;

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

    draw() {
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#0F0';

        var position = this.getPosition();

        ctx.translate(position.x, position.y);
        ctx.rotate(this.getSpin());

        ctx.strokeRect(-15, -10, 30, 20);
    }

    getPosition() {
        if (this.onPlanet) {
            return this.onPlanet.getPlayerPosition(this);
        } else {
            return this.position;
        }
    }

    getSpin() {
        if (this.onPlanet) {
            return this.landingSpin + this.onPlanet.spin;
        } else {
            return Math.atan(this.force.y / this.force.x);
        }
    }

    landOnPlanet(planet) {
        this.onPlanet = planet;

        var planetPosition = planet.getPosition();

        var dx = planetPosition.x - this.position.x;
        var dy = planetPosition.y - this.position.y;

        this.landingSpin = Math.atan(dy / dx) + (dx > 0 ? Math.PI : 0) - planet.spin;
    }

    checkCollision(planets) {
        return _.find(planets, planet => {
            if (planet !== this.onPlanet) {
                var planetPosition = planet.getPosition();

                var pl = {
                    position: planetPosition,
                    size: planet.size
                };

                if (checkCollision(this, pl)) {
                    if (checkCollisionWithCircle(this.position, 20, planetPosition, planet.radius)) {
                        return planet;
                    }
                }
            }
        });
    }

    makeJump() {
        var pos = this.getPosition();

        this.position.x = pos.x;
        this.position.y = pos.y;

        var spin = this.getSpin();

        this.onPlanet = null;

        this.force.x = this.jumpPower * Math.cos(spin);
        this.force.y = this.jumpPower * Math.sin(spin);
    }

    tickFlight() {
        this.force.x += Math.sin(system.spin);
        this.force.y += Math.cos(system.spin);

        this.position.x += this.force.x;
        this.position.y += this.force.y;

        var sum = 0;
        if (this.position.x < 0) {
            sum = Math.PI;
        }

        system.spin = -Math.PI / 2 - Math.atan(this.position.y / this.position.x) + sum;

        var planet = this.checkCollision(planets);

        if (planet) {
            this.landOnPlanet(planet);
        }
    }
}
