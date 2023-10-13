let app = new PIXI.Application({ width: 1920, height: 1080 })

document.body.appendChild(app.view)
const player = PIXI.Sprite.from('assets/player.png');
player.anchor.set(0.5);

player.x = app.screen.width / 2;
player.y = app.screen.height / 2;

app.stage.addChild(player);

app.ticker.add((delta) =>
{
    player.rotation += 0.1 * delta;
});