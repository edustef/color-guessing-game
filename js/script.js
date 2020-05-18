const LINKS = document.querySelectorAll(".difficulty");
let COLORS = [];
let points = 0;
let numOfColors = 4;
let lifePoints = 3;
let hearts = 3;
let winnerColor;
let winnerColorRGB;
let colorFound = false;
let difficulty = "EASY";
let thresholdColors = [];

// ================
// SETTING UP LINKS
// ================

// Settting "New Game" button to call newGame() on click
document.querySelector("#new-game").addEventListener("click", () => {
  points--;
  document.querySelector("#points").textContent = points;
  newGame();
});

document.querySelector("#new-game-click").addEventListener("click", newGame);

// Add event listeners to all difficulty buttons
LINKS.forEach((link, key) => {
  link.addEventListener("click", () => {
    makeLinkActive(key);
    changeDifficulty(link);
    newGame();
  });
});

// Changes difficulty
function changeDifficulty(link) {
  switch (link.firstChild.textContent) {
    case "EASY":
      numOfColors = 4;
      lifePoints = hearts = 3;
      difficulty = "EASY";
      break;
    case "HARD":
      numOfColors = 8;
      lifePoints = hearts = 4;
      difficulty = "HARD";
      break;
    case "INSANE":
      numOfColors = 12;
      lifePoints = hearts = 4;
      difficulty = "INSANE";
      break;
  }
}

// Activates the link clicked
function makeLinkActive(keyToActivate) {
  LINKS.forEach((link, key) => {
    if (keyToActivate === key) {
      link.classList.add("active-link");
    } else {
      link.classList.remove("active-link");
    }
  });
}

// ================
// GAME BEHAVIOUR
// ================

function newGame() {
  document.querySelector("#new-game-click").style.display = "none";
  clearColors();
  clearHearts();
  document.querySelector("header").style.backgroundColor = "rgb(20, 150, 200)";
  colorFound = false;

  initColors();
  addColors();

  // Set winner color
  winnerColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  winnerColorRGB = winnerColor.style.backgroundColor.toUpperCase();

  // Set the rgbDisplayer to display the RGB color of the winner
  document.querySelector(".rgbDisplayer").textContent = winnerColorRGB;

  hearts = lifePoints;
  for (let i = 0; i < hearts; i++) {
    addHeart();
  }
}

function initColors() {
  for (let i = 0; i < numOfColors; i++) {
    RGB = randomRGB();
    let color = document.createElement("div");
    color.classList.add("color");
    color.classList.add(difficulty.toLowerCase());
    color.style.backgroundColor = `rgb(${RGB[0]}, ${RGB[1]}, ${RGB[2]})`;
    color.addEventListener("click", clickColor, { once: true });
    COLORS.push(color);
  }
}

function addColors() {
  COLORS.forEach((color, key) => {
    let container = document.querySelector(".container");
    container.appendChild(color);
  });
}

function clearColors() {
  COLORS = [];
  let colorsContainer = document.querySelector(".container");
  while (colorsContainer.firstChild) {
    colorsContainer.removeChild(colorsContainer.lastChild);
  }
}

function randomRGB() {
  let red = Math.floor(Math.random() * 255 + 1);
  let green = Math.floor(Math.random() * 255 + 1);
  let blue = Math.floor(Math.random() * 255 + 1);

  return [red, green, blue];
}

function thresholdRGB() {}

function clickColor() {
  if (!colorFound) {
    if (
      this.style.backgroundColor.toUpperCase() == winnerColorRGB ||
      hearts == 0
    ) {
      colorFound = true;

      let icon = document.createElement("img");
      icon.src = "icons/check_mark.svg";
      winnerColor.appendChild(icon);

      if (
        this.style.backgroundColor.toUpperCase() == winnerColorRGB &&
        hearts == 0
      ) {
        points -= 4;
      } else if(this.style.backgroundColor.toUpperCase() == winnerColorRGB && hearts == lifePoints) {
        points += 7;
      }
      else {
        points += 4;
      }

      document.querySelector("#new-game-click").style.display = "block";
      showResults();
    } else {
      let icon = document.createElement("img");
      icon.src = "icons/cross_mark.svg";
      this.appendChild(icon);
      this.classList.remove("show");
      this.classList.add("hidden");
      this.classList.add("wrong");
      hearts--;
      console.log(hearts);

      points--;
      removeHeart();
      console.log("Lost one, left: " + hearts);
    }
  } else {
    newGame();
  }
  document.querySelector("#points").textContent = points;
}

function showResults() {
  COLORS.forEach((color) => {
    color.classList.remove("hidden");
    color.classList.add("show");
  });

  document.querySelector("header").style.backgroundColor = winnerColorRGB;
}

function addHeart() {
  let icon = document.createElement("img");
  icon.src = "icons/heart.svg";
  document.querySelector("#hearts").appendChild(icon);
}

function removeHeart() {
  document
    .querySelector("#hearts")
    .removeChild(document.querySelector("#hearts").lastChild);
}

function clearHearts() {
  let heartsContainer = document.querySelector("#hearts");
  while (heartsContainer.firstChild) {
    document
      .querySelector("#hearts")
      .removeChild(document.querySelector("#hearts").lastChild);
  }
}

newGame();
