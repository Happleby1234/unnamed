var config = {
    type: Phaser.AUTO,
    width: 64*8,
    height: 64*12,
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
    
    scene: [SceneA]
};

var game = new Phaser.Game(config);