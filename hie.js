const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let gameOver = false;
let score = 0;

// Car properties
const car = {
  width: 40,
  height: 70,
  x: canvas.width / 2 - 20,
  y: canvas.height - 100,
  speed: 5,
  color: "blue"
};

// Obstacles
const obstacles = [];
const obstacleFrequency = 100; // Add an obstacle every 100 frames
let frameCount = 0;

// Draw car
function drawCar() {
  ctx.fillStyle = car.color;
  ctx.fillRect(car.x, car.y, car.width, car.height);
}

// Draw obstacles
function drawObstacles() {
  ctx.fillStyle = "red";
  for (const obstacle of obstacles) {
    ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    obstacle.y += obstacle.speed; // Move obstacle downward
  }
}

// Update obstacles
function updateObstacles() {
  if (frameCount % obstacleFrequency === 0) {
    const obstacleWidth = Math.random() * (canvas.width / 2);
    const obstacleX = Math.random() * (canvas.width - obstacleWidth);
    obstacles.push({
      x: obstacleX,
      y: -50,
      width: obstacleWidth,
      height: 20,
      speed: 3 + Math.random() * 2
    });
  }
  
  // Remove obstacles that move off-screen
  for (let i = obstacles.length - 1; i >= 0; i--) {
    if (obstacles[i].y > canvas.height) {
      obstacles.splice(i, 1);
      score++;
    }
  }
}

// Check collisions
function checkCollisions() {
  for (const obstacle of obstacles) {
    if (
      car.x < obstacle.x + obstacle.width &&
      car.x + car.width > obstacle.x &&
      car.y < obstacle.y + obstacle.height &&
      car.height + car.y > obstacle.y
    ) {
      gameOver = true;
    }
  }
}

// Handle keyboard input
const keys = {
  ArrowLeft: false,
  ArrowRight: false
};

document.addEventListener("keydown", (event) => {
  if (event.key in keys) keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
  if (event.key in keys) keys[event.key] = false;
});

// Update car position
function updateCarPosition() {
  if (keys.ArrowLeft && car.x > 0) {
    car.x -= car.speed;
  }
  if (keys.ArrowRight && car.x + car.width < canvas.width) {
    car.x += car.speed;
  }
}

// Game loop
function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "red";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over!", canvas.width / 4, canvas.height / 2);
    ctx.fillText(`Score: ${score}`, canvas.width / 4, canvas.height / 2 + 50);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawCar();
  updateCarPosition();

  frameCount++;
  updateObstacles();
  drawObstacles();

  checkCollisions();

  // Display score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, 10, 20);

  requestAnimationFrame(gameLoop);
}

gameLoop();
śś