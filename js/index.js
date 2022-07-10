const element = (id) => {
  return document.getElementById(id);
};

const waiting = () => {
  new TypeIt("#log", {
    strings: "press n to start...",
    startDelay: 1500,
    speed: 75,
  }).go();
};

const displayDOM = (matrix) => {
  $("#game").html("");
  for (y = 3; y < matrix.length; y++) {
    lineOutput = [];
    for (x in matrix[y]) {
      if (matrix[y][x] == 0) {
        // lineOutput += [" &nbsp "]
        lineOutput += [" &nbsp "];
        // lineOutput += [" &nbsp "]
      }
      if (matrix[y][x] == 1) {
        // lineOutput += [" &nbsp "]
        lineOutput += [" - "];
        // lineOutput += [" &nbsp "]
      }
      if (matrix[y][x] == 2) {
        // lineOutput += [" &nbsp "]
        lineOutput += [" o "];
        // lineOutput += [" &nbsp "]
      }
    }
    $("#game").html(
      $("#game").html() +
        "<p class='text-center green game-line'>" +
        lineOutput +
        "</p>"
    );
  }
};

const displayScoreDOM = (score) => {
  element("score").innerHTML = "Score: " + score;
};

const waitingGameOver = () => {
  $("#log").html("");
  new TypeIt("#log", {
    strings: [
      "game over",
      "you scored " + " points",
      "press n to try again...",
    ],
    speed: 125,
  }).go();
};

const gameOverAnimation = async (tetris) => {
  await $(".green").addClass("red").removeClass("green");
  $("p").css("color", "#cc0000");
  $("h1").css("color", "#cc0000");
  await tetris.sleep(1250);
  for (i = 1; i < tetris.matrix.length; i++) {
    $("#game").html("");
    for (y = 3; y < tetris.matrix.length - i; y++) {
      lineOutput = [];
      for (x in tetris.matrix[y]) {
        if (tetris.matrix[y][x] == 0) {
          lineOutput += [" &nbsp "];
        }
        if (tetris.matrix[y][x] == 1) {
          lineOutput += [" - "];
        }
        if (tetris.matrix[y][x] == 2) {
          lineOutput += [" o "];
        }
      }
      $("#game").html(
        $("#game").html() +
          "<p class='text-center red game-line'>" +
          lineOutput +
          "</p>"
      );
    }
    await tetris.sleep(75);
  }
  $("p").css("color", "#41FF00");
  $("h1").css("color", "#41FF00");
  $(".red").addClass("green").removeClass("red");
  $("#gameRow").hide();
  $("#log").show();
};

let tetris = {};
$(document).ready(function () {
  tetris = new Tetris({
    displayMatrix: displayDOM,
    displayScore: displayScoreDOM,
    displayGameOver: gameOverAnimation,
  });
  // tetris.setDisplayMatrix(displayDOM);
  // tetris.setDisplayScore(displayScoreDOM);
  // tetris.setDisplayGameOver(gameOverAnimation);
  waiting();
  $(window).keypress(function (e) {
    if (e.which == 97) {
      if (tetris.gameRunning) {
        tetris.goLeft();
      }
    }
    if (e.which == 100) {
      if (tetris.gameRunning) {
        tetris.goRight();
      }
    }
    if (e.which == 119) {
      if (tetris.gameRunning) {
        tetris.rotate();
      }
    }
    if (e.which == 115) {
      if (tetris.gameRunning) {
        tetris.fallElement();
      }
    }
    if (e.which == 13) {
      if (!tetris.gameRunning) {
        tetris.startGame();
      }
    }
    if (e.which == 112) {
      if (tetris.gameRunning) {
        tetris.pauseGame();
      }
    }
    if (e.which == 110) {
      if (!tetris.gameRunning) {
        tetris.startGame();
        $("#log").hide();
        $("#gameRow").show();
        $("#game-over").hide();
      }
    }
  });
});
