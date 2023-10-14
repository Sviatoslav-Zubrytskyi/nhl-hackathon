const boundariesList = []

const levelData = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 2, 1, 1, 1, 2, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 2, 2, 2, 2, 2, 2, 2, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1],
]

const levelGenerator = new LevelGenerator(
	worldContainer,
	TILE_SET,
	levelData,
	boundariesList
)
levelGenerator.generateLevel()
// If you want to clear the level later:
// levelGenerator.clearLevel();
