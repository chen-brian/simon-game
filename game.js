var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;
var numOfTimesClicked = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);


}

function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("Success");
    if (userClickedPattern.length === gamePattern.length)
    {
      setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else{
    var wrongAudio = new Audio('sounds/wrong.mp3');
    wrongAudio.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  
  // for (var i = 0; i < gamePattern.length; i++) {
  //   if (gamePattern[i] !== userClickedPattern[i]) {
  //     var wrongAudio = new Audio('sounds/wrong.mp3');
  //     wrongAudio.play();
  //     $("body").addClass("game-over");
  //     setTimeout(function () {
  //       $("body").removeClass("game-over");
  //     }, 200);
  //     $("h1").text("Game Over, Press Any Key to Restart");
  //   }
  // }

  // setTimeout(function () {
  //   userClickedPattern = [];
  //   numOfTimesClicked = 0;
  //   nextSequence();
  // }, 1000);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

$(".btn").click(function (event) {
  var userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  // numOfTimesClicked++;
  checkAnswer(userClickedPattern.length - 1);
  

});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);

}

$(document).keypress(function () {
  if (!gameStarted) {
    $("h1").text("Level 0");
    setTimeout(function () {
      nextSequence();
    }, 1000);
    gameStarted = true;

  }
});