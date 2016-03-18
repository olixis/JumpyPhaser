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


game.state.start('boot');

},{"./states/Boot.js":2}],2:[function(require,module,exports){
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


},{}]},{},[1]);
