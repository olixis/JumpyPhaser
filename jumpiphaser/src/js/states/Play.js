/**
 * Created by caio on 16/02/2016.
 */
module.exports = {
    plataforma: undefined,
    sky: null,
    mountains: null,
    preload: function () {

    },
    create: function () {
        //game.world.setBounds(0, 0, 450, 2000);
        console.log(game.camera.height);
        //game.camera.y = 2000;
        game.physics.startSystem(Phaser.Physics.ARCADE);
       this.sky =  game.add.sprite(0, 0, 'sky');
       this.mountains =  game.add.sprite(0, 0, 'mountains');
       this.sky.alpha = 0;
       this.mountains.alpha = 1;
        game.add.tween(this.sky).to( { alpha: 1 }, 3000, "Linear", true);
        game.add.tween(this.mountains).to( { alpha: 0 }, 3000, "Linear", true);
        platforms = game.add.group();
        platforms.enableBody = true;
        for (var i = 0; i < 20; i++) {
            //  Fazendo uma função que cria as plataformas iniciais  fazendo algumas para testar se essa forma de colidir está boa
            plataforma = platforms.create(game.rnd.integerInRange(0, 450), game.rnd.integerInRange(0, 800), 'platGrama');


        }
        plataforma = platforms.create(game.world.centerX, 600, 'platGrama');
        plataforma.anchor.setTo(0.5);
        plataforma.body.immovable = true;

        plataforma.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], true);
        plataforma.animations.play('idle', 10, true, false);


        player = game.add.sprite(game.world.centerX, game.world.centerY + 100, 'jumpi');
        //game.camera.follow(player);
        game.physics.arcade.enable(player);
        player.anchor.setTo(0.5);
        player.body.gravity.y = 700;

        game.globals.scoreText = game.add.text(16, 16, 'texto', {
            fontSize: '32px',
            fill: '#000'
        });

        cursors = game.input.keyboard.createCursorKeys();

    },
    update: function () {

        if (player.body.y > game.world.height) game.state.start('menu');

        //função que fará o boneco parar no centro da tela e transferirá a velocidade dele para as plataformas.

        if (player.body.y < game.world.centerY) {
            player.body.y = 400;
            platforms.forEach(function (item) {
                item.body.velocity.y = player.body.velocity.y * -1;
            });
            player.body.velocity.y = 0;
            player.body.gravity.y = 0;
        }


        if (game.globals.o) {
            game.globals.scoreText.text = 'player.body.y: ' + player.body.y + '\n' + 'game.world.centerY: ' + game.world.centerY + '\n' + 'o.z: ' + game.globals.o.z;
            player.body.velocity.x = game.globals.o.x * -50;
        }

        platforms.forEach(this.platformDrag);
        platforms.forEach(this.platformStop);
        platforms.forEach(this.destroyPlatforms);

        if (player.body.velocity.y > 0) {
            game.physics.arcade.collide(player, platforms, this.colisao);
        }


    },
    //Método da colisão entre o jumpinator e a plataforma
    colisao: function (player, plataforma) {
        player.body.velocity.y = -820;
    },
    //Método que simula o atrito da platadorma com o ar
    platformDrag: function (item) {
        if (item.body.velocity.y > 0) {
            item.body.velocity.y -= 12;
        }
        if (item.body.velocity.y < 0) item.body.velocity.y = 0;
    },
    //faz com que o jumpi recupere a gravidade quando as plataformas param e deixa elas immovable para evitar que elas desçam com o impacto
    platformStop: function (item) {
        if (item.body.velocity.y == 0) {
            item.body.immovable = true;
            player.body.gravity.y = 700;
        }
    },
    //função para jogar dentro do foreach de platforms para destruir a plataforma fora do jogo e criar outra
    destroyPlatforms: function (item) {
        if (item.body.y > game.world.height) {
            var newPlat = platforms.create(game.rnd.integerInRange(0, 450), 0, 'platGrama');
            newPlat.anchor.setTo(0.5);
            newPlat.body.velocity.y = item.body.velocity.y;
            item.destroy();
        }
    }
};

