PW.playState = function (game) {};

PW.playState.prototype = {
	create: function () {

		// level variables

		// level components
		this.input = new PW.Input(this.game);

		// для запоминания скорости playerA
		this.tempVelocityAX = 0;
		this.tempVelocityAY = 0;

		// для запоминания скорости playerB
		this.tempVelocityBX = 0;
		this.tempVelocityBX = 0;

		let bg = this.game.add.sprite(0, 0, "level1");

		this.playerA = new PW.Player(this.game, this.input, 64, 64, 'A');
		this.playerB = new PW.Player(this.game, this.input, 64, 576, 'B');

		// stop movement for playerB
		this.playerB.canInput = false;
		this.playerB.body.velocity.x = 100;
		this.playerB.body.stop();
		this.playerB.body.gravity.y = 0;


		// Active screen is 1
		this.tint = this.game.add.sprite(0, 512, 'tint');
		this.tint.alpha = 0.8;
		this.tint.scale.setTo(720, 512);

		// w1.loopFull(1);
		// w2.loopFull(0);

		// map
		this.map = this.game.add.tilemap('level1', 16, 16);

		this.createCollision();

		this.phantom = this.game.add.sprite(0, 0);
		this.phantom.width = 32;
		this.phantom.height = 32;

		this.collision2d.add(this.phantom);

		this.phantom.body.immovable = true;

		// create collision


		this.game.input.onTap.add(this.changeActiveScreen, this);
	},

	update: function () {
		this.playerA.reset();
		this.playerB.reset();

		this.game.physics.arcade.collide(this.playerA, this.collision2d, this.playerCollideHandler, null, this);
		this.game.physics.arcade.collide(this.playerB, this.collision2d, this.playerCollideHandler, null, this);
	},

	render: function () {
		this.game.debug.text('play', 12, 12, '#0f0');
		//this.game.debug.physicsGroup(this.collision2d);
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
			this.tint.y = 512;
			w1.volume = 1;
			w2.volume = 0;

			// activate playerA
			this.playerA.canInput = true;
			// this.playerA.body.velocity.x = this.tempVelocityAX;
			// this.playerA.body.velocity.y = this.tempVelocityAY;
			this.playerA.body.gravity.y = 1000;

			this.phantom.x = this.playerB.x - 16;
			this.phantom.y = this.playerB.y - 16 - 512;

			// activate playerB
			this.playerB.canInput = false;
			// this.tempVelocityBX = this.playerB.body.velocity.x;
			// this.tempVelocityBY = this.playerB.body.velocity.y;
			this.playerB.body.stop();
			this.playerB.body.gravity.y = 0;
		}else {
			// active bottom screen
			this.tint.y = 0;
			w1.volume = 0;
			w2.volume = 1;
			console.log('top');

			// activate input for playerA
			this.playerB.canInput = true;
			//this.playerB.body.velocity.x = this.tempVelocityBX;
			//this.playerB.body.velocity.y = this.tempVelocityBY;
			this.playerB.body.gravity.y = 1000;

			this.phantom.x = this.playerA.x - 16;
			this.phantom.y = this.playerA.y - 16 + 512;

			// stop and memorize velocity
			this.playerA.canInput = false;
			//this.tempVelocityAX = this.playerA.body.velocity.x;
			//this.tempVelocityAY = this.playerA.body.velocity.y;
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