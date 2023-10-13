const SCALE = 2
const TILE_SIZE = 32

const TILE_SET = {
	grass: PIXI.Texture.from('../assets/grass.png'),
	stone: PIXI.Texture.from('../assets/stone.png'),
}

let app = new PIXI.Application({ width: 1920, height: 1080 })

document.body.appendChild(app.view)
