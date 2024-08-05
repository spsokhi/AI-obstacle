class GeneticAlgorithm {
	constructor(populationSize, mutationRate) {
		this.populationSize = populationSize;
		this.mutationRate = mutationRate;
		this.population = [];
		this.generation = 1;
		this.eliteCount = Math.floor(populationSize * 0.03); // top 5% as elite
		this.displayingBest = false;
	}

	// create the initial population of agents
	createPopulation() {
		for (let i = 0; i < this.populationSize; i++) {
			this.population.push(new Agent());
		}
	}

	// calculate each agent's fitness (how close they made it to the goal)
	calculateFitness() {
		let fitnessSum = 0;
		const checkpointBonus = 10;
		const goalBonus = 1000;
		const baseFitness = 1 / 16.0;

		for (let i = 0; i < this.population.length; i++) {
			let agent = this.population[i];
			let fitness = baseFitness;
			let distanceToEnd = p5.Vector.dist(agent.position, goal.position);

			fitness += 1 / (distanceToEnd * distanceToEnd * distanceToEnd);

			for (let j = 0; j < checkpoints.length; j++) {
				if (agent.visitedCheckpoints.has(j)) {
					fitness += checkpointBonus;
				}
			}

			if (agent.reachedGoal) {
				fitness += goalBonus;
			}

			if (agent.hitObstacle) {
				fitness /= 2;
			}

			agent.fitness = fitness;
			fitnessSum += agent.fitness;
		}

		// set each agent's fitness probability between 0 and 1
		for (let i = 0; i < this.populationSize; i++) {
			const agent = this.population[i];
			agent.fitnessProbability = agent.fitness / fitnessSum;
		}
	}

	// pick agents that have a high fitness
	selection() {
		let index = 0;
		let r = random(1);

		while (r > 0) {
			r = r - this.population[index].fitnessProbability;
			index++;
		}
		index--;
		return this.population[index];
	}

	// copy the agent
	copy(parent) {
		const child = new Agent();
		child.brain.directions = [...parent.brain.directions];
		child.reachedGoal = parent.reachedGoal;
		return child;
	}

	// crossover (recombination) between two parents to produce a child
	crossover(parent1, parent2) {
		const child = new Agent();
		for (let i = 0; i < parent1.brain.directions.length; i++) {
			if (random(1) < 0.5) {
				child.brain.directions[i] = parent1.brain.directions[i];
			} else {
				child.brain.directions[i] = parent2.brain.directions[i];
			}
		}
		return child;
	}

	// mutate the directions of an agent with a certain probability
	mutate(child) {
		for (let i = 0; i < child.brain.directions.length; i++) {
			if (child.reachedGoal) {
				if (random(2) < this.mutationRate) {
					child.brain.directions[i] = random(TWO_PI);
				}
			} else {
				if (random(1) < this.mutationRate) {
					child.brain.directions[i] = random(TWO_PI);
				}
			}
		}
	}

	// create a new and 'better' generation of agents
	evolve() {
		const newPopulation = [];
		this.calculateFitness();
		const sortedPopulation = [...this.population].sort((a, b) => b.fitness - a.fitness);

		// keep the best agents as elites
		for (let i = 0; i < this.eliteCount; i++) {
			let newAgent = this.copy(sortedPopulation[i]);
			newAgent.reachedGoal = false;
			newPopulation.push(newAgent);
		}

		// create the rest of the new population
		for (let i = 0; i < this.population.length - this.eliteCount; i++) {
			const parent1 = this.selection();
			// const parent2 = this.selection();
			const child = this.copy(parent1);
			this.mutate(child);
			child.reachedGoal = false;
			newPopulation.push(child);
		}

		this.population = newPopulation;

		geneticAlgorithm.generation++;
	}

	// check if all agents have stopped moving (died or found the goal)
	allAgentsFinished() {
		return this.population.every((agent) => agent.brain.currentDirection >= agent.brain.size);
	}

	getBestAgent() {
		return this.population.reduce(
			(best, current) => (current.fitness > best.fitness ? current : best),
			this.population[0]
		);
	}
}