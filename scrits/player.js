class Player {
	constructor(app, worldContainer, boundariesList) {
		this.app = app
		this.worldContainer = worldContainer
		this.boundariesList = boundariesList
		this.health = 100

		this.player = PIXI.Sprite.from('assets/char_walk_left.gif')

		this.player.anchor.set(0)
		this.player.x = 160
		this.player.y = 160

		this.sword = PIXI.Sprite.from('assets/sword.png')

		this.points = 0

		this.camera = { x: 0, y: 0 }
		this.keys = {}
	}

	init() {
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
				this.attack(0.5)
			}
		})
	}

	attack(speed) {
		let isRotating = false
		let targetRotation = 0
		let rotationSpeed = 0.05

		if (!isRotating) {
			targetRotation = Math.PI * 2 // 360 degrees in radians
			isRotating = true

			app.ticker.add(() => {
				if (isRotating) {
					if (this.sword.rotation < targetRotation) {
						this.sword.rotation += rotationSpeed
					} else {
						isRotating = false
						app.ticker.remove(this.sword)
					}
				}
			})
		}
	}

	shot(player) {}

	die() {}
}

const isColliding = (player, boundary) => {
	return player.getBounds().intersects(boundary.getBounds())
}

const player = new Player(app, worldContainer, boundariesList)

player.init()
