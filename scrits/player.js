class Player {
	constructor(app, worldContainer, boundariesList) {
		this.app = app
		this.worldContainer = worldContainer
		this.boundariesList = boundariesList
		this.health = 100

<<<<<<< Updated upstream
		this.player = PIXI.Sprite.from('assets/char_walk_left.gif')
		this.heald = false;
=======
		this.player = PIXI.Sprite.from('assets/player.png')

>>>>>>> Stashed changes
		this.player.anchor.set(0)
		this.player.x = 260
		this.player.y = 260
		this.alive = true;
		this.sword = PIXI.Sprite.from('assets/sword.png')
		this.sword.isrotating = false;
		this.sword.num = 1;
		this.points = 0

		this.camera = { x: 0, y: 0 }
		this.keys = {}
	}

	init() {
		if(this.alive) {
			this.worldContainer.addChild(this.player)
			this.player.addChild(this.sword)

			// this.sword.pivot.set(this.sword.width / 2, this.sword.height)

			window.addEventListener('keydown', event => {
				this.keys[event.keyCode] = true
			})
			window.addEventListener('keyup', event => {
				this.keys[event.keyCode] = false
			})

			document.addEventListener('click', () => this.shot(this.player))

			this.app.ticker.add(() => {
				this.camera.x = this.player.x
				this.camera.y = this.player.y

				this.sword.position.set(0, 28)
				this.sword.pivot.set(0, 28)

				this.worldContainer.x =
					this.app.renderer.screen.width / (2 * SCALE) - this.camera.x
				this.worldContainer.y =
					this.app.renderer.screen.height / (2 * SCALE) - this.camera.y

				for (const boundary of this.boundariesList) {
					if (isColliding(this.player, boundary)) {
						// Prevent the player from moving
						this.player.x = this.player.previousX // Restore the previous player position
						this.player.y = this.player.previousY
					}
				}
				// Store the previous player position for collision handling
				this.player.previousX = this.player.x
				this.player.previousY = this.player.y

				if (this.keys[65]) {
					// Left arrow key
					this.player.x -= PLAYER_SPEED
				}
				if (this.keys[68]) {
					// Right arrow key
					this.player.x += PLAYER_SPEED
				}
				if (this.keys[87]) {
					// Up arrow key
					this.player.y -= PLAYER_SPEED
				}
				if (this.keys[83]) {
					// Down arrow key
					this.player.y += PLAYER_SPEED
				}
				if (this.keys[69]) {
					// E key
					this.attack()
				}
				if (this.keys[72]) {
					if(!this.heald) {
						this.health = 100;
						this.heald = true;
					}
				}
			})
		}

	}

	attack() {
		if (this.sword.isRotating) {
			return;
		}
		var audio = document.getElementById("sword-audio");
		let text_audio = "assets/sword"+player.sword.num+".mp3";
		if (player.sword.num == 4){
			player.sword.num = 1
		} else {
			player.sword.num ++
		}
		audio.src=text_audio;
		audio.play();

		this.sword.isRotating = true;
		const targetRotation = Math.PI * 2;
		const rotationSpeed = 0.5;

		const rotateSword = () => {
			if (this.sword.rotation < targetRotation) {
				this.sword.rotation += rotationSpeed;
			} else {
				for (const enemy of enemies) {
					enemy.got = false;
				}
				this.sword.isRotating = false;
				this.sword.rotation = 0;
				app.ticker.remove(rotateSword);
			}
		};

		app.ticker.add(rotateSword);

	}

	shot(player) {}

	die() {
		enemies = null;
		this.alive = false;
		Swal.fire({
			icon: 'Looser',
			title: 'Oops...',
			text: "You couldn't defeat all enemies!",
			showCancelButton: true,
			confirmButtonText: 'Continue',
			cancelButtonText: 'Exit',
		}).then((result) => {
			if (result.isConfirmed) {
				window.location.reload();
			} else {
				window.location.href = "menu/menu.html";
			}
		});
	}
}



const isColliding = (player, boundary) => {
	return player.getBounds().intersects(boundary.getBounds())
}

const player = new Player(app, worldContainer, boundariesList)

player.init()
