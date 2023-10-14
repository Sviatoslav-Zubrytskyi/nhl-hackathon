const shakeScreen = (intensity, duration) => {
	const originalPosition = app.stage.position.clone()
	let startTime = Date.now()

	const updateShake = () => {
		const elapsedTime = Date.now() - startTime

		if (elapsedTime < duration) {
			const xOffset = (Math.random() - 0.5) * intensity
			const yOffset = (Math.random() - 0.5) * intensity
			app.stage.position.set(
				originalPosition.x + xOffset,
				originalPosition.y + yOffset
			)
			requestAnimationFrame(updateShake)
		} else {
			app.stage.position.copyFrom(originalPosition)
		}
	}

	updateShake()
}
