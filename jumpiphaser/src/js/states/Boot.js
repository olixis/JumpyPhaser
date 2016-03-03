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

