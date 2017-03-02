var gameX;
var gameY;
var gameW;
var gameH;
var stage_btn;

var loading_txt;
var loadingStyle = {
    font: "60px Arial",
    fill: "#ffffff",
    wordWrap: true,
    wordWrapWidth: 1000,
    align: "center",
    fontWeight: "bold"
};
var imgArray = [];

var preload = {
    
    preload: function() {
        
        game.load.image("background", "common/img/bg.png");
        game.load.image("circle", "common/img/circle.png");
        game.load.image("cross", "common/img/cross.png");
        game.load.image("triangle", "common/img/triangle.png");
        game.load.image("square", "common/img/square.png");
        game.load.image("menu", "common/img/menu-icon.png");
        game.load.image("button", "common/img/main-button.png");
        
        imgArray = ["square", "triangle", "cross", "circle"];
        
        game.load.audio('bleep1', 'common/snd/sound1.wav');
        game.load.audio('bleep2', 'common/snd/sound2.wav');
        game.load.audio('bleep3', 'common/snd/sound3.wav');
        game.load.audio('bleep4', 'common/snd/sound4.wav');
        
        loading_txt = game.add.text(game.world.centerX, game.world.centerY, 'loading...', loadingStyle);
        loading_txt.anchor.set(0.5);
        
    },
    
    create: function() {
        
        game.state.start('Menu');
        gameX = game.world.centerX;
        gameY = game.world.centerY;
        gameW = game.world.width;
        gameH = game.world.height;
        
//        stage_btn = game.add.sprite(0, 0, game.add.bitmapData(gameW, gameH));
//        stage_btn.events.onInputDown.add(startGame, this);
//        stage_btn.inputEnabled = true;
    }
    
}

function startGame() {
    console.log("startGame");
    game.state.start('Menu');
}

function full_screen()
			{
			    // check if user allows full screen of elements. This can be enabled or disabled in browser config. By default its enabled.
			    //its also used to check if browser supports full screen api.
			    if("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document || "mozFullScreenEnabled" in document || "msFullscreenEnabled" in document) 
			    {
			    	if(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
			    	{
			    		console.log("User allows fullscreen");
			        
				        var element = document.getElementById("container");
				        //requestFullscreen is used to display an element in full screen mode.
				        if("requestFullscreen" in element) 
				        {
				            element.requestFullscreen();
				        } 
				        else if ("webkitRequestFullscreen" in element) 
				        {
				            element.webkitRequestFullscreen();
				        } 
				        else if ("mozRequestFullScreen" in element) 
				        {
				            element.mozRequestFullScreen();
				        } 
				        else if ("msRequestFullscreen" in element) 
				        {
				            element.msRequestFullscreen();
				        }

			    	}
			    }
			    else
			    {
			        console.log("User doesn't allow full screen");
			    }
			}

			function screen_change()
			{
				//fullscreenElement is assigned to html element if any element is in full screen mode.
				if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) 
				{
				    console.log("Current full screen element is : " + (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement))
				}
				else
				{
					// exitFullscreen us used to exit full screen manually
					if ("exitFullscreen" in document) 
					{
					    document.exitFullscreen();
					} 
					else if ("webkitExitFullscreen" in document) 
					{
					    document.webkitExitFullscreen();
					} 
					else if ("mozCancelFullScreen" in document) 
					{
					    document.mozCancelFullScreen();
					} 
					else if ("msExitFullscreen" in document) 
					{
					    document.msExitFullscreen();
					}
				}
			}

			//called when an event goes full screen and vice-versa.
			document.addEventListener("fullscreenchange", screen_change);
			document.addEventListener("webkitfullscreenchange", screen_change);
			document.addEventListener("mozfullscreenchange", screen_change);
			document.addEventListener("MSFullscreenChange", screen_change);

			//called when requestFullscreen(); fails. it may fail if iframe don't have allowfullscreen attribute enabled or for something else. 
			document.addEventListener("fullscreenerror", function(){console.log("Full screen failed");});
			document.addEventListener("webkitfullscreenerror", function(){console.log("Full screen failed");});
			document.addEventListener("mozfullscreenerror", function(){console.log("Full screen failed");});
			document.addEventListener("MSFullscreenError", function(){console.log("Full screen failed");});

