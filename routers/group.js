const express = require("express");
const router = express.Router();
const Group = require("../models/groups").Model;
const upload = require("../middleware/upload");

router.route("/api/group")
.get(async (req,res)=>{
    //res.render("form",{cadena:"myJs.getString()"});
    try{
        let groups = await Group.find();
        res.send(groups);
    }catch(e){
        res.status(401).send({error:"not found"});
    }
})
.post(upload,async(req,res)=>{
    try{
        if(!req.file){
            res.status(400).send({error:"file not provided"});
        }

        let group = new Group({
            ...req.body
        });
        let saved = await group.save();
        res.send(saved);

    }catch(e){
        res.status(401).send({error:e});
    }
},(error,req,res,nexr)=>{
    res.status(400).send({error:error.message});
}).patch(upload,async(req,res)=>{
    try{
        const group = await Group.findById(req.body.id);
        //update data
        if(!group){
            res.status(400).send({error:"not found"});
        }
        //update data
        let updated =await group.save();
        res.send(updated);

    }catch(e){
        res.status(401).send({error:e});
    }
});

module.exports = router;