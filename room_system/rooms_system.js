const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define the player's position and size
const player = {
  x: 50, // Starting position in the first room
  y: canvas.height - 30,
  width: 30,
  height: 30,
  speed: 5,
  currentRoom: "room1",
};

// Game boundaries for each room
const roomBoundaries = {
  room1: {
    leftBoundary: 0,
    rightBoundary: 640 - player.width,
    topBoundary: 0,
    bottomBoundary: 576 - player.height,
  },
  room2: {
    leftBoundary: 0, // Adjusted to start from the left side
    rightBoundary: 640 - player.width, // Adjusted to match the first room
    topBoundary: 0,
    bottomBoundary: 576 - player.height,
  },
};

// Event listener to handle player movement with AWSD keys
document.addEventListener("keydown", (e) => {
  if (player.currentRoom === "room1") {
    const boundaries = roomBoundaries.room1;
    if (e.key === "d" && player.x < boundaries.rightBoundary) {
      player.x += player.speed;
    } else if (e.key === "a" && player.x > boundaries.leftBoundary) {
      player.x -= player.speed;
    } else if (e.key === "s" && player.y < boundaries.bottomBoundary) {
      player.y += player.speed;
    } else if (e.key === "w" && player.y > boundaries.topBoundary) {
      player.y -= player.speed;
    }

    // Check if the player enters the door to the second room
    if (player.x >= 600 && player.x <= 620 && player.y >= 270 && player.y <= 300) {
      player.currentRoom = "room2";
      player.x = 50; // Teleport to the left side of the second room
    }
  } else if (player.currentRoom === "room2") {
    const boundaries = roomBoundaries.room2;
    if (e.key === "d" && player.x < boundaries.rightBoundary) {
      player.x += player.speed;
    } else if (e.key === "a" && player.x > boundaries.leftBoundary) {
      player.x -= player.speed;
    } else if (e.key === "s" && player.y < boundaries.bottomBoundary) {
      player.y += player.speed;
    } else if (e.key === "w" && player.y > boundaries.topBoundary) {
      player.y -= player.speed;
    }

    // Check if the player enters the door to the first room
    if (player.x >= 30 && player.x <= 50 && player.y >= 270 && player.y <= 300) {
      player.currentRoom = "room1";
      player.x = 570; // Teleport to the right side of the first room
    }
  }
});

// Game loop
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the boundaries and doors in each room
  if (player.currentRoom === "room1") {
    const boundaries = roomBoundaries.room1;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(boundaries.leftBoundary, boundaries.topBoundary, 640, 576);

    // Draw the door to the second room
    ctx.fillStyle = "brown";
    ctx.fillRect(600, 270, 20, 30);
  } else if (player.currentRoom === "room2") {
    const boundaries = roomBoundaries.room2;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(boundaries.leftBoundary, boundaries.topBoundary, 640, 576);

    // Draw the door to the first room
    ctx.fillStyle = "brown";
    ctx.fillRect(50, 270, 20, 30);
  }

  // Draw the player
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.width, player.height);

  requestAnimationFrame(draw);
}

// Start the game loop
draw();
