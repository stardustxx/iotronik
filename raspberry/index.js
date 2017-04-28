var express = require("express");
var app = express();
var RaspiCam = require('raspicam');

var cameraOptions = {
  mode: 'photo',
  output: 'asset/pic.jpg'
};

var camera = new RaspiCam(cameraOptions);

app.get("/", (req, res) => {
  console.log("HI");
  res.send("Server is running");
});

app.listen(3000, () => {
  console.log("App listening to port 3000");
  camera.start();
});

camera.on('start', () => {
  console.log('Camera started');
});
