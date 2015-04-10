
function Planet(opt) {
    this.spin = opt.spin || 0;
    this.position = opt.position || 0;
    this.name = opt.name || 'unknown';
    this.spinSpeed = 0.08;
    this.radius = opt.radius || 40;

    this.size = {};
    this.size.x = this.size.y = this.radius * 2;
}

Planet.prototype.draw = function() {
    var planetPosition = calcPlanetPosition(system.r, this.position);

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
};

Planet.prototype.calcPosition = function() {
    return calcPlanetPosition(system.r, this.position);
};

Planet.prototype.getPlayerPosition = function(player) {
    var planetPosition = this.calcPosition();

    var playerPositionOnPlanet =
        calcPlanetPosition(this.radius + player.size.y / 2, player.landingSpin + this.spin);

    return {
        position: {
            x: planetPosition.x + playerPositionOnPlanet.x,
            y: planetPosition.y + playerPositionOnPlanet.y
        },
        direction: player.landingSpin + this.spin
    }
};
