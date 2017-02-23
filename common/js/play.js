var play_txt;
var finish_btn;
var btn1, btn2, btn3, btn4;
var xMargin, yMargin;
var btnArray;
var comboArray;
var totalBtn;

var timer;
var level = 0;

var play = {
    
    create: function() {
        
        bg = game.add.image(0, 0, 'background');
        play_txt = game.add.text(gameX, (gameY/4), 'End this game', style);
        play_txt.anchor.set(0.5);
        
        timer = game.time.create(false);
        timer.loop(500, followMyLead, this);
        timer.start();
        
        xMargin = 40;
        yMargin = 40;
        
        btn1 = game.add.sprite(gameW/4-xMargin, (gameH/4*3+yMargin), 'square');
        btn1.anchor.set(0.5);
        btn1.scale.set(0.6);
        btn1.alpha = 0.5;
        btn1.value = 1;
        btn1.inputEnabled = true;
        btn1.input.useHandCursor = true;
        btn1.events.onInputDown.add(pressThis, this);
        btn1.events.onInputUp.add(releaseThis, this);
        
        btn2 = game.add.sprite(gameW/2, (gameH/4*3-140+yMargin), 'triangle');
        btn2.anchor.set(0.5);
        btn2.scale.set(0.6);
        btn2.alpha = 0.5;
        btn2.value = 2;
        btn2.inputEnabled = true;
        btn2.input.useHandCursor = true;
        btn2.events.onInputDown.add(pressThis, this);
        btn2.events.onInputUp.add(releaseThis, this);
        
        btn3 = game.add.sprite(gameW/2, (gameH/4*3+140+yMargin), 'cross');
        btn3.anchor.set(0.5);
        btn3.scale.set(0.6);
        btn3.alpha = 0.5;
        btn3.value = 3;
        btn3.inputEnabled = true;
        btn3.input.useHandCursor = true;
        btn3.events.onInputDown.add(pressThis, this);
        btn3.events.onInputUp.add(releaseThis, this);
        
        btn4 = game.add.sprite((gameW/4*3+xMargin), (gameH/4*3+yMargin), 'circle');
        btn4.anchor.set(0.5);
        btn4.scale.set(0.6);
        btn4.alpha = 0.5;
        btn4.value = 4;
        btn4.inputEnabled = true;
        btn4.input.useHandCursor = true;
        btn4.events.onInputDown.add(pressThis, this);
        btn4.events.onInputUp.add(releaseThis, this);
        
    },
    
    update: function() {
        
    }
    
}

function finishGame() {
    
    game.state.start('GameOver');
    
}

function pressThis(target) {    
    game.add.tween(target.scale).to({x: 0.5, y: 0.5}, 100, Phaser.Easing.Cubic.Out, true);
    target.alpha = 1;
}
function releaseThis(target) {
    //console.log('button up', arguments);
    game.add.tween(target.scale).to({x: 0.6, y: 0.6}, 100, Phaser.Easing.Cubic.Out, true);
    target.alpha = 0.5;
    if(arguments[2]) {
        console.log(target.value);
    }
}


function followMyLead(){
    
    
    
}