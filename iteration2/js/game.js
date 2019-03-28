var config = {
    type: Phaser.AUTO,
    width: 500,
    height: 700,
    pixelArt: false,
    

    physics: {
        default: 'matter',
        matter: {
            debug: true,
            gravity: {
                x: 0,
                y: 1.5
            }
        }
    },

    plugins: {
        scene: [{
            plugin: PhaserMatterCollisionPlugin,
            key: "matterCollision",
            mapping: "matterCollision"
        }]
    },
    scale: {
        mode: Phaser.Scale.ScaleModes.FIT,
        autoCenter: Phaser.Scale.Center.CENTER_VERTICALLY
    },
   
    scene: [MainMenu, SceneA, SceneB,SceneC, DeathScene]


};

var game = new Phaser.Game(config);
var playerLives = 1;