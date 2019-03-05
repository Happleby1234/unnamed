class BaseScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.tileDataKey;
        this.tileDataSource;
    }
    preload() {
        this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
        this.load.image('exit', 'assets/donkeybrad.png');
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
        this.player = new Player(this, 200, 128);
        this.player.sprite.label = 'player'

        this.exit = this.matter.add.sprite(450, 45, 'exit');
        this.exit.setStatic(true);
        this.exit.label = 'exit';

        this.cameras.main.setBounds(0, 0, map.widthInpixels, map.heightInPixels);
        this.matter.world.setBounds(0, 0, map.widthInpixels, map.heightInPixels);
        this.cameras.main.startFollow(this.player.sprite, false, 0.5, 0.5);
        this.matter.world.on('collisionstart', this.handleCollision, this);
        this.matter.world.on('collisionactive', this.handleCollision, this);

    }
    update(time, delta) {
        if (Phaser.Input.Keyboard.JustDown(this.keys.space)) {
            console.log('hi')
            switch (this.id) {
                case 'sceneA':
                    this.scene.switch('sceneB');
                    break;
                case 'sceneB':
                    this.scene.switch('sceneA');
                    break;
            }
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
            case 'sceneA':
                this.scene.start('sceneB');
                break
            case 'sceneB':
                this.scene.start('sceneA');
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
}