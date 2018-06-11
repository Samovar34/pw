PW.preloadState = function (game) {};

let w1, w2;

PW.preloadState.prototype = {
	preload: function () {
	
		this.game.load.image('playerA', 'assets/images/playerA.png');
		this.game.load.image('playerB', 'assets/images/playerB.png');
		this.game.load.image('level1', 'assets/images/level1.png');
		this.game.load.image('tint', 'assets/images/tint.png');

		// audio
		this.load.audio('world1', ['assets/audio/world1.ogg', 'assets/audio/world1.mp3']);
        this.load.audio('world2', ['assets/audio/world2.ogg', 'assets/audio/world12.mp3']);
		
		// levels
		this.game.load.tilemap('level' + 1, "assets/levels/level" + 1 + ".json", null, Phaser.Tilemap.TILED_JSON);
		
		this.game.debug.text('loading...', 0, 0, '#0f0');
	},

	create: function () {
		this.game.debug.text('decoding...', 0, 0, '#0f0');
		w1 = this.game.add.sound('world1');
		w2 = this.game.add.sound('world2');
		this.game.sound.setDecodedCallback([w1, w2], this.doOnAudioDecode, this);
	},

	doOnAudioDecode: function () {
		this.game.state.start('play');
	}


}