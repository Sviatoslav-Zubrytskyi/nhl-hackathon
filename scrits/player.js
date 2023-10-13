const stage = app.stage;
const gameContainer = new PIXI.Container();
stage.addChild(gameContainer);

const player = PIXI.Sprite.from('assets/player.png');
player.x = app.screen.width/2;
player.y = app.screen.height/2;
stage.addChild(player);

const playerSpeed = 5;

const keys = {};

// Listen for keydown events to set keys[keyCode] to true.
window.addEventListener('keydown', (event) => {
    keys[event.keyCode] = true;
});

// Listen for keyup events to set keys[keyCode] to false.
window.addEventListener('keyup', (event) => {
    keys[event.keyCode] = false;
});

app.ticker.add(() => {
    if (keys[37]) { // Left arrow key
        player.x -= playerSpeed;
    }
    if (keys[39]) { // Right arrow key
        player.x += playerSpeed;
    }
    if (keys[38]) { // Up arrow key
        player.y -= playerSpeed;
    }
    if (keys[40]) { // Down arrow key
        player.y += playerSpeed;
    }
});
