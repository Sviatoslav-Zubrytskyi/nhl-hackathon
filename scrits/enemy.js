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
		this.got = false;
		worldContainer.addChild(this.sprite)
		this.health = 100;
		this.speed = speed;
		this.damage = damage;
		this.alive = true;
	}

	follow_player(player, delta) {
		if(this.health > 0) {
			if(isColliding(this.sprite, player.sword) && player.sword.isRotating && !this.got){
				this.health -= 30;
				this.got = true;
			}
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
		enemyCounter--;
		if (enemyCounter == 0) {
			Swal.fire(
				'Good job!',
				'You could free the entire building of enemies!',
				'success'
			)
		}
		const min = 1;
		const max = 5;

		const randomInt = Math.floor(Math.random() * (max - min) + min);
		if(randomInt >= 3) {
			player.health *= 1.25;
			if (player.health > 100) {
				player.health = 100;
			}
		}

		this.health = 0;
		var background = document.getElementById("myaudio");
		background.pause();
		var audio = document.getElementById("death-audio");
		let text_audio = "assets/death"+(Math.floor(Math.random() * 2) + 1)+".mp3";
		audio.src=text_audio;
		audio.play();
		if(countAudio != 0) {
			setTimeout(() => {
				background.play();
			},2000);
		}
		this.alive = false;
		this.sprite.texture = dead
		player.points++
		document.getElementById("score").innerHTML  = "Score: " + player.points;
	}

	hit_player(player){
		player.health -= this.damage;
		if (player.health <= 0) {
			player.die();
		}
		this.hit = true;
	}

}

const minspeed = 1; // Minimum value
const maxspeed = 4; // Maximum value
const maxdmg = 20;
let enemyCounter = levelGenerator.length;
for (const enemy of levelGenerator.enemySpawnsList) {
	const randomSpeed = Math.random() * (maxspeed - minspeed) + minspeed;
	enemies.push(new Enemy(enemy.x, enemy.y, randomSpeed, maxdmg/randomSpeed))
}
//create_enemy(app.screen.width / 3 + 100, app.screen.height / 3 + 100)

app.ticker.add(delta => {
	//document.getElementById('found').innerHTML = "Health: " + player.health;

	let healthBarValue = document.getElementById("health");
	healthBarValue.value = player.health;
	for (const enemy of enemies) {
		enemy.follow_player(player,  delta)
	}
})
