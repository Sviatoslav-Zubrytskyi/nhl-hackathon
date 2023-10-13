const SCALE = 2
const TILE_SIZE = 32

const TILE_SET = {
	floor: PIXI.Texture.from('../assets/grass.png'),
	void: PIXI.Texture.from('../assets/stone.png'),
	wall: PIXI.Texture.from('../assets/stone.png'),
}

const BOUNDARIES_TYPE = ['wall', 'void']

const PLAYER_SPEED = 5

let app = new PIXI.Application({ width: 800, height: 800 })

document.body.appendChild(app.view)
