var play_txt;
var btnArray;
var levelArray = [];
var highScore = 0;
var highScore_txt;

var timer;
var stage1, stage2, stage3, stage4, stage5;
var stageArray, stageNameArray, dotArray;
var stage_txt, sub_txt;
var start_btn;
var left, right; //arrows
var animateLeftArrow, animateRightArrow;
var leftTween, rightTween;
var isTweening;
var ad;

var stage_group;
var stageNum;

var stages = {
    
    create: function() {
        
        bg = game.add.image(0, 0, 'background');
        bg.width = gameW;
        bg.height = gameH;
        
        ad = game.add.sprite(gameX, gameH-75, 'ad'); //test ad
        ad.anchor.set(0.5); //test ad
        
        title_txt = game.add.text(gameX+10, 200, 'STAGE SELECT', big_style);
        title_txt.anchor.set(0.5);
        
        stageNum = 0;

        stage_txt = game.add.text(gameX+10, 340, 'STAGE '+(stageNum+1), style);
        stage_txt.anchor.set(0.5);
        
        stageNameArray = ['Rookie', 'Average', 'Pro', 'Master', 'Hero'];
        
        sub_txt = game.add.text(gameX+5, 410, stageNameArray[0] , medium_style);
        sub_txt.anchor.set(0.5);
        
        //back button
        back_btn = game.add.sprite(80, 80, 'back_btn');
        back_btn.scale.set(0.5);
        back_btn.myScale = 0.5;
        back_btn.inputEnabled = true;
        back_btn.anchor.set(0.5);
        back_btn.my_state = 'Menu';
        back_btn.input.useHandCursor = true;
        back_btn.events.onInputDown.add(onInputDown, this);
        back_btn.events.onInputUp.add(onInputUp, this);
        
        //stages
        stage_group = game.add.group();
        
        stage1 = stage_group.create(0, 0, 'stage1'); //stage select panel
        stage2 = stage_group.create(0, 0, 'stage2'); //stage select panel
        stage3 = stage_group.create(0, 0, 'stage3'); //stage select panel
        stage4 = stage_group.create(0, 0, 'stage4'); //stage select panel
        stage5 = stage_group.create(0, 0, 'stage5'); //stage select panel
        stageArray = [stage1, stage2, stage3, stage4, stage5];
        var stageW = stage1.width;
//        stage1.x = gameX - stageW/2;
//        stage1.y = 430;
        
        for(var i = 0; i < 5; i++){
            stageArray[i].x = gameW*i + (gameX - stageW/2);
            stageArray[i].y = 430;
        }
        
        start_btn = game.add.text(gameX+10, 960, 'START', style);
        start_btn.anchor.set(0.5);
        start_btn.myScale = 1;
        start_btn.inputEnabled = true;
        start_btn.my_state = 'Play';
        start_btn.input.useHandCursor = true;
        start_btn.events.onInputDown.add(onInputDown, this);
        start_btn.events.onInputUp.add(onInputUp, this);
        
        //arrows
        left = game.add.sprite(80, 680, 'arrow');
        left.anchor.set(0.5);
        left.scale.set(0.1);
        left.angle = -90;
        left.inputEnabled = true;
        left.input.useHandCursor = true;
        left.events.onInputUp.add(swipeRight, this);
        
        right = game.add.sprite(gameW-80, 680, 'arrow');
        right.anchor.set(0.5);
        right.scale.set(0.1);
        right.angle = 90;
        right.inputEnabled = true;
        right.input.useHandCursor = true;
        right.events.onInputUp.add(swipeLeft, this);
        
        var dot1 = game.add.sprite(gameX-100, 1050, 'dot');
        dot1.anchor.set(0.5);
        dot1.scale.set(0.4);
        var dot2 = game.add.sprite(gameX-50, 1050, 'dot');
        dot2.anchor.set(0.5);
        dot2.scale.set(0.2);
        var dot3 = game.add.sprite(gameX, 1050, 'dot');
        dot3.anchor.set(0.5);
        dot3.scale.set(0.2);
        var dot4 = game.add.sprite(gameX+50, 1050, 'dot');
        dot4.anchor.set(0.5);
        dot4.scale.set(0.2);
        var dot5 = game.add.sprite(gameX+100, 1050, 'dot');
        dot5.anchor.set(0.5);
        dot5.scale.set(0.2);
        dotArray =[dot1, dot2, dot3, dot4, dot5];
        
        this.swipe = new Swipe(this.game); //required for swipe
    },
    
    update: function() {
        
        //required for swipe
        var direction = this.swipe.check();
        if (direction!==null) {
            // direction= { x: x, y: y, direction: direction }
            switch(direction.direction) {
               case this.swipe.DIRECTION_LEFT: swipeLeft(); break;
               case this.swipe.DIRECTION_RIGHT: swipeRight(); break;
               case this.swipe.DIRECTION_UP:
               case this.swipe.DIRECTION_DOWN:
               case this.swipe.DIRECTION_UP_LEFT:
               case this.swipe.DIRECTION_UP_RIGHT:
               case this.swipe.DIRECTION_DOWN_LEFT:
               case this.swipe.DIRECTION_DOWN_RIGHT:
            }
        } 
        //console.log("game.input.y = "+game.input.y);
    }
    
}

function swipeLeft(){
    
    
    if(game.input.y > 530 && game.input.y < 830 && stage_group.x > -2880 && !isTweening){
        stageNum++;
        stage_txt.text = "STAGE "+(stageNum+1);
        animateThis(stage_txt);
        sub_txt.text = stageNameArray[stageNum];
        animateThis(sub_txt);
        
        animateOut(start_btn, 0); //animate out the start button
        
        for(var j = 0; j < 5; j++){
            if(j == stageNum){
                console.log("j = "+j);
                console.log("stageNum = "+stageNum);
                game.add.tween(dotArray[j].scale).to({x: 0.4, y: 0.4}, 200, Phaser.Easing.Cubic.Out, true);
            }else{
                game.add.tween(dotArray[j].scale).to({x: 0.2, y: 0.2}, 200, Phaser.Easing.Cubic.Out, true);
            }
        }
        
        game.add.tween(right.scale).to({x: 0.05, y: 0.05}, 200, Phaser.Easing.Cubic.Out, true).onComplete.add(animateBackArrow, this);
        
        isTweening = true;
        leftTween = game.add.tween(stage_group).to({x: (stage_group.x - gameW)}, 500, Phaser.Easing.Cubic.Out, true);
        leftTween.onComplete.add(toggleTweening, this);
    }
}
function swipeRight(){
    
    
    if(game.input.y > 530 && game.input.y < 830 && stage_group.x < 0 && !isTweening){
        stageNum--;
        stage_txt.text = "STAGE "+(stageNum+1);
        animateThis(stage_txt);
        sub_txt.text = stageNameArray[stageNum];
        animateThis(sub_txt);
        
        animateOut(start_btn, 0); //animate out the start button
        
        for(var j = 0; j < 5; j++){
            if(j == stageNum){
                console.log("j = "+j);
                console.log("stageNum = "+stageNum);
                game.add.tween(dotArray[j].scale).to({x: 0.4, y: 0.4}, 200, Phaser.Easing.Cubic.Out, true);
            }else{
                game.add.tween(dotArray[j].scale).to({x: 0.2, y: 0.2}, 200, Phaser.Easing.Cubic.Out, true);
            }
        }
        
        game.add.tween(left.scale).to({x: 0.05, y: 0.05}, 200, Phaser.Easing.Cubic.Out, true).onComplete.add(animateBackArrow, this);
        
        isTweening = true;
        rightTween = game.add.tween(stage_group).to({x: (stage_group.x + gameW)}, 500, Phaser.Easing.Cubic.Out, true);
        rightTween.onComplete.add(toggleTweening, this);
    }
}

function toggleTweening(){
    if(isTweening){
        isTweening = false;
    }else{
        isTweening = true;
    }
}
function animateBackArrow(target){
    game.add.tween(target).to({x: 0.1, y: 0.1}, 200, Phaser.Easing.Cubic.Out, true);
}
   

function clickStage() {
    
    game.state.start('Play');

}
