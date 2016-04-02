/**
 * Created by caio on 16/02/2016.
 */
module.exports = {

    preload: function () {

    },
    create: function () {
        levelInfo = game.cache.getJSON('level1');
        console.log(game.camera.height);
        game.camera.y = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.loadBGAndHUD();
        this.loadLevelJSON();

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
    update: function () {

        game.world.wrap(player, 32, false, true, false);
        if (player.body.velocity.y > 0) {
            game.physics.arcade.collide(player, platforms, this.zerarSpeedH);
        }
        if (player.body.y > game.world.height) {
            game.state.start('play');
        }

    },
    render: function () {
        //game.debug.text("Distance to pointer: " + game.physics.arcade.distanceToPointer(player), 32, 32);
        //game.debug.text("Angle to pointer: " + (game.physics.arcade.angleToPointer(player))*(180/Math.PI)* -1,32,64);
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

            player.body.velocity.y = (Math.sin(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2;
            player.body.velocity.x = (Math.cos(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2;
        }
    },
    zerarSpeedH: function () {
        player.body.velocity.x = 0;
    },
    loadBGAndHUD: function () {
        sky = game.add.sprite(0, 0, 'bg');
        sky.fixedToCamera = true;
        chao = game.add.sprite(0, 1860, 'chao');
        cortinaLeft = game.add.sprite(0, 0, 'cortina_left');
        cortinaLeft.fixedToCamera = true;
        cortinaRight = game.add.sprite(371, 0, 'cortina_right');
        cortinaRight.fixedToCamera = true;
        cortinaTop = game.add.sprite(0, 0, 'cortina_top');
        cortinaTop.fixedToCamera = true;
        hud = game.add.sprite(60, 89, 'hud1');
        hud.fixedToCamera = true;
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

    }

};

