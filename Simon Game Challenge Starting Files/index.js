let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
var started = false;
var level = 0;
var color = 0;
var colorLevel = 0;
var variable ="wrong";
// generating random numbers uding math.random()
function nextSequence() {
  $("#level-title").text("Level: " + level);
  level++;
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $(`#${randomChosenColour}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
};

// adding event listener to buttons on user click
$(".btn").click(function() {
  colorLevel++;
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  console.log(userClickedPattern);
  // calling an animation function
  myAnim(userChosenColour);
  // calling an sound function
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);

});



//Adding animations to user clicked keys
function myAnim(anim) {
  $("#" + anim).addClass("pressed");
  setTimeout(function() {
    $("#" + anim).removeClass("pressed");
  }, 100)
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length == (gamePattern.length)) {
      setTimeout(function() {
        console.log("success");
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    userClickedPattern = [];
    playSound(variable);
    $("body").addClass("game-over");
    $(`.game-over`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
// created a function to exexute when the game is restarted
function startOver(){
  started = false;
  level =0;
  count = 0;
  colorLevel=0;
  gamePattern=[];
}
// function for adding the sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// to track keyboard keys
$(document).keydown(function() {
  if (!started) {
    started = true;
    nextSequence();
  }
})
