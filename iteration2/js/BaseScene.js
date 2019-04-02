class BaseScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.tileDataKey;
        this.tileDataSource;
        this.barrelCount = 0;
        this.barrelTime = 0;
        this.player;
        //Player.playerLives = 1;
    }
    preload() {
        this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
        this.load.image('castle_tileset_part1', 'assets/castle_tileset_part1.png');
        this.load.image('castle_tileset_part2', 'assets/castle_tileset_part2.png');
        this.load.image('castle_tileset_part3', 'assets/castle_tileset_part3.png');
        this.load.image('exit', 'assets/donkeybrad.png');
        this.load.image('barrel', 'assets/barrel.png');
        this.load.image('Powerup', 'assets/powerup.png');
        this.load.image('left', 'assets/left.png');
        this.load.image('right', 'assets/right.png');
        this.load.spritesheet(
            'player',
            'assets/player.png', {
                frameWidth: 14,
                frameHeight: 14,
                margin: 1,
                spacing: 2
            }
        );
    }
    create() {
        //load level
        const map = this.make.tilemap({ key: this.tileDataKey });
        const tileset = map.addTilesetImage('castle_tileset_part1');
        const tileset1 = map.addTilesetImage('castle_tileset_part2');
        const tileset2 = map.addTilesetImage('castle_tileset_part3');

        this.background = map.createStaticLayer('landscape', tileset, 0, 0);
        this.foreground = map.createStaticLayer('decor', tileset1, 0, 0);
        this.background = map.createStaticLayer('decor2', tileset2, 0, 0);

        this.land = map.createStaticLayer('platforms', tileset, 0, 0);
        this.land.setCollisionByProperty({ collides: true });

        const myLand = this.matter.world.convertTilemapLayer(this.land);
        this.createPlayerAnimations();

        lifeCounter = this.add.text(16, 10, 'Lives: ' + playerLives, { fontSize: '32px', fill: '#FFFFFF' }).setScrollFactor(0);

        this.cameras.main.setBounds(0, 0, map.widthInpixels, map.heightInPixels);
        this.matter.world.setBounds(0, 0, map.widthInpixels, map.heightInPixels);

        this.matter.world.on('collisionstart', this.handleCollision, this);
        this.matter.world.on('collisionactive', this.handleCollision, this);
        //console.log(this);


        var leftButton = this.add.image(game.config.width / 7, game.config.height / 1.3, 'left')
        leftButton.setDepth(2);
        leftButton.x -= leftButton.width / 1;
        leftButton.y -= leftButton.height / 1;
        leftButton.setInteractive();
        leftButton.on('pointerdown', this.playerMoveLeft,this)

        var rightButton = this.add.image(game.config.width / 4, game.config.height / 1.3, 'right')
        rightButton.setDepth(2);
        rightButton.x -= rightButton.width / 1;
        rightButton.y -= rightButton.height / 1;
        rightButton.setInteractive();
        rightButton.on('pointerdown', this.playerMoveRight, this)
    }
    update(time, delta) {

        if (this.barrelCount < 20 && this.barrelTime == 0) {
            this.makeBarrel();
            this.barrelCount++;
            this.barrelTime = time;
        } else if (time > this.barrelTime + 5000) {
            this.barrelTime = 0;
        }
        this.player.update();
    }

    playerMoveLeft() {
        this.player.moveLeft = true
    }
    playerMoveRight() {
        this.player.moveRight = true
    }

    handleCollision(event) {
        event.pairs.forEach(this.matchCollisionPair, this);

    }

    matchCollisionPair(pair) {
        const bodyA = pair.bodyA;
        const bodyB = pair.bodyB;
        let myPair = [null, null];
        if (bodyA.gameObject && bodyA.gameObject.label) {
            this.sortCollisionObjects(bodyA.gameObject.label, myPair);
        }
        if (bodyB.gameObject && bodyB.gameObject.label) {
            this.sortCollisionObjects(bodyB.gameObject.label, myPair);
        }
        if (myPair[0] == 'player' && myPair[1] == 'exit') {
            this.changeScene();
            //console.log('ouch')
        }
        if (myPair[0] == 'player' && myPair[2] == 'barrel') {
            this.track('Hit by barrel')
            this.player.sprite.setScale(2)
            this.killPlayer();
            this.restart();
        }

    }

    changeScene() {
        switch (this.id) {
            case 'MainMenu':
                this.scene.start('sceneA');
                break
            case 'SceneA':
                this.scene.start('SceneB');
                break
            case 'SceneB':
                this.scene.start('SceneC');
                break
            case 'SceneC':
                this.scene.start('SceneA');
                break
        }
    }

    sortCollisionObjects(label, arr) {
        switch (label) {
            case 'player':
                arr[0] = 'player';
                break
            case 'exit':
                arr[1] = 'exit';
                break
            case 'barrel':
                arr[2] = 'barrel';
                break
        }
    }

    createPlayerAnimations() {
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', { frames: [0, 3] }),
            frameRate: 6,
            repeat: 1
        }),
            this.anims.create({
                key: 'idle',
                frames: this.anims.generateFrameNumbers('player', { frames: [13, 15] }),
                frameRate: 2,
                repeat: -1
            }),
            this.anims.create({
                key: 'Jump',
                frames: this.anims.generateFrameNumbers('player', { frames: [8, 9] }),
                frameRate: 15,
                repeat: -1
            })
    }

    powerupcollide() {
        this.matterCollision.addOnCollideStart({
            objectA: this.player.sprite,
            objectB: this.powerup.sprite,
            callback: this.onSensorCollide,
            context: this
        });
    }

    onSensorCollide() {
        playerLives++;
        lifeCounter.setText('Lives: ' + playerLives);
    }
    killPlayer() {
        playerLives--;
        this.cameras.main.shake(200, 0.005);
        console.log('ouch')
        if (playerLives <= 0) {
            this.death();
        }
    }
    death() {
        this.track('death', 'playerLives', playerLives)
        this.scene.stop(this.id);
        this.scene.start('DeathScene', { previousScene: this.id });


    }
    restart() {
        this.scene.restart(this.id);
    }

    track(action, label, value) {
        var str = 'event tracking:action =' + action + 'label = ' + label + 'value=' + value;
        console.log(str)
        gtag('event', action, {
            'event_category': 'Donkey Dong',
            'event_label': label,
            'value': value
        });
    }
}