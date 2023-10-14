let enemies = []
//playerx = 100;
//playery = 100;

const alive = PIXI.Texture.from('assets/enemy.png');
const dead = PIXI.Texture.from('assets/dead.png');
class Enemy {
	constructor(x, y, speed, damage) {
		//const enemy = PIXI.Sprite.from('assets/enemy.png')
		this.sprite = new PIXI.Sprite(alive)
		this.sprite.anchor.set(0)
		this.sprite.x = x
		this.sprite.y = y
		this.lookangle = 0
		this.hit = false;
		worldContainer.addChild(this.sprite)
		this.health = 100;
		this.speed = speed;
		this.damage = damage;
		this.alive = true;
	}

	follow_player(player, delta) {
		if(this.health > 0) {
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
				let dx = player.player.x - this.sprite.x
				let dy = player.player.y - this.sprite.y
				let angle = Math.atan2(dy, dx)
				let angleDifference =
					(Math.abs(Math.abs(this.lookangle) - Math.abs(angle)) * 180) / Math.PI

				const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))

				if (angleDifference % 360 <= 60 && distance <= 150) {
					this.lookangle = angle
					const vx = Math.cos(angle) * this.speed
					const vy = Math.sin(angle) * this.speed
					this.sprite.x += vx
					this.sprite.y += vy
					if (distance <= 20 && !this.hit) {
						this.hit_player(player)
						setTimeout(() => {
							this.hit = false;
						}, 2000);
					}
				} else if (distance <= 150 && distance >= 5) {
					this.lookangle += 0.1 * delta
				} else if (distance <= 50 && !this.hit){
					this.hit_player(player)
					setTimeout(() => {
						this.hit = false;
					}, 2000);

				}
			}
		} else if (this.alive){
			this.die();
		}

	}

	die(){
		var background = document.getElementById("myaudio");
		background.pause();
		var audio = document.getElementById("death-audio");
		let text_audio = "assets/death"+(Math.floor(Math.random() * 2) + 1)+".mp3";
		audio.src=text_audio;
		audio.play();
		setTimeout(() => {
				background.play();
		},2000);
		this.alive = false;
		this.sprite.texture = dead

	}

	hit_player(player){
		player.health -= this.damage;
		this.health -= 20;
		this.hit = true;
		player.points ++;
	}

}

enemies.push(new Enemy(200, 100, 1, 5))
enemies.push(new Enemy(200, 200, 2, 3))
enemies.push(new Enemy(200, 200, 1.9, 4))
enemies.push(new Enemy(200, 200, 1.4, 4))
enemies.push(new Enemy(200, 200, 1.3, 4))
enemies.push(new Enemy(200, 200, 1.7, 4))
//create_enemy(app.screen.width / 3 + 100, app.screen.height / 3 + 100)

app.ticker.add(delta => {
	//document.getElementById('found').innerHTML = "Health: " + player.health;

	let healthBarValue = document.getElementById("health");
	healthBarValue.value = player.health;
	for (const enemy of enemies) {
		enemy.follow_player(player,  delta)
	}
})
