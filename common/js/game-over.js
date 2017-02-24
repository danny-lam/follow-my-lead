var restart_txt;
var restart_btn;

var gameOver = {
    
    create: function() {
        
        bg = game.add.image(0, 0, 'background');
        restart_txt = game.add.text(gameX, (gameY/4), 'GAME OVER', style);
        restart_txt.anchor.set(0.5);
        
        //restart_txt = game.add.text(gameX, (gameY/4), 'Game Over', level_style);
        //restart_txt.anchor.set(0.5);
        //restart_btn = game.add.button(gameX, gameY, 'button', restartGame);
        //restart_btn.anchor.set(0.5);
        //restart_btn.events.onInputDown.add(onInputDown, this);
        
        
        
        restart_btn = game.add.sprite(gameX, gameY, 'button');
        restart_btn.scale.set(0.5);
        restart_btn.inputEnabled = true;
        restart_btn.anchor.set(0.5);
       
        restart_txt = game.add.text((gameX+5), (gameY+3), 'PLAY AGAIN', btn_style);
        restart_txt.anchor.set(0.5);
        restart_btn.my_txt = restart_txt; //link this txt to this btn
        restart_btn.my_state = 'Play';
        
        restart_btn.input.useHandCursor = true;
        
        restart_btn.events.onInputDown.add(onInputDown, this);
        restart_btn.events.onInputUp.add(onInputUp, this);
    }
    
}

function restartGame() {
    
    game.state.start('Menu');
    
}