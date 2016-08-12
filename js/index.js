var timer;
var timerFinish;
var timerLength; // in seconds
var isBreak = false;

function drawCircle() {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  var radius = 150;
  var startAngle = 1.5 * Math.PI;
  var endAngle = (2 * Math.PI) / 100 * 100;
  var counterClockwise = false;

  context.beginPath();
  context.arc(x, y, radius, startAngle, startAngle + endAngle);
  context.strokeStyle = "#b2b2b2";
  context.lineWidth = 4;
  context.lineCap = "round";
  context.stroke();
}

function drawProgress(percent) {
  var canvas = document.getElementById('myCanvas');
  var context = canvas.getContext('2d');
  var x = canvas.width / 2;
  var y = canvas.height / 2;
  var radius = 150;
  var startAngle = 1.5 * Math.PI;
  var endAngle = (2 * Math.PI) / 100 * percent;
  var counterClockwise = false;

  context.clearRect(0, 0, canvas.width, canvas.height);
  drawCircle();
  context.beginPath();
  context.arc(x, y, radius, startAngle, startAngle + endAngle);
  context.strokeStyle = "#99c0e9";
  context.lineWidth = 12;
  context.lineCap = "round";
  context.stroke();
}

function stopWatch() {
  var seconds = (timerFinish - (new Date().getTime())) / 1000;
  if (seconds > 0) {
    var currentSeconds = Math.floor((timerFinish - new Date().getTime()) / 1000);
    var percent = Math.ceil(100 - ((seconds / timerLength) * 100));
    $('.timer').html(Math.floor(currentSeconds / 60) + ':' + (currentSeconds % 60));
    drawProgress(percent);
  } else {
    clearInterval(timer);
    soundAlarm();
    if (isBreak) {
      isBreak = false;
      $('.timer').html('Start');
    } else {
      isBreak = true;
      $('.timer').html('Break');
    }
  }
}

function soundAlarm() {
  var alarm = new Audio('https://dl.dropbox.com/s/kge968kgfon3sqv/Airhorn-SoundBible.com-975027544.mp3?dl=0');
  alarm.play();
}

function resizeCanvas() {
  if ($(window).width() < 400) {
    $('#myCanvas').width(200);
    $('#myCanvas').height(200);
  } else {
    $('#myCanvas').width(400);
    $('#myCanvas').height(400);
  }
}

$(document).ready(function () {
  $(window).on('resize', function () {
    resizeCanvas();
  });

resizeCanvas();
drawProgress(0);

$("#pomodoro").spinner({
  min: 1,
  max: 60
});
$("#break ").spinner({
  min: 1,
  max: 60
});

$('.pomodoro').click(function (event) {
  event.preventDefault();
  var $timer = $('.timer');
  var timerValue = $timer.html().replace(/:/g, '');

  if (isNaN(timerValue)) {
    if (isBreak) {
      timerLength = $("#break").val() * 60;
      timerFinish = new Date().getTime() + (timerLength * 1000);
      timer = setInterval('stopWatch()', 1);
      return;
    }

    timerLength = $("#pomodoro").val() * 60;
    timerFinish = new Date().getTime() + (timerLength * 1000);
    timer = setInterval('stopWatch()', 1);
  } else {
    clearInterval(timer);
    $timer.html('Start');
  }
});
});