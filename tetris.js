function newGame(){
  gameRunning =  false
  matrix =
  [  // 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 (x)
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //0
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //1
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //2
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //3
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //4
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //5
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //6
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //7 
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //8
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //9  
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //10
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //11
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //12
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //13
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //14
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //15
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //16
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //17
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //18
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //19
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //20
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //21
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //22
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],   //23
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],   //24
  ]                                   //(y)
  
//block values:
//0 = no blocks
//1 = posed block
//2 = falling block

  score = 0
  $( "#score" ).html("score: "+score)  
  createElement()
  startGame()
}

gameRunning = false
score = 0
gameSpeed = 150

// elements
let element = null

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showGameLog(){
  console.clear()
  gameOutput = []
  for(y in matrix){
    for(x in matrix[y]){
      if(matrix[y][x] == 0){
      gameOutput += ["   "]
      }
      if(matrix[y][x] == 1){
      gameOutput += [" - "]
      }
      if(matrix[y][x] == 2){
      gameOutput += [" o "]
      }
    }
    gameOutput += "\n"
  }
  console.log(gameOutput)
  console.log("")
}

function showGame(){
  $('#game').html("")
  for(y=3; y < matrix.length; y++){
    lineOutput = []
    for(x in matrix[y]){     
      if(matrix[y][x] == 0){
      // lineOutput += [" &nbsp "]
      lineOutput += [" &nbsp "]
      // lineOutput += [" &nbsp "]
      }
      if(matrix[y][x] == 1){
      // lineOutput += [" &nbsp "]
      lineOutput += [" - "]
      // lineOutput += [" &nbsp "]
      }
      if(matrix[y][x] == 2){
      // lineOutput += [" &nbsp "]
      lineOutput += [" o "]
      // lineOutput += [" &nbsp "]
      }      
    }
    $('#game').html($('#game').html()+"<p class='text-center green game-line'>"+lineOutput+"</p>")
  }
}

function getBlockCord(x, y){ //returns cords in matrix for debug
  let cord = "matrix["+y+"]["+x+"]"
  return cord
}

 function getBlock(x, y){ //returns block's value
  return matrix[y][x]
}

function goLeft() {
  let somethingLeft = false
  orderElementPointsLeft()
    for (var i in element.points) {
        let x = element.points[i].x   //define a variable for proper lisibility
        let y = element.points[i].y   //define a variable for proper lisibility
        if (getBlock(x - 1, y) == 1) {
          somethingLeft = true
        }
    }
    if(somethingLeft == false){
      for (var i in element.points) {
  	    let x = element.points[i].x   //define a variable for proper lisibility
        let y = element.points[i].y   //define a variable for proper lisibility
        newX = x - 1
        matrix[y][x] = 0
        matrix[y][newX] = 2
        element.points[i].x = newX
      }
    }
}

function goRight() {
    let somethingRight = false
    orderElementPointsRight()
    for (var i in element.points) {
        let x = element.points[i].x   //define a variable for proper lisibility
        let y = element.points[i].y   //define a variable for proper lisibility
        if (getBlock(x + 1, y) == 1) {
        somethingRight = true
        }
    }
    if(somethingRight == false){
      for (var i in element.points) {
  	    let x = element.points[i].x   //define a variable for proper lisibility
        let y = element.points[i].y   //define a variable for proper lisibility
        newX = x + 1
        matrix[y][x] = 0
        matrix[y][newX] = 2
        element.points[i].x = newX
      }
    }
}

function swap(a,b){
  [element.points[a], element.points[b]] = [element.points[b], element.points[a]]
}

function orderElementPointsDown(){
  for(var i in element.points){                //iterates through elements
  for(var j in element.points){                //iterates through elements
      let firstY = element.points[i].y         //stores y cord in variable
      let secondY = element.points[j].y        //stores y cord in variable
      if(firstY>secondY){                      //if j smaller then i:
        swap(i,j)                              //swap them
      }
    
  }
}
}

function orderElementPointsLeft(){
  for(var i in element.points){                //iterates through elements
  for(var j in element.points){                //iterates through elements
      let firstX = element.points[i].x         //stores y cord in variable
      let secondX = element.points[j].x        //stores y cord in variable
      if(firstX<secondX){                      //if j smaller then i:
        swap(i,j)                              //swap them
      }
    
  }
}
}

function orderElementPointsRight(){
  for(var i in element.points){        
    for(var j in element.points){       
      let firstX = element.points[i].x        
      let secondX = element.points[j].x    
      if(firstX>secondX){                     
        swap(i,j)                              
      }
  }
}
}

function checkForTetris(){
  for(i=1;i<matrix.length-1;i++){
    isTetris = true
    for(j=1;j<matrix[i].length-1;j++){
    if(matrix[i][j]  ==0){
      isTetris = false
      break
    }   
    }
    if(isTetris){
      for(j=1;j<matrix[i].length-1;j++){
         matrix[i][j] = 0                                 
    }
      for(k=i-1;k>-1; k--){
        [matrix[k], matrix[k+1]] = [matrix[k+1],matrix[k]]
      
    }
      score += 1
      $( "#score" ).html("score: "+score)
}
}
}

async function checkForGameOver(){
  for(i=1;i<matrix[3].length-1;i++){
    if(matrix[3][i]==1){
      pauseGame()
      // console.log("Game Over!") 
      await gameOverAnimation()
      waitingGameOver()
      $( "#gameRow" ).hide()
      $( "#log" ).show()
      break
    }
  }
}

function changeBlock(x, y, value){ //changes block to value
  matrix[y][x]=value
}

function fallBlock(x, y){
  changeBlock(x,y,0)           //change block to 0
  y += 1
  changeBlock(x,y,2)         //change block below to 1
  return(y)
}

function createElement(){
  randomElement()
  orderElementPointsDown()
  for(var i in element.points){               //loop elements in element
    let x = element.points[i].x   //define a variable for proper lisibility
    let y = element.points[i].y   //define a variable for proper lisibility
    changeBlock(x,y,2) //change blocks
  }
}

function fallElement(){
  let result = ""
  somethingBelow = false
  orderElementPointsDown()
  
  for(var i in element.points){    
    let x = element.points[i].x   //define a variable for proper lisibility
    let y = element.points[i].y   //define a variable for proper lisibility
    if(getBlock(x,y+1) == 1){
      somethingBelow = true
      break
    }
  }
    
  if(somethingBelow){
    for(var i in element.points){
      let x = element.points[i].x   //define a variable for proper lisibility
      let y = element.points[i].y   //define a variable for proper lisibility
      changeBlock(x,y,1)

      result = "placed"       //function returns "placed"
    }
    checkForTetris()
    checkForGameOver()
  }else{
    
    for(var i in element.points){
      let x = element.points[i].x   //define a variable for proper lisibility
      let y = element.points[i].y   //define a variable for proper lisibility   
  
      //change block's y coordinate in matrix and reference element    
      element.points[i].y = fallBlock(x,y) 
      
      result = "falling"             //function returns "falling"
    }    
  }    
  return result
  }

function pauseGame(){
  gameRunning = false
}

async function startGame(){
  gameRunning = true 
  while(gameRunning == true){    
    if(fallElement() != "falling"){
      createElement()
    }
    showGame()
    await sleep(gameSpeed)
  }
 }