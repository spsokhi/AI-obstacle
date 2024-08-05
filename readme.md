# AI Obstacle Course

A visual representation of a genetic algorithm on a population of "agents" who have to evolve to find the most optimal path from point A to point B.

## Project Structure
1. index.html: The main HTML file that loads the project in a browser.
2. JavaScript Files:
   + agent.js: Contains the code for the agent that navigates the obstacle course.
   + brain.js: Implements the neural network for the agent.
   + geneticalgorithm.js: Manages the genetic algorithm logic.
   + checkpoint.js: Defines checkpoints for the agent to reach.
   + goal.js: Sets the goal position for the agent.
   + obstacle.js: Defines obstacles in the environment.
   + sketch.js: Handles the rendering of the environment and agents.
   + assets: Contains images and other resources used by the project.
   + 
## Prerequisites
- Node.js: Make sure you have Node.js installed on your machine.

## Installation
1. Clone the Repository:
   ```
   git clone https://github.com/yourusername/AI-obstacle.git
   cd AI-obstacle
  
2. Install http-server:
  ```
  npm install -g http-server
```
 ## Running the Project
1. Start the Local Server:
  ```
http-server
```

2. Open the Project in Your Browser:
```
Available on:
  http://127.0.0.1:8080
  http://192.168.1.20:8080
Hit CTRL-C to stop the server
```

## Troubleshooting
- 404 Errors: If you encounter 404 errors, check the file paths in index.html and ensure all JavaScript files are correctly named and in the expected locations.
- Deprecation Warnings: You might see deprecation warnings related to Node.js. These can usually be ignored unless they affect functionality.


