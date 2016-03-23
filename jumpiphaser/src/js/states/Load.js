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
        game.load.image('sky', 'assets/sky.png');
        game.load.image('grass', 'assets/grass.png');
        game.load.image('bg', 'assets/background.png');
        game.load.image('mountains', 'assets/space.jpg');
        game.load.spritesheet('jumpi', 'assets/jumpiQuicando.png',30,40);
        game.load.spritesheet('platGrama', 'assets/PlataformaGrama.png', 50, 20);
    },
    create: function(){
        game.state.start('play');
    },
    update: function(){}


};