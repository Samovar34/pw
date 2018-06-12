let PW = {};

let game;

// include files

//@@include('./states/boot.js')
//@@include('./states/preload.js')
//@@include('./states/menu.js')
//@@include('./states/play.js')
//@@include('./states/gameover.js')

//@@include('./components/input.js')
//@@include('./components/player.js')

window.onload = () => {
	game = new Phaser.Game({
		width: 360,
		height: 640,
		renderer: Phaser.AUTO,
		enableDebug: true,
		antialias: false
	});

	game.state.add('boot', PW.bootState);
	game.state.add('preload', PW.preloadState);
	game.state.add('play', PW.playState);

	// start gaem
	game.state.start('boot');
}