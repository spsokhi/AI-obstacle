class Obstacle {
	constructor(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	show() {
		fill(50);
		noStroke();
		rect(this.x, this.y, this.width, this.height);
	}

	// check for collision against agents
	collides(agent) {
		// Get the center point of the agent's circular collision barrier
		let circleX = agent.position.x + agent.width / 2;
		let circleY = agent.position.y + agent.height / 2;
		let radius = 5;

		// Find the closest point to the circle within the rectangle
		let closestX = constrain(circleX, this.x, this.x + this.width);
		let closestY = constrain(circleY, this.y, this.y + this.height);

		// Calculate the distance between the circle's center and the closest point
		let distanceX = circleX - closestX;
		let distanceY = circleY - closestY;

		// Calculate the squared distance (avoid using expensive square root)
		let distanceSquared = distanceX * distanceX + distanceY * distanceY;

		// Check if the distance is less than the circle's radius squared
		return distanceSquared < radius * radius;
	}
}