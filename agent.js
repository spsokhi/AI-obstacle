class Agent {
	constructor() {
		this.startPosition = createVector(50, height / 2);
		this.position = this.startPosition.copy();
		this.velocity = createVector(0, 0);
		this.acceleration = createVector(0, 0);
		this.brain = new Brain(1000);
		this.width = 30;
		this.height = 30;
		this.angle = 0;
		this.targetAngle = 0;
		this.turnSpeed = 0.05;
		this.fitness = 0;
		this.fitnessProbability = 0;
		this.stopped = false;
		this.stepsAlive = 0;
		this.hitObstacle = false;
		this.maxSpeed = 3;
		this.currentCheckpoint = 0;
		this.visitedCheckpoints = new Set();
		this.reachedGoal = false;
	}

	move() {
		if (this.brain.currentDirection < this.brain.directions.length) {
			this.targetAngle = this.brain.directions[this.brain.currentDirection];
			this.angle = this.lerpAngle(this.angle, this.targetAngle, this.turnSpeed);

			this.acceleration = p5.Vector.fromAngle(this.angle);
			this.brain.currentDirection++;
		} else {
			this.acceleration.set(0, 0);
		}

		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.position.add(this.velocity);
	}

	show() {
		push();
		translate(this.position.x + this.width / 2, this.position.y + this.height / 2);
		rotate(this.angle);
		imageMode(CENTER);
		image(agentImage, 0, 0, this.width, this.height);
		pop();
	}

	update() {
		if (!this.stopped) {
			this.move();
			this.stepsAlive++;
		}
	}

	lerpAngle(current, target, amt) {
		let difference = target - current;
		difference = ((difference + PI) % TWO_PI) - PI;
		return current + difference * amt;
	}

	kill() {
		this.brain.currentDirection = this.brain.size + 1;
		this.stopped = true;
	}

	outOfBounds() {
		// Get the center point of the agent's circular collision barrier
		let circleX = this.position.x + this.width / 2;
		let circleY = this.position.y + this.height / 2;
		let radius = 5;

		return (
			circleX - radius < 0 ||
			circleX + radius > width ||
			circleY - radius < 0 ||
			circleY + radius > height
		);
	}
}