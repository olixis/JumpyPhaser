
window.game = new Phaser.Game(450, 800, Phaser.AUTO, 'game');
gyro.frequency = 50;


game.globals = {
score: 0,
scoreText: undefined,
player: undefined,
stars: undefined,
platforms: undefined,
o: undefined
};

gyro.startTracking(function (o) {
    game.globals.o = o;
});

game.forceSingleUpdate = true;

game.state.add('boot',require('./states/Boot.js'));


game.state.start('boot');
