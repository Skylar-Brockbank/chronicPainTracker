const express = require("express");
const app = express();
const path = require('path')
const fs = require("fs");

app.listen(3000);
app.use(express.static(path.join('./')));
console.log("Server is now listening on port:3000")
app.set('view engine','ejs');


let dataString={}
const datapath='./data.json'
app.use(express.json());

function getDate(){
  const datetime = new Date();
  const date =datetime.toISOString().slice(0,10);
  return date;
}
function getYear(){
  const datetime = new Date();
  const date =datetime.toISOString().slice(0,4);
  return date;
}
function saveData(){
  console.log(dataString);
  const year = getYear()
  fs.writeFileSync(`./data/${year}.json`, JSON.stringify(dataString),{flag:"w"});
  console.log("saved")
}

//routes

app.get("/", (req, res) => {
  res.render('index');
})
app.post("/sub",(req,res) => {
  const data = req.body;
  const date = getDate();
  dataString[date]=data;
  saveData()
  res.redirect("/")
})
