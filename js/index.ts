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

const displayDOM = (matrix: Array<Array<number>>) => {
  element("game")!.innerHTML = "";
  for (let y = 3; y < matrix.length; y++) {
    let lineOutput: string = "";
    for (let x in matrix[y]) {
      if (matrix[y][x] == 0) {
        // lineOutput += [" &nbsp "]
        lineOutput += " &nbsp ";
        // lineOutput += [" &nbsp "]
      }
      if (matrix[y][x] == 1) {
        // lineOutput += [" &nbsp "]
        lineOutput += " - ";
        // lineOutput += [" &nbsp "]
      }
      if (matrix[y][x] == 2) {
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

const displayScoreDOM = (score: number) => {
  element("score")!.innerHTML = "Score: " + score;
};

const waitingGameOver = () => {
  element("log")!.innerHTML = "";
  //@ts-ignore
  new TypeIt("#log", {
    strings: [
      "game over",
      "you scored " + " points",
      "press n to try again...",
    ],
    speed: 125,
  }).go();
};

const gameOverAnimation = async (tetris: any) => {
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
  element("gameRow")!.style.display = "none";
  element("log")!.style.display = "block";
};

let tetris = new Tetris({
  displayMatrix: displayDOM,
  displayScore: displayScoreDOM,
  displayGameOver: gameOverAnimation,
});
document.addEventListener("DOMContentLoaded", () => {
  // tetris.setDisplayMatrix(displayDOM);
  // tetris.setDisplayScore(displayScoreDOM);
  // tetris.setDisplayGameOver(gameOverAnimation);
  waiting();
  element("body")?.addEventListener("keypress", (e) => {
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
          tetris.startGame();
          element("log")!.style.display = 'none';
          element("gameRow")!.style.display = 'block'
        }
        break;
      default:
        break;
    }
  });
});
