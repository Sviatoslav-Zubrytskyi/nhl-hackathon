const SCALE = 2
const TILE_SIZE = 32

const TILE_SET = {
	floor: PIXI.Texture.from('../assets/grass.png'),
	void: PIXI.Texture.from('../assets/stone.png'),
	wall: PIXI.Texture.from('../assets/stone.png'),
}

const TILE_SET_DICT = {
	0: 'void',
	1: 'wall',
	2: 'floor',
}

const BOUNDARIES_TYPE = ['wall', 'void']

const PLAYER_SPEED = 5

let app = new PIXI.Application({ width: 1600, height: 800 })

app.stage.scale.x = SCALE
app.stage.scale.y = SCALE

document.body.appendChild(app.view)

const worldContainer = new PIXI.Container()

// worldContainer.scale.set(2)

app.stage.addChild(worldContainer)
