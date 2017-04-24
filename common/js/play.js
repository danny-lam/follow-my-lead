var play_txt;
var finish_btn;
var btn0, btn1, btn2, btn3, btn4, btn5, btn6;
var btnH, btnW;
var xMargin, yMargin;
var diffX, diffY;
var btnArray;
var comboArray;
var player;
var totalBtn;
var highScore = 0;
var highScore_txt;

var timer;
var countDownTimer, countDownTimerCounter;
var level;
var level_txt;
var count;

var t1;
var bleep0, bleep1, bleep2, bleep3, bleep4, bleep5, bleep6;
var back_btn;
var ad;

var play = {
    
    create: function() {
        countDownTimerCounter = 3;
        level = countDownTimerCounter;
        
        count = 0;
        comboArray = [];
        
        music.stop();
        music.isPlaying = false;
        
        diffY = 150; //height of ad
        diffX = 960; //width of ad
        
        bg = game.add.image(0, 0, 'background');
        
        //test add
        ad = game.add.sprite(gameX, gameH-75, 'ad'); //test ad
        ad.anchor.set(0.5);                          //test ad
        //test add

        play_txt = game.add.text(gameX+5, (gameY/4)-20, 'Level', style);
        play_txt.anchor.set(0.5);
        
        level_txt = game.add.text(gameX+30, (gameY/4+100), level, level_style);
        level_txt.anchor.set(0.5);
        
        if (localStorage.getItem("followMyLeadHighScore") !== null) {
            highScore = parseInt(localStorage.getItem("followMyLeadHighScore"));
        }
        
        highScore_txt = game.add.text(gameX, 50, "Highscore: "+highScore, style);
        highScore_txt.anchor.set(0.5);

        xMargin = 25;
        yMargin = 10;
        
        //back button
        back_btn = game.add.sprite(80, 80, 'back_btn');
        back_btn.scale.set(0.5);
        back_btn.myScale = 0.5;
        back_btn.inputEnabled = true;
        back_btn.anchor.set(0.5);
        back_btn.my_state = 'Stages';
        back_btn.input.useHandCursor = true;
        back_btn.events.onInputDown.add(onInputDown, this);
        back_btn.events.onInputUp.add(onInputUp, this);
        
        //1. bottom left
        bleep1 = game.add.audio('bleep1');
        btn1 = game.add.sprite(gameW/4-xMargin, gameH-250-diffY, 'square');
        btn1.anchor.set(0.5);
        btn1.scale.set(0.6);
        btn1.alpha = 0.5;
        btn1.value = 1;
        btn1.inputEnabled = true;
        btn1.input.useHandCursor = true;
        btn1.snd = bleep1;
        btn1.events.onInputDown.add(pressThis, this);
        btn1.events.onInputUp.add(releaseThis, this);
        
        //2. center 
        bleep2 = game.add.audio('bleep2');
        btn2 = game.add.sprite(gameW/2, gameH-368-diffY, 'triangle');
        btn2.anchor.set(0.5);
        btn2.scale.set(0.6);
        btn2.alpha = 0.5;
        btn2.value = 2;
        btn2.inputEnabled = true;
        btn2.input.useHandCursor = true;
        btn2.snd = bleep2;
        btn2.events.onInputDown.add(pressThis, this);
        btn2.events.onInputUp.add(releaseThis, this);
        
        //3. bottom right
        bleep3 = game.add.audio('bleep3');
        btn3 = game.add.sprite((gameW/4*3)+xMargin, gameH-250-diffY, 'circle');
        btn3.anchor.set(0.5);
        btn3.scale.set(0.6);
        btn3.alpha = 0.5;
        btn3.value = 3;
        btn3.inputEnabled = true;
        btn3.input.useHandCursor = true;
        btn3.snd = bleep3;
        btn3.events.onInputDown.add(pressThis, this);
        btn3.events.onInputUp.add(releaseThis, this);
        
        //0. bottom
        bleep0 = game.add.audio('bleep0');
        btn0 = game.add.sprite(gameW/2, gameH-130-diffY, 'cross');
        btn0.anchor.set(0.5);
        btn0.scale.set(0.6);
        btn0.alpha = 0.5;
        btn0.value = 0;
        btn0.inputEnabled = true;
        btn0.input.useHandCursor = true;
        btn0.snd = bleep0;
        btn0.events.onInputDown.add(pressThis, this);
        btn0.events.onInputUp.add(releaseThis, this);
        
        //4. top left
        bleep4 = game.add.audio('bleep4');
        btn4 = game.add.sprite(gameW/4-xMargin, gameH-486-diffY, 'diamond');
        btn4.anchor.set(0.5);
        btn4.scale.set(0.6);
        btn4.alpha = 0.5;
        btn4.value = 4;
        btn4.inputEnabled = true;
        btn4.input.useHandCursor = true;
        btn4.snd = bleep4;
        btn4.events.onInputDown.add(pressThis, this);
        btn4.events.onInputUp.add(releaseThis, this);
        
        //5. top right
        bleep5 = game.add.audio('bleep5');
        btn5 = game.add.sprite((gameW/4*3)+xMargin, gameH-486-diffY, 'star');
        btn5.anchor.set(0.5);
        btn5.scale.set(0.6);
        btn5.alpha = 0.5;
        btn5.value = 5;
        btn5.inputEnabled = true;
        btn5.input.useHandCursor = true;
        btn5.snd = bleep5;
        btn5.events.onInputDown.add(pressThis, this);
        btn5.events.onInputUp.add(releaseThis, this);
        
        //6. top
        bleep6 = game.add.audio('bleep6');
        btn6 = game.add.sprite(gameW/2, gameH-604-diffY, 'plus');
        btn6.anchor.set(0.5);
        btn6.scale.set(0.6);
        btn6.alpha = 0.5;
        btn6.value = 6;
        btn6.inputEnabled = true;
        btn6.input.useHandCursor = true;
        btn6.snd = bleep6;
        btn6.events.onInputDown.add(pressThis, this);
        btn6.events.onInputUp.add(releaseThis, this);
        
        btnArray = [btn0, btn1, btn2, btn3, btn4, btn5, btn6];
        
        game.sound.setDecodedCallback([ bleep1 ], soundsReady, this);
        
        level = 1;
        //startCombo();
        
        animateThis(btn0, 300, 0.5);
        animateThis(btn1, 400, 0.5);
        animateThis(btn2, 500, 0.5);
        animateThis(btn3, 600, 0.5);
        animateThis(btn4, 700, 0.5);
        animateThis(btn5, 800, 0.5);
        animateThis(btn6, 900, 0.5);
        animateThis(back_btn, 1100);
        
        countDownTimer = game.time.create(false);
        countDownTimer.loop(500, countDown, this);
        countDownTimer.start();
        
        play_txt.text = "Ready?";
        animateThis(play_txt, 0);
        level_txt.text = countDownTimerCounter;
        animateThis(level_txt, 0);
    },
    
    update: function() {
        
    }
    
}

function soundsReady(){
    
}

function countDown(){
    if(countDownTimerCounter == 0){
        startCombo();
        countDownTimer.pause();
        countDownTimer.destroy();
        play_txt.text = "Level";
        animateThis(play_txt, 0);
        return;
    }
    countDownTimerCounter--;
    if(countDownTimerCounter == 0){
        level_txt.text = "BEGIN";
    }else{
        level_txt.text = countDownTimerCounter;
    }
    animateThis(level_txt, 0);
    
    
    
}


function finishGame() {
    
    game.state.start('GameOver');
    
}

function pressThis(target) {    
    game.add.tween(target.scale).to({x: 0.5, y: 0.5}, 100, Phaser.Easing.Cubic.Out, true);
    target.alpha = 1;
    if(sfx.enabled){
        target.snd.play();
    }
    console.log("pressed "+target.value);
    
    for(var i=0; i < btnArray.length; i++){
        if(btnArray[i].value != target.value){
            btnArray[i].inputEnabled = false;  
        }
    }
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
    btn0.inputEnabled = false;
    btn1.inputEnabled = false;
    btn2.inputEnabled = false;
    btn3.inputEnabled = false;
    btn4.inputEnabled = false;
    btn5.inputEnabled = false;
    btn6.inputEnabled = false;
    console.log("btn0.inputEnabled = "+btn0.inputEnabled);
    
    level_txt.setText(level);
    animateThis(level_txt, 0);
    //comboArray.push(btnArray[0]);
    //add to combo
    var i = Math.floor(Math.random()*7);
    console.log("i = "+i);
    comboArray.push(btnArray[i]);
    
    timer = game.time.create(false);
    timer.loop(500, animateCombo, this);
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
        
        if(sfx.enabled){
            comboArray[count].snd.play();
        }
        
        
        
        
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
        }else{
            for(var i=0; i < btnArray.length; i++){
                btnArray[i].inputEnabled = true;  
            }
        }
    }else{
        console.log("fout!");
        console.log("val = "+val+" | comboArray[cnt].value = "+comboArray[cnt].value);
        console.log("=====================================================================");
        
//        if(level > highScore){
//            highScore = level;
//            localStorage.setItem("followMyLeadHighScore", highScore);
//            highScore_txt.setText("Highscore: "+highScore);
//        }
        
        count = 0;
        comboArray = [];
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
            btn0.inputEnabled = true;
            btn1.inputEnabled = true;
            btn2.inputEnabled = true;
            btn3.inputEnabled = true;
            btn4.inputEnabled = true;
            btn5.inputEnabled = true;
            btn6.inputEnabled = true;
            console.log("btn0.inputEnabled = "+btn0.inputEnabled);
        }
    
}