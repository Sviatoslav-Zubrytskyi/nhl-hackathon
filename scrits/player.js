const stage = app.stage
const gameContainer = new PIXI.Container()
stage.addChild(gameContainer)

const player = PIXI.Sprite.from('assets/char_walk_left.gif')
player.x = 160
player.y = 160
stage.addChild(player)

const playerSpeed = 5

const keys = {}

// Listen for keydown events to set keys[keyCode] to true.
window.addEventListener('keydown', event => {
	keys[event.keyCode] = true
})

// Listen for keyup events to set keys[keyCode] to false.
window.addEventListener('keyup', event => {
	keys[event.keyCode] = false
})

const isColliding = (player, stoneBlock) => {
	return player.getBounds().intersects(stoneBlock.getBounds())
}

app.ticker.add(() => {
	// Check for collisions with stone blocks
	for (const boundary of boundariesList) {
		if (isColliding(player, boundary)) {
			// Prevent the player from moving
			player.x = player.previousX // Restore the previous player position
			player.y = player.previousY
		}
	}
	// Store the previous player position for collision handling
	player.previousX = player.x
	player.previousY = player.y

	if (keys[65]) {
		// Left arrow key
		player.x -= playerSpeed
	}
	if (keys[68]) {
		// Right arrow key
		player.x += playerSpeed
	}
	if (keys[87]) {
		// Up arrow key
		player.y -= playerSpeed
	}
	if (keys[83]) {
		// Down arrow key
		player.y += playerSpeed
	}
})
