// input
PW.Input = function (game) {
	this.game = game;

	// wasd
	this.moveLeftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.moveRightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
};

PW.Input.prototype.constructor = PW.Input;


PW.Input.prototype.leftIsDown = function () {
	return this.moveLeftButton.isDown;
};

PW.Input.prototype.rightIsDown = function () {
	return this.moveRightButton.isDown;
};

PW.Input.prototype.jumpIsJustDown = function () {
	return this.jumpButton.justDown;
};

PW.Input.prototype.destroy = function() {
    // nothing
};