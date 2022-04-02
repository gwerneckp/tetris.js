// async function waiting(){
//   while(!gameRunning){
//       $("#loading").html("press n to start game...|")
//       await sleep(500)
//       $("#loading").html("press n to start game...")
//       await sleep(500)
//   }
// }

function waiting() {
  new TypeIt("#log", {
    strings: "press n to start...",
    startDelay:1500,
    speed: 75,
  }).go();
}

function waitingGameOver() {
  $("#log").html("")
  new TypeIt("#log", {
    strings: ["game over","you scored "+score+" points","press n to try again..."],
    speed: 125,
  }).go();
}

async function gameOverAnimation(){
  await $('.green').addClass('red').removeClass('green')
  $("p").css("color", "#cc0000")
  $("h1").css("color", "#cc0000")
  await sleep(1250)
  for(i=1; i < matrix.length; i++){
    $('#game').html("")
    for(y=3; y < matrix.length-i; y++){
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
      $('#game').html($('#game').html()+"<p class='text-center red game-line'>"+lineOutput+"</p>")
    }
    await sleep(75)
  }
  $("p").css("color", "#41FF00")
  $("h1").css("color", "#41FF00")
  $('.red').addClass('green').removeClass('red')
}

$(document).ready(function(){
  waiting()
  $(window).keypress(function(e){
    if(e.which==97){
     if(gameRunning){
       goLeft() 
       showGame()
     }
    }
    if(e.which==100){
     if(gameRunning){
       goRight() 
       showGame() 
     }
    }
    if(e.which==119){
    if(gameRunning){ 
       element.rotate() 
       showGame()
    }
    }
    if(e.which==115){
     if(gameRunning){
       fallElement()
       showGame()
     }
    }
    if(e.which==13){
      if(!gameRunning){
        startGame()
        showGame()
      }
    }
    if(e.which==112){
     if(gameRunning){
       pauseGame() 
       showGame()
     }
    }
    if(e.which==110){
     if(!gameRunning){
       $( "#log" ).hide()
       $( "#gameRow" ).show()
       $( "#game-over" ).hide()
       newGame()
       showGame() 
     }
    }
  })
})