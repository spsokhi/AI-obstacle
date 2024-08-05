class Goal {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.width = 20;
		this.height = 20;
	}

	show() {
		fill(0, 255, 0);
		stroke(0);
		ellipse(this.position.x, this.position.y, this.width, this.height);
	}

	// check for collision against agents
	collides(agent) {
		// Get the center point of the agent's circular collision barrier
		let circleX = agent.position.x + agent.width / 2;
		let circleY = agent.position.y + agent.height / 2;
		let radius = 5;

		// Find the closest point to the circle within the rectangle
		let closestX = constrain(
			circleX,
			this.position.x - this.width / 2,
			this.position.x + this.width / 2
		);
		let closestY = constrain(
			circleY,
			this.position.y - this.height / 2,
			this.position.y + this.height / 2
		);

		// Calculate the distance between the circle's center and the closest point
		let distanceX = circleX - closestX;
		let distanceY = circleY - closestY;

		// Calculate the squared distance (avoid using expensive square root)
		let distanceSquared = distanceX * distanceX + distanceY * distanceY;

		// Check if the distance is less than the circle's radius squared
		return distanceSquared < radius * radius;
	}
}