"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const element = (id) => {
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
const waitingGameOver = (score, highScore) => {
    element("log").innerHTML = "";
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
const displayDOM = (tetris) => {
    element("game").innerHTML = "";
    for (let y = 3; y < tetris.matrix.length; y++) {
        let lineOutput = "";
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
        element("game").innerHTML =
            element("game").innerHTML +
                "<p class='game-line change-color'>" +
                lineOutput +
                "</p>";
    }
};
const displayScoreDOM = (tetris) => {
    element("score").innerHTML = "Score: " + tetris.score;
};
const gameOverAnimation = (tetris) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const collection = document.getElementsByClassName("change-color");
    for (let i = 0; i < collection.length; i++) {
        let element = collection[i];
        element.style.color = "#cc0000";
    }
    yield tetris.sleep(1250);
    for (let i = 1; i < tetris.matrix.length; i++) {
        element("game").innerHTML = "";
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
            element("game").innerHTML =
                ((_a = element("game")) === null || _a === void 0 ? void 0 : _a.innerHTML) +
                    "<p class='game-line red'>" +
                    lineOutput +
                    "</p>";
        }
        yield tetris.sleep(75);
    }
    for (let i = 0; i < collection.length; i++) {
        let element = collection[i];
        element.style.color = "#41FF00";
    }
    element("gameRow").style.display = "none";
    element("log").style.display = "block";
    waitingGameOver(tetris.score, tetris.highScore);
});
let tetris = new Tetris({
    displayMatrix: displayDOM,
    displayScore: displayScoreDOM,
    displayGameOver: gameOverAnimation,
});
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    // tetris.setDisplayMatrix(displayDOM);
    // tetris.setDisplayScore(displayScoreDOM);
    // tetris.setDisplayGameOver(gameOverAnimation);
    waiting();
    (_a = element("body")) === null || _a === void 0 ? void 0 : _a.addEventListener("keypress", (e) => {
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
                if (!tetris.gameRunning && element('log').style.display != 'none') {
                    tetris.newGame();
                    element("log").style.display = 'none';
                    element("gameRow").style.display = 'block';
                }
                break;
            default:
                break;
        }
    });
});
