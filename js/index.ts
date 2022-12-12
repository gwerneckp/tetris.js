const element = (id: string) => {
  return document.getElementById(id);
};

const waiting = () => {
  //@ts-ignore
  new TypeIt("#log", {
    strings: "press n to start...",
    startDelay: 1500,
    speed: 75,
  }).go();
};

const waitingGameOver = (score: number, highScore: number) => {
  element("log")!.innerHTML = "";
  //@ts-ignore
  new TypeIt("#log", {
    strings: [
      "game over",
      "you scored " + score + " points",
      "your high score is " + highScore,
      "press n to try again...",
    ],
    speed: 85,
  }).go();
};

const displayDOM = (tetris: any) => {
  element("game")!.innerHTML = "";
  for (let y = 3; y < tetris.matrix.length; y++) {
    let lineOutput: string = "";
    for (let x in tetris.matrix[y]) {
      if (tetris.matrix[y][x] == 0) {
        // lineOutput += [" &nbsp "]
        lineOutput += " &nbsp ";
        // lineOutput += [" &nbsp "]
      }
      if (tetris.matrix[y][x] == 1) {
        // lineOutput += [" &nbsp "]
        lineOutput += " - ";
        // lineOutput += [" &nbsp "]
      }
      if (tetris.matrix[y][x] == 2) {
        // lineOutput += [" &nbsp "]
        lineOutput += " o ";
        // lineOutput += [" &nbsp "]
      }
    }
    element("game")!.innerHTML =
      element("game")!.innerHTML +
      "<p class='game-line change-color'>" +
      lineOutput +
      "</p>";
  }
};

const displayScoreDOM = (tetris: any) => {
  element("score")!.innerHTML = "Score: " + tetris.score;
};

const gameOverAnimation = async (tetris: any) => {
  element("game")!.dataset.animation = "true";
  const collection = document.getElementsByClassName("change-color");
  for (let i = 0; i < collection.length; i++) {
    let element = collection[i] as HTMLElement;
    element.style.color = "#cc0000";
  }
  await tetris.sleep(1250);
  for (let i = 1; i < tetris.matrix.length; i++) {
    element("game")!.innerHTML = "";
    for (let y = 3; y < tetris.matrix.length - i; y++) {
      let lineOutput = "";
      for (let x in tetris.matrix[y]) {
        if (tetris.matrix[y][x] == 0) {
          lineOutput += " &nbsp ";
        }
        if (tetris.matrix[y][x] == 1) {
          lineOutput += " - ";
        }
        if (tetris.matrix[y][x] == 2) {
          lineOutput += " o ";
        }
      }
      element("game")!.innerHTML =
        element("game")?.innerHTML +
        "<p class='game-line red'>" +
        lineOutput +
        "</p>";
    }
    await tetris.sleep(75);
  }
  for (let i = 0; i < collection.length; i++) {
    let element = collection[i] as HTMLElement;
    element.style.color = "#41FF00";
  }
  element("game")!.dataset.animation = "false";
  element("gameRow")!.style.display = "none";
  element("log")!.style.display = "block";
  waitingGameOver(tetris.score, tetris.highScore);
};

let tetris = new Tetris({
  displayMatrix: displayDOM,
  displayScore: displayScoreDOM,
  displayGameOver: gameOverAnimation,
});
document.addEventListener("DOMContentLoaded", () => {
  waiting();
  element("body")?.addEventListener("keypress", (e) => {
    if (element("game")!.dataset.animation != "true") {
      switch (e.key) {
        case "a":
          if (tetris.gameRunning) {
            tetris.goLeft();
          }
          break;
        case "d":
          if (tetris.gameRunning) {
            tetris.goRight();
          }
          break;

        case "w":
          if (tetris.gameRunning) {
            tetris.rotate();
          }
          break;

        case "s":
          if (tetris.gameRunning) {
            tetris.fallElement();
          }
          break;
        case "Enter":
          if (!tetris.gameRunning) {
            tetris.startGame();
          }
          break;

        case "p":
          if (tetris.gameRunning) {
            tetris.pauseGame();
          }
          break;
        case "n":
          if (!tetris.gameRunning) {
            if (element("log")!.style.display != "none") {
              tetris.newGame();
              element("log")!.style.display = "none";
              element("gameRow")!.style.display = "block";
            } else {
              tetris.newGame();
            }
          }
          break;
        default:
          break;
      }
    }
  });
});

let holdingCtrl = false;
let holdingShift = false;

document.addEventListener("keydown", (e) => {
  if (e.key == "Control") {
    holdingCtrl = true;
  }
  if (e.key == "Shift") {
    holdingShift = true;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key == "Control") {
    holdingCtrl = false;
  }
  if (e.key == "Shift") {
    holdingShift = false;
  }
});

let counter: number = 0;
document.getElementsByClassName("pi")[0].addEventListener("click", () => {
  if (holdingCtrl && holdingShift) {
    // redirect to console.html
    window.location.replace("console.html");
    return;
  }
  switch (counter) {
    case 0:
      console.log(
        '%c"Click on it and then press ctrl and shift"',
        "color: #41FF00; font-size: 10px;"
      );
      break;
    case 1:
      console.log(
        "%cAngela was never really good at following orders",
        "font-style: italic; font-size: 10px;"
      );
      break;
    case 2:
      console.log(
        "%cI'm not sure why you're still here...",
        "font-size: 10px;"
      );
      break;
    case 3:
      console.log(
        '%c"Trying the same thing over and over again and expecting different results is the definition of insanity" - Albert Einstein',
        "font-weight: bold;"
      );
      break;
    case 4:
      console.log(
        "%cReally?%c Have you never watched %cThe Net%c?",
        "font-size: 12px;",
        "font-size: 10px;",
        "text-decoration: underline; font-weight: bold;",
        "font-size: 10px;"
      );
      break;
    case 5:
      console.log(
        "%cI could not make this any easier for you",
        "font-size: 10px;"
      );
      window.open("https://www.youtube.com/watch?v=pXPXMxsXT28", "_blank");
      break;
    default:
      break;
  }
  counter++;
});
