const levelData = [
	['grass', 'stone', 'grass', 'grass', 'grass', 'stone', 'grass'],
	['grass', 'stone', 'grass', 'grass', 'grass', 'stone', 'grass'],
	['grass', 'stone', 'stone', 'grass', 'stone', 'stone', 'grass'],
	['grass', 'stone', 'grass', 'grass', 'grass', 'stone', 'grass'],
	['stone', 'grass', 'stone', 'stone', 'stone', 'stone', 'stone'],
	['grass', 'stone', 'grass', 'grass', 'grass', 'stone', 'grass'],
]

const levelGenerator = new LevelGenerator(app, TILE_SET, levelData)
levelGenerator.generateLevel()

// If you want to clear the level later:
// levelGenerator.clearLevel();
