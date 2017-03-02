var bg;
var title_txt;
var start_btn;
var start_btn_txt;

var timer;
var figArray = [];
var figNum = 0;

var style = {
    font: "60px Arial",
    fill: "#ffffff",
    wordWrap: true,
    wordWrapWidth: 1000,
    align: "center",
    fontWeight: "bold"
}
var btn_style = {
    font: "40px Arial",
    fill: "#ffffff",
    wordWrap: true,
    wordWrapWidth: 1000,
    align: "center",
    fontWeight: "bold"
}
var level_style = {
    font: "200px Arial",
    fill: "#ffffff",
    wordWrap: true,
    wordWrapWidth: 1000,
    align: "center",
    fontWeight: "bold"
}

var menu = {
    
    create: function() {
        
        
        
        bg = game.add.image(0, 0, 'background');
        title_txt = game.add.text(gameX, (gameY/4), 'Follow my Lead', style);
        title_txt.anchor.set(0.5);
        
        for(var i = 0; i < 4; i++){
            figArray[i] = game.add.sprite((gameX), (gameY-90), imgArray[i]);
            figArray[i].anchor.set(0.5);
            figArray[i].scale.set(0.6);
            figArray[i].alpha = 0;
        }
        
        start_btn = game.add.sprite(gameX, gameH-280, 'button');
        start_btn.scale.set(0.5);
        start_btn.inputEnabled = true;
        start_btn.anchor.set(0.5);
        start_btn_txt = game.add.text((gameX+5), (gameH-280+3), 'START', btn_style);
        start_btn_txt.anchor.set(0.5);
        start_btn.my_txt = start_btn_txt; //link this txt to this btn
        start_btn.my_state = 'Play';
        start_btn.input.useHandCursor = true;
        start_btn.events.onInputDown.add(onInputDown, this);
        start_btn.events.onInputUp.add(onInputUp, this);
        
        animateThis(title_txt, 500);
        animateThis(start_btn, 700);
        animateThis(start_btn_txt, 700);
        
        startFigures();
    }
    
}



function onInputDown(target) {    
    game.add.tween(target.scale).to({x: 0.4, y: 0.4}, 100, Phaser.Easing.Cubic.Out, true);
    game.add.tween(target.my_txt.scale).to({x: 0.9, y: 0.9}, 100, Phaser.Easing.Cubic.Out, true);
}
function onInputUp(target) {
    //console.log('button up', arguments);
    game.add.tween(target.scale).to({x: 0.5, y: 0.5}, 100, Phaser.Easing.Cubic.Out, true);
    game.add.tween(target.my_txt.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Cubic.Out, true);
    if(arguments[2]) {
        game.state.start(target.my_state);
    }
}

function animateThis(target, delay){
    var oldX = target.x;
    var oldY = target.y;
    
    target.x = oldX;
    target.y = oldY - 100;
    target.alpha = 0;
    
    game.add.tween(target).to({x: oldX, y: oldY}, 200, Phaser.Easing.Cubic.Out, true, delay);
    game.add.tween(target).to({alpha: 1}, 200, Phaser.Easing.Cubic.Out, true, delay);
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