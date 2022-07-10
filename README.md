# Tetris.ts

Classic Tetris game implemented in Typescript with a console-like web GUI. <br>

## Controls: <br>
* pause game: **p**<br>
* start game: **enter**<br>
* go left: **a**<br>
* go right: **d**<br>
* go down: **s**<br>
* rotate: **w**<br>

## Add it to your project: <br>
Start off by adding both **tetris.js** and **elements.js** to your project<br>

<pre><<span>script src="js/tetris.js"></script>
<<span>script src="js/elements.js"></script>q</pre>

Then create an instance of the Tetris class passing an empty object as an argument.</br>

<pre>const tetris = new Tetris({})</pre>

There are three customizable display methods: **displayMatrix**, **displayScore** and **displayGameOver**. Create your own implementation of them like this:</br>

<pre>tetris.setDisplayMatrix((tetris) => {
    console.log(my **matrix**: \n tetris.matrix)
})</pre>

The default display methods log the game data to the console.</br>

You can also set your display methods on initialization like this: </br>

<pre>
const myCustomDisplayMatrix = (tetris) => {
    console.log(my matrix: \n tetris.matrix)
}

const myCustomDisplayScore = (tetris) => {
    console.log('My score is: ' + tetris.score)
}

const myCustomDisplayGameOver = (tetris) => {
    console.log('Game Over')
}

const tetris = new Tetris({
  displayMatrix: myCustomDisplayMatrix,
  displayScore: myCustomDisplayScore,
  displayGameOver: myCustomDisplayGameOver,
});
</pre>

## Variables:

* **gameRunning**: as name
*  **matrix**: stores Tetris stage
*  **score**: stores the score in a run
*  **highScore**: stores the highest score across different runs
*  **gameSpeed**: time for the falling element to fall one height in ms 
*  **element**: instance of the Block class, stores the position and nature of the falling element
