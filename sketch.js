const populationSize = 300;
let alive;
const mutationRate = 0.01; // % chance of agent dna being changed
const agents = []; // all the players/agents
const obstacles = []; // the walls, roof and floor
const checkpoints = []; // holds all the checkpoints for the agents to guide them on the right path
let agentImage;
let goal;
let geneticAlgorithm;
let speedMultiplier = 1; // how fast the game is running

function preload() {
	agentImage = loadImage("./assets/agent.png");
}

function setup() {
	createCanvas(1000, 1000);
	frameRate(60);

	// create obstacles
	createObstacles();

	// create goal
	goal = new Goal(width - 50, height / 2);

	// initialize the genetic algorithm
	geneticAlgorithm = new GeneticAlgorithm(populationSize, mutationRate);
	geneticAlgorithm.createPopulation();
	alive = populationSize;

	// create checkpoints
	createCheckpoints();
}

function draw() {
	background(230);

	// all logic stuff
	for (let i = 0; i < speedMultiplier; i++) {
		updateAgents();
		checkCollisions();

		// check if all the agents have died or found the goal and then start next generation
		if (geneticAlgorithm.allAgentsFinished()) {
			geneticAlgorithm.evolve();
			alive = populationSize;
		}
	}

	// all the displaying stuff
	displayAgents();
	displayObstacles();
	goal.show();
	// displayCheckpoints();

	fill(255);
	textSize(60);
	textStyle(BOLD);
	text("Generation: " + geneticAlgorithm.generation, 50, 100);
	text("Alive: " + alive, 50, 200);
	// text("Speed: " + speedMultiplier + "x", 50, 300);
}

function updateAgents() {
	for (let i = 0; i < populationSize; i++) {
		let agent = geneticAlgorithm.population[i];
		agent.update();
	}
}

function displayAgents() {
	if (geneticAlgorithm.displayingBest) {
		let bestAgent = geneticAlgorithm.getBestAgent();
		bestAgent.show();
	} else {
		for (let i = 0; i < populationSize; i++) {
			let agent = geneticAlgorithm.population[i];
			agent.show();
		}
	}
}

function createCheckpoints() {
	let checkpoint0 = new Checkpoint(325, height / 2);
	let checkpoint1 = new Checkpoint(375, height / 2);
	let checkpoint2 = new Checkpoint(375, height / 2 + 37.5);
	let checkpoint3 = new Checkpoint(375, height / 2 + 75);

	let checkpoint4 = new Checkpoint(425, height / 2 + 75);
	let checkpoint5 = new Checkpoint(475, height / 2 + 75);

	let checkpoint6 = new Checkpoint(475, height / 2 + 37.5);
	let checkpoint7 = new Checkpoint(475, height / 2);
	let checkpoint8 = new Checkpoint(475, height / 2 - 37.5);

	let checkpoint9 = new Checkpoint(475, height / 2 - 75);

	let checkpoint10 = new Checkpoint(525, height / 2 - 75);
	let checkpoint11 = new Checkpoint(575, height / 2 - 75);
	let checkpoint12 = new Checkpoint(575, height / 2 - 35);

	let checkpoint13 = new Checkpoint(600, height / 2);

	checkpoints.push(
		checkpoint0,
		checkpoint1,
		checkpoint2,
		checkpoint3,
		checkpoint4,
		checkpoint5,
		checkpoint6,
		checkpoint7,
		checkpoint8,
		checkpoint9,
		checkpoint10,
		checkpoint11,
		checkpoint12,
		checkpoint13
	);
}

function createObstacles() {
	roof = new Obstacle(0, 0, width, height / 2 - 100);
	floor = new Obstacle(0, height / 2 + 100, width, height / 2 - 100);
	// wall1 = new Obstacle(150, height / 2 - 50, 50, 100); // initial close up wall
	wall2 = new Obstacle(300, height / 2 + 25, 50, 75); // bottom wall
	wall3 = new Obstacle(300, height / 2 - 100, 100, 75); // top wall
	wall4 = new Obstacle(400, height / 2 - 100, 50, 150); // connecting to top wall going down
	wall5 = new Obstacle(500, height / 2 - 50, 50, 150);
	wall6 = new Obstacle(600, height / 2 - 100, 500, 75); // corridor wall top
	wall7 = new Obstacle(600, height / 2 + 25, 500, 75); // corridor wall bottom

	obstacles.push(roof, floor, wall2, wall3, wall4, wall5, wall6, wall7);
}

function displayObstacles() {
	for (let i = 0; i < obstacles.length; i++) {
		obstacles[i].show();
	}
}

function displayCheckpoints() {
	for (let i = 0; i < checkpoints.length; i++) {
		checkpoints[i].show();
	}
}

function checkCollisions() {
	for (let i = 0; i < populationSize; i++) {
		let agent = geneticAlgorithm.population[i];

		if (agent.stopped) continue;

		// check collision against obstacles
		for (let j = 0; j < obstacles.length; j++) {
			if (obstacles[j].collides(agent)) {
				alive--;
				agent.kill();
				agent.hitObstacle = true;
			}
		}

		// check if agent collides with a checkpoint
		if (agent.currentCheckpoint < checkpoints.length) {
			for (let i = agent.currentCheckpoint; i < checkpoints.length; i++) {
				if (checkpoints[i].collides(agent)) {
					agent.visitedCheckpoints.add(agent.currentCheckpoint);

					agent.currentCheckpoint++;
				}
			}
		}

		// check if agent collides with the goal
		if (goal.collides(agent)) {
			alive--;
			agent.kill();
			agent.reachedGoal = true;
		}

		// check if agent went beyond screen boundaries
		if (agent.outOfBounds()) {
			alive--;
			agent.kill();
			agent.hitObstacle = true;
		}
	}
}

function keyPressed() {
	if (key === "w") {
		speedMultiplier++;
	} else if (key === "s") {
		if (speedMultiplier > 1) {
			speedMultiplier--;
		}
	} else if (key === "z") {
		speedMultiplier = 1;
	} else if (key === "x") {
		speedMultiplier = 5;
	} else if (key === "c") {
		speedMultiplier = 10;
	} else if (key === "d") {
		geneticAlgorithm.displayingBest = !geneticAlgorithm.displayingBest;
	}
}