const express =require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();

let items = ["Buy Food", "Cook food", "Eat food"];
let workItems = [];
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
let day = date.getDay();
  res.render("list", {listTitle: day, newListItems: items});

});


app.post("/", function(req, res){

  let item = req.body.newItem;

  if (req.body.list == "work"){
    workItems.push(item);
    res.redirect("/work");
  }
  else{
    items.push(item);
    res.redirect("/")
  }

});


app.get("/work", function(req,res){
  res.render("list", {listTitle: "work List", newListItems: workItems })
});

app.post("/work", function(req,res){
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
})

app.listen(3000, function(){
  console.log("Server running on port 3000");
})
