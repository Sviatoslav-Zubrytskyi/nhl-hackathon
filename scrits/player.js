const stage = app.stage
const gameContainer = new PIXI.Container()
stage.addChild(gameContainer)

const player = PIXI.Sprite.from('assets/char_walk_left.gif')
player.x = 160
player.y = 160
stage.addChild(player)

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

const willCollide = (player, boundariesList, nextX, nextY) => {
	const tempPlayer = new PIXI.Sprite(player.sprite)

	tempPlayer.x = nextX
	tempPlayer.y = nextY

	for (const boundary of boundariesList) {
		if (isColliding(tempPlayer, boundary)) return true
	}
	return false
}

app.ticker.add(() => {
	if (keys[65]) {
		const nextX = player.x - PLAYER_SPEED
		const nextY = player.y

		// Left arrow key
		if (!willCollide(player, boundariesList, nextX, nextY))
			player.x -= PLAYER_SPEED
	}
	if (keys[68]) {
		const nextX = player.x + PLAYER_SPEED + TILE_SIZE
		const nextY = player.y

		// Right arrow key
		if (!willCollide(player, boundariesList, nextX, nextY))
			player.x += PLAYER_SPEED
	}
	if (keys[87]) {
		const nextX = player.x
		const nextY = player.y - PLAYER_SPEED

		// Up arrow key
		if (!willCollide(player, boundariesList, nextX, nextY))
			player.y -= PLAYER_SPEED
	}
	if (keys[83]) {
		const nextX = player.x
		const nextY = player.y + PLAYER_SPEED + TILE_SIZE

		// Down arrow key
		if (!willCollide(player, boundariesList, nextX, nextY))
			player.y += PLAYER_SPEED
	}
})
