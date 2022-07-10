interface DisplayArguments {
  displayMatrix?: Function;
  displayScore?: Function;
  displayGameOver?: Function;
}

class Tetris {
  gameRunning: boolean;
  matrix: Array<Array<number>>;
  score: number;
  gameSpeed: number;
  element: any;
  displayMatrix: Function;
  displayScore: Function;
  displayGameOver: Function;
  constructor({
    displayMatrix,
    displayScore,
    displayGameOver,
  }: DisplayArguments) {
    this.gameRunning = false;
    this.matrix = [
      // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (x)
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //0
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //1
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //2
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //3
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //4
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //5
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //6
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //7
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //8
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //9
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //10
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //11
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //12
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //13
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //14
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //15
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //16
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //17
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //18
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //19
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //20
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //21
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //22
      [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], //23
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], //24
    ]; //(y)
    this.score = 0;
    this.gameSpeed = 150;
    this.element = null;
    if (displayMatrix) {
      this.displayMatrix = displayMatrix;
    } else {
      this.displayMatrix = (tetris: any) => {this.logMatrix(tetris);};
    }
    if (displayScore) {
      this.displayScore = displayScore;
    } else {
      this.displayScore = (tetris: any) => {this.logScore(tetris);};
    }
    if (displayGameOver) {
      this.displayGameOver = displayGameOver;
    } else {
      this.displayGameOver = (tetris: any) => {this.logGameOver(tetris);};
    }
    this.createElement();
  }

  setDisplayMatrix(method: Function) {
    this.displayMatrix = method;
  }

  setDisplayScore(method: Function) {
    this.displayScore = method;
  }

  setDisplayGameOver(method: Function) {
    this.displayGameOver = method;
  }

  sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  rotate() {
    this.element.rotate();
    this.displayMatrix(this);
  }
  logMatrix(tetris: any): void {
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

  logScore(tetris: any) {
    console.log("You have " + tetris.score + " points.");
  }

  logGameOver(tetris: any) {
    console.log("Game Over! You scored " + tetris.score + " points.");
  }

  getBlock(x: number, y: number): number {
    //returns block's value
    return this.matrix[y][x];
  }

  goLeft(): void {
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

  goRight(): void {
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

  swap(a: number, b: number): void {
    [this.element.points[a], this.element.points[b]] = [
      this.element.points[b],
      this.element.points[a],
    ];
  }

  orderElementPointsDown(): void {
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

  orderElementPointsLeft(): void {
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

  checkForGameOver():boolean {
    for (let i = 1; i < this.matrix[3].length - 1; i++) {
      if (this.matrix[3][i] == 1) {
        this.pauseGame();
        this.displayGameOver(this);
        return true
      }
    }
    return false
  }

  changeBlock(x: number, y: number, value: number) {
    //changes block to value
    this.matrix[y][x] = value;
  }

  fallBlock(x: number, y: number) {
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
      if(this.checkForGameOver()){
        return 'over'
      }
    } else {
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

  async startGame() {
    this.gameRunning = true;
    this.displayMatrix(this);
    while (this.gameRunning === true) {
      let elementState = this.fallElement()
      if (elementState === "placed") {
        this.createElement();
      }
      if (elementState != "over"){
        await this.sleep(this.gameSpeed);
        this.displayMatrix(this);
      }
    }
  }
}
