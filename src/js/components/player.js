PW.Player = function (game, input, x, y, name) {
	
	// Phaser.Sprite.call(this, game, x, y, "atlas_2", "player1.png");
	// extend
	Phaser.Sprite.call(this, game, x, y, 'player' + name);

	this.game = game;
	this.input = input;

	this.options = {
		gravity: 1000,
		speed: 292,
		maxFallSpeed: 720,
		runSpeedUpRate: 1.5,
		acceleration: 4800,
		jump: 400,
		drag: 5950,
		inAirAccelerationRate: 0.45, // acceleration *= inAirAccelerationRate
		inAirDrag: 0.1,
		groundDelay: 5, // delay in frames
		wallBreakTime: 15, // delay in frames
		walkAnimationSpeed: 11,
		doubleAnimationSpeed: 10,
		comeInAnimationSpeed: 10
	};
	
	// player variables
	this.facing = "right";
	this.settable = true; // проверка на возможность настроить игрока для текущего состояния
	this.canInput = true; // возможно ли управление персонажем
	this.isComeIn = false; // входит ли игрок в дверь
	this.isInteract = false; // может ли взаимодействовать игрок с тригерром
	this.inTrigger = false; // внутри триггера или нет?

	this.anchor.setTo(0.5);
	this.scale.setTo(0.75);
	this.smoothed = false;
	
	// physics
	this.game.physics.arcade.enable(this);
	//this.body.setSize(26, 30, 4, 2);
	this.body.gravity.y = this.options.gravity;
	//this.body.collideWorldBounds = true;
	this.body.acceleration.x = 0;
	this.body.maxVelocity.x = this.options.speed;
	this.body.maxVelocity.y = this.options.maxFallSpeed;
	this.body.drag.x = this.options.drag;
	this.currentSpeed = 0; 
	this.groundDelay = this.options.groundDelay; // player can jump a few frames after leaving ground
	this.groundDelayTimer = 0;
	this.wasOnGround = true; // for custom ground check
	this.wallBreakTime = this.options.wallBreakTime;
	this.wallBreakClock = 0; // for custom wall check

	// physics variables
	this.canJump = true;
	this.canDoubleJump = false;
	this.onWall = false;
	this.acceleration = 0;
	
	this.customTouchUp = false;
	this.customTouchRight = false;
	this.customTouchDown = false;
	this.customTouchLeft = false;

	// player state
	this.currentState = this.groundState;

	//add to game
	this.game.add.existing(this);
};

PW.Player.prototype = Object.create(Phaser.Sprite.prototype);
PW.Player.prototype.constructor = PW.Player;

PW.Player.prototype.update = function () {

	// check collision with wall
	// for particles when player touch roof
	// if(this.customTouchUp) {
	//     this.soundManager.playPunch();
	// }

	//this.currentState();
	

	this.input.update();

	this.move();

	if (this.canInput && this.input.jumpIsJustDown()) {
	    this.jump();
	}

	this.input.reset();
};

PW.Player.prototype.jump = function () {
	if (this._onFloor() && this.canInput) {
		this.body.velocity.y = this.options.jump * -1;
	}
};

PW.Player.prototype.move = function () {
	// reset
	this.currentAcceleration = 0;

	if (this.canInput && this.input.leftIsDown()) {
		this.currentAcceleration -= this.options.acceleration;
	}

	if (this.canInput && this.input.rightIsDown()) {
		this.currentAcceleration += this.options.acceleration;
	}

	this.body.acceleration.x = this.currentAcceleration;
};

PW.Player.prototype._onFloor = function () {
	return this.customTouchDown;
};

PW.Player.prototype.reset = function () {
	this.isInteract = false;
	this.inTrigger = false;
	this.hasKey = false;

	this.customTouchUp = false;
	this.customTouchRight = false;
	this.customTouchDown = false;
	this.customTouchLeft = false;
};