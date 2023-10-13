// Define the dimensions of the viewport (camera view).
const viewportWidth = app.screen.width;
const viewportHeight = app.screen.height;

// Create a viewport object.
const viewport = new Viewport({
    screenWidth: viewportWidth,
    screenHeight: viewportHeight,
    worldWidth: 1000, // Adjust to your game's world size.
    worldHeight: 1000, // Adjust to your game's world size.
});

// Add the game container to the viewport.
viewport.addChild(gameContainer);

// Attach the viewport to the PIXI app stage.
stage.addChild(viewport);

// Follow the player with the viewport.
viewport.follow(player, {
    speed: 5, // Adjust the camera speed as needed.
});

const worldTexture = PIXI.Texture.from('path/to/world.png');
const world = new PIXI.TilingSprite(worldTexture, viewport.worldWidth, viewport.worldHeight);
gameContainer.addChild(world);
