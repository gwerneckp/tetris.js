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
class Tetris {
    constructor({ displayMatrix, displayScore, displayGameOver, }) {
        this.gameRunning = false;
        this.matrix = [
            // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (x)
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //24
        ]; //(y)
        this.score = 0;
        this.gameSpeed = 150;
        this.element = null;
        if (displayMatrix) {
            this.displayMatrix = displayMatrix;
        }
        else {
            this.displayMatrix = (tetris) => { this.logMatrix(tetris); };
        }
        if (displayScore) {
            this.displayScore = displayScore;
        }
        else {
            this.displayScore = (tetris) => { this.logScore(tetris); };
        }
        if (displayGameOver) {
            this.displayGameOver = displayGameOver;
        }
        else {
            this.displayGameOver = (tetris) => { this.logGameOver(tetris); };
        }
        this.createElement();
    }
    setDisplayMatrix(method) {
        this.displayMatrix = method;
    }
    setDisplayScore(method) {
        this.displayScore = method;
    }
    setDisplayGameOver(method) {
        this.displayGameOver = method;
    }
    sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    rotate() {
        this.element.rotate();
        this.displayMatrix(this);
    }
    logMatrix(tetris) {
        console.clear();
        let gameOutput = "";
        for (let y in tetris.matrix) {
            for (let x in tetris.matrix[y]) {
                if (tetris.matrix[y][x] == 0) {
                    gameOutput += "   ";
                }
                if (tetris.matrix[y][x] == 1) {
                    gameOutput += " - ";
                }
                if (tetris.matrix[y][x] == 2) {
                    gameOutput += " o ";
                }
            }
            gameOutput += "\n";
        }
        console.log(gameOutput);
        console.log("");
    }
    logScore(tetris) {
        console.log("You have " + tetris.score + " points.");
    }
    logGameOver(tetris) {
        console.log("Game Over! You scored " + tetris.score + " points.");
    }
    getBlock(x, y) {
        //returns block's value
        return this.matrix[y][x];
    }
    goLeft() {
        let somethingLeft = false;
        this.orderElementPointsLeft();
        for (var i in this.element.points) {
            let x = this.element.points[i].x; //define a variable for proper lisibility
            let y = this.element.points[i].y; //define a variable for proper lisibility
            if (this.getBlock(x - 1, y) == 1) {
                somethingLeft = true;
            }
        }
        if (somethingLeft == false) {
            for (var i in this.element.points) {
                let x = this.element.points[i].x; //define a variable for proper lisibility
                let y = this.element.points[i].y; //define a variable for proper lisibility
                let newX = x - 1;
                this.matrix[y][x] = 0;
                this.matrix[y][newX] = 2;
                this.element.points[i].x = newX;
            }
        }
        this.displayMatrix(this);
    }
    goRight() {
        let somethingRight = false;
        this.orderElementPointsRight();
        for (var i in this.element.points) {
            let x = this.element.points[i].x; //define a variable for proper lisibility
            let y = this.element.points[i].y; //define a variable for proper lisibility
            if (this.getBlock(x + 1, y) == 1) {
                somethingRight = true;
            }
        }
        if (somethingRight == false) {
            for (var i in this.element.points) {
                let x = this.element.points[i].x; //define a variable for proper lisibility
                let y = this.element.points[i].y; //define a variable for proper lisibility
                let newX = x + 1;
                this.matrix[y][x] = 0;
                this.matrix[y][newX] = 2;
                this.element.points[i].x = newX;
            }
        }
        this.displayMatrix(this);
    }
    swap(a, b) {
        [this.element.points[a], this.element.points[b]] = [
            this.element.points[b],
            this.element.points[a],
        ];
    }
    orderElementPointsDown() {
        for (let i in this.element.points) {
            //iterates through elements
            for (let j in this.element.points) {
                //iterates through elements
                let firstY = this.element.points[i].y; //stores y cord in variable
                let secondY = this.element.points[j].y; //stores y cord in variable
                if (firstY > secondY) {
                    //if j smaller then i:
                    this.swap(parseInt(i), parseInt(j)); //swap them
                }
            }
        }
    }
    orderElementPointsLeft() {
        for (var i in this.element.points) {
            //iterates through elements
            for (var j in this.element.points) {
                //iterates through elements
                let firstX = this.element.points[parseInt(i)].x; //stores y cord in variable
                let secondX = this.element.points[parseInt(j)].x; //stores y cord in variable
                if (firstX < secondX) {
                    //if j smaller then i:
                    this.swap(parseInt(i), parseInt(j)); //swap them
                }
            }
        }
    }
    orderElementPointsRight() {
        for (var i in this.element.points) {
            for (var j in this.element.points) {
                let firstX = this.element.points[parseInt(i)].x;
                let secondX = this.element.points[parseInt(j)].x;
                if (firstX > secondX) {
                    this.swap(parseInt(i), parseInt(j));
                }
            }
        }
    }
    checkForTetris() {
        for (let i = 1; i < this.matrix.length - 1; i++) {
            let isTetris = true;
            for (let j = 1; j < this.matrix[i].length - 1; j++) {
                if (this.matrix[i][j] == 0) {
                    isTetris = false;
                    break;
                }
            }
            if (isTetris) {
                for (let j = 1; j < this.matrix[i].length - 1; j++) {
                    this.matrix[i][j] = 0;
                }
                for (let k = i - 1; k > -1; k--) {
                    [this.matrix[k], this.matrix[k + 1]] = [
                        this.matrix[k + 1],
                        this.matrix[k],
                    ];
                }
                this.score += 1;
                this.displayScore(this);
            }
        }
    }
    checkForGameOver() {
        for (let i = 1; i < this.matrix[3].length - 1; i++) {
            if (this.matrix[3][i] == 1) {
                this.pauseGame();
                this.displayGameOver(this);
                return true;
            }
        }
        return false;
    }
    changeBlock(x, y, value) {
        //changes block to value
        this.matrix[y][x] = value;
    }
    fallBlock(x, y) {
        this.changeBlock(x, y, 0); //change block to 0
        let newY = y + 1;
        this.changeBlock(x, newY, 2); //change block below to 1
        return newY;
    }
    randomElement() {
        let random = Math.floor(Math.random() * 7);
        switch (random) {
            case 0:
                this.element = new Line(this);
                break;
            case 1:
                this.element = new Square(this);
                break;
            case 2:
                this.element = new TShape(this);
                break;
            case 3:
                this.element = new LShape(this);
                break;
            case 4:
                this.element = new InvertedLShape(this);
                break;
            case 5:
                this.element = new WormLeft(this);
                break;
            case 6:
                this.element = new WormRight(this);
                break;
            default:
                break;
        }
    }
    createElement() {
        this.randomElement();
        this.orderElementPointsDown();
        for (var i in this.element.points) {
            //loop elements in element
            let x = this.element.points[parseInt(i)].x; //define a variable for proper lisibility
            let y = this.element.points[parseInt(i)].y; //define a variable for proper lisibility
            this.changeBlock(x, y, 2); //change blocks
        }
    }
    fallElement() {
        let result = "";
        let somethingBelow = false;
        this.orderElementPointsDown();
        for (var i in this.element.points) {
            let x = this.element.points[parseInt(i)].x; //define a variable for proper lisibility
            let y = this.element.points[parseInt(i)].y; //define a variable for proper lisibility
            if (this.getBlock(x, y + 1) == 1) {
                somethingBelow = true;
                break;
            }
        }
        if (somethingBelow) {
            for (var i in this.element.points) {
                let x = this.element.points[parseInt(i)].x; //define a variable for proper lisibility
                let y = this.element.points[parseInt(i)].y; //define a variable for proper lisibility
                this.changeBlock(x, y, 1);
                result = "placed"; //function returns "placed"
            }
            this.checkForTetris();
            if (this.checkForGameOver()) {
                return 'over';
            }
        }
        else {
            for (var i in this.element.points) {
                let x = this.element.points[parseInt(i)].x; //define a variable for proper lisibility
                let y = this.element.points[parseInt(i)].y; //define a variable for proper lisibility
                //change block's y coordinate in matrix and reference element
                this.element.points[parseInt(i)].y = this.fallBlock(x, y);
                result = "falling"; //function returns "falling"
            }
        }
        this.displayMatrix(this);
        return result;
    }
    pauseGame() {
        this.displayMatrix(this);
        this.gameRunning = false;
    }
    startGame() {
        return __awaiter(this, void 0, void 0, function* () {
            this.gameRunning = true;
            this.displayMatrix(this);
            while (this.gameRunning === true) {
                let elementState = this.fallElement();
                if (elementState === "placed") {
                    this.createElement();
                }
                if (elementState != "over") {
                    yield this.sleep(this.gameSpeed);
                    this.displayMatrix(this);
                }
            }
        });
    }
}
