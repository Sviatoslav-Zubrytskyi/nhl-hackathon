const SCALE = 2
const TILE_SIZE = 32

const TILE_SET = {
	grass: PIXI.Texture.from('../assets/grass.png'),
	stone: PIXI.Texture.from('../assets/stone.png'),
}

let app = new PIXI.Application({ width: 1920, height: 1080 })

app.stage.scale.x = SCALE
app.stage.scale.y = SCALE

document.body.appendChild(app.view)

const player = PIXI.Sprite.from('assets/player.png')
player.anchor.set(0.5)

player.x = app.screen.width / 2
player.y = app.screen.height / 2

app.stage.addChild(player)

app.ticker.add(delta => {
	player.rotation += 0.1 * delta
})
