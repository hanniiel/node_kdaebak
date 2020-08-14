const moment = require("moment");
const express = require("express");
const router = express.Router();
const Group = require("../models/groups").Model;
const upload = require("../middleware/upload");

router.route("/api/group")
.get(async (req,res)=>{
    let id= req.query.id;
    //pagination
    let page = parseInt(req.query.page ? req.query.page : 0);
    let per_page = parseInt(req.query.per_page ? req.query.per_page: 20);
    try{
        if(id){
            let group = await Group.findById(id).populate("members").exec();
            res.send(group);

        }else{
            var groups = await Group.find({},{},{skip:page*per_page,limit:per_page}).populate("members").exec();
            res.send(groups);
        }
        
    }catch(e){
        res.status(400).send({error:e});
    }
})
.post(upload,async(req,res)=>{
    try{
        if(!req.file){
            res.status(400).send({error:"file not provided"});
        }
        let group = new Group({
            ...req.body,
            avatar:req.file.data.link,
        });
        let saved = await group.save();
        saved.populate()
        res.send(saved);

    }catch(e){
        res.status(400).send({error:e});
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

router.get("/api/group/ranking",async(req,res)=>{
    try{
        let start = moment().utc(false).startOf("isoWeek").toDate();
        let end = moment().utc(false).endOf("isoWeek").toDate();
        //
        let groups = await Group.aggregate([
           
            {
                $lookup:{
                    from:"votes",
                    let:{"id":"$_id"},
                    pipeline:[{ 
                        $match:{
                            createdAt:{$gte:start,$lte:end},
                            $expr:{
                                $eq:["$group","$$id"]
                            }
                        }
                    }],
                    as: "idol_docs"
                },
            },
            {
                $unwind:{
                    path: "$idol_docs",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $group:{
                    _id:"$_id",
                    members:{$first:"$members"},
                    name:{$first:"$name"},
                    hangul:{$first:"$hangul"},
                    gender:{$first:"$gender"},
                    debut:{$first:"$debut"},
                    active:{$first:"$active"},
                    avatar:{$first:"$avatar"},
                    votes:{$sum:"$idol_docs.votes"}
                    
                }
            }
        ]).exec();
        res.send(groups);
    }catch(error){
        res.status(400).send({error});
    }
});

module.exports = router;