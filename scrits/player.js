class Player {
	constructor(app, worldContainer, boundariesList) {
		this.app = app
		this.worldContainer = worldContainer
		this.boundariesList = boundariesList
		this.health = 100
		this.player = PIXI.Sprite.from('assets/char_walk_left.gif')
		this.player.x = 160
		this.player.y = 160

		this.camera = { x: 0, y: 0 }
		this.keys = {}
	}

	init() {
		this.worldContainer.addChild(this.player)

		window.addEventListener('keydown', event => {
			this.keys[event.keyCode] = true
		})
		window.addEventListener('keyup', event => {
			this.keys[event.keyCode] = false
		})

		this.app.ticker.add(() => {
			this.camera.x = this.player.x
			this.camera.y = this.player.y

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
		})
	}
}

const isColliding = (player, boundary) => {
	return player.getBounds().intersects(boundary.getBounds())
}

const player = new Player(app, worldContainer, boundariesList)

player.init()
