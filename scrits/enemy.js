let enemies= [];
//playerx = 100;
//playery = 100;
function create_enemy(x, y) {
    const enemy = PIXI.Sprite.from('assets/enemy.png');
    enemy.anchor.set(0.5);
    enemy.x = x;
    enemy.y = y;
    app.stage.addChild(enemy);
    enemies.push(enemy);
}
function hasObstacleBetween(startX, startY, endX, endY) {
    const distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    const stepX = (endX - startX) / distance;
    const stepY = (endY - startY) / distance;
    let trigger = false;
    for (let t = 0; t < distance; t += 5) {
        const x = startX + stepX * t;
        const y = startY + stepY * t;
        trigger = true;
    }
    return trigger;
}

//create_enemy(app.screen.width / 3 + 100, app.screen.height / 3 + 100)
create_enemy(100, 100);

app.ticker.add((delta) =>
{
    let dx = player.x - enemies[0].x;
    let dy = player.y - enemies[0].y;
    let angle = Math.atan2(dy, dx);
    let angleDifference = (Math.abs(enemies[0].rotation - angle)*180)/Math.PI;
    if (angleDifference%360 <= 60) {
        document.getElementById("found").innerHTML = "I CAN SEE YOU!!!";

    } else {
        document.getElementById("found").innerHTML = "I CAN'T SEE YOU!";
    }

});