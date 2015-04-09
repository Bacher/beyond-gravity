
var canvas = document.querySelector('#cnv');
var ctx = canvas.getContext('2d');

var CANVAS_WIDTH = 600;
var CANVAS_HEIGHT = 400;

var system = {
    spin: 0,
    r: 200
};

var player = {
    state: 'onplanet',
    onPlanet: 0,
    landingSpin: 0,
    force: {
        x: 0,
        y: 0
    },
    position: {
        x: 0,
        y: 0
    }
};

var planets = [
    {
        spin: Math.PI / 2,
        position: 0,
        radius: 40,
        name: 'Start'
    },
    {
        spin: 0,
        position: Math.PI * 2 * 1 / 6,
        radius: 40,
        name: 'Earth'
    },
    {
        spin: 0,
        position: Math.PI * 2 * 2 / 6,
        radius: 40,
        name: 'Jupiter'
    },
    {
        spin: 0,
        position: Math.PI * 2 * 3 / 6,
        radius: 40,
        name: 'Plooto'
    },
    {
        spin: 0,
        position: Math.PI * 2 * 4 / 6,
        radius: 40,
        name: 'Mars'
    },
    {
        spin: 0,
        position: Math.PI * 2 * 5 / 6,
        radius: 40
    }
];

function render() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    ctx.save();

    ctx.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#0F0';

    ctx.fillStyle = '#0F0';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    //ctx.translate(0, system.r * 1.4);

    ctx.rotate(system.spin);

    planets.forEach(function(planet) {

        var planetPosition = calcPlanetPosition(system.r, planet.position);

        ctx.save();

        ctx.translate(planetPosition.x, planetPosition.y);

        ctx.rotate(planet.spin);

        ctx.beginPath();
        ctx.arc(0, 0, planet.radius, 0, Math.PI * 2, false);
        ctx.stroke();

        ctx.rotate(-system.spin);
        ctx.fillText(planet.name || 'unknown', 0, 0);

        ctx.restore();

    });

    if (player.state === 'onplanet') {
        ctx.save();
        var playerPlanet = planets[player.onPlanet];

        var planetPosition = calcPlanetPosition(system.r, playerPlanet.position);

        ctx.translate(planetPosition.x, planetPosition.y);
        ctx.rotate(playerPlanet.spin + player.landingSpin);

        ctx.translate(0, -playerPlanet.radius);

        ctx.strokeRect(-10, -30, 20, 30);

        ctx.restore();
    } else if (player.state === 'flying') {

        ctx.save();

        ctx.translate(player.position.x, player.position.y);

        ctx.strokeRect(-10, -15, 20, 30);

        ctx.restore();
    }

    ctx.restore();

}

setInterval(function() {
    planets.forEach(function(planet) {
        planet.spin += 0.02;
    });

    if (player.state === 'flying') {
        player.force.y += 0.5;

        player.position.x += player.force.x;
        player.position.y += player.force.y;
    }

    render();
}, 100);

document.addEventListener('keydown', function(e) {
    if (e.which === 32) {
        e.preventDefault();

        var planet = planets[player.onPlanet];

        player.force.x = 11 * Math.sin(planet.spin);
        player.force.y = - 11 * Math.cos(planet.spin);

        //player.position.x;
        //player.position.y;

        player.state = 'flying'

    }
});
