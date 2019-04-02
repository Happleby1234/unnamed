class DeathScene extends BaseScene {
    init(data) {
        this.previousScene = data.previousScene;
    }
    constructor() {
        super('DeathScene');
    }

    preload() {
        this.load.image('Death', 'assets/Death.png')
    }

    create() {
        var background = this.add.image(game.config.width / 2, game.config.width / 1.4, 'Death')
        var startButton = this.add.text(game.config.width / 2, game.config.height / 1.5, 'Click to Restart', { fontFamily: 'Arial', fontSize: '30px', backgroundColor: '#000000', fill: '#FFF' });
        startButton.setDepth(2);
        startButton.x -= leftButton.width / 2;
        startButton.y -= leftButton.height / 2;
        startButton.setInteractive();
        startButton.on('pointerdown', function () {
            playerLives = 1;
            this.scene.start(this.previousScene);
            
        }, this);
    }

    update(time, delta) {
    }
}