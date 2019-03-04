class BaseScene extends Phaser.Scene {
    constructor(id) {
        super(id);
        this.id = id;
        this.tileDataKey;
        this.tileDataSource;
    }
    preload() {
        this.load.tilemapTiledJSON(this.tileDataKey, this.tileDataSource);
    }
    create() {
        const map = this.make.tilemap({ key: this.tileDataKey });
        const tileset = map.addTilesetImage('castle_tileset_part1');
        const tileset2 = map.addTilesetImage('castle_tileset_part2');
        const tileset3 = map.addTilesetImage('castle_tileset_part3');
        this.background = map.createStaticLayer('landscape', tileset, 0, 0);
        this.background = map.createStaticLayer('decor2', tileset, 0, 0);
        this.foreground = map.createStaticLayer('decor', tileset, 0, 0);
        this.land = map.createStaticLayer('platforms', tileset, 0, 0);
        this.land.setCollisionByProperty({ collides: true });
    }
    update(time, delta) {
        super.update();

    }
}