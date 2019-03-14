class SceneA extends BaseScene {
    constructor(){
      super('SceneA');
      this.tileDataKey = 'castle';
        this.tileDataSource = 'assets/level1.json';
        var button
    }

    preload() {
        super.preload();

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
        super.create();
        this.player = new Player(this, 200, 500);
        this.player.sprite.label = 'player'

        this.exit = this.matter.add.sprite(450, 45, 'exit');
        this.exit.setStatic(true);
        this.exit.label = 'exit';

        this.powerup = new Powerup(this, 450, 400);
        this.powerup.sprite.label = 'powerup';

    }

    update(time, delta) {
      super.update(time, delta);
    }

    makeBarrel() {
        let barrel = this.matter.add.image(400, 32, 'barrel', { restitution: 1, friction: 0.5, density: 0.01 });
        //barrel.setScale(1);
        barrel.setBody({
            type: 'circle',
            radius: 10
        });
    }

}
