const colorToCss = (color: string) => {
  return `background-color: ${color}; padding-right: 9px;`;
};

const renderMatrix = (tetris: Tetris) => {
  let linePixels: string = "";
  let lineStyling: Array<string> = [];
  for (let y = 3; y < tetris.matrix.length; y++) {
    for (let x in tetris.matrix[y]) {
      linePixels += "%c ";
      if (tetris.matrix[y][x] == 0) {
        lineStyling.push(colorToCss("black"));
      }
      if (tetris.matrix[y][x] == 1) {
        lineStyling.push(colorToCss("green"));
      }
      if (tetris.matrix[y][x] == 2) {
        lineStyling.push(colorToCss("white"));
      }
    }
    // the next two lines are a workaround for chrome console grouping similar lines
    // it also serves to break the line
    linePixels += `%c ${y - 3}\n`;
    lineStyling.push(
      "background-color: transparent; opacity: 0.01; padding: 0px;"
    );
  }
  console.clear();
  console.log(linePixels, ...lineStyling);
};

const renderScore = (tetris: any) => {
  console.log(`Score:  ${tetris.score}`);
};

const renderGameOver = async (tetris: Tetris) => {
  const matrix = tetris.matrix;
  const matrixLength = matrix.length;
  for (let i = 1; i < matrixLength; i++) {
    renderMatrix(tetris);
    await tetris.sleep(75);
    matrix.pop();
  }
  console.log("%cGame Over", "font-size: 42px; color: red");
  console.log("");
  console.log(
    `%cScore:  ${tetris.score}, %chighscore: ${tetris.highScore}`,
    "font-size: 25px; font-weight: bold;",
    "font-size: 18px; font-weight: bold;"
  );
  if (tetris.score > tetris.highScore) {
    console.log(
      `%cNew Highscore!`,
      "font-size: 25px; color: yellow; font-weight: bold;"
    );
  }
};

const t: Tetris = new Tetris({
  displayMatrix: renderMatrix,
  displayScore: renderScore,
  displayGameOver: renderGameOver,
});

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("body")?.addEventListener("keypress", (e) => {
    switch (e.key) {
      case "a":
        if (t.gameRunning) {
          t.goLeft();
        }
        break;
      case "d":
        if (t.gameRunning) {
          t.goRight();
        }
        break;

      case "w":
        if (t.gameRunning) {
          t.rotate();
        }
        break;

      case "s":
        if (t.gameRunning) {
          t.fallElement();
        }
        break;
      case "Enter":
        if (!t.gameRunning) {
          t.startGame();
        }
        break;

      case "p":
        if (t.gameRunning) {
          t.pauseGame();
        }
        break;
      case "n":
        if (!t.gameRunning) {
          t.newGame();
        }
        break;
      default:
        break;
    }
  });
});

console.log(
  "%cPress N to start the game %c(in the DOM)",
  "color: green; font-size: 20px; font-weight: bold;",
  "font-size: 12px;"
);
