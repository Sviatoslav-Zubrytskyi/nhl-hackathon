const boundariesList = []

const levelData = [
	['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
	[
		'wall',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'wall',
	],
	[
		'wall',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'wall',
	],
	[
		'wall',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'wall',
	],
	[
		'wall',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'wall',
	],
	[
		'wall',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'wall',
	],
	[
		'wall',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'floor',
		'wall',
	],
	['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
]

const levelGenerator = new LevelGenerator(
	app,
	TILE_SET,
	levelData,
	boundariesList
)
levelGenerator.generateLevel()

// If you want to clear the level later:
// levelGenerator.clearLevel();
