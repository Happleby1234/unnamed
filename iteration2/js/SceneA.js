class SceneA extends BaseScene {
    constructor() {
        super('SceneA');
        this.tileDataKey = 'castle';
        this.tileDataSource = 'assets/level1.json';
        this.shader = 'Greyscale';

    }

    preload() {
        super.preload();
    }

    create() {
        super.create();
        this.player = new Player(this, 200, 500);
        this.player.sprite.label = 'player'

        this.powerup = new Powerup(this, 450, 400);
        this.powerupcollide();


        this.pipeTick = 0.0;

        this.pipeline = this.game.renderer.addPipeline(this.shader, new PulseRed(this.game));

        this.input.on('pointerdown', function () {
            this.player.sprite.setPipeline(this.shader);
            //this.cameras.main.setRenderToTexture(this.shader);
        }, this);

        this.exit = this.matter.add.sprite(450, 45, 'exit');
        this.exit.setStatic(true);
        this.exit.label = 'exit';
    }

    update(time, delta) {
        super.update(time, delta);

        this.pipeline.setFloat1('uTime', this.pipeTick); //A tickrate that increases by 0.01 per frame. Could also use update's own time parameter.
        this.pipeTick += 0.01;

    }

    makeBarrel() {
        let barrel = this.matter.add.image(400, 32, 'barrel', { restitution: 1, friction: 0.5, density: 0.01 });
        //barrel.setScale(1);
        barrel.setBody({
            type: 'circle',
            radius: 10
        });
        barrel.label = 'barrel'
    }

}
