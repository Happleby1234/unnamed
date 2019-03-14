class BaseScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.tileDataKey;
        this.tileDataSource;
        this.barrelCount = 0;
        this.barrelTime = 0;
    }
    preload() {
        this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
        this.load.image('castle_tileset_part1', 'assets/castle_tileset_part1.png');
        this.load.image('castle_tileset_part2', 'assets/castle_tileset_part2.png');
        this.load.image('castle_tileset_part3', 'assets/castle_tileset_part3.png');
        this.load.image('exit', 'assets/donkeybrad.png');
        this.load.image('barrel', 'assets/barrel.png');
        this.load.image('powerup', 'assets/powerup.png');
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


        this.cameras.main.setBounds(0, 0, map.widthInpixels, map.heightInPixels);
        this.matter.world.setBounds(0, 0, map.widthInpixels, map.heightInPixels);

        this.matter.world.on('collisionstart', this.handleCollision, this);
        this.matter.world.on('collisionactive', this.handleCollision, this);
        console.log(this);
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
    

}