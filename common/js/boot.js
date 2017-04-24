var boot = {
    
    preload: function() {
        
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = this.scale.pageAlignVertically = true;
        this.scale.setScreenSize();

        if(!game.device.desktop){ 
            game.scale.forceOrientation(false,true);
            game.scale.enterIncorrectOrientation.add(handleIncorrect);
            game.scale.leaveIncorrectOrientation.add(handleCorrect);
        }
        game.scale.refresh();
        
        game.load.image("fort", "common/img/walkingfort_white_text.png");
        game.load.image("background", "common/img/background.jpg");
    },
    
    create: function() {
        
        //game.input.onDown.add(gofull, this);
        game.state.start("Preload");
    }
    
}

function handleIncorrect(){
    if(!game.device.desktop){
//            console.log("handleIncorrect");
        document.getElementById("turn").style.display = "block";
    }
}
function handleCorrect(){
    if(!game.device.desktop){
//            console.log("handleCorrect");
        document.getElementById("turn").style.display = "none";
    }
}

