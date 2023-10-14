const stage = app.stage

const player = PIXI.Sprite.from('assets/char_walk_left.gif')

player.x = 160
player.y = 160

worldContainer.addChild(player)
const camera = { x: 0, y: 0 }

const keys = {}

// Listen for keydown events to set keys[keyCode] to true.
window.addEventListener('keydown', event => {
	keys[event.keyCode] = true
})

// Listen for keyup events to set keys[keyCode] to false.
window.addEventListener('keyup', event => {
	keys[event.keyCode] = false
})

const isColliding = (player, boundary) => {
	return player.getBounds().intersects(boundary.getBounds())
}

app.ticker.add(() => {
	camera.x = player.x
	camera.y = player.y

	worldContainer.x = app.renderer.screen.width / 2 - camera.x
	worldContainer.y = app.renderer.screen.height / 2 - camera.y

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
		player.x -= PLAYER_SPEED
	}
	if (keys[68]) {
		// Right arrow key
		player.x += PLAYER_SPEED
	}
	if (keys[87]) {
		// Up arrow key
		player.y -= PLAYER_SPEED
	}
	if (keys[83]) {
		// Down arrow key
		player.y += PLAYER_SPEED
	}
})
