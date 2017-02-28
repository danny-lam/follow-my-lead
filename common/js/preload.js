var loadingStyle = {
    font: "60px Arial",
    fill: "#ffffff",
    wordWrap: true,
    wordWrapWidth: 1000,
    align: "center",
    fontWeight: "bold"
}
var imgArray = [];

var preload = {
    
    preload: function() {
        
        game.load.image("background", "common/img/bg.png");
        game.load.image("circle", "common/img/circle.png");
        game.load.image("cross", "common/img/cross.png");
        game.load.image("triangle", "common/img/triangle.png");
        game.load.image("square", "common/img/square.png");
        game.load.image("menu", "common/img/menu-icon.png");
        game.load.image("button", "common/img/main-button.png");
        
        imgArray = ["square", "triangle", "cross", "circle"];
        
        game.load.audio('bleep1', 'common/snd/sound1.wav');
        game.load.audio('bleep2', 'common/snd/sound2.wav');
        game.load.audio('bleep3', 'common/snd/sound3.wav');
        game.load.audio('bleep4', 'common/snd/sound4.wav');
        
        var loading_txt = game.add.text(game.world.centerX, game.world.centerY, 'loading...', loadingStyle);
        loading_txt.anchor.set(0.5);
        
    },
    
    create: function() {
        
       game.state.start('Menu');
        
    }
    
}