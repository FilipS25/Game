var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var audio = "";
var level = 0;

$("body").keypress(function() {
    nextSequence();
});

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success!");
        if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence(); 
        }, 1000);
    }
    } else {
        audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over").dequeue().delay(200).queue(function () {
            $(this).removeClass("game-over");
        });;
        $("h1").text("Game over, Press any Key to Restart!");
        startOver();
    }
    };

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


$(".btn").click(function() {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(".btn").click(function() {
    $("#" + this.id).addClass("pressed").dequeue().delay(100).queue(function () {
        $(this).removeClass("pressed");
    });;
    audio = new Audio("sounds/" + this.id + ".mp3");
    audio.play();
});


function nextSequence() {
    userClickedPattern = [];
    level++;

    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(250).fadeIn(250); 
    audio = new Audio("sounds/" + randomChosenColour + ".mp3");
    audio.play();
};