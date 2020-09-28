const moment = require("moment");
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
    try{

        if(id){
            let idol = await Idol.findById(id).populate("group").exec();
            res.status(200).send(idol);

        }
        else if(Object.keys(req.query).includes("name")){
            let name = req.query.name;

            let idols = await Idol.find({ 
                $or:[
                    {name:{ $regex: name,$options:'i' }},
                    {hangul:{ $regex: name,$options:'i' }}
                ] 
            });
            if(idols.length===0){
                return res.status(400).send("coincidence not found");
            }
            res.send(idols);
        }
        else{
            let idols = await Idol.find({},{},{skip:page*per_page,limit:per_page}).populate("group").exec();
            res.status(200).send(idols);
        }

    }catch(e){
        res.status(400).send("errro"+e);
    }
})
.post(upload, async function(req,res){

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
    
})
.patch(async(req,res)=>{
    try{
        /*let updates = Object.keys(req.body);
        let allowed = ['profession','_id','name','hangul','avatar','birthday','debut'];
        let isValid = updates.every((key)=>allowed.includes(key));
        if(!isValid){
             return res.status(400).send("update operation not allowed");
        }*/
        let id = req.body._id;
        delete req.body._id;

        let idol = await Idol.findByIdAndUpdate(id,req.body,{new:true,runValidators:true});
        if(!idol){
             return res.send(404).send("not idol found");
        }
        res.send(idol);
    }catch(error){
        res.status(400).send({error});
    }

});

router.get("/api/idol/ranking",async(req,res)=>{

    let page = parseInt(req.query.page ? req.query.page : 0);
    let per_page = parseInt(req.query.per_page ? req.query.per_page: 20);
    let range = req.query.range ? req.query.range : 'weekly'
    let gender = req.query.gender ?  req.query.gender : 'F';

    try{

        let start,end;
        
        switch(range){
            case 'daily':
                start = moment().utc(false).startOf('day').toDate();
                end = moment().utc(false).endOf('day').toDate();
                break;
            case 'weekly':
                start = moment().utc(false).startOf("isoWeek").toDate();
                end = moment().utc(false).endOf("isoWeek").toDate();
                break;
            case 'monthly':
                start = moment().utc(false).startOf('month').toDate();
                end = moment().utc(false).endOf('month').toDate();
                break;
            default :
                start = moment().utc(false).startOf("isoWeek").toDate();
                end = moment().utc(false).endOf("isoWeek").toDate();
                break;
        }
        

       

        //
        let idols = await Idol.aggregate([
            {
                $match:{
                    gender:{$regex: gender,$options:'i'}
                }
            },
            {
                $lookup:{
                    from: "votes",
                    let: {idol:"$_id"},//local fields
                    pipeline:[
                        {
                            $match:{
                                createdAt:{$gte:start,$lte:end},
                                $expr:{
                                    $eq:["$idol","$$idol"]
                                }
                            }
                        }
                    ],
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
                    name:{$first:"$name"},
                    hangul:{$first:"$hangul"},
                    gender:{$first:"$gender"},
                    birthday:{$first:"$birthday"},
                    debut:{$first:"$debut"},
                    active:{$first:"$active"},
                    avatar:{$first:"$avatar"},
                    votes:{$sum:"$idol_docs.votes"}
                }
            },
            { $sort:{votes:-1,name:1}},
            { $skip:  page*per_page},
            { $limit: per_page}
        ]).exec();
        res.send(idols);
    }catch(e){
        res.status(400).send({error:e});
    }
});

module.exports = router;