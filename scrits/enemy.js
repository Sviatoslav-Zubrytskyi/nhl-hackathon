let enemies= [];
playerx = 100;
playery = 100;
function create_enemy(x, y) {
    const enemy = PIXI.Sprite.from('assets/enemy.png');
    enemy.anchor.set(0.5);
    enemy.x = x;
    enemy.y = y;
    app.stage.addChild(enemy);
    enemies.push(enemy);
}

//create_enemy(app.screen.width / 3 + 100, app.screen.height / 3 + 100)
create_enemy(100, 100);

app.ticker.add((delta) =>
{
    let dx = playerx - enemies[0].x;
    let dy = playery - enemies[0].y;
    let angle = Math.atan2(dy, dx);
    let angleDifference = (Math.abs(enemies[0].rotation - angle)*180)/Math.PI;
    if (angleDifference%360 <= 60) {
        document.getElementById("found").innerHTML = "I CAN SEE YOU!!!";
    } else {
        document.getElementById("found").innerHTML = "I CAN'T SEE YOU!";
    }
    enemies[0].rotation += 0.01 * delta;

});