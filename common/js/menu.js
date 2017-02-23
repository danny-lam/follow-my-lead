var bg;
var title_txt;
var start_btn;
var gameX;
var gameY;
var gameW;
var gameH;

var style = {
    font: "60px Arial",
    fill: "#ffffff",
    wordWrap: true,
    wordWrapWidth: 1000,
    align: "center",
    fontWeight: "bold"
}

var menu = {
    
    create: function() {
        
        gameX = game.world.centerX;
        gameY = game.world.centerY;
        gameW = game.world.width;
        gameH = game.world.height;
        
        bg = game.add.image(0, 0, 'background');
        title_txt = game.add.text(gameX, (gameY/4), 'Follow my Lead', style);
        title_txt.anchor.set(0.5);
        start_btn = game.add.button(gameX, gameY, 'button', startGame);
        start_btn.anchor.set(0.5);
    }
    
}

function startGame() {
    
    game.state.start('Play');
    
}