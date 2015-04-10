
var canvas = document.querySelector('#cnv');
var ctx = canvas.getContext('2d');

var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var SPACE_KEY = 32;

var system = {
    spin: -Math.PI / 2,
    r: 700
};

var player = new Player();

var planetNames = [
    'Start',
    'Earth',
    'Jupiter',
    'Plooton',
    'Mars'
];

var planets = [];

var PLANETS_COUNT = 20;

for (var i = 0; i < PLANETS_COUNT; ++i) {
    planets.push(new Planet({
        position: Math.PI * 2 * i / PLANETS_COUNT,
        name: planetNames[i],
        radius: 20 + Math.random() * 30,
        distance: system.r * (0.9 + Math.random() * 0.2)
    }));
}

player.landOnPlanet(planets[0]);

function render() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.save();

    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    ctx.scale(1.4, 1.4);
    ctx.translate(0, system.r * 1.1);

    ctx.rotate(system.spin);// - Math.PI * 0.15);

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
    planets.forEach(function(planet) {
        planet.spin += planet.spinSpeed;
    });

    if (!player.onPlanet) {
        player.tickFlight();
    }

    render();
}, 100);

document.addEventListener('keydown', function(e) {
    if (e.which === SPACE_KEY) {
        e.preventDefault();
    }
});

document.addEventListener('keyup', function(e) {
    if (e.which === SPACE_KEY) {
        e.preventDefault();

        if (player.onPlanet) {
            player.makeJump();
        }
    }
});
