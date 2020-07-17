const rulesBtn = document.getElementById("rules-btn");
const rules = document.getElementById("rules");
const closeBtn = document.getElementById("close-btn");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;
// const brickRowCount = 3;
// const brickColumnCount = 3;

// ------- Add Event Listeners
// Show rules and hide rules
rulesBtn.addEventListener("click", () => {
  rules.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  rules.classList.remove("show");
});
// Keyboard event listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// ------- Canvas ---------

// -- Props
// Create ball props
const ball = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10, // radius
  speed: 4,
  dx: 4,
  dy: -4,
};
// Create paddle props
const paddle = {
  x: canvas.width / 2 - 40,
  y: canvas.height - 20,
  w: 80,
  h: 10,
  speed: 8,
  dx: 0,
};
// Create brick props
const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  offsetX: 45,
  offsetY: 60,
  visible: true,
};

// -- Drawing functions
// Drawing functions
function draw() {
  // console.log(ball.x, ball.y);
  // Clear the previous canvas and repaint it
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}
// Draw ball on canvas
function drawBall() {
  ctx.beginPath();
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}
// Draw paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#0095dd";
  ctx.fill();
  ctx.closePath();
}
// Draw score on canvas
function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}
// Create bricks
const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  bricks[i] = [];
  for (let j = 0; j < brickColumnCount; j++) {
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
// Draw bricks on canvas
function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#0095dd" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Move paddle on canvas
function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection (right side)
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }

  // Wall detection (left side)
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// Move ball on canvas
function moveBall() {
  ball.x += ball.dx;
  ball.y += ball.dy;

  // Ball Boundary
  const ballTop = ball.y - ball.size;
  const ballLeft = ball.x - ball.size;
  const ballRight = ball.x + ball.size;
  const ballBottom = ball.y + ball.size;

  // Wall detection
  // (left and right)
  if (ballRight >= canvas.width || ballLeft <= 0) {
    ball.dx *= -1;
  } // (top and bottom)
  else if (ballBottom >= canvas.height || ballTop <= 0) {
    ball.dy *= -1;
  }

  // Paddle Collision
  // paddleLeft = paddle.x
  // paddleTop = paddle.y
  const paddleRight = paddle.x + paddle.w;
  if (
    ballRight >= paddle.x &&
    ballLeft <= paddleRight &&
    ballBottom >= paddle.y
  ) {
    ball.dy *= -1;
  }

  // Brick Collision
  bricks.forEach((column) => {
    column.forEach((brick) => {
      if (brick.visible) {
        const brickLeft = brick.x;
        const brickRight = brick.x + brick.w;
        const brickTop = brick.y;
        const brickBottom = brick.y + brick.h;
        // Bottom
        if (
          ballLeft <= brickRight &&
          ballRight >= brickLeft &&
          ballTop <= brickBottom &&
          ballBottom >= brickBottom
        ) {
          console.log("Bottom Collision");
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        } else if (
          // Top
          ballLeft <= brickRight &&
          ballRight >= brickLeft &&
          ballTop <= brickTop &&
          ballBottom >= brickTop
        ) {
          console.log("Top Collision");
          ball.dy *= -1;
          brick.visible = false;
          increaseScore();
        } else if (
          // Left
          ballLeft <= brickLeft &&
          ballRight >= brickLeft &&
          ballTop <= brickBottom &&
          ballBottom >= brickTop
        ) {
          console.log("Left Collision");
          ball.dx *= -1;
          brick.visible = false;
          increaseScore();
        } else if (
          // Right
          ballLeft <= brickRight &&
          ballRight >= brickRight &&
          ballTop <= brickBottom &&
          ballBottom >= brickTop
        ) {
          console.log("Right Collision");
          ball.dx *= -1;
          brick.visible = false;
          increaseScore();
        }
      }
    });
  });
  // Hit the bottom
  if (ballBottom >= canvas.height) {
    showAllBricks();
    score = 0;
  }
}

// Increase Score
function increaseScore() {
  score++;
  if (score === brickRowCount * brickColumnCount) {
    // all blocks clear
    showAllBricks();
  }
}
// Restart the gage
function showAllBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      brick.visible = true;
    });
  });
}

// Key down event
function keyDown(e) {
  if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  } else if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  }
}

// Key down event
function keyUp(e) {
  if (
    e.key === "Left" ||
    e.key === "ArrowLeft" ||
    e.key === "Right" ||
    e.key === "ArrowRight"
  ) {
    paddle.dx = 0;
  }
}

// Update canvas drawing and animation
function update() {
  // Paddle moving action
  movePaddle();
  // Ball moving action
  moveBall();
  // Drawing action
  draw();
  requestAnimationFrame(update);
}

update();
