require("dotenv").config();
const express= require("express");
require(__dirname+"/models/connection");
const idolRouter = require(__dirname+ "/routers/idol");
const groupRouter = require(__dirname+"/routers/group");
const userRouter = require(__dirname+"/routers/user")

const upload = require( __dirname+"/middleware/upload")



const app = express();
app.use(express.json());
app.use(idolRouter);
app.use(groupRouter);
app.use(userRouter);
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("form",{cadena:"myJs.getString()"});
});

app.post("/",upload,function(req,res){
    try{
        if(!req.file)
        {
            res.status(400).send({error:"file not provided"});
        }
        res.send(req.file);
        
    }catch(e){
        res.status(400).send({error:e});
    }
        
},(error,req,res,next)=>{
    res.status(400).send({error:error.message});
});

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
    console.log("server started");
});