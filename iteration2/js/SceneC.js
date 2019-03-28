class SceneC extends BaseScene {
    constructor() {
        super('SceneC');
        this.tileDataKey = 'castle3';
        this.tileDataSource = 'assets/level3.json';
    }

    preload() {
        super.preload();
    }

    create() {
        super.create();

        this.player = new Player(this, 90, 980);
        this.player.sprite.label = 'player'


        this.exit = this.matter.add.sprite(260, 50, 'exit');
        this.exit.setStatic(true);
        this.exit.label = 'exit';


        this.cameras.main.startFollow(this.player.sprite, false, 0.5);
       this.cameras.main.setBounds(0, 0, 500, 1030);

    }

    update(time, delta) {
        super.update(time, delta)
    }
    makeBarrel() {
        let barrel = this.matter.add.image(350, 90, 'barrel', { restitution: 1, friction: 0.5, density: 0.01 });
        //barrel.setScale(1);
        barrel.setBody({
            type: 'circle',
            radius: 10
        });
        barrel.label = 'barrel'
    }
}

