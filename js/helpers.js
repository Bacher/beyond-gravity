
function calcPlanetPosition(r, angle) {
    var sin = Math.sin(angle);
    var cos = Math.cos(angle);

    return {
        x: r * cos,
        y: r * sin
    };
}

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

function checkCollisionWithCircle(point1, radius1, point2, radius2) {
    var dx = point1.x - point2.x;
    var dy = point1.y - point2.y;
    var dist = radius1 + radius2;

    return dx * dx + dy * dy < dist * dist;
}
