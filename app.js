require("dotenv").config();
const express= require("express");
const cors = require('cors');

require(__dirname+"/models/connection");
const idolRouter = require(__dirname+ "/routers/idol");
const groupRouter = require(__dirname+"/routers/group");
const userRouter = require(__dirname+"/routers/user");
const voteRouter = require(__dirname+"/routers/vote");

const app = express();
//middleware
app.use(cors());
app.use(express.json());

app.use(idolRouter);
app.use(groupRouter);
app.use(userRouter);
app.use(voteRouter);
app.use(express.static("public"));

app.set("view engine","ejs");

app.get("/",function(req,res){
  res.sendFile('public/index.html');
});

app.get("/group",function(req,res){
    res.render("group");
});
app.get("/idol",function(req,res){
  res.render("idol");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
    console.log("server started");
});