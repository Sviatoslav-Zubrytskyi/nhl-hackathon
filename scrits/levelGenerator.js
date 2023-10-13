class LevelGenerator {
	constructor(app, spriteTextures, levelData, wallsList) {
		this.app = app
		this.spriteTextures = spriteTextures
		this.levelData = levelData
		this.container = new PIXI.Container()
		this.boundariesList = boundariesList
	}

	generateLevel() {
		for (let y = 0; y < this.levelData.length; y++) {
			for (let x = 0; x < this.levelData[y].length; x++) {
				const spriteType = this.levelData[y][x]
				if (this.spriteTextures[spriteType]) {
					const sprite = new PIXI.Sprite(this.spriteTextures[spriteType])
					sprite.x = x * TILE_SIZE
					sprite.y = y * TILE_SIZE
					this.container.addChild(sprite)

					if (BOUNDARIES_TYPE.includes(spriteType))
						this.boundariesList.push(sprite)
				}
			}
		}
		this.app.stage.addChild(this.container)
	}

	clearLevel() {
		this.app.stage.removeChild(this.container)
		this.container.destroy({ children: true })
		this.container = new PIXI.Container()
	}
}
