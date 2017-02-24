var play_txt;
var finish_btn;
var btn1, btn2, btn3, btn4;
var xMargin, yMargin;
var btnArray;
var comboArray = [];
var player;
var totalBtn;
var highScore = 0;
var highScore_txt;

var timer;
var level = 1;
var level_txt;
var count = 0;

var t1;

var play = {
    
    create: function() {
        
        bg = game.add.image(0, 0, 'background');
        play_txt = game.add.text(gameX, (gameY/4+140), 'Level', style);
        play_txt.anchor.set(0.5);
        
        level_txt = game.add.text(gameX+30, (gameY/4+280), level, level_style);
        level_txt.anchor.set(0.5);
        
        if (localStorage.getItem("followMyLeadHighScore") !== null) {
            highScore = parseInt(localStorage.getItem("followMyLeadHighScore"));
        }
        
        highScore_txt = game.add.text(gameX, 50, "Highscore: "+highScore, style);
        highScore_txt.anchor.set(0.5);
        
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
        
        btnArray = [btn1, btn2, btn3, btn4];
        
        startCombo();
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
        checkPlayerCombo(target.value, count);
    }
}


function startCombo(){
    btn1.inputEnabled = false;
    btn2.inputEnabled = false;
    btn3.inputEnabled = false;
    btn4.inputEnabled = false;
    
    level_txt.setText(level);
    //comboArray.push(btnArray[0]);
    //add to combo
    var i = Math.floor(Math.random()*4);
    console.log("i = "+i);
    comboArray.push(btnArray[i]);
    
    timer = game.time.create(false);
    timer.loop(1000, animateCombo, this);
    timer.start();

}

function animateCombo(){
    
    console.log("comboArray.length = "+ comboArray.length);
    console.log("level = "+ level);
    
    if(count < comboArray.length){
        console.log("animate button "+count);
        
        t1 = game.add.tween(comboArray[count].scale).to({x: 0.5, y: 0.5}, 200, Phaser.Easing.Cubic.Out, true);
        t1.onComplete.add(animateBack, this);
        comboArray[count].alpha = 1;
        
        
        
        
    }
}

function checkPlayerCombo(val, cnt){
    
    if(val == comboArray[cnt].value){
        console.log("goed! val = "+val);
        console.log("comboArray[cnt].value = "+comboArray[cnt].value);
        count++;
        if(comboArray.length == count){
            console.log("max gehaald ga naar next level!");
            count = 0;
            level++;
            startCombo();
        }
    }else{
        console.log("fout!");
        console.log("val = "+val+" | comboArray[cnt].value = "+comboArray[cnt].value);
        console.log("=====================================================================");
        
        if(level > highScore){
            highScore = level;
            localStorage.setItem("followMyLeadHighScore", highScore);
            highScore_txt.setText("Highscore: "+highScore);
        }
        
        count = 0;
        level = 1;
        comboArray = [];
        //startCombo();
        game.state.start('GameOver');
    }
    
}

function animateBack(){
    
    game.add.tween(comboArray[count].scale).to({x: 0.6, y: 0.6}, 200, Phaser.Easing.Cubic.Out, true);
    comboArray[count].alpha = 0.5;
    
    count++;
        if(count == comboArray.length){
            console.log("stop ");
            timer.pause();
            timer.destroy();
            
            count = 0;
            btn1.inputEnabled = true;
            btn2.inputEnabled = true;
            btn3.inputEnabled = true;
            btn4.inputEnabled = true;
        }
    
}