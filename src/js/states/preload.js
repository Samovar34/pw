PW.preloadState = function (game) {};

let w1, w2;

PW.preloadState.prototype = {
	preload: function () {
	
		// TODO make atlas
		this.game.load.image('playerA', 'assets/images/playerA.png');
		this.game.load.image('playerB', 'assets/images/playerB.png');
		this.game.load.image('level1', 'assets/images/level1.png');
		this.game.load.image('tint', 'assets/images/tint.png');
		this.game.load.image('bgA', 'assets/images/bgA.png');
		this.game.load.image('bgB', 'assets/images/bgB.png');
		this.game.load.image('leftBtn', 'assets/images/icons2.png');
		this.game.load.image('rightBtn', 'assets/images/icons1.png');
		this.game.load.image('jumpBtn', 'assets/images/icons3.png');
		this.game.load.image('changeScreen', 'assets/images/icons4.png');
		this.game.load.image('startFullScreen', 'assets/images/icons5.png');

		// load audio, autoDecode = false
		this.load.audio('world1', ['assets/audio/world1.mp3'], false);
        this.load.audio('world2', ['assets/audio/world2.mp3'], false);
		
		// levels
		this.game.load.tilemap('level' + 1, "assets/levels/level" + 1 + ".json", null, Phaser.Tilemap.TILED_JSON);
		
		// TODO show message
	},

	create: function () {
		// add sounds and decode them
		this.game.debug.text('decoding...', 0, 0, '#0f0');
		this.game.sound.decode('world1');
		this.game.sound.decode('world2');

		w1 = this.game.add.sound('world1');
		w2 = this.game.add.sound('world2');

		//this.i = 0;

		// w1.onDecoded.add(this.doOnAudioDecode, this);
		// w2.onDecoded.add(this.doOnAudioDecode, this);
		this.game.sound.setDecodedCallback(['world1', 'world2'], this.doOnAudioDecode, this);
	},

	doOnAudioDecode: function (s) {
		// this.i++;
		// if (this.i == 2) {
		// 	w1.loopFull(1);
		// 	w2.loopFull(0);
		// 	this.game.state.start('play');
		// }

		w1.loopFull(1);
		w2.loopFull(0);
		this.game.state.start('play');
	}


}