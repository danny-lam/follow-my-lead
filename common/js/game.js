
 
    var game = new Phaser.Game(768, 1165, Phaser.CANVAS, 'container');
    
    game.state.add('Boot', boot);
    game.state.add('Preload', preload);
    game.state.add('Menu', menu);
    game.state.add('Play', play);
    game.state.add('GameOver', gameOver);
    
    game.state.start('Boot');
    

