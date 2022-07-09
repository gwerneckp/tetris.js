function randomElement() {
  random = Math.floor(Math.random() * 7);
  switch (random) {
    case 0:
      element = new Line();
      break;
    case 1:
      element = new Square();
      break;
    case 2:
      element = new TShape();
      break;
    case 3:
      element = new LShape();
      break;
    case 4:
      element = new InvertedLShape();
      break;
    case 5:
      element = new WormLeft();
      break;
    case 6:
      element = new WormRight();
      break;
    default:
      break;
  }
}

class Point {
  constructor(x, y, id) {
    this.x = x;
    this.y = y;
    this.id = id;
  }
}

class Element {
  points = [];
  state = null;
  placed = false;
  aInd = -1;
  bInd = -1;
  cInd = -1;
  dInd = -1;
  getIds() {
    for (var i in this.points) {
      if (this.points[i].id == "a") {
        this.aInd = i;
      } else if (this.points[i].id == "b") {
        this.bInd = i;
      } else if (this.points[i].id == "c") {
        this.cInd = i;
      } else if (this.points[i].id == "d") {
        this.dInd = i;
      }
    }
  }
  rotate() {}
}

class Line extends Element {
  constructor() {
    super();
    this.points = [
      new Point(4, 3, "a"),
      new Point(5, 3, "b"),
      new Point(6, 3, "c"),
      new Point(7, 3, "d"),
    ];
    this.state = 0;
  }

  zeroToOne() {
    //moving a
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y - 2, 2);
    this.points[this.aInd].y = this.points[this.cInd].y - 2;
    this.points[this.aInd].x = this.points[this.cInd].x;

    //moving b
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y - 1, 2);
    this.points[this.bInd].y = this.points[this.cInd].y - 1;
    this.points[this.bInd].x = this.points[this.cInd].x;

    //moving d
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y - 3, 2);
    this.points[this.dInd].y = this.points[this.cInd].y - 3;
    this.points[this.dInd].x = this.points[this.cInd].x;
    this.state = 1;
  }

  zeroToOnePossible() {
    if (getBlock(this.points[this.cInd].x, this.points[this.cInd].y - 2) != 0) {
      return false;
    }
    if (getBlock(this.points[this.cInd].x, this.points[this.cInd].y - 1) != 0) {
      return false;
    }
    if (getBlock(this.points[this.cInd].x, this.points[this.cInd].y - 3) != 0) {
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
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
    changeBlock(this.points[this.cInd].x - 2, this.points[this.cInd].y, 2);
    this.points[this.aInd].y = this.points[this.cInd].y;
    this.points[this.aInd].x = this.points[this.cInd].x - 2;

    //moving b
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x - 1, this.points[this.cInd].y, 2);
    this.points[this.bInd].y = this.points[this.cInd].y;
    this.points[this.bInd].x = this.points[this.cInd].x - 1;

    //moving d
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
    changeBlock(this.points[this.cInd].x + 1, this.points[this.cInd].y, 2);
    this.points[this.dInd].y = this.points[this.cInd].y;
    this.points[this.dInd].x = this.points[this.cInd].x + 1;
    this.state = 2;
  }

  oneToTwoPossible() {
    if (getBlock(this.points[this.cInd].x - 2, this.points[this.cInd].y) != 0) {
      return false;
    }
    if (getBlock(this.points[this.cInd].x - 1, this.points[this.cInd].y) != 0) {
      return false;
    }
    if (getBlock(this.points[this.cInd].x + 1, this.points[this.cInd].y) != 0) {
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
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y - 3, 2);
    this.points[this.aInd].y = this.points[this.bInd].y - 3;
    this.points[this.aInd].x = this.points[this.bInd].x;

    //moving c
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y - 1, 2);
    this.points[this.cInd].y = this.points[this.bInd].y - 1;
    this.points[this.cInd].x = this.points[this.bInd].x;

    //moving d
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y - 2, 2);
    this.points[this.dInd].y = this.points[this.bInd].y - 2;
    this.points[this.dInd].x = this.points[this.bInd].x;
    this.state = 3;
  }

  twoToThreePossible() {
    if (getBlock(this.points[this.bInd].x, this.points[this.bInd].y - 3) != 0) {
      return false;
    }
    if (getBlock(this.points[this.bInd].x, this.points[this.bInd].y - 1) != 0) {
      return false;
    }
    if (getBlock(this.points[this.bInd].x, this.points[this.bInd].y - 2) != 0) {
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
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
    changeBlock(this.points[this.bInd].x - 1, this.points[this.bInd].y, 2);
    this.points[this.aInd].y = this.points[this.bInd].y;
    this.points[this.aInd].x = this.points[this.bInd].x - 1;

    //moving b
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.bInd].x + 1, this.points[this.bInd].y, 2);
    this.points[this.cInd].y = this.points[this.bInd].y;
    this.points[this.cInd].x = this.points[this.bInd].x + 1;

    //moving d
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
    changeBlock(this.points[this.bInd].x + 2, this.points[this.bInd].y, 2);
    this.points[this.dInd].y = this.points[this.bInd].y;
    this.points[this.dInd].x = this.points[this.bInd].x + 2;
    this.state = 0;
  }

  threeToZeroPossible() {
    if (getBlock(this.points[this.bInd].x - 1, this.points[this.bInd].y) != 0) {
      return false;
    }
    if (getBlock(this.points[this.bInd].x + 1, this.points[this.bInd].y) != 0) {
      return false;
    }
    if (getBlock(this.points[this.bInd].x + 2, this.points[this.bInd].y) != 0) {
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
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 2);
    this.points[this.aInd].y = this.points[this.bInd].y;
    this.points[this.aInd].x = this.points[this.bInd].x;

    //moving b
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x + 1;

    //moving c
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y, 2);
    this.points[this.cInd].y = this.points[this.aInd].y;
    this.points[this.cInd].x = this.points[this.aInd].x + 2;

    //moving d
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
    changeBlock(this.points[this.aInd].x + 3, this.points[this.aInd].y, 2);
    this.points[this.dInd].y = this.points[this.aInd].y;
    this.points[this.dInd].x = this.points[this.aInd].x + 3;

    this.state += 1;
    if (this.state == 4) {
      this.state = 0;
    }
  }

  somethingLeftRotationPossible() {
    if (getBlock(this.points[this.bInd].x + 1, this.points[this.bInd].y) != 0) {
      return false;
    }
    if (getBlock(this.points[this.bInd].x + 2, this.points[this.bInd].y) != 0) {
      return false;
    }
    if (getBlock(this.points[this.bInd].x + 3, this.points[this.bInd].y) != 0) {
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
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 2);
    this.points[this.dInd].y = this.points[this.cInd].y;
    this.points[this.dInd].x = this.points[this.cInd].x;

    //moving c
    changeBlock(this.points[this.dInd].x - 1, this.points[this.dInd].y, 2);
    this.points[this.cInd].y = this.points[this.dInd].y;
    this.points[this.cInd].x = this.points[this.dInd].x - 1;

    //moving c
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.dInd].x - 2, this.points[this.dInd].y, 2);
    this.points[this.bInd].y = this.points[this.dInd].y;
    this.points[this.bInd].x = this.points[this.dInd].x - 2;

    //moving a
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y, 0);
    changeBlock(this.points[this.dInd].x - 3, this.points[this.dInd].y, 2);
    this.points[this.aInd].y = this.points[this.dInd].y;
    this.points[this.aInd].x = this.points[this.dInd].x - 3;

    this.state += 1;
    if (this.state == 4) {
      this.state = 0;
    }
  }

  somethingRightRotationPossible() {
    if (getBlock(this.points[this.cInd].x - 1, this.points[this.cInd].y) != 0) {
      return false;
    }
    if (getBlock(this.points[this.cInd].x - 2, this.points[this.cInd].y) != 0) {
      return false;
    }
    if (getBlock(this.points[this.cInd].x - 3, this.points[this.cInd].y) != 0) {
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

class Square extends Element {
  constructor() {
    super();
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

class TShape extends Element {
  constructor() {
    super();
    this.points = [
      new Point(4, 3, "b"),
      new Point(5, 3, "a"),
      new Point(6, 3, "c"),
      new Point(5, 4, "d"),
    ];
    this.state = 0;
  }

  stateOne() {
    //moving b
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y + 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y - 1;
    this.points[this.cInd].x = this.points[this.aInd].x;

    //moving d
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
    this.points[this.dInd].y = this.points[this.aInd].y;
    this.points[this.dInd].x = this.points[this.aInd].x - 1;

    //removing unnocupied
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 0);

    this.state = 1;
  }

  stateOnePossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    return true;
  }

  stateTwo() {
    //moving b
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x + 1;

    //moving c
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
    this.points[this.cInd].y = this.points[this.aInd].y;
    this.points[this.cInd].x = this.points[this.aInd].x - 1;

    //moving d
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y - 1;
    this.points[this.dInd].x = this.points[this.aInd].x;

    //removing unnocupied
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 0);

    this.state = 2;
  }

  stateTwoPossible() {
    if (getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
      return false;
    }
    return true;
  }

  stateThree() {
    //moving b
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y + 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y - 1;
    this.points[this.cInd].x = this.points[this.aInd].x;

    //moving d
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.dInd].y = this.points[this.aInd].y;
    this.points[this.dInd].x = this.points[this.aInd].x + 1;

    //removing unnocupied
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 0);

    this.state = 3;
  }

  stateThreePossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    return true;
  }

  stateZero() {
    //moving b
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x + 1;

    //moving c
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
    this.points[this.cInd].y = this.points[this.aInd].y;
    this.points[this.cInd].x = this.points[this.aInd].x - 1;

    //moving d
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y + 1;
    this.points[this.dInd].x = this.points[this.aInd].x;

    //removing unnocupied
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 0);

    this.state = 0;
  }

  stateZeroPossible() {
    if (getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
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

class LShape extends Element {
  constructor() {
    super();
    this.points = [
      new Point(4, 3, "b"),
      new Point(5, 3, "c"),
      new Point(6, 3, "d"),
      new Point(4, 4, "a"),
    ];
    this.state = 0;
  }

  stateOne() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x + 1;

    //moving c
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y + 1;
    this.points[this.cInd].x = this.points[this.aInd].x + 1;

    //moving d
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 2, 2);
    this.points[this.dInd].y = this.points[this.aInd].y + 2;
    this.points[this.dInd].x = this.points[this.aInd].x + 1;

    this.state = 1;
  }

  stateOnePossible() {
    if (getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1) == 1
    ) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 2) == 1
    ) {
      return false;
    }
    return true;
  }

  stateTwo() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0) *
      //moving b
      changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y + 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y + 1;
    this.points[this.cInd].x = this.points[this.aInd].x - 1;

    //moving d
    changeBlock(this.points[this.aInd].x - 2, this.points[this.aInd].y + 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y + 1;
    this.points[this.dInd].x = this.points[this.aInd].x - 2;

    this.state = 2;
  }

  stateTwoPossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1) == 1
    ) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 2, this.points[this.aInd].y + 1) == 1
    ) {
      return false;
    }
    return true;
  }

  stateThree() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x - 1;

    //moving c
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y - 1;
    this.points[this.cInd].x = this.points[this.aInd].x - 1;

    //moving d
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 2, 2);
    this.points[this.dInd].y = this.points[this.aInd].y - 2;
    this.points[this.dInd].x = this.points[this.aInd].x - 1;

    this.state = 3;
  }

  stateThreePossible() {
    if (getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1) == 1
    ) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 2) == 1
    ) {
      return false;
    }
    return true;
  }

  stateZero() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y - 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y - 1;
    this.points[this.cInd].x = this.points[this.aInd].x + 1;

    //moving d
    changeBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y - 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y - 1;
    this.points[this.dInd].x = this.points[this.aInd].x + 2;

    this.state = 0;
  }

  stateZeroPossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1) == 1
    ) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y - 1) == 1
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

class InvertedLShape extends Element {
  constructor() {
    super();
    this.points = [
      new Point(4, 3, "d"),
      new Point(5, 3, "c"),
      new Point(6, 3, "b"),
      new Point(6, 4, "a"),
    ];
    this.state = 0;
  }

  stateOne() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x + 1;

    //moving c
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y - 1;
    this.points[this.cInd].x = this.points[this.aInd].x + 1;

    //moving d
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 2, 2);
    this.points[this.dInd].y = this.points[this.aInd].y - 2;
    this.points[this.dInd].x = this.points[this.aInd].x + 1;

    this.state = 1;
  }

  stateOnePossible() {
    if (getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1) == 1
    ) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 2) == 1
    ) {
      return false;
    }
    return true;
  }

  stateTwo() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y + 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y + 1;
    this.points[this.cInd].x = this.points[this.aInd].x + 1;

    //moving d
    changeBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y + 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y + 1;
    this.points[this.dInd].x = this.points[this.aInd].x + 2;

    this.state = 2;
  }

  stateTwoPossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1) == 1
    ) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 2, this.points[this.aInd].y + 1) == 1
    ) {
      return false;
    }
    return true;
  }

  stateThree() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x - 1;

    //moving c
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y + 1;
    this.points[this.cInd].x = this.points[this.aInd].x - 1;

    //moving d
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 2, 2);
    this.points[this.dInd].y = this.points[this.aInd].y + 2;
    this.points[this.dInd].x = this.points[this.aInd].x - 1;

    this.state = 3;
  }

  stateThreePossible() {
    if (getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1) == 1
    ) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 2) == 1
    ) {
      return false;
    }
    return true;
  }

  stateZero() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y - 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y - 1;
    this.points[this.cInd].x = this.points[this.aInd].x - 1;

    //moving d
    changeBlock(this.points[this.aInd].x - 2, this.points[this.aInd].y - 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y - 1;
    this.points[this.dInd].x = this.points[this.aInd].x - 2;

    this.state = 0;
  }

  stateZeroPossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1) == 1
    ) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 2, this.points[this.aInd].y - 1) == 1
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

class WormRight extends Element {
  constructor() {
    super();
    this.points = [
      new Point(4, 3, "b"),
      new Point(5, 3, "a"),
      new Point(5, 4, "c"),
      new Point(6, 4, "d"),
    ];
    this.state = 0;
  }

  stateOne() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y - 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
    this.points[this.cInd].y = this.points[this.aInd].y;
    this.points[this.cInd].x = this.points[this.aInd].x - 1;

    //moving d
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y + 1;
    this.points[this.dInd].x = this.points[this.aInd].x - 1;

    this.state = 1;
  }

  stateOnePossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1) == 1
    ) {
      return false;
    }
    return true;
  }

  stateTwo() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x + 1;

    //moving c
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y - 1;
    this.points[this.cInd].x = this.points[this.aInd].x;

    //moving d
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y - 1;
    this.points[this.dInd].x = this.points[this.aInd].x - 1;

    this.state = 2;
  }

  stateTwoPossible() {
    if (getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1) == 1
    ) {
      return false;
    }
    return true;
  }

  stateThree() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y + 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.cInd].y = this.points[this.aInd].y;
    this.points[this.cInd].x = this.points[this.aInd].x + 1;

    //moving d
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y - 1;
    this.points[this.dInd].x = this.points[this.aInd].x + 1;

    this.state = 3;
  }

  stateThreePossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1) == 1
    ) {
      return false;
    }
    return true;
  }

  stateZero() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x - 1;

    //moving c
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y + 1;
    this.points[this.cInd].x = this.points[this.aInd].x;

    //moving d
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y + 1;
    this.points[this.dInd].x = this.points[this.aInd].x + 1;

    this.state = 0;
  }

  stateZeroPossible() {
    if (getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1) == 1
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

class WormLeft extends Element {
  constructor() {
    super();
    this.points = [
      new Point(6, 3, "b"),
      new Point(5, 3, "a"),
      new Point(5, 4, "c"),
      new Point(4, 4, "d"),
    ];
    this.state = 0;
  }

  stateOne() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y + 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
    this.points[this.cInd].y = this.points[this.aInd].y;
    this.points[this.cInd].x = this.points[this.aInd].x - 1;

    //moving d
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y - 1;
    this.points[this.dInd].x = this.points[this.aInd].x - 1;

    this.state = 1;
  }

  stateOnePossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y - 1) == 1
    ) {
      return false;
    }
    return true;
  }

  stateTwo() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x - 1;

    //moving c
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y - 1;
    this.points[this.cInd].x = this.points[this.aInd].x;

    //moving d
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y - 1;
    this.points[this.dInd].x = this.points[this.aInd].x + 1;

    this.state = 2;
  }

  stateTwoPossible() {
    if (getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y - 1) == 1
    ) {
      return false;
    }
    return true;
  }

  stateThree() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1, 2);
    this.points[this.bInd].y = this.points[this.aInd].y - 1;
    this.points[this.bInd].x = this.points[this.aInd].x;

    //moving c
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.cInd].y = this.points[this.aInd].y;
    this.points[this.cInd].x = this.points[this.aInd].x + 1;

    //moving d
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y + 1;
    this.points[this.dInd].x = this.points[this.aInd].x + 1;

    this.state = 3;
  }

  stateThreePossible() {
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y - 1) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y + 1) == 1
    ) {
      return false;
    }
    return true;
  }

  stateZero() {
    //removing unnocupied
    changeBlock(this.points[this.bInd].x, this.points[this.bInd].y, 0);
    changeBlock(this.points[this.cInd].x, this.points[this.cInd].y, 0);
    changeBlock(this.points[this.dInd].x, this.points[this.dInd].y, 0);

    //moving b
    changeBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y, 2);
    this.points[this.bInd].y = this.points[this.aInd].y;
    this.points[this.bInd].x = this.points[this.aInd].x + 1;

    //moving c
    changeBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1, 2);
    this.points[this.cInd].y = this.points[this.aInd].y + 1;
    this.points[this.cInd].x = this.points[this.aInd].x;

    //moving d
    changeBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1, 2);
    this.points[this.dInd].y = this.points[this.aInd].y + 1;
    this.points[this.dInd].x = this.points[this.aInd].x - 1;

    this.state = 0;
  }

  stateZeroPossible() {
    if (getBlock(this.points[this.aInd].x + 1, this.points[this.aInd].y) == 1) {
      return false;
    }
    if (getBlock(this.points[this.aInd].x, this.points[this.aInd].y + 1) == 1) {
      return false;
    }
    if (
      getBlock(this.points[this.aInd].x - 1, this.points[this.aInd].y + 1) == 1
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
