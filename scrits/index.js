const SCALE = 2
const TILE_SIZE = 32

const TILE_SET = {
	floor: PIXI.Texture.from('../assets/grass.png'),
	void: PIXI.Texture.from('../assets/stone.png'),
	wall: PIXI.Texture.from('../assets/stone.png'),
}

const BOUNDARIES_TYPE = ['wall', 'void']

let app = new PIXI.Application({ width: 1920, height: 1080 })

document.body.appendChild(app.view)
