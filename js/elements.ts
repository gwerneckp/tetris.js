type PointType = {
    x: number;
    y: number;
    id: string;
}

class Point {
    x: number;
    y: number;
    id: string;
    constructor(x:number, y:number, id:string) {
      this.x = x;
      this.y = y;
      this.id = id;
    }
  }
  
  class Block {
    points: Array<PointType> = [];
    state: number;
    placed = false;
    aInd = -1;
    bInd = -1;
    cInd = -1;
    dInd = -1;
    tetris: any;
    constructor(tetris:any){
        this.state = 0
        this.tetris = tetris
    }
    getIds() {
      for (var i in this.points) {
        if (this.points[i].id == "a") {
          this.aInd = parseInt(i);
        } else if (this.points[i].id == "b") {
          this.bInd = parseInt(i);
        } else if (this.points[i].id == "c") {
          this.cInd = parseInt(i);
        } else if (this.points[i].id == "d") {
          this.dInd = parseInt(i);
        }
      }
    }
    rotate() {}
  }
  
  class Line extends Block {
    constructor(tetris:any) {
      super(tetris);
      this.points = [
        new Point(4, 3, "a"),
        new Point(5, 3, "b"),
        new Point(6, 3, "c"),
        new Point(7, 3, "d"),
      ];
    }
  
    zeroToOne() {
      //moving a
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y - 2, 2);
      this.points[this.aInd].y = this.points[this.cInd].y - 2;
      this.points[this.aInd].x = this.points[this.cInd].x;
  
      //moving b
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y - 1, 2);
      this.points[this.bInd].y = this.points[this.cInd].y - 1;
      this.points[this.bInd].x = this.points[this.cInd].x;
  
      //moving d
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y - 3, 2);
      this.points[this.dInd].y = this.points[this.cInd].y - 3;
      this.points[this.dInd].x = this.points[this.cInd].x;
      this.state = 1;
    }
  
    zeroToOnePossible() {
      if (this.tetris.getBlock(this.points[this.cInd].x, this.points[this.cInd].y - 2) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.cInd].x, this.points[this.cInd].y - 1) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.cInd].x, this.points[this.cInd].y - 3) != 0) {
        return false;
      }
      return true;
    }
  
    //  ..d.    ....
    //  ..a. to ....
    //  ..b.    ....
    //  ..c.    abcd
  
    oneToTwo() {
      //moving a
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x - 2, this.points[this.cInd].y, 2);
      this.points[this.aInd].y = this.points[this.cInd].y;
      this.points[this.aInd].x = this.points[this.cInd].x - 2;
  
      //moving b
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x - 1, this.points[this.cInd].y, 2);
      this.points[this.bInd].y = this.points[this.cInd].y;
      this.points[this.bInd].x = this.points[this.cInd].x - 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x + 1, this.points[this.cInd].y, 2);
      this.points[this.dInd].y = this.points[this.cInd].y;
      this.points[this.dInd].x = this.points[this.cInd].x + 1;
      this.state = 2;
    }
  
    oneToTwoPossible() {
      if (this.tetris.getBlock(this.points[this.cInd].x - 2, this.points[this.cInd].y) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.cInd].x - 1, this.points[this.cInd].y) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.cInd].x + 1, this.points[this.cInd].y) != 0) {
        return false;
      }
      return true;
    }
  
    //  ....    ..d.
    //  .... to ..a.
    //  ....    ..c.
    //  abcd    ..b.
    twoToThree() {
      //moving a
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y - 3, 2);
      this.points[this.aInd].y = this.points[this.bInd].y - 3;
      this.points[this.aInd].x = this.points[this.bInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y - 1, 2);
      this.points[this.cInd].y = this.points[this.bInd].y - 1;
      this.points[this.cInd].x = this.points[this.bInd].x;
  
      //moving d
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y - 2, 2);
      this.points[this.dInd].y = this.points[this.bInd].y - 2;
      this.points[this.dInd].x = this.points[this.bInd].x;
      this.state = 3;
    }
  
    twoToThreePossible() {
      if (this.tetris.getBlock(this.points[this.bInd].x, this.points[this.bInd].y - 3) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.bInd].x, this.points[this.bInd].y - 1) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.bInd].x, this.points[this.bInd].y - 2) != 0) {
        return false;
      }
      return true;
    }
  
    //  .d..    ....
    //  .a.. to ....
    //  .c..    ....
    //  .b..    abcd
    threeToZero() {
      //moving a
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
      this.tetris.changeBlock(this.points[this.bInd].x - 1, this.points[this.bInd].y, 2);
      this.points[this.aInd].y = this.points[this.bInd].y;
      this.points[this.aInd].x = this.points[this.bInd].x - 1;
  
      //moving b
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.bInd].x + 1, this.points[this.bInd].y, 2);
      this.points[this.cInd].y = this.points[this.bInd].y;
      this.points[this.cInd].x = this.points[this.bInd].x + 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
      this.tetris.changeBlock(this.points[this.bInd].x + 2, this.points[this.bInd].y, 2);
      this.points[this.dInd].y = this.points[this.bInd].y;
      this.points[this.dInd].x = this.points[this.bInd].x + 2;
      this.state = 0;
    }
  
    threeToZeroPossible() {
      if (this.tetris.getBlock(this.points[this.bInd].x - 1, this.points[this.bInd].y) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.bInd].x + 1, this.points[this.bInd].y) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.bInd].x + 2, this.points[this.bInd].y) != 0) {
        return false;
      }
      return true;
    }
  
    //  d...    ....
    //  a... to ....
    //  c...    ....
    //  b...    abcd
  
    somethingLeftRotation() {
      //moving a
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 2);
      this.points[this.aInd].y = this.points[this.bInd].y;
      this.points[this.aInd].x = this.points[this.bInd].x;
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x + 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y, 2);
      this.points[this.cInd].y = this.points[this.aInd].y;
      this.points[this.cInd].x = this.points[this.aInd].x + 2;
  
      //moving d
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
      this.tetris.changeBlock(this.points[this.aInd].x + 3, this.points[this.aInd].y, 2);
      this.points[this.dInd].y = this.points[this.aInd].y;
      this.points[this.dInd].x = this.points[this.aInd].x + 3;
  
      this.state += 1;
      if (this.state == 4) {
        this.state = 0;
      }
    }
  
    somethingLeftRotationPossible() {
      if (this.tetris.getBlock(this.points[this.bInd].x + 1, this.points[this.bInd].y) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.bInd].x + 2, this.points[this.bInd].y) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.bInd].x + 3, this.points[this.bInd].y) != 0) {
        return false;
      }
      return true;
    }
  
    //  ...d    ....
    //  ...a to ....
    //  ...b    ....
    //  ...c    abcd
  
    somethingRightRotation() {
      //moving d
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 2);
      this.points[this.dInd].y = this.points[this.cInd].y;
      this.points[this.dInd].x = this.points[this.cInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.dInd].x - 1, this.points[this.dInd].y, 2);
      this.points[this.cInd].y = this.points[this.dInd].y;
      this.points[this.cInd].x = this.points[this.dInd].x - 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x - 2, this.points[this.dInd].y, 2);
      this.points[this.bInd].y = this.points[this.dInd].y;
      this.points[this.bInd].x = this.points[this.dInd].x - 2;
  
      //moving a
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x - 3, this.points[this.dInd].y, 2);
      this.points[this.aInd].y = this.points[this.dInd].y;
      this.points[this.aInd].x = this.points[this.dInd].x - 3;
  
      this.state += 1;
      if (this.state == 4) {
        this.state = 0;
      }
    }
  
    somethingRightRotationPossible() {
      if (this.tetris.getBlock(this.points[this.cInd].x - 1, this.points[this.cInd].y) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.cInd].x - 2, this.points[this.cInd].y) != 0) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.cInd].x - 3, this.points[this.cInd].y) != 0) {
        return false;
      }
      return true;
    }
  
    rotate() {
      this.getIds();
  
      if (this.state == 0) {
        if (this.zeroToOnePossible()) {
          this.zeroToOne();
          return;
        }
        if (this.twoToThreePossible()) {
          this.twoToThree();
          return;
        }
      }
  
      if (this.state == 1) {
        if (this.oneToTwoPossible()) {
          this.oneToTwo();
          return;
        }
        if (this.threeToZeroPossible()) {
          this.threeToZero();
          return;
        }
        if (this.somethingRightRotationPossible()) {
          this.somethingRightRotation();
          return;
        }
        if (this.somethingLeftRotationPossible()) {
          this.somethingLeftRotation();
          return;
        }
      }
  
      if (this.state == 2) {
        if (this.twoToThreePossible()) {
          this.twoToThree();
          return;
        }
        if (this.zeroToOnePossible()) {
          this.zeroToOne();
          return;
        }
      }
  
      if (this.state == 3) {
        if (this.threeToZeroPossible()) {
          this.threeToZero();
          return;
        }
        if (this.oneToTwoPossible()) {
          this.oneToTwo();
          return;
        }
        if (this.somethingRightRotationPossible()) {
          this.somethingRightRotation();
          return;
        }
        if (this.somethingLeftRotationPossible()) {
          this.somethingLeftRotation();
          return;
        }
      }
    }
  }
  
  class Square extends Block {
    constructor(tetris:any) {
      super(tetris);
      this.points = [
        new Point(4, 3, "a"),
        new Point(5, 3, "b"),
        new Point(4, 4, "d"),
        new Point(5, 4, "c"),
      ];
    }
    rotate() {
      return;
    }
  }
  
  class TShape extends Block {
    constructor(tetris:any) {
      super(tetris);
      this.points = [
        new Point(4, 3, "b"),
        new Point(5, 3, "a"),
        new Point(6, 3, "c"),
        new Point(5, 4, "d"),
      ];
    }
  
    stateOne() {
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y + 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y - 1;
      this.points[this.cInd].x = this.points[this.aInd].x;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
      this.points[this.dInd].y = this.points[this.aInd].y;
      this.points[this.dInd].x = this.points[this.aInd].x - 1;
  
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 0);
  
      this.state = 1;
    }
  
    stateOnePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      return true;
    }
  
    stateTwo() {
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x + 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
      this.points[this.cInd].y = this.points[this.aInd].y;
      this.points[this.cInd].x = this.points[this.aInd].x - 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y - 1;
      this.points[this.dInd].x = this.points[this.aInd].x;
  
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 0);
  
      this.state = 2;
    }
  
    stateTwoPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      return true;
    }
  
    stateThree() {
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y + 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y - 1;
      this.points[this.cInd].x = this.points[this.aInd].x;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.dInd].y = this.points[this.aInd].y;
      this.points[this.dInd].x = this.points[this.aInd].x + 1;
  
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 0);
  
      this.state = 3;
    }
  
    stateThreePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      return true;
    }
  
    stateZero() {
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x + 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
      this.points[this.cInd].y = this.points[this.aInd].y;
      this.points[this.cInd].x = this.points[this.aInd].x - 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y + 1;
      this.points[this.dInd].x = this.points[this.aInd].x;
  
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 0);
  
      this.state = 0;
    }
  
    stateZeroPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      return true;
    }
  
    rotate() {
      this.getIds();
  
      if (this.state == 0) {
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
      }
  
      if (this.state == 1) {
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
      }
  
      if (this.state == 2) {
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateOne();
          return;
        }
      }
  
      if (this.state == 3) {
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
      }
    }
  }
  
  class LShape extends Block {
    constructor(tetris:any) {
      super(tetris);
      this.points = [
        new Point(4, 3, "b"),
        new Point(5, 3, "c"),
        new Point(6, 3, "d"),
        new Point(4, 4, "a"),
      ];
    }
  
    stateOne() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x + 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y + 1;
      this.points[this.cInd].x = this.points[this.aInd].x + 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 2, 2);
      this.points[this.dInd].y = this.points[this.aInd].y + 2;
      this.points[this.dInd].x = this.points[this.aInd].x + 1;
  
      this.state = 1;
    }
  
    stateOnePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 2) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateTwo() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0) *
        //moving b
        this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y + 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y + 1;
      this.points[this.cInd].x = this.points[this.aInd].x - 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x - 2, this.points[this.aInd].y + 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y + 1;
      this.points[this.dInd].x = this.points[this.aInd].x - 2;
  
      this.state = 2;
    }
  
    stateTwoPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 2, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateThree() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x - 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y - 1;
      this.points[this.cInd].x = this.points[this.aInd].x - 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 2, 2);
      this.points[this.dInd].y = this.points[this.aInd].y - 2;
      this.points[this.dInd].x = this.points[this.aInd].x - 1;
  
      this.state = 3;
    }
  
    stateThreePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 2) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateZero() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y - 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y - 1;
      this.points[this.cInd].x = this.points[this.aInd].x + 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y - 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y - 1;
      this.points[this.dInd].x = this.points[this.aInd].x + 2;
  
      this.state = 0;
    }
  
    stateZeroPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    rotate() {
      this.getIds();
  
      if (this.state == 0) {
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
      }
  
      if (this.state == 1) {
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
      }
  
      if (this.state == 2) {
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateOne();
          return;
        }
      }
  
      if (this.state == 3) {
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
      }
    }
  }
  
  class InvertedLShape extends Block {
    constructor(tetris:any) {
      super(tetris);
      this.points = [
        new Point(4, 3, "d"),
        new Point(5, 3, "c"),
        new Point(6, 3, "b"),
        new Point(6, 4, "a"),
      ];
    }
  
    stateOne() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x + 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y - 1;
      this.points[this.cInd].x = this.points[this.aInd].x + 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 2, 2);
      this.points[this.dInd].y = this.points[this.aInd].y - 2;
      this.points[this.dInd].x = this.points[this.aInd].x + 1;
  
      this.state = 1;
    }
  
    stateOnePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 2) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateTwo() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y + 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y + 1;
      this.points[this.cInd].x = this.points[this.aInd].x + 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y + 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y + 1;
      this.points[this.dInd].x = this.points[this.aInd].x + 2;
  
      this.state = 2;
    }
  
    stateTwoPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateThree() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x - 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y + 1;
      this.points[this.cInd].x = this.points[this.aInd].x - 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 2, 2);
      this.points[this.dInd].y = this.points[this.aInd].y + 2;
      this.points[this.dInd].x = this.points[this.aInd].x - 1;
  
      this.state = 3;
    }
  
    stateThreePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 2) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateZero() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y - 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y - 1;
      this.points[this.cInd].x = this.points[this.aInd].x - 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x - 2, this.points[this.aInd].y - 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y - 1;
      this.points[this.dInd].x = this.points[this.aInd].x - 2;
  
      this.state = 0;
    }
  
    stateZeroPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 2, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    rotate() {
      this.getIds();
  
      if (this.state == 0) {
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
      }
  
      if (this.state == 1) {
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
      }
  
      if (this.state == 2) {
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateOne();
          return;
        }
      }
  
      if (this.state == 3) {
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
      }
    }
  }
  
  class WormRight extends Block {
    constructor(tetris:any) {
      super(tetris);
      this.points = [
        new Point(4, 3, "b"),
        new Point(5, 3, "a"),
        new Point(5, 4, "c"),
        new Point(6, 4, "d"),
      ];
    }
  
    stateOne() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y - 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
      this.points[this.cInd].y = this.points[this.aInd].y;
      this.points[this.cInd].x = this.points[this.aInd].x - 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y + 1;
      this.points[this.dInd].x = this.points[this.aInd].x - 1;
  
      this.state = 1;
    }
  
    stateOnePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateTwo() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x + 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y - 1;
      this.points[this.cInd].x = this.points[this.aInd].x;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y - 1;
      this.points[this.dInd].x = this.points[this.aInd].x - 1;
  
      this.state = 2;
    }
  
    stateTwoPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateThree() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y + 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.cInd].y = this.points[this.aInd].y;
      this.points[this.cInd].x = this.points[this.aInd].x + 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y - 1;
      this.points[this.dInd].x = this.points[this.aInd].x + 1;
  
      this.state = 3;
    }
  
    stateThreePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateZero() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x - 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y + 1;
      this.points[this.cInd].x = this.points[this.aInd].x;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y + 1;
      this.points[this.dInd].x = this.points[this.aInd].x + 1;
  
      this.state = 0;
    }
  
    stateZeroPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    rotate() {
      this.getIds();
  
      if (this.state == 0) {
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
      }
  
      if (this.state == 1) {
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
      }
  
      if (this.state == 2) {
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateOne();
          return;
        }
      }
  
      if (this.state == 3) {
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
      }
    }
  }
  
  class WormLeft extends Block {
    constructor(tetris:any) {
      super(tetris);
      this.points = [
        new Point(6, 3, "b"),
        new Point(5, 3, "a"),
        new Point(5, 4, "c"),
        new Point(4, 4, "d"),
      ];
    }
  
    stateOne() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y + 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
      this.points[this.cInd].y = this.points[this.aInd].y;
      this.points[this.cInd].x = this.points[this.aInd].x - 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y - 1;
      this.points[this.dInd].x = this.points[this.aInd].x - 1;
  
      this.state = 1;
    }
  
    stateOnePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateTwo() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x - 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y - 1;
      this.points[this.cInd].x = this.points[this.aInd].x;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y - 1;
      this.points[this.dInd].x = this.points[this.aInd].x + 1;
  
      this.state = 2;
    }
  
    stateTwoPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateThree() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
      this.points[this.bInd].y = this.points[this.aInd].y - 1;
      this.points[this.bInd].x = this.points[this.aInd].x;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.cInd].y = this.points[this.aInd].y;
      this.points[this.cInd].x = this.points[this.aInd].x + 1;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y + 1;
      this.points[this.dInd].x = this.points[this.aInd].x + 1;
  
      this.state = 3;
    }
  
    stateThreePossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    stateZero() {
      //removing unnocupied
      this.tetris.changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
      this.tetris.changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
      this.tetris.changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
  
      //moving b
      this.tetris.changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
      this.points[this.bInd].y = this.points[this.aInd].y;
      this.points[this.bInd].x = this.points[this.aInd].x + 1;
  
      //moving c
      this.tetris.changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
      this.points[this.cInd].y = this.points[this.aInd].y + 1;
      this.points[this.cInd].x = this.points[this.aInd].x;
  
      //moving d
      this.tetris.changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1, 2);
      this.points[this.dInd].y = this.points[this.aInd].y + 1;
      this.points[this.dInd].x = this.points[this.aInd].x - 1;
  
      this.state = 0;
    }
  
    stateZeroPossible() {
      if (this.tetris.getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
        return false;
      }
      if (this.tetris.getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
        return false;
      }
      if (
        this.tetris.getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1) == 1
      ) {
        return false;
      }
      return true;
    }
  
    rotate() {
      this.getIds();
  
      if (this.state == 0) {
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
      }
  
      if (this.state == 1) {
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
      }
  
      if (this.state == 2) {
        if (this.stateThreePossible()) {
          this.stateThree();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateZeroPossible()) {
          this.stateOne();
          return;
        }
      }
  
      if (this.state == 3) {
        if (this.stateZeroPossible()) {
          this.stateZero();
          return;
        }
        if (this.stateOnePossible()) {
          this.stateOne();
          return;
        }
        if (this.stateTwoPossible()) {
          this.stateTwo();
          return;
        }
      }
    }
  }
  