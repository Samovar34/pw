PW.bootState = function (game) {};

PW.bootState.prototype = {
	preload: function () {

	},

	create: function () {
		this.game.stage.backgroundColor = '#ef5350';
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		// this.game.scale.pageAlignHorizontally = true;
		// this.game.scale.pageAlignVertically = true;

		this.game.state.start('preload');
	}
}