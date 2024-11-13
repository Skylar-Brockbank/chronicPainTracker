const express = require("express");
const app = express();
const path = require('path')

app.listen(3000);
app.use(express.static(path.join('./')));
console.log("Server is now listening on port:3000")
app.set('view engine','ejs');

app.get("/", (req, res) => {
  res.render('index');
})