var gameX;
var gameY;
var gameW;
var gameH;
var stage_btn;
var splash;

var loading_txt;
var loadingStyle;
var style;
var btn_style;
var level_style;

var imgArray = [];
var stageTotalButtonsArray = [3,4,5,6,7]; //total buttons on stage
var coorStage1, coorStage2, coorStage3, coorStage4, coorStage5; //coordination buttons of each stage;
var stageButtonCoordinationArray; //coordinations of all the stages saved in this array

var preload = {
    
    preload: function() {
        
        small_style = {
            font: "20px Quicksand",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 1000,
            align: "center",
            fontWeight: "bold"
        };
        medium_style = {
            font: "40px Quicksand",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 1000,
            align: "center",
            fontWeight: "bold"
        };
        big_style = {
            font: "70px Quicksand",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 1000,
            align: "center",
            fontWeight: "bold"
        };
        style = {
            font: "60px Quicksand",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 1000,
            align: "center",
            fontWeight: "bold"
        };
        btn_style = {
            font: "40px Quicksand",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 1000,
            align: "center",
            fontWeight: "bold"
        };
        level_style = {
            font: "200px Quicksand",
            fill: "#ffffff",
            wordWrap: true,
            wordWrapWidth: 1000,
            align: "center",
            fontWeight: "bold"
        };
        
        game.load.image("ad", "common/img/ad.png");
        game.load.image("background", "common/img/background.jpg");
        game.load.image("circle", "common/img/button_circle.png");
        game.load.image("cross", "common/img/button_cross.png");
        game.load.image("triangle", "common/img/button_triangle.png");
        game.load.image("square", "common/img/button_square.png");
        game.load.image("star", "common/img/button_star.png");
        game.load.image("diamond", "common/img/button_diamond.png");
        game.load.image("plus", "common/img/button_plus.png");
        game.load.image("back_btn", "common/img/button_back.png");
        game.load.image("hint_btn", "common/img/button_hint.png");
        game.load.image("blank_btn", "common/img/button_level.png");
        game.load.image("lock", "common/img/lock.png");
        
        game.load.image("stage1", "common/img/stage1.png");
        game.load.image("stage2", "common/img/stage2.png");
        game.load.image("stage3", "common/img/stage3.png");
        game.load.image("stage4", "common/img/stage4.png");
        game.load.image("stage5", "common/img/stage5.png");
        
        game.load.image("menu", "common/img/menu-icon.png");
        game.load.image("button", "common/img/main-button0.png");
        game.load.image("arrow", "common/img/triangle.png");
        game.load.image("dot", "common/img/dot.png");
        game.load.image("target", "common/img/target-icon.png");
        
        imgArray = ["square", "triangle", "cross", "circle"];
        
        game.load.audio('click', 'common/snd/camera_click1.wav');
        game.load.audio('music', 'common/snd/music.mp3');
        game.load.audio('game-over', 'common/snd/game-over.wav');
        game.load.audio('bleep0', 'common/snd/tone0.wav');
        game.load.audio('bleep1', 'common/snd/tone1.wav');
        game.load.audio('bleep2', 'common/snd/tone2.wav');
        game.load.audio('bleep3', 'common/snd/tone3.wav');
        game.load.audio('bleep4', 'common/snd/tone4.wav');
        game.load.audio('bleep5', 'common/snd/tone5.wav');
        game.load.audio('bleep6', 'common/snd/tone6.wav');
        
        gameX = game.world.centerX;
        gameY = game.world.centerY;
        gameW = game.world.width;
        gameH = game.world.height;
        
        loading_txt = game.add.text(gameX, gameH+100, 'loading...', small_style);
        loading_txt.anchor.set(0.5);
        
        splash = game.add.sprite(gameX, gameY, 'fort');
        splash.scale.set(0.4);
        splash.anchor.set(0.5);
        
        
        coorStage1 = [{x:(gameW/2), y:gameH/2},{x:1, y:1},{x:1, y:1}];
        console.log("coorStage1 = "+coorStage1[0].x);
    },
    
    create: function() {
        
        //game.state.start('Menu');
        game.time.events.add(Phaser.Timer.SECOND * 1, startGame, this);
        
    }
    
}

function startGame() {
    console.log("startGame");
    game.state.start('Menu');
}

