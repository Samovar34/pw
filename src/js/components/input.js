// input
PW.Input = function (game) {
	this.game = game;

	this.leftBtn, this.rightBtn, this.jumpBtn;

	this.game.input.addPointer();
	this.game.input.addPointer();

	// wasd
	this.moveLeftButton = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.moveRightButton = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
};

PW.Input.prototype.constructor = PW.Input;

PW.Input.prototype.update = function () {
	
};


PW.Input.prototype.reset = function () {
	this.customJump = false;
};

PW.Input.prototype.addLeftBtn = function (x, y) {
	this.leftBtn = this.game.add.button(16, 574, 'leftBtn', null, this);
	this.leftBtn.scale.setTo(1);
	this.leftBtn.inputEnabled = true;
};

PW.Input.prototype.addRightBtn = function (x, y) {
	this.rightBtn = this.game.add.button(16 + 90, 574, 'rightBtn', null, this);
	this.rightBtn.scale.setTo(1);
	this.rightBtn.inputEnabled = true;
};

PW.Input.prototype.leftIsDown = function () {
	return this.moveLeftButton.isDown || 
		this.leftBtn.input.checkPointerDown(this.game.input.pointer1, true) ||
		this.leftBtn.input.checkPointerDown(this.game.input.pointer2, true);
};

PW.Input.prototype.rightIsDown = function () {
	return this.moveRightButton.isDown || 
		this.rightBtn.input.checkPointerDown(this.game.input.pointer1, true) ||
		this.rightBtn.input.checkPointerDown(this.game.input.pointer2, true);
};

PW.Input.prototype.jumpIsJustDown = function () {
	// return this.jumpButton.justDown || 
	// 	this.jumpBtn.input.justPressed(1, 100) ||
	// 	this.jumpBtn.input.justPressed(2, 100);
	return this.jumpButton.justDown;
};

PW.Input.prototype.destroy = function() {
    // nothing
};
