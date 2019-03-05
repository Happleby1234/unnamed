class SceneB extends BaseScene {
    constructor(){
      super('SceneB');
      this.tileDataKey = 'castle2';
      this.tileDataSource = 'assets/level2castle.json';
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.keys = this.input.keyboard.addKeys({
            space: Phaser.Input.Keyboard.KeyCodes.SPACE
        });

    }

    update(time, delta) {
      super.update(time, delta)
    }
}
