const box = document.getElementById('box');

// Get bee dimensions (assuming the bee element has been rendered)
const beeWidth = box.offsetWidth;
const beeHeight = box.offsetHeight;

let x = 125;
let y = 0;
const speed = 10;
let keysPressed = {};
let angle = 0;

// Function to update the box position and rotation
function moveBox() {
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;

  // Smooth rotation: calculate the shortest path to the new angle
  let currentAngle = parseFloat(box.dataset.angle) || 0;
  let shortestAngle = ((angle - currentAngle + 540) % 360) - 180;
  let newAngle = currentAngle + shortestAngle;
  box.style.transform = `rotate(${newAngle}deg)`;
  box.dataset.angle = newAngle;

  checkScroll(); // Adjust scroll if bee nears the screen edge
}

// Key event handlers
function onKeyDown(event) {
  keysPressed[event.key] = true;
}
function onKeyUp(event) {
  keysPressed[event.key] = false;
}

// Update movement – with a 5px boundary from page edges
function updateMovement() {
  let movingHorizontally = false;
  let movingVertically = false;

  // Get page dimensions and enforce 5px padding from all sides
  const minX = 10;
  const minY = 10;
  const maxX = document.documentElement.scrollWidth - beeWidth - 10;
  const maxY = document.documentElement.scrollHeight - beeHeight - 15;

  if (keysPressed['ArrowUp']) {
    y = Math.max(minY, y - speed);
    movingVertically = 'up';
  }
  if (keysPressed['ArrowDown']) {
    y = Math.min(maxY, y + speed);
    movingVertically = 'down';
  }
  if (keysPressed['ArrowLeft']) {
    x = Math.max(minX, x - speed);
    movingHorizontally = 'left';
  }
  if (keysPressed['ArrowRight']) {
    x = Math.min(maxX, x + speed);
    movingHorizontally = 'right';
  }

  // Set desired angle based on movement direction
  if (movingHorizontally && movingVertically) {
    if (movingHorizontally === 'left' && movingVertically === 'up') angle = -45;
    if (movingHorizontally === 'left' && movingVertically === 'down') angle = -135;
    if (movingHorizontally === 'right' && movingVertically === 'up') angle = 45;
    if (movingHorizontally === 'right' && movingVertically === 'down') angle = 135;
  } else if (movingHorizontally) {
    angle = movingHorizontally === 'left' ? -90 : 90;
  } else if (movingVertically) {
    angle = movingVertically === 'up' ? 0 : 180;
  }

  moveBox();
  requestAnimationFrame(updateMovement);
}

// Scroll the page vertically if the bee is within 150px of the top or bottom of the visible screen
function checkScroll() {
  const currentScroll = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const viewportBeeY = y - currentScroll; // Bee's position relative to viewport

  let newScrollY = currentScroll; // Default: don't change scroll position

  if (viewportBeeY < 150) {
    // Scroll up if bee is near the top
    newScrollY = Math.max(0, y - 150);
  } else if (viewportBeeY + beeHeight > window.innerHeight - 150) {
    // Scroll down if bee is near the bottom
    newScrollY = Math.min(y + beeHeight - (window.innerHeight - 150), maxScroll);
  }

  // Prevent unnecessary slight scrolling when moving left/right at bottom
  if (Math.abs(newScrollY - currentScroll) > 1) {
    window.scrollTo(0, newScrollY);
  }
}

// Add event listeners for key presses
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// Initialize movement
moveBox();
updateMovement();




