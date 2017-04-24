var bg;
var presents_txt;
var title_txt;
var start_btn;
var start_btn_txt;
var settings_btn;
var settings_btn_txt;

var timer;
var figArray = [];
var figNum = 0;
var music;
var sfx = {};
var ad;
var click;

var menu = {
    
    preload: function() {
        
    },
    
    create: function() {
        
        //document.getElementById("container").style.backgroundColor = "#212020";
        bg = game.add.image(0, 0, 'background');
        bg.width = gameW;
        bg.height = gameH;
        //console.log("gameW = "+gameW);
        ad = game.add.sprite(gameX, gameH-75, 'ad'); //test ad
        ad.anchor.set(0.5); //test ad
        presents_txt = game.add.text(gameX+5, 100, '- WALKING FORT PRESENTS -', small_style);
        presents_txt.anchor.set(0.5);
        title_txt = game.add.text(gameX+10, 200, 'FOLLOW MY LEAD', big_style);
        title_txt.anchor.set(0.5);
        
        for(var i = 0; i < 4; i++){
            figArray[i] = game.add.sprite((gameX), (gameY-90), imgArray[i]);
            figArray[i].anchor.set(0.5);
            figArray[i].scale.set(0.6);
            figArray[i].alpha = 0;
        }
        
        click = game.add.audio('click');
        click.volume = 0.1;

        start_btn_txt = game.add.text((gameX+10), 800, 'PLAY', style);
        start_btn_txt.myScale = 1;
        start_btn_txt.anchor.set(0.5);
        start_btn_txt.inputEnabled = true;
        start_btn_txt.my_state = 'Stages';
        start_btn_txt.input.useHandCursor = true;
        start_btn_txt.events.onInputDown.add(onInputDown, this);
        start_btn_txt.events.onInputUp.add(onInputUp, this);
        
        settings_btn_txt = game.add.text((gameX+10), 900, 'SETTINGS', style);
        settings_btn_txt.myScale = 1;
        settings_btn_txt.anchor.set(0.5);
        settings_btn_txt.inputEnabled = true;
        settings_btn_txt.my_state = 'Settings';
        settings_btn_txt.input.useHandCursor = true;
        settings_btn_txt.events.onInputDown.add(onInputDown, this);
        settings_btn_txt.events.onInputUp.add(onInputUp, this);
        
//        settings_btn = game.add.sprite(gameX, 900, 'button');
//        settings_btn.scale.set(0.5);
//        settings_btn.inputEnabled = true;
//        settings_btn.anchor.set(0.5);
//        settings_btn_txt = game.add.text((gameX+10), 900, 'SETTINGS', style);
//        settings_btn_txt.anchor.set(0.5);
//        settings_btn.my_txt = settings_btn_txt; //link this txt to this btn
//        settings_btn.my_state = 'Settings';
//        settings_btn.input.useHandCursor = true;
//        settings_btn.events.onInputDown.add(onInputDown, this);
//        settings_btn.events.onInputUp.add(onInputUp, this);
        
        animateThis(presents_txt, 300);
        animateThis(title_txt, 500);
        //animateThis(start_btn, 700);
        animateThis(start_btn_txt, 700);
        //animateThis(settings_btn, 900);
        animateThis(settings_btn_txt, 900);
        
        startFigures();
        
        
        
        if(!music){
            music = game.add.audio('music', 1, true, true); //key, volume, loop, connect
        }
        if (localStorage.getItem("followMyLeadMusicIsPlaying") !== null) {
            //localStorage.setItem("followMyLeadMusicIsPlaying", 1);
            music.enabled = parseInt(localStorage.getItem("followMyLeadMusicIsPlaying"));
            sfx.enabled = parseInt(localStorage.getItem("followMyLeadSfxIsPlaying"));
        }else{
            music.enabled = 1;
            sfx.enabled = 1;
        }
            console.log("music.isPlaying = "+music.isPlaying);
            console.log("music.enabled = "+music.enabled);
        if(music.enabled){
            if(!music.isPlaying){
                music.play();
                music.isPlaying = true;
                console.log("music.isPlaying2 "+music.isPlaying);
            }
        }else{
            
        }
       
        
        
    }
    
}



function onInputDown(target) {   
    if(sfx.enabled){
        click.play();
    }
    var thisScale = target.myScale;
    game.add.tween(target.scale).to({x: (thisScale - 0.1), y: (thisScale - 0.1)}, 100, Phaser.Easing.Cubic.Out, true);
//    if(target.my_txt != undefined){
//        game.add.tween(target.my_txt.scale).to({x: 0.9, y: 0.9}, 100, Phaser.Easing.Cubic.Out, true);
//    }
    
}
function onInputUp(target) {
    //console.log('button up', arguments);
    var thisScale = target.myScale;
    game.add.tween(target.scale).to({x: (thisScale), y: (thisScale)}, 100, Phaser.Easing.Cubic.Out, true);
//    if(target.my_txt != undefined){
//        game.add.tween(target.my_txt.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Cubic.Out, true);
//    }
    if(arguments[2]) {
        game.state.start(target.my_state);
    }
}

function animateThis(target, delay, thisAlpha){
    var oldX = target.x;
    var oldY = target.y;
    
    target.x = oldX;
    target.y = oldY - 100;
    target.alpha = 0;
    if(thisAlpha == null || thisAlpha == undefined){
        thisAlpha = 1;
    }
    
    game.add.tween(target).to({x: oldX, y: oldY}, 200, Phaser.Easing.Cubic.Out, true, delay);
    game.add.tween(target).to({alpha: thisAlpha}, 200, Phaser.Easing.Cubic.Out, true, delay);
}
function animateOut(target, delay, thisAlpha){
    var oldX = target.x;
    var oldY = target.y;
    
    //target.x = oldX;
    //target.y = oldY - 100;
    //target.alpha = 0;
//    if(thisAlpha == null || thisAlpha == undefined){
//        thisAlpha = 1;
//    }
    
    var thisTween = game.add.tween(target).to({y: (oldY+50)}, 100, Phaser.Easing.Cubic.Out, true, delay);
    thisTween = game.add.tween(target).to({alpha: 0}, 100, Phaser.Easing.Cubic.Out, true, delay);
    thisTween.onComplete.add(function(){target.y = oldY; animateThis(target, 200);}, this);
}

function startFigures(){
    
    timer = game.time.create(false);
    timer.loop(1000, animateFigures, this);
    timer.start();

}

function animateFigures(){
   
    if(figNum < figArray.length){
        
    }else{
        figNum = 0;
    }
    var t1 = game.add.tween(figArray[figNum].scale).to({x: 0.5, y: 0.5}, 400, Phaser.Easing.Cubic.Out, true);
    game.add.tween(figArray[figNum]).to({alpha: 1}, 400, Phaser.Easing.Cubic.Out, true);
        //figArray[figNum].alpha = 1;
        t1.onComplete.add(animateFiguresBack, this);

}
function animateFiguresBack(){
    if(figNum < figArray.length){
         var t2 = game.add.tween(figArray[figNum].scale).to({x: 0.6, y: 0.6}, 400, Phaser.Easing.Cubic.Out, true);
        game.add.tween(figArray[figNum]).to({alpha: 0}, 400, Phaser.Easing.Cubic.Out, true);
         t2.onComplete.add(animateFigureOnComplete, this);
    }

}
function animateFigureOnComplete(){
    //figArray[figNum].alpha = 0;
    figNum++;
}