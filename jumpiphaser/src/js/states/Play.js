/**
 * Created by caio on 16/02/2016.
 */
module.exports = {
    plataforma: undefined,
    preload: function () {

    },
    create: function () {
        game.world.setBounds(0, 0, 450, 2000);
        console.log(game.camera.height);
        game.camera.y = 0;
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.sky = game.add.sprite(0, 1200, 'bg');
        platforms = game.add.group();
        platforms.enableBody = true;
        //chaoInicial = game.add.group();
        //chaoInicial.enableBody = true;

        plataforma = platforms.create(game.world.centerX, 1800, 'platGrama');
        plataforma.anchor.setTo(0.5);
        plataforma.body.immovable = true;
        plataforma2 = platforms.create(game.world.centerX, 1500, 'platGrama');
        plataforma2.anchor.setTo(0.5);
        plataforma2.body.immovable = true;


        //initialGround = chaoInicial.create(0,1200,'grass');
        //initialGround.body.immovable = true;


        player = game.add.sprite(game.world.centerX, 1700, 'jumpi');
        game.camera.follow(player);
        game.physics.arcade.enable(player);
        player.anchor.setTo(0.5);
        player.body.gravity.y = 700;


        cursors = game.input.keyboard.createCursorKeys();
        player.inputEnabled = true;

        player.events.onInputDown.add(this.onDown,this);
        player.events.onInputUp.add(this.onUp,this);

    },
    update: function () {

        game.world.wrap(player,32,false,true,false);
        if (player.body.velocity.y > 0) {
            game.physics.arcade.collide(player, platforms, this.zerarSpeedH);
        }
        if (player.body.y > game.world.height) {
            game.state.start('play');
        }

    },
    render: function () {
        game.debug.text("Distance to pointer: " + game.physics.arcade.distanceToPointer(player), 32, 32);
        game.debug.text("Angle to pointer: " + (game.physics.arcade.angleToPointer(player))*(180/Math.PI)* -1,32,64);
    },
    onDown: function(){
        console.log("apertado");

    },
    onUp: function(){
        if(player.body.velocity.x == 0){
        console.log("ângulo:"+ game.physics.arcade.angleToPointer(player)* (180/Math.PI)*-1);
        console.log("Seno:" + (Math.sin(game.physics.arcade.angleToPointer(player))));
        console.log("Cosseno:" + (Math.cos(game.physics.arcade.angleToPointer(player))));
        console.log("Força vertical:" + (Math.sin(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2);
        console.log("Força horizontal:" + (Math.cos(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2);

        player.body.velocity.y =  (Math.sin(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2;
        player.body.velocity.x =  (Math.cos(game.physics.arcade.angleToPointer(player))) * game.physics.arcade.distanceToPointer(player) * 2;
        }
    },
    zerarSpeedH: function(){
        player.body.velocity.x = 0;
    }
};

