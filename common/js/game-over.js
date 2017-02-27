var restart_txt;
var restart_btn;
var game_over_txt;
var game_over_desc;

var home_btn;
var home_txt;

var text1 = "";
var text2;

var gameOver = {
    
    create: function() {
        
        bg = game.add.image(0, 0, 'background');
        game_over_txt = game.add.text(gameX, (gameY/4), 'GAME OVER', style);
        game_over_txt.anchor.set(0.5);
        
        
        if(level > highScore){
            highScore = level;
            localStorage.setItem("followMyLeadHighScore", highScore);
            highScore_txt.setText("Highscore: "+highScore);
            
            text1 = "A new highscore!\n";
        }
        
        game_over_desc = game.add.text(gameX, (gameY/4+140), (text1+'You reached level '+level), style);
        //game_over_desc.anchor.set(0.5);
        game_over_desc.anchor.setTo(0.5, 0);
        
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
        
        home_btn = game.add.sprite(gameX, gameY+140, 'button');
        home_btn.scale.set(0.5);
        home_btn.inputEnabled = true;
        home_btn.anchor.set(0.5);
       
        home_txt = game.add.text((gameX+5), (gameY+3+140), 'HOME', btn_style);
        home_txt.anchor.set(0.5);
        home_btn.my_txt = home_txt; //link this txt to this btn
        home_btn.my_state = 'Menu';
        home_btn.input.useHandCursor = true;
        
        home_btn.events.onInputDown.add(onInputDown, this);
        home_btn.events.onInputUp.add(onInputUp, this);
        
        animateThis(game_over_txt, 500);
        animateThis(game_over_desc, 700);
        animateThis(restart_btn, 900);
        animateThis(restart_txt, 900);
        animateThis(home_btn, 1100);
        animateThis(home_txt, 1100);
    }
    
}

function restartGame() {
    
    game.state.start('Menu');
    
}