const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let velocityX = 0;
let velocityY = 0;

let food = {
  x: Math.floor(Math.random() * tileCount),
  y: Math.floor(Math.random() * tileCount)
};

let score = 0;
let gameRunning = true;

// 🎯 Difficulty
let gameSpeed = 100;
let gameInterval = setInterval(drawGame, gameSpeed);

// เปลี่ยนความยาก
document.getElementById("level").addEventListener("change", function () {
  gameSpeed = parseInt(this.value);

  clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, gameSpeed);
});

// วาดเกม
function drawGame() {
  if (!gameRunning) return;

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "lime";
  snake.forEach(part => {
    ctx.fillRect(part.x * gridSize, part.y * gridSize, gridSize - 2, gridSize - 2);
  });

  ctx.fillStyle = "red";
  ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);

  moveSnake();
}

// เคลื่อนงู
function moveSnake() {
  const head = {
    x: snake[0].x + velocityX,
    y: snake[0].y + velocityY
  };

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    document.getElementById("score").textContent = score;

    food = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
  } else {
    snake.pop();
  }

  // ชนขอบ
  if (
    head.x < 0 || head.x >= tileCount ||
    head.y < 0 || head.y >= tileCount
  ) {
    resetGame();
  }

  // ชนตัวเอง
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

// Game Over
function resetGame() {
  gameRunning = false;
  document.getElementById("finalScore").textContent = score;
  document.getElementById("gameOverPopup").classList.remove("hidden");
}

// Restart
function restartGame() {
  snake = [{ x: 10, y: 10 }];
  velocityX = 0;
  velocityY = 0;
  score = 0;

  document.getElementById("score").textContent = score;
  document.getElementById("gameOverPopup").classList.add("hidden");

  gameSpeed = parseInt(document.getElementById("level").value);

  clearInterval(gameInterval);
  gameInterval = setInterval(drawGame, gameSpeed);

  gameRunning = true;
}

// ควบคุม (แก้ปัญหา scroll)
document.addEventListener("keydown", (e) => {

  if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
  }

  if (e.key === "ArrowUp" && velocityY === 0) {
    velocityX = 0; velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY === 0) {
    velocityX = 0; velocityY = 1;
  } else if (e.key === "ArrowLeft" && velocityX === 0) {
    velocityX = -1; velocityY = 0;
  } else if (e.key === "ArrowRight" && velocityX === 0) {
    velocityX = 1; velocityY = 0;
  }
});