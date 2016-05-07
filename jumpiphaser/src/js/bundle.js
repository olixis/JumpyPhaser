(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

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
game.state.add('load',require('./states/Load.js'));
game.state.add('menu',require('./states/Menu.js'));
game.state.add('play',require('./states/Play.js'));

game.state.start('boot');


},{"./states/Boot.js":2,"./states/Load.js":3,"./states/Menu.js":4,"./states/Play.js":5}],2:[function(require,module,exports){
module.exports = {
    init: function(){
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.pageAlignVertically = true;
        //game.scale.pageAlignHorizontally = true;
    },
    preload: function(){
        game.load.image('loading', 'assets/loading.png');
        game.load.image('load_progress_bar', 'assets/progress_bar_bg.png');
        game.load.image('load_progress_bar_dark', 'assets/progress_bar_fg.png');},
    create: function(){
        game.state.start('load');
    },
    update: function(){}
};


},{}],3:[function(require,module,exports){
/**
 * Created by caio on 16/02/2016.
 */
module.exports = {
    loadingLabel: function(){
        this.loading = game.add.sprite(game.world.centerX, game.world.centerY - 20, 'loading');
        this.loading.anchor.setTo(0.5, 0.5);
        this.barBg = game.add.sprite(game.world.centerX, game.world.centerY + 40, 'load_progress_bar');
        this.barBg.anchor.setTo(0.5, 0.5);
        this.bar = game.add.sprite(game.world.centerX - 192, game.world.centerY + 40, 'load_progress_bar_dark');
        this.bar.anchor.setTo(0, 0.5);
        game.load.setPreloadSprite(this.bar);
    },
    preload: function(){
        this.loadingLabel();
        game.load.image('bg', 'assets/background.png');
        game.load.image('plataforma', 'assets/plataforma.png');
        game.load.image('chao', 'assets/chao.png');
        game.load.image('cortina_left', 'assets/cortina_left.png');
        game.load.image('cortina_top', 'assets/cortina_top.png');
        game.load.image('cortina_right', 'assets/cortina_right.png');
        game.load.image('hud1', 'assets/hud1.png');
        game.load.spritesheet('jumpi', 'assets/ErosStand.png',76,81);
        game.load.json('level1', 'assets/levels/level1.json');
    },
    create: function(){
        game.state.start('play');
    },
    update: function(){}


};
},{}],4:[function(require,module,exports){
/**
 * Created by caio on 16/02/2016.
 */
module.exports = {
    preload: function(){


    },
    create: function(){},
    update: function(){}


};
},{}],5:[function(require,module,exports){
/**
 * Created by caio on 16/02/2016.
 */
module.exports = {

    preload: function () {

    },
    create: function () {
        lastPlatform = {};
        levelInfo = game.cache.getJSON('level1');
        console.log(game.camera.height);
        game.camera.y = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.loadBG();
        this.loadLevelJSON();
        this.loadHUD();
        this.loadPlayer();
    },
    update: function () {

    this.updateCycle();


    },
    onDown: function () {
        console.log("apertado");

    },
    onUp: function () {

        if (player.body.velocity.x == 0) {
            console.log("ângulo:" + game.physics.arcade.angleToPointer(player) * (180 / Math.PI) * -1);
            console.log("Seno:" + (Math.sin(game.physics.arcade.angleToPointer(player))));
            console.log("Cosseno:" + (Math.cos(game.physics.arcade.angleToPointer(player))));
            console.log("Força vertical:" + (Math.sin(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2);
            console.log("Força horizontal:" + (Math.cos(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2);
            console.log(player.x+" "+player.y);

            player.body.velocity.y = (Math.sin(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2;
            player.body.velocity.x = (Math.cos(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2;
            cortinaLeft.fixedToCamera = false;
            cortinaRight.fixedToCamera = false;
            cortinaLeft.y = 1200;
            cortinaRight.y = 1200;
            game.add.tween(cortinaLeft).to( {x: -100 }, 300, Phaser.Easing.Linear.None, true);
            game.add.tween(cortinaRight).to( {x: 550 }, 300, Phaser.Easing.Linear.None, true);
            game.add.tween(cortinaRight).to( {x: 550 }, 300, Phaser.Easing.Linear.None, true);
            var vanish = game.add.tween(lastPlatform).to( { alpha: 0 }, 500, "Linear", true);
            vanish.onComplete.add(function(){lastPlatform.destroy();},this);

        }
    },
    zerarSpeedH: function (player,platform) {
        player.body.velocity.x = 0;
        lastPlatform = platform;
    },
    loadBG: function () {
        sky = game.add.sprite(0, 0, 'bg');
        sky.fixedToCamera = true;
        chao = game.add.sprite(0, 1860, 'chao');

    },
    loadLevelJSON: function () {
        game.world.setBounds(0, 0, 450, levelInfo.height);
        platforms = game.add.group();
        platforms.enableBody = true;
        for(var i = 0; i<levelInfo.plataformas.length;i++){
            var plataforma = platforms.create(levelInfo.plataformas[i].posX, levelInfo.plataformas[i].posY, levelInfo.plataformas[i].platType);
                plataforma.anchor.setTo(0.5);
                plataforma.body.immovable = true;
        }

    },
    loadHUD: function () {
        cortinaLeft = game.add.sprite(0, 0, 'cortina_left');
        cortinaLeft.fixedToCamera = true;
        cortinaRight = game.add.sprite(371, 0, 'cortina_right');
        cortinaRight.fixedToCamera = true;
        cortinaTop = game.add.sprite(0, 0, 'cortina_top');
        cortinaTop.fixedToCamera = true;
        hud = game.add.sprite(60, 89, 'hud1');
        hud.fixedToCamera = true;
    },
    loadPlayer: function () {
        player = game.add.sprite(game.world.centerX, 1700, 'jumpi');
        game.camera.follow(player);
        game.physics.arcade.enable(player);
        player.anchor.setTo(0.5);
        player.body.gravity.y = 700;
        cursors = game.input.keyboard.createCursorKeys();
        player.inputEnabled = true;
        player.events.onInputDown.add(this.onDown, this);
        player.events.onInputUp.add(this.onUp, this);
    },
    updateCycle: function(){
        game.world.wrap(player, 32, false, true, false);
        if (player.body.velocity.y > 0) {
            game.physics.arcade.collide(player, platforms, this.zerarSpeedH);
        }
        if (player.body.y > game.world.height) {
            game.state.start('play');
        }
    }

};


},{}]},{},[1]);
