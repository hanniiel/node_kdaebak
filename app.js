require("dotenv").config();
const express= require("express");
const mongoose = require("mongoose");
const md5 = require("md5");
const bcrypt = require("bcrypt");
//const encryption = require("mongoose-encryption");
const bodyParser = require("body-parser");
const myJs = require(__dirname+"/code.js");

//mongo
const uri = process.env.MONGO_PATH;

mongoose.connect(uri,{ useNewUrlParser: true,useUnifiedTopology: true });
const Schema = mongoose.Schema;


const idolSchema = new Schema({
    name:String,
    is_group:Boolean,
    rate:Number
});
//encrypt data fields 
//idolSchema.plugin(encryption,{secret:process.env.SECRET_KEY,encryptedFields:["password"]});

const Idol = mongoose.model("Idol",idolSchema);
const Rank = mongoose.model("Rank",new Schema({
    idol_id:String,
    user_id:String,
    vote:Number,
    date:Date,
}));

const idol = new Idol({
    name:"Mamamoo",
    is_group:true,
    rate:5
});
//idol.save();
//

const app = express();
app.use(bodyParser.json({extended:true}));
//app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("form",{cadena:myJs.getString()});
});

app.post("/",function(req,res){
    console.log(req.body);
    /*bcrypt.compare("plain text pass","stored pass hash",function(err,result){
        if(result){
           // console.log("smae pass");;
        }
    });*/
    bcrypt.hash(req.body.n1,10,function (err,hash){
        if(!err){
            var idol = new Idol({
                name:hash,
                is_group:true,
                rate:5
            });
            idol.save();
            res.send("thanks post");

        }
        else{
        res.send("error"+err);

        }
    });
    



});

app.route("/api/rank")
.post(function(req,res){
    let data = req.body;
    console.log(data);
    let rank  = new Rank(data);
    rank.save(function(err,doc){
        if(!err){
            res.send(doc);
        }else{
            res.send(err);
        }
    });
});

app.route("/api/idol")
.get(function(req,res){
    let id= req.body.id
    //pagination
    let page = req.body.page ? req.body.page : 0;
    const per_page = 20;
    //
    if(id){
        Idol.findOne({_id:id},function(err,found){
            if(!err){

                res.send(found);
            }else{
                res.send(err);
            }
         });
    }else{
        Idol.find({},{},{skip:page*per_page,limit:per_page},function(err,found){
            if(!err){

                res.send(found);
            }
         });
    }
}).post(function(req,res){
    //add auth for requests
    var data = req.body;
    let idol = new Idol(data);
    idol.save(function(err,doc){
        if(!err){
            res.send(doc);
        }
    });
}).patch(function(req,res){
//modify charts by transactions
//total votes
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port,function(){
    console.log("server started");
});