const SCALE = 2
const TILE_SIZE = 32

const TILE_SET = {
	floor: PIXI.Texture.from('../assets/floor.png'),
	void: PIXI.Texture.from('../assets/wall.png'),
	wall: PIXI.Texture.from('../assets/wall.jpg'),
	enemySpawn: PIXI.Texture.from('../assets/grass.png'),
}

const TILE_SET_DICT = {
	0: 'void',
	1: 'wall',
	2: 'floor',
	3: 'enemySpawn',
	4: 'playerSpawn',
}

const BOUNDARIES_TYPE = ['wall', 'void']

const PLAYER_SPEED = 5

let app = new PIXI.Application({ width: 1600, height: 800 })

app.stage.scale.x = SCALE
app.stage.scale.y = SCALE

document.body.appendChild(app.view)

const worldContainer = new PIXI.Container()

app.stage.addChild(worldContainer)
