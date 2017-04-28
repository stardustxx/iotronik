var express = require("express");
var app = express();

app.get("/", (req, res) => {
  console.log("HI");
});

app.listen(3000, () => {
  console.log("App listening to port 3000");
});