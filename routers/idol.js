const express = require("express");
const router = express.Router();
const Idol = require("../models/idol.js").Model;
const upload = require("../middleware/upload");

router.route("/api/idol")
.get(async (req,res)=>{
    let id= req.query.id;
    //pagination
    let page = parseInt(req.query.page ? req.query.page : 0);
    let per_page = parseInt(req.query.per_page ? req.query.per_page: 20);
    //
    if(id){
        try{
            let idol = await Idol.findById(id).populate("group").exec();
            res.status(200).send(idol);
        }catch(e){
            res.status(401).send({error:'Not found'});
        }
    }else{
        try{
            let idols = await Idol.find({},{},{skip:page*per_page,limit:per_page}).populate("group").exec();
            res.status(200).send(idols);
        }catch(e){
            res.status(400).send(e);

        }
    }
}).post(upload, async function(req,res){

    try{
        if(!req.file){
            res.status(400).send({error:"no file specified"});
        }
        
        let idol = new Idol({
             ...req.body,
             avatar:req.file.data.link
         });
        
        let result = await idol.save();
        res.send(result);

    }catch(error){
        res.status(400).send({error});
    }
    
}).patch(function(req,res){
//modify charts by transactions
//total votes
});

module.exports = router;