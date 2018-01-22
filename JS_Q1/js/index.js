"use strict";
var state = true ;
function toggleLight() {
  var img = document.getElementById("image");
  state = !state;
  image.src = state? "img/on.jpg" : "img/off.jpg";
}
var timeLeft = 5;
function countDownTimer() {
  timeLeft = timeLeft - 1 ; 
  if (timeLeft <= 0){
    document.getElementById("image").src = "img/off.jpg";
    clearInterval(setting);
  }
  document.getElementById("timer").innerHTML = timeLeft;
}


var setting = setInterval(countDownTimer, 1000);