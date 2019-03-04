class SceneA extends BaseScene {
    constructor(){
      super('level1');
      this.tileDataKey = 'level1';
      this.tileDataSource = 'assets/level1.json';
    }

    preload() {
        super.preload();
        this.load.image('walls', 'assets/castle_tileset_part1.png');
        this.load.image('walls2', 'assets/castle_tileset_part2.png');
        this.load.image('walls3', 'assets/castle_tileset_part3.png');
        this.load.spritesheet(
            'player',
            'assets/player1.png', {
                frameWidth: 32,
                frameHeight: 32,
                margin: 1,
                spacing: 2
            }
        );
    }

    create() {
      super.create();

    }

    update(time, delta) {
      super.update(time, delta);
    }
}
