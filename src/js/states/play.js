PW.playState = function (game) {};

PW.playState.prototype = {
	create: function () {

		// level variables

		// level components
		this.input = new PW.Input(this.game);

		// background
		let bgA = this.game.add.sprite(0, 0, 'bgA');
		bgA.smoothed = false;
		bgA.scale.setTo(360, 288);

		let bgB = this.game.add.sprite(0, 288, 'bgB');
		bgB.smoothed = false;
		bgB.scale.setTo(360, 288);

		let bg = this.game.add.sprite(0, 0, "level1");

		this.playerA = new PW.Player(this.game, this.input, 64, 64, 'A');
		this.playerB = new PW.Player(this.game, this.input, 64, 332, 'B');

		// stop movement for playerB
		this.playerB.canInput = false;
		this.playerB.body.velocity.x = 100;
		this.playerB.body.stop();
		this.playerB.body.gravity.y = 0;


		// Active screen is 1
		this.tint = this.game.add.sprite(0, 288, 'tint');
		this.tint.alpha = 0.8;
		this.tint.scale.setTo(360, 288);

		// map
		this.map = this.game.add.tilemap('level1', 16, 16);

		this.createCollision();

		this.phantom = this.game.add.sprite(0, 0);
		this.phantom.width = 24;
		this.phantom.height = 24;

		this.collision2d.add(this.phantom);

		this.phantom.body.immovable = true;

		// create collision

		// buttons
		this.input.addLeftBtn(32, 542);
		this.input.addRightBtn(32 + 128 + 64, 542);
		//this.input.addJumpBtn(720 - 128 - 64, 1084);

		this.fullScreenBtn = this.game.add.button(360-64, 0, 'startFullScreen', this.goToFullScreen, this);

		this.jumpBtn = this.game.add.button(360-64-16, 574, 'jumpBtn', null, this);
		this.jumpBtn.onInputDown.add(this.playerJump, this);

		this.changeBtn = this.game.add.button(360-164, 574, 'changeScreen', null, this);
		this.changeBtn.onInputDown.add(this.changeActiveScreen, this);
	},

	playerJump: function () {
		this.playerA.jump();
		this.playerB.jump();
	},

	update: function () {
		this.playerA.reset();
		this.playerB.reset();

		this.game.physics.arcade.collide(this.playerA, this.collision2d, this.playerCollideHandler, null, this);
		this.game.physics.arcade.collide(this.playerB, this.collision2d, this.playerCollideHandler, null, this);
	},

	render: function () {
		// this.game.debug.text('play', 12, 12, '#0f0');
		// this.game.debug.text('pointer1: ' + this.game.input.pointer1.isDown, 12, 36, '#0f0');
		// this.game.debug.text('pointer2: ' + this.game.input.pointer2.isDown, 12, 56, '#0f0');
		//this.game.debug.physicsGroup(this.collision2d);
		// this.game.debug.pointer(game.input.mousePointer);
		// this.game.debug.pointer(this.game.input.pointer1);
		// this.game.debug.pointer(this.game.input.pointer2);
	},
	
	goToFullScreen: function () {
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
		if (this.game.scale.isFullScreen) {
			this.game.scale.stopFullScreen();
		} else {
			this.game.scale.startFullScreen();
		}
	},
	
	changeActiveScreen: function () {
		if (this.tint.y == 0) {
			// active top screen
			this.tint.y = 288;
			w1.volume = 1;
			w2.volume = 0;

			// activate playerA
			this.playerA.canInput = true;
			this.playerA.body.gravity.y = 1000;

			// platform position
			this.phantom.x = this.playerB.x - 12;
			this.phantom.y = this.playerB.y - 12 - 288;

			// activate playerB
			this.playerB.canInput = false;
			this.playerB.body.stop();
			this.playerB.body.gravity.y = 0;
		}else {
			// active bottom screen
			this.tint.y = 0;
			w1.volume = 0;
			w2.volume = 1;

			// activate input for playerA and physic
			this.playerB.canInput = true;
			this.playerB.body.gravity.y = 1000;

			// platform position
			this.phantom.x = this.playerA.x - 12;
			this.phantom.y = this.playerA.y - 12 + 288;

			// stop gravity and velocity
			this.playerA.canInput = false;
			this.playerA.body.stop();
			this.playerA.body.gravity.y = 0;
		}
	},

	// поиск элементов в json карте Tilemap
	// TODO оптимизировать: функция объявляется каждый раз при вызове метода
	findObjectsByType: function (type, map, layer) {
		let result = [];
		// tilemap.objects возвращает массив слоёв
		map.objects[layer].forEach(function (element) {
			if (element.type === type) {
				// в Phaser anchor верхний левый угол, а в Tiled левый нижний угол
				element.y -= map.tileHeight;
				result.push(element);
			}
		});
	
		return result;
	},

	// создать коллайдеры уровня
	createCollision: function () {
		// create collision group and activate physics
		this.collision2d  = this.game.add.group();
		this.collision2d.enableBody = true;

		//temp variables
		let tempArray = this.findObjectsByType('box2d', this.map, 'collision');
		let tempElement = null;

		for (var i = 0; i < tempArray.length; i++) {
			// create element
			tempElement = this.game.make.sprite(tempArray[i].x, tempArray[i].y + 16);
			tempElement.width = tempArray[i].width;
			tempElement.height = tempArray[i].height;

			// add to group
			this.collision2d.add(tempElement);
		}

		this.collision2d.setAll("body.immovable", "true");
	},

	// collider Phaser.Sprite
	// this = Phaser.State
	playerCollideHandler: function (player, collider) {
		player.customTouchUp = player.body.touching.up;
		player.customTouchRight = player.body.touching.right;
		player.customTouchDown = player.body.touching.down;
		player.customTouchLeft = player.body.touching.left;
	}
}