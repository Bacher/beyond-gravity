
var canvas = document.querySelector('#cnv');
var ctx = canvas.getContext('2d');

var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var SPACE_KEY = 32;

var system = {
    spin: 0,
    r: 140
};

var player = new Player();

var planets = [
    new Planet({
        spin: Math.PI / 2,
        position: 0,
        name: 'Start'
    }),
    new Planet({
        spin: 0,
        position: Math.PI * 2 * 1 / 6,
        name: 'Earth'
    }),
    new Planet({
        spin: 0,
        position: Math.PI * 2 * 2 / 6,
        name: 'Jupiter'
    }),
    new Planet({
        spin: 0,
        position: Math.PI * 2 * 3 / 6,
        name: 'Plooto'
    }),
    new Planet({
        spin: 0,
        position: Math.PI * 2 * 4 / 6,
        name: 'Mars'
    }),
    new Planet({
        spin: 0,
        position: Math.PI * 2 * 5 / 6
    })
];

function render() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.save();

    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    //ctx.translate(0, system.r * 1.4);
    ctx.rotate(system.spin);

    planets.forEach(function(planet) {
        ctx.save();
        planet.draw();
        ctx.restore();
    });

    ctx.save();
    player.draw();
    ctx.restore();

    ctx.restore();

}

setInterval(function() {
    planets.forEach(function(planet, i) {
        if (player.state !== 'jumping' || player.onPlanet !== i) {
            planet.spin += planet.spinSpeed;
        }
    });

    if (player.state === 'flying') {
        player.force.y += 0.5;

        player.position.x += player.force.x;
        player.position.y += player.force.y;

        var planetIndex;
        if ((planetIndex = player.checkCollision(planets))) {

            var planet = planets[planetIndex];
            player.state = 'onplanet';
            player.onPlanet = planetIndex;

            player.landingSpin = Math.atan(player.force.y / player.force.x) - planet.spin;

            console.log(player);
        }
    }

    render();
}, 100);

document.addEventListener('keydown', function(e) {
    if (e.which === SPACE_KEY) {
        e.preventDefault();

        player.state = 'jumping';
    }
});

document.addEventListener('keyup', function(e) {
    if (e.which === SPACE_KEY) {
        e.preventDefault();

        if (player.state === 'jumping') {
            var planet = planets[player.onPlanet];

            var pos = planet.getPlayerPosition(player);

            player.position.x = pos.position.x;
            player.position.y = pos.position.y;

            player.force.x = player.jumpPower * Math.cos(pos.direction);
            player.force.y = player.jumpPower * Math.sin(pos.direction);

            player.state = 'flying'
        }
    }
});
