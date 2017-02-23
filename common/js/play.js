var play_txt;
var finish_btn;

var play = {
    
    create: function() {
        
        bg = game.add.image(0, 0, 'background');
        play_txt = game.add.text(gameX, (gameY/4), 'End this game', style);
        
        finish_btn = game.add.button(gameX, gameY, 'button', finishGame);
    }
    
}

function finishGame() {
    
    game.state.start('GameOver');
    
}