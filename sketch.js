var song;
var analyzer;
var volhistory = [];
var volume;
var hhh = 150;
var x = 0;

function preload() {
  song = loadSound("./assets/swing.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  song.loop();
  angleMode(DEGREES);
  song.play();
  song.setVolume(0.5);
  // create a new Amplitude analyzer
  analyzer = new p5.Amplitude();

  // Patch the input to an volume analyzer
  analyzer.setInput(song);
}

function draw() {
  background(0, 0, 0, 5);

  // Get the average (root mean square) amplitude
  var rms = analyzer.getLevel();
  fill(127);
  stroke(0);

  // Draw an ellipse with size based on volume
  ellipse(width / 2, height / 2, 10 + rms * 200, 10 + rms * 200);
  push();
  var vol = analyzer.getLevel();
  volhistory.push(vol);
  stroke(255);
  strokeWeight(2);
  noFill();
  translate(width / 2, height / 2);
  beginShape();
  for (var i = 0; i < 360; i++) {
    var r = map(volhistory[i], 0, 1, 200, 300);
    var x = r * cos(i);
    var y = r * sin(i);
    // var y = map(volhistory[i], 0, 1, height, 0);
    vertex(x, y);
  }
  endShape();
  // ellipse(100, 100, 80, vol * 200);

  if (volhistory.length > 360) {
    volhistory.splice(0, 1);
  }
  pop();

  volume = analyzer.getLevel();
  volhistory.push(volume);
  noFill();
  stroke(255);
  beginShape();
  for (var i = 0; i < volhistory.length; i += 5) {
    x = i;
    var y = map(volhistory[i] / 2, 0, 1, hhh, 0);
    vertex(x, y);
  }

  if (volhistory.length > width) {
    volhistory = [];
    hhh += 150;
  }
  endShape();
}
