// Step 2
var level = 0;

var started = false;

var userClickedPattern = [];

var gamePattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];

// Step 3 - Flash randomChosenColor for initial color blink, add sounds


// Step 7 - make keydown only work for first key if started = false

$(document).on("keydown", function() {

  if (started == false) {
    $("#level-title").text("Level " + level);
    started = true;
    nextSequence();
  }
});


function nextSequence() {
  level = level + 1;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  makeSound(randomChosenColor);
}





function makeSound(key) {

  switch (key) {
    case "blue":
      var blueSound = new Audio('sounds/blue.mp3');
      blueSound.play();
      break;

    case "green":
      var greenSound = new Audio('sounds/green.mp3');
      greenSound.play();
      break;

    case "red":
      var redSound = new Audio('sounds/red.mp3');
      redSound.play();
      break;

    case "yellow":
      var yellowSound = new Audio('sounds/yellow.mp3');
      yellowSound.play();
      break;

    case "wrong":
      var wrongSound = new Audio('sounds/wrong.mp3');
      wrongSound.play();
      break;


    default:

  }
}

// Step 4 - Detect button clicked and
// Step 5 - Make user clicks generate sounds
$(".btn").on("click", function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


// Step 6 - Add animations to user clicks

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// Step 8 - Check answer
function checkAnswer(currentLevel) {
 if(gamePattern[currentLevel] == userClickedPattern[currentLevel]) {
   if (gamePattern.length == userClickedPattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
     }
 } else {
   makeSound("wrong");
   $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart")
    startOver();
    }

}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}
