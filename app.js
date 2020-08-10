require("dotenv").config();
const express= require("express");

require(__dirname+"/models/connection");
const idolRouter = require(__dirname+ "/routers/idol");
const groupRouter = require(__dirname+"/routers/group");
const userRouter = require(__dirname+"/routers/user");
const voteRouter = require(__dirname+"/routers/vote");

const app = express();
app.use(express.json());
app.use(idolRouter);
app.use(groupRouter);
app.use(userRouter);
app.use(voteRouter);
app.use(express.static("public"));

app.set("view engine","ejs");
app.use("/bootstrap",express.static(__dirname +"/node_modules/bootstrap/dist"));
app.use("/jquery",express.static(__dirname +"/node_modules/jquery/dist"));
app.use("/popper",express.static(__dirname +"/node_modules/popper.js/dist"));

app.get("/",function(req,res){
    res.render("group");
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
    console.log("server started");
});