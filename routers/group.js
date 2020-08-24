const moment = require("moment");
const express = require("express");
const router = express.Router();
const Group = require("../models/groups").Model;
const upload = require("../middleware/upload");

router.route("/api/group")
.get(async (req,res)=>{
    let id= req.query.id;
    let name= req.query.name;
    //pagination
    let page = parseInt(req.query.page ? req.query.page : 0);
    let per_page = parseInt(req.query.per_page ? req.query.per_page: 20);
    try{
        if(id){
            let group = await Group.findById(id).populate("members.member").exec();
            res.send(group);

        }else if(name){
            let groups = await Group.find({ 
                $or:[
                    {name:{ $regex: name,$options:'i' }},
                    {hangul:{ $regex: name,$options:'i' }}
                ] 
            });
            if(groups.length===0){
                return res.status(400).send("coincidence not found");
            }
            res.send(groups);
        }else{
            var groups = await Group.find({},{},{skip:page*per_page,limit:per_page}).populate("members.member").exec();
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
        console.log(req.body)
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
},(error,req,res,next)=>{
    res.status(400).send({error:error.message});
}).patch(upload,async(req,res)=>{
    try{
        console.log(req.body)

        let id = req.body._id;
        delete req.body._id;
        let group = await Group.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        console.log("fff")
        //update data
        if(!group){
            return res.status(400).send({error:"group not found"});
        }
        res.send(group);

    }catch(e){
        res.status(400).send({error:e});
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