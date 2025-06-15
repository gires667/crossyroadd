const chicken = document.querySelector(".chicken");
const bridge = document.querySelector(".bridge");

// size of the fowl
const chickenSize = 30;
const step = chickenSize / 2;

function isCollidingWithBush(newX, newY) {
  const chickenRect = {
    left: newX,
    right: newX + chicken.offsetWidth,
    top: newY,
    bottom: newY + chicken.offsetHeight,
  };

  const bushes = document.querySelectorAll(".bush");
  for (let bush of bushes) {
    const rect = bush.getBoundingClientRect();
    const bushRect = {
      left: rect.left,
      right: rect.right,
      top: rect.top,
      bottom: rect.bottom,
    };

    const isCollision =
      chickenRect.left < bushRect.right &&
      chickenRect.right > bushRect.left &&
      chickenRect.top < bushRect.bottom &&
      chickenRect.bottom > bushRect.top;

    if (isCollision) return true;
  }

  return false;
}

// Position of the fowl
let posX = 530; // 20px to the left of the vertical wire (580px)
let posY = 430; // Same Y as the horizontal line or slightly below

// Background offset
let backgroundOffset = 0;

// River Tables
const rivers = [];
let nextRiverDistance = 2000;

// Timer inactivity from the top
let inactivityTimer;
const inactivityDelay = 5000; // 5 seconds

//  Function to output game over GIF
function showGameOver() {
  if (document.querySelector(".game-over")) return;

  // Saving the score in localStorag
  localStorage.setItem("lastScore", score);

  const gameOver = document.createElement("div");
  gameOver.classList.add("game-over");

  const gif = document.createElement("img");
  gif.src = "img/lightning.gif";
  gif.style.position = "absolute";
  gif.style.width = "100px";
  gif.style.pointerEvents = "none";

  const chickenRect = chicken.getBoundingClientRect();
  gif.style.left = `${chickenRect.left + chickenRect.width / 2}px`;
  gif.style.top = `${chickenRect.top - 110}px`;
  gif.style.transform = "translateX(-50%)";

  gameOver.appendChild(gif);
  document.body.appendChild(gameOver);

  setTimeout(() => {
    chicken.style.backgroundImage = 'url("img/roast_chicken.png")';
  }, 1);

  setTimeout(() => {
    window.location.href = "game_over.html";
  }, 3000);
}

function resetInactivityTimer() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(showGameOver, inactivityDelay);
}

function createRiver(yPosition) {
  const river = document.createElement("div");
  river.classList.add("river");
  river.style.top = `${yPosition}px`; // fix the river
  river.style.zIndex = "-1";

  river.style.backgroundImage = 'url("img/river.png")';
  river.style.backgroundSize = "cover"; 
  river.style.backgroundRepeat = "no-repeat";
  river.style.backgroundPosition = "center";

  document.body.appendChild(river);
  rivers.push({ element: river, y: yPosition });

  startLogsFlow(river);
  startTurtlesFlow(river);
  startUpperLogsFlow(river); // new row of logs
}
// 1 log line
function startLogsFlow(river) {
  const logWidth = 100;
  const logHeight = 30;
  const spacing = 150;
  const speed = 0.5 + Math.random();

  const logs = [];
  const numberOfLogs = Math.floor(window.innerWidth / (logWidth + spacing));

  for (let i = 0; i < numberOfLogs; i++) {
    const log = document.createElement("div");
    log.classList.add("log", "log-bottom");
    log.style.position = "absolute";
    log.style.width = `${logWidth}px`;
    log.style.height = `${logHeight}px`;
    log.style.top = "170px";
    log.style.left = `${i * (logWidth + spacing)}px`;

    log.style.backgroundImage = 'url("img/log.png")';
    log.style.backgroundSize = "100% 100%";
    log.style.backgroundRepeat = "no-repeat";
    log.style.backgroundPosition = "center";
    log.style.backgroundColor = "transparent";

    river.appendChild(log);
    logs.push(log);
  }

  function moveLogs() {
    logs.forEach((log) => {
      const prevLeft = log.dataset.prevLeft
  ? parseFloat(log.dataset.prevLeft)
  : parseFloat(log.style.left);
      const currentLeft = parseFloat(log.style.left);
      //log.dataset.prevLeft = currentLeft;

      let nextLeft = currentLeft + speed;
      if (nextLeft > window.innerWidth) {
        nextLeft = -logWidth;
      }

      log.style.left = `${nextLeft}px`;



      // Moovement of the chicken if its on a log
      const chickenRect = chicken.getBoundingClientRect();
      const logRect = log.getBoundingClientRect();
      const isOnLog =
        chickenRect.left < logRect.right &&
        chickenRect.right > logRect.left &&
        chickenRect.top < logRect.bottom &&
        chickenRect.bottom > logRect.top;

      // if (isOnLog && !isPlayerMoving) {
      //   const delta = nextLeft - prevLeft;
      //   posX = Math.max(
      //     0,
      //     Math.min(posX, window.innerWidth - chicken.offsetWidth)
      //   );
      //   chicken.style.left = ${posX}px;b  
      // }
      if (isOnLog && !isPlayerMoving) {
    const delta = nextLeft - prevLeft;
    posX += delta;
    posX = Math.max(0, Math.min(posX, window.innerWidth - chicken.offsetWidth));
    chicken.style.left = `${posX}px`;
  }
   log.dataset.prevLeft = nextLeft;
    });

    requestAnimationFrame(moveLogs);
  }

  moveLogs();
}
// Add new fonction :
function startUpperLogsFlow(river) {
  const logWidth = 100;
  const logHeight = 30;
  const spacing = 150;
  const speed = 0.5 + Math.random();

  const logs = [];
  const numberOfLogs = Math.floor(window.innerWidth / (logWidth + spacing));

  for (let i = 0; i < numberOfLogs; i++) {
    const log = document.createElement("div");
    log.classList.add("log", "log-top");
    log.style.position = "absolute";
    log.style.width = `${logWidth}px`;
    log.style.height = `${logHeight}px`;
    log.style.top = "40px"; // Add top
    log.style.left = `${i * (logWidth + spacing)}px`;

    log.style.backgroundImage = 'url("img/log.png")';
    log.style.backgroundSize = "100% 100%";
    log.style.backgroundRepeat = "no-repeat";
    log.style.backgroundPosition = "center";
    log.style.backgroundColor = "transparent";

    river.appendChild(log);
    logs.push(log);
  }

  function moveLogs() {
    logs.forEach((log) => {
  const prevLeft = parseFloat(log.dataset.prevLeft || log.style.left);
  const currentLeft = parseFloat(log.style.left);

  let nextLeft = currentLeft + speed;
  if (nextLeft > window.innerWidth) {
    nextLeft = -logWidth;
  }

  log.style.left = `${nextLeft}px`;

  // verify if the chicken is on the log
  const chickenRect = chicken.getBoundingClientRect();
  const logRect = log.getBoundingClientRect();
  const isOnLog =
    chickenRect.left < logRect.right &&
    chickenRect.right > logRect.left &&
    chickenRect.top < logRect.bottom &&
    chickenRect.bottom > logRect.top;

  if (isOnLog && !isPlayerMoving) {
    const delta = nextLeft - prevLeft;
    posX += delta;
    posX = Math.max(0, Math.min(posX, window.innerWidth - chicken.offsetWidth));
    chicken.style.left = `${posX}px`;
  }

  log.dataset.prevLeft = nextLeft;
});

    requestAnimationFrame(moveLogs);
  }

  moveLogs();
}

function startTurtlesFlow(river) {
  const turtleHeights = [50, 50];
  const turtleWidths = [70, 150];
  const spacing = 140;
  const speed = -(1 + Math.random());

  const turtles = [];
  const numberOfTurtles = Math.floor(
    window.innerWidth / (Math.max(...turtleWidths) + spacing)
  );

  for (let i = 0; i < numberOfTurtles; i++) {
    const turtle = document.createElement("div");
    turtle.classList.add("turtle");
    turtle.style.position = "absolute";
    const width = turtleWidths[i % turtleWidths.length];
    const height = turtleHeights[i % turtleHeights.length];
    turtle.style.width = `${width}px`;
    turtle.style.height = `${height}px`;
    turtle.style.top = "100px"; // line ontop of the log
    turtle.style.left = `${i * (width + spacing)}px`;

    turtle.style.backgroundImage =
      i % 2 === 0 ? 'url("img/turtle.png")' : 'url("img/twins_turtle.png")';
    turtle.style.backgroundSize = "100% 100%";
    turtle.style.backgroundRepeat = "no-repeat";
    turtle.style.backgroundPosition = "center";
    turtle.style.backgroundColor = "transparent"; //"red";
    turtle.style.zIndex = "2";

    river.appendChild(turtle);
    turtles.push(turtle);
  }

  function moveTurtles() {
    turtles.forEach((turtle) => {
       const prevLeft = parseFloat(turtle.dataset.prevLeft || turtle.style.left);
      const currentLeft = parseFloat(turtle.style.left);

      let nextLeft = currentLeft + speed;
      if (nextLeft < -parseFloat(turtle.style.width)) {
        nextLeft = window.innerWidth;
      }

      turtle.style.left = `${nextLeft}px`;

  const chickenRect = chicken.getBoundingClientRect();
const turtleRect = turtle.getBoundingClientRect();
const isOnTurtle =
  chickenRect.left < turtleRect.right &&
  chickenRect.right > turtleRect.left &&
  chickenRect.top < turtleRect.bottom &&
  chickenRect.bottom > turtleRect.top;

if (isOnTurtle && !isPlayerMoving) {
  const delta = nextLeft - prevLeft;
  posX += delta;
  posX = Math.max(0, Math.min(posX, window.innerWidth - chicken.offsetWidth));
  chicken.style.left = `${posX}px`;
}
 // save the current position in the dataset
      turtle.dataset.prevLeft = nextLeft;

    });

    requestAnimationFrame(moveTurtles);
  }

  moveTurtles();
}

function startCarTraffic() {
  const cars = [
    { selector: ".green-car", startTop: 100, delay: 0 },
    { selector: ".red-car", startTop: 200, delay: 800 },
    { selector: ".blue-car", startTop: 300, delay: 1500 },
    { selector: ".yellow-car", startTop: 400, delay: 2200 },
  ];

  const carSpeed = 2.5;

  cars.forEach(({ selector, startTop }) => {
    const car = document.querySelector(selector);
    if (!car) return;

    let top = startTop;

    function animate() {
      top += carSpeed;
      car.style.top = `${top}px`;

      if (top > window.innerHeight) {
        top = -150 - Math.random() * 300; // new random start
      }

      const chickenRect = chicken.getBoundingClientRect();
      const carRect = car.getBoundingClientRect();
      const isCollision =
        chickenRect.left < carRect.right &&
        chickenRect.right > carRect.left &&
        chickenRect.top < carRect.bottom &&
        chickenRect.bottom > carRect.top;

      const bridgeRect = bridge.getBoundingClientRect();

      const isOnBridge =
        chickenRect.left < bridgeRect.right &&
        chickenRect.right > bridgeRect.left &&
        chickenRect.top < bridgeRect.bottom &&
        chickenRect.bottom > bridgeRect.top;

      if (isCollision && !isOnBridge) {
        window.location.href = "game_over.html";
      }

      requestAnimationFrame(animate);
    }

    animate();
  });
}

let currentLog = null;
let isPlayerMoving = false;

function updatePosition() {
  chicken.style.left = `${posX}px`;
  chicken.style.top = `${posY}px`;

  // Verify if we are on a log
  const chickenRect = chicken.getBoundingClientRect();
  currentLog = null;

  // document.querySelectorAll(".log").forEach((log) => {
  //   //document.querySelectorAll(".river div").forEach((log) => {
  //   const logRect = log.getBoundingClientRect();
  //   const isCollision =
  //     chickenRect.left < logRect.right &&
  //     chickenRect.right > logRect.left &&
  //     chickenRect.top < logRect.bottom &&
  //     chickenRect.bottom > logRect.top;

  //   if (isCollision) {
  //     currentLog = log;
  //   }
  // });

  // Verify if we are on a log (mobile)
  document.querySelectorAll(".log").forEach((log) => {
    const logRect = log.getBoundingClientRect();
    const isOnLog =
      chickenRect.left < logRect.right &&
      chickenRect.right > logRect.left &&
      chickenRect.top < logRect.bottom &&
      chickenRect.bottom > logRect.top;

    if (isOnLog && !currentLog) {
      currentLog = log;
    }
    checkWireCollision();
  checkVictory();

  });

  // Check if we're on a turtle (must happen BEFORE movement)
  document.querySelectorAll(".turtle").forEach((turtle) => {
    const turtleRect = turtle.getBoundingClientRect();
    const isOnTurtle =
      chickenRect.left < turtleRect.right &&
      chickenRect.right > turtleRect.left &&
      chickenRect.top < turtleRect.bottom &&
      chickenRect.bottom > turtleRect.top;

    if (isOnTurtle) {
      currentLog = turtle; // we treat the turtle like a mobile log
    }
  });
  // Check if we're on a lily pad
  document.querySelectorAll(".lily-pad").forEach((pad) => {
    const padRect = pad.getBoundingClientRect();
    const isOnPad =
      chickenRect.left < padRect.right &&
      chickenRect.right > padRect.left &&
      chickenRect.top < padRect.bottom &&
      chickenRect.bottom > padRect.top;

    if (isOnPad) {
      currentLog = pad; // we treat the lily pad like a fixed platform
    }
  });

  // Movement of the fowl if on a mobile element
  if (currentLog && !isPlayerMoving) {
    const prevLeft = parseFloat(
      currentLog.dataset.prevLeft || currentLog.style.left
    );
    const currentLeft = parseFloat(currentLog.style.left);
    const delta = currentLeft - prevLeft;
    posX += delta;
    chicken.style.left = `${posX}px`;
  }

  // prevent going too far left or too far right
  posX = Math.max(0, Math.min(posX, window.innerWidth - chicken.offsetWidth));

  // Apply the position to the element .chicken
  chicken.style.left = `${posX}px`;
  chicken.style.top = `${posY}px`;

  // if in the river but not on a log => Game Over. then verify game over if in water
  const river = rivers[0]?.element;
  if (river) {
    const riverRect = river.getBoundingClientRect();
    const isInRiver =
      chickenRect.bottom > riverRect.top && chickenRect.top < riverRect.bottom;

    const bridgeRect = bridge.getBoundingClientRect();

    const chickenZ = parseInt(window.getComputedStyle(chicken).zIndex, 10);
    const bridgeZ = parseInt(window.getComputedStyle(bridge).zIndex, 10);

    const isOnBridge =
      chickenRect.left < bridgeRect.right &&
      chickenRect.right > bridgeRect.left &&
      chickenRect.top < bridgeRect.bottom &&
      chickenRect.bottom > bridgeRect.top;

    if (isInRiver && !currentLog && !isOnBridge) {
      window.location.href = "game_over.html";
    }
  }
  //Apply the positions to the element .chicken

  chicken.style.top =`${posY}px`;

  //Collision detection with electric cables
  checkWireCollision();
  checkTrapCollision();
}

function checkVictory() {
  const chickenRect = chicken.getBoundingClientRect();
  const coop = document.querySelector(".chicken-coop");
  if (!coop) return;

  const coopRect = coop.getBoundingClientRect();
  const isTouching =
    chickenRect.left < coopRect.right &&
    chickenRect.right > coopRect.left &&
    chickenRect.top < coopRect.bottom &&
    chickenRect.bottom > coopRect.top;

  if (isTouching) {
    window.location.href = "win.html";
  }
}

function checkWireCollision() {
  const chickenRect = chicken.getBoundingClientRect();
  const wires = document.querySelectorAll(".wire");

  for (let wire of wires) {
    const wireRect = wire.getBoundingClientRect();
    const isCollision =
      chickenRect.left < wireRect.right &&
      chickenRect.right > wireRect.left &&
      chickenRect.top < wireRect.bottom &&
      chickenRect.bottom > wireRect.top;

    if (isCollision) {
      showGameOver(); //the existing function in charge of gameover
      return true;
    }
  }

  return false;
}
function checkTrapCollision() {
  const chickenRect = chicken.getBoundingClientRect();
  const traps = document.querySelectorAll(".trap");

  for (let trap of traps) {
    const trapRect = trap.getBoundingClientRect();
    const isCollision =
      chickenRect.left < trapRect.right &&
      chickenRect.right > trapRect.left &&
      chickenRect.top < trapRect.bottom &&
      chickenRect.bottom > trapRect.top;

    if (isCollision) {
      window.location.href = "game_over.html";
      return true;
    }
  }

  return false;
}

function checkWinCondition() {
  const chickenRect = chicken.getBoundingClientRect();
  const coop = document.querySelector(".chicken-coop");
  const coopRect = coop.getBoundingClientRect();

  const isTouchingCoop =
    chickenRect.left < coopRect.right &&
    chickenRect.right > coopRect.left &&
    chickenRect.top < coopRect.bottom &&
    chickenRect.bottom > coopRect.top;

  if (isTouchingCoop) {
    window.location.href = "win.html";
  }
}

function gameLoop() {
  updatePosition();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("DOMContentLoaded", () => {
  createRiver(150);
  startCarTraffic();
  updatePosition();
  gameLoop();
  resetInactivityTimer();

});


gameLoop();
resetInactivityTimer(); // start the timer at the beginning

window.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  isPlayerMoving = true;
  setTimeout(() => {
    isPlayerMoving = false;
  }, 100); // we leave a delay to prevent a synchronisation bug

  const fixY = window.innerHeight * 0.55;
  let movedUp = false;

  switch (
    e.key //Move the river downward
  ) {
    case "ArrowUp":
      if (!isCollidingWithBush(posX, posY - step)) {
        posY -= step;
        chicken.style.backgroundImage = 'url("img/chicken_up.gif")';
        movedUp = true;
        updateScore(20);
      }
      break;

    case "ArrowDown":
      if (!isCollidingWithBush(posX, posY + step)) {
        posY = Math.min(window.innerHeight - chickenSize, posY + step);
        chicken.style.backgroundImage = 'url("img/chicken_left.gif")';
        updateScore(20);
      }
      break;

    case "ArrowLeft":
      if (!isCollidingWithBush(posX - step, posY)) {
        posX = Math.max(0, posX - step);
        chicken.style.backgroundImage = 'url("img/chicken_left.gif")';
        updateScore(20);
      }
      break;

    case "ArrowRight":
      if (!isCollidingWithBush(posX + step, posY)) {
        posX = Math.min(window.innerWidth - chickenSize, posX + step);
        chicken.style.backgroundImage = 'url("img/chicken_right.gif")';
        updateScore(20);
      }
      break;

    default:
      return;
  }

  updatePosition();
  resetInactivityTimer();
});

window.addEventListener("resize", () => {
  posX = Math.min(posX, window.innerWidth - chickenSize);
  posY = Math.min(posY, window.innerHeight - chickenSize);
  updatePosition();
});

// Score and Timer
let score = 0;
let highScore = Infinity;
let timeLeft = 60; // seconds

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("high-score");
const timerBar = document.getElementById("timer-bar");
const savedScore = localStorage.getItem("bestScore");

if (savedScore !== null && parseInt(savedScore) > 0 && parseInt(savedScore) < highScore) {
  highScore = parseInt(savedScore);
}

// Display whatever (either a True value, or a  placeholder)
highScoreDisplay.textContent = (highScore < Infinity) ? highScore : "—";

function updateScore(amount) {
  score += amount;
  scoreDisplay.textContent = score;

  if (score < highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
     localStorage.setItem("bestScore", score);
  }
}

function startTimerWithDrumsticks() {
  const drumstickContainer = document.getElementById("drumstick-timer");
  drumstickContainer.innerHTML = ""; // reset at the beginning

  const totalTime = 60; // seconds
  const drumstickCount = 20;
  const intervalTime = totalTime / drumstickCount;

  // Create and add drumsticks
  for (let i = 0; i < drumstickCount; i++) {
    const drumstick = document.createElement("div");
    drumstick.classList.add("drumstick");
    drumstickContainer.appendChild(drumstick);
  }

  let currentIndex = 0;
  const interval = setInterval(() => {
    const drumsticks = document.querySelectorAll(".drumstick");
    const indexToHide = drumstickCount - 1 - currentIndex;

    if (drumsticks[indexToHide]) {
  drumsticks[indexToHide].classList.remove("drumstick");
  drumsticks[indexToHide].classList.add("bone");
  currentIndex++;
}

    if (currentIndex >= drumstickCount) {
      clearInterval(interval);
      window.location.href = "game_over.html";
    }
  }, intervalTime * 1000);
}

// Launch on load
updateScore(0); // to display initial score
startTimerWithDrumsticks();
