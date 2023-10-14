let enemies = []
//playerx = 100;
//playery = 100;

class Enemy {
	constructor(x, y) {
		//const enemy = PIXI.Sprite.from('assets/enemy.png')
		this.sprite = PIXI.Sprite.from('assets/enemy.png')
		this.sprite.anchor.set(0.5)
		this.sprite.x = x
		this.sprite.y = y
		this.lookangle = 0
		worldContainer.addChild(this.sprite)
		this.health = 100;
		enemies.push(this)

	}

	follow_player(player, speed, delta) {
		let coltrig = false
		for (const boundary of boundariesList) {
			if (isColliding(this.sprite, boundary)) {
				this.sprite.x = this.sprite.previousX
				this.sprite.y = this.sprite.previousY
				coltrig = true
			}
		}
		if (!coltrig) {
			this.sprite.previousX = this.sprite.x
			this.sprite.previousY = this.sprite.y
			let dx = player.x - this.sprite.x
			let dy = player.y - this.sprite.y
			let angle = Math.atan2(dy, dx)
			let angleDifference =
				(Math.abs(Math.abs(this.lookangle) - Math.abs(angle)) * 180) / Math.PI

			const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

			if (angleDifference % 360 <= 60 && distance <= 150) {
				document.getElementById('found').innerHTML =
					'I CAN SEE YOU!!! - ' + angleDifference + '<br>DIST:' + distance
				this.lookangle = angle
				const vx = Math.cos(angle) * speed
				const vy = Math.sin(angle) * speed
				this.sprite.x += vx
				this.sprite.y += vy
			} else if (distance <= 150 && distance >= 20) {
				this.lookangle += 0.1 * delta
			} else {
				this.hit_player(player)
				const vx = Math.cos(angle) * speed
				const vy = Math.sin(angle) * speed
				this.sprite.x -= vx
				this.sprite.y -= vy
			}
		}
	}
	hit_player(player){
		player.health -= 1;
		document.getElementById('found').innerHTML = player.health;
	}


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

let Enemy1 = new Enemy(100, 100);
//create_enemy(app.screen.width / 3 + 100, app.screen.height / 3 + 100)

app.ticker.add(delta => {
	enemies[0].follow_player(player, 1, delta)
})
