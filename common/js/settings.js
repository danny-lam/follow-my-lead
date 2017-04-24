var bg;
var title_txt;
var music_btn, music_btn_txt;
var sfx;
var sfx_btn, sfx_btn_txt;
var reset_btn, reset_btn_txt;

var timer;
var figArray = [];
var figNum = 0;
var music;
var ad;



var settings = {
    
    preload: function() {
        
    },
    
    create: function() {
        
        //document.getElementById("container").style.backgroundColor = "#212020";
        bg = game.add.image(0, 0, 'background');
        bg.width = gameW;
        bg.height = gameH;

        ad = game.add.sprite(gameX, gameH-75, 'ad'); //test ad
        ad.anchor.set(0.5); //test ad
        title_txt = game.add.text(gameX+5, 200, 'SETTINGS', big_style);
        title_txt.anchor.set(0.5);
        
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
        
        //music button
        music_btn = game.add.sprite(gameX, 600, 'button');
        music_btn.scale.set(0.5);
        music_btn.inputEnabled = true;
        music_btn.anchor.set(0.5);
        music_btn_txt = game.add.text((gameX+5), 600, 'MUSIC ON', style);
        music_btn_txt.anchor.set(0.5);
        music_btn.my_txt = music_btn_txt; //link this txt to this btn
        music_btn.music = true; //link this txt to this btn
        
        if (localStorage.getItem("followMyLeadMusicIsPlaying") == 0) {
            music_btn_txt.text = "MUSIC OFF";
            music_btn.music = false;
        }
        
        music_btn.input.useHandCursor = true;
        music_btn.events.onInputDown.add(onInputDownMusic, this);
        music_btn.events.onInputUp.add(onInputUpMusic, this);
        
        //sfx button
        sfx_btn = game.add.sprite(gameX, 700, 'button');
        sfx_btn.scale.set(0.5);
        sfx_btn.inputEnabled = true;
        sfx_btn.anchor.set(0.5);
        sfx_btn_txt = game.add.text((gameX+5), 700, 'SFX ON', style);
        sfx_btn_txt.anchor.set(0.5);
        sfx_btn.my_txt = sfx_btn_txt; //link this txt to this btn
        sfx_btn.sfx = true; //link this txt to this btn
        
        if (localStorage.getItem("followMyLeadSfxIsPlaying") == 0) {
            sfx_btn_txt.text = "SFX OFF";
            sfx_btn.sfx = false;
        }
        
        sfx_btn.input.useHandCursor = true;
        sfx_btn.events.onInputDown.add(onInputDownMusic, this);
        sfx_btn.events.onInputUp.add(onInputUpSfx, this);
        
        //reset button
        reset_btn = game.add.sprite(gameX, 900, 'button');
        reset_btn.scale.set(0.5);
        reset_btn.inputEnabled = true;
        reset_btn.anchor.set(0.5);
        reset_btn_txt = game.add.text((gameX+5), 900, 'RESET HIGHSCORE', style);
        reset_btn_txt.anchor.set(0.5);
        reset_btn.my_txt = reset_btn_txt; //link this txt to this btn
        
        reset_btn.input.useHandCursor = true;
        reset_btn.events.onInputDown.add(onInputDownMusic, this);
        reset_btn.events.onInputUp.add(resetHighScore, this);
        
        animateThis(title_txt, 300);
        animateThis(music_btn, 500);
        animateThis(music_btn_txt, 500);
        animateThis(sfx_btn, 700);
        animateThis(sfx_btn_txt, 700);
        animateThis(reset_btn, 900);
        animateThis(reset_btn_txt, 900);
        animateThis(back_btn, 1100);
    }
    
}



function onInputDownMusic(target) {    
    game.add.tween(target.scale).to({x: 0.4, y: 0.4}, 100, Phaser.Easing.Cubic.Out, true);
    game.add.tween(target.my_txt.scale).to({x: 0.9, y: 0.9}, 100, Phaser.Easing.Cubic.Out, true);
    console.log("clicking!");
    
}
function onInputUpMusic(target) {
    //console.log('button up', arguments);
    game.add.tween(target.scale).to({x: 0.5, y: 0.5}, 100, Phaser.Easing.Cubic.Out, true);
    game.add.tween(target.my_txt.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Cubic.Out, true);
    if(target.music) {
        music.fadeOut(500);
        //music.stop();
        target.music = false;
        music_btn_txt.text = "MUSIC OFF";
        music.enabled = 0;
        
        localStorage.setItem("followMyLeadMusicIsPlaying", music.enabled);
    }else{
        music.fadeIn(500);
        //music.play();
        target.music = true;
        music.enabled = 1;
        music_btn_txt.text = "MUSIC ON";
        localStorage.setItem("followMyLeadMusicIsPlaying", music.enabled);
    }
    if(sfx.enabled){
        click.play();
    }
}

function onInputUpSfx(target) {
    //console.log('button up', arguments);
    game.add.tween(target.scale).to({x: 0.5, y: 0.5}, 100, Phaser.Easing.Cubic.Out, true);
    game.add.tween(target.my_txt.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Cubic.Out, true);
    if(target.sfx) {
        target.sfx = false;
        sfx_btn_txt.text = "SFX OFF";
        sfx.enabled = 0;
        
        localStorage.setItem("followMyLeadSfxIsPlaying", sfx.enabled);
    }else{
        target.sfx = true;
        sfx.enabled = 1;
        sfx_btn_txt.text = "SFX ON";
        localStorage.setItem("followMyLeadSfxIsPlaying", sfx.enabled);
    }
    if(sfx.enabled){
        click.play();
    }
}
function resetHighScore(target){
    game.add.tween(target.scale).to({x: 0.5, y: 0.5}, 100, Phaser.Easing.Cubic.Out, true);
    game.add.tween(target.my_txt.scale).to({x: 1, y: 1}, 100, Phaser.Easing.Cubic.Out, true);
    
    localStorage.setItem("followMyLeadHighScore", 0);
}
