
function calcPlanetPosition(r, angle) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    return {
        x: r * cos,
        y: r * sin
    };
}
