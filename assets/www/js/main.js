
console.log("main.js ran");

function onBackButtonDown(e) { 
  console.log("onBackButtonDown()");
    
  if($.mobile.activePage.is('#formPage')){
    e.preventDefault();
    navigator.app.exitApp();
  } else {
    navigator.app.backHistory();
  }
}

window.echo = function(str, callback) {
  if (cordova && cordova.exec) {
    cordova.exec(callback, function(err) {
      callback('Nothing to echo.');
    }, "Echo", "echo", [str]);
  }
};

var counter = 0;
var likeTimes = [];

function onDeviceReady() {
  console.log("onDeviceReady()");
    
  document.addEventListener("backbutton", onBackButtonDown, true);

  //var lastTime = new Date();
  var timer = $('.showTimer');
  var updateTimer = function() {
    counter++;
    timer.text("Time: " + (counter/10) + 's');
    $(document).trigger('showTimeUpdate', [Math.round((counter/10))]); // notify others 
  };
  setInterval(updateTimer, 100);    
    
  window.echo("echome", function(echoValue) {
    alert(echoValue == "echome"); // should alert true.
  });
    
  window.echo("echome", function(echoValue) {
    alert(echoValue == "echome"); // should alert true.
  });
}

function onLikeThis() {
  likeTimes.push(counter);
}

var context = document.getElementById('heatmap').getContext('2d');

window.requestAnimFrame = function(){
    return (
        window.requestAnimationFrame       || 
        window.webkitRequestAnimationFrame || 
        window.mozRequestAnimationFrame    || 
        window.oRequestAnimationFrame      || 
        window.msRequestAnimationFrame     || 
        function(/* function */ callback){
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

requestAnimFrame(update);

function update() {
  requestAnimFrame(update);
	
  context.fillStyle   = '#000';
  context.strokeStyle = '#000';
  context.lineWidth   = 4;
  context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    
  for(var i = 0; i < likeTimes.length; i++) {
    var likeTime = likeTimes[i];
    context.fillStyle   = '#f00';
    context.strokeStyle = '#f00';
    context.lineWidth   = 4;
    var time = (likeTime / counter) * context.canvas.width;
    context.fillRect(time, 0, 10, context.canvas.height);
  }
    
}

// If not PhoneGap device, then run onload.
window.onload = function () {
	if( !window.device ) {
		onDeviceReady()
	}
}

// If PhoneGap, run when ready.
document.addEventListener('deviceready', onDeviceReady, false);

