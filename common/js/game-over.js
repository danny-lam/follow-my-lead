var restart_txt;
var restart_btn;

var gameOver = {
    
    create: function() {
        
        bg = game.add.image(0, 0, 'background');
        restart_txt = game.add.text(gameX, (gameY/4), 'Game Over', style);
        restart_txt.anchor.set(0.5);
        restart_btn = game.add.button(gameX, gameY, 'button', restartGame);
        restart_btn.anchor.set(0.5);
        restart_btn.events.onInputDown.add(onInputDown, this);
    }
    
}

function restartGame() {
    
    game.state.start('Menu');
    
}