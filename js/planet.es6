
class Planet {
    constructor(opt) {
        this.spin = opt.spin || 0;
        this.position = opt.position || 0;
        this.name = opt.name || 'unknown';
        this.spinSpeed = 0.08;
        this.radius = opt.radius || 40;
        this.distance = opt.distance;

        this.size = {};
        this.size.x = this.size.y = this.radius * 2;
    }

    draw() {
        var planetPosition = this.getPosition();

        ctx.save();

        ctx.translate(planetPosition.x, planetPosition.y);

        ctx.rotate(this.spin);

        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);

        ctx.lineWidth = 1;
        ctx.strokeStyle = '#0F0';
        ctx.stroke();

        ctx.rotate(-system.spin);

        ctx.fillStyle = '#0F0';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.name, 0, 0);

        ctx.restore();
    }

    getPosition() {
        var sin = Math.sin(this.position);
        var cos = Math.cos(this.position);

        return {
            x: this.distance * cos,
            y: this.distance * sin
        };
    }

    getPlayerPosition(player) {
        var planetPosition = this.getPosition();

        var playerPositionOnPlanet =
            calcPlanetPosition(this.radius + player.size.y / 2, player.landingSpin + this.spin);

        return {
            x: planetPosition.x + playerPositionOnPlanet.x,
            y: planetPosition.y + playerPositionOnPlanet.y
        };
    }
}
