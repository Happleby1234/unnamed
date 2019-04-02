class MainMenu extends BaseScene {
    constructor() {
        super('MainMenu');
    }
    preload() {
        this.load.image('background', 'assets/mainmenu.png');
    }
    create() {
        var background = this.add.image(game.config.width / 2, game.config.width / 1.4, 'background')
        var startButton = this.add.text(game.config.width / 1.5, game.config.height / 2, 'Fullscreen', { fontFamily: 'Arial', fontSize: '20px', backgroundColor: '#000', fill: '#FFF' });
        var startButton2 = this.add.text(game.config.width / 3, game.config.height / 2, 'Play Game', { fontFamily: 'Arial', fontSize: '20px', backgroundColor: '#000', fill: '#FFF' });
        startButton.setDepth(2);
        startButton.x -= startButton.width / 2;
        startButton.y -= startButton.height / 2;
        startButton.setInteractive();
        startButton.on('pointerdown', function () {
            if (this.scale.isFullscreen) {
                this.scale.stopFullscreen();
            }
            else {
                this.scale.startFullscreen();
            }
        }, this);
        startButton2.setDepth(2);
        startButton2.x -= startButton.width / 2;
        startButton2.y -= startButton.height / 2;
        startButton2.setInteractive();
        startButton2.on('pointerdown', function () {
            this.scene.start('SceneA');
        }, this);
    }
    update() {

    }
}