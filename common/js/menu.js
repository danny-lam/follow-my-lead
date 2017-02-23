var bg;
var title_txt;
var start_btn;
var start_btn_txt;
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
var btn_style = {
    font: "40px Arial",
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
        
        start_btn = game.add.sprite(gameX, gameY, 'button');
        start_btn.scale.set(0.5);
        start_btn.inputEnabled = true;
        start_btn.anchor.set(0.5);
       
        start_btn_txt = game.add.text((gameX+5), (gameY+3), 'START', btn_style);
        start_btn_txt.anchor.set(0.5);
        start_btn.my_txt = start_btn_txt; //link this txt to this btn
        
        start_btn.input.useHandCursor = true;
        
        start_btn.events.onInputDown.add(onInputDown, this);
        start_btn.events.onInputUp.add(onInputUp, this);
    }
    
}

function startGame() {
    
    //game.state.start('Play');
    
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
        game.state.start('Play');
    }
}