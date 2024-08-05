// this is used as checkpoints for the agents to guide them in the right direction
class Checkpoint {
	constructor(x, y) {
		this.position = createVector(x, y);
		this.radius = 40;
	}

	// check if the node has collided with an agent
	collides(agent) {
		return p5.Vector.dist(agent.position, this.position) < this.radius;
	}

	show() {
		push();
		fill(0, 255, 0, 100); // Semi-transparent green for visibility
		noStroke();
		ellipse(this.position.x, this.position.y, this.radius);
		pop();
	}
}