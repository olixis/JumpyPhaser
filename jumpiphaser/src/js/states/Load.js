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