let enemies = []
//playerx = 100;
//playery = 100;

lookangle = 0
function create_enemy(x, y) {
	const enemy = PIXI.Sprite.from('assets/enemy.png')
	enemy.anchor.set(0.5)
	enemy.x = x
	enemy.y = y
	worldContainer.addChild(enemy)
	enemies.push(enemy)
}
function hasObstacleBetween(startX, startY, endX, endY) {
	const distance = Math.sqrt(
		Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2)
	)
	const stepX = (endX - startX) / distance
	const stepY = (endY - startY) / distance
	let trigger = false
	for (let t = 0; t < distance; t += 5) {
		const x = startX + stepX * t
		const y = startY + stepY * t
		trigger = true
	}
	return trigger
}

function follow_player(enemy, player, speed, delta) {
	let coltrig = false
	for (const boundary of boundariesList) {
		if (isColliding(enemy, boundary)) {
			enemy.x = enemy.previousX
			enemy.y = enemy.previousY
			coltrig = true
		}
	}
	if (!coltrig) {
		enemy.previousX = enemy.x
		enemy.previousY = enemy.y
		let dx = player.x - enemies[0].x
		let dy = player.y - enemies[0].y
		let angle = Math.atan2(dy, dx)
		let angleDifference =
			(Math.abs(Math.abs(lookangle) - Math.abs(angle)) * 180) / Math.PI

		const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

		if (angleDifference % 360 <= 60 && distance <= 150) {
			document.getElementById('found').innerHTML =
				'I CAN SEE YOU!!! - ' + angleDifference + '<br>DIST:' + distance
			lookangle = angle
			const vx = Math.cos(angle) * speed
			const vy = Math.sin(angle) * speed
			if (distance > 0) {
				enemy.x += vx
				enemy.y += vy
			}
		} else if (distance <= 150) {
			lookangle += 0.1 * delta
			document.getElementById('found').innerHTML =
				"I CAN'T SEE YOU!" +
				angleDifference +
				'<br>' +
				(enemies[0].rotation * 180) / Math.PI +
				'<br>' +
				(angle * 180) / Math.PI
		} else {
			document.getElementById('found').innerHTML =
				"I CAN'T SEE YOU!" +
				angleDifference +
				'<br>' +
				(enemies[0].rotation * 180) / Math.PI +
				'<br>' +
				(angle * 180) / Math.PI
		}
	}
}

//create_enemy(app.screen.width / 3 + 100, app.screen.height / 3 + 100)
create_enemy(100, 100)

app.ticker.add(delta => {
	follow_player(enemies[0], player, 1, delta)
})
