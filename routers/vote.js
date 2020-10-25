const moment = require("moment");
const express = require("express");
const router = express.Router();
const Vote = require("../models/vote").Model;
const authFire = require("../middleware/authFire");

router.route("/api/vote")
.post(authFire,async(req,res)=>{
    try{
        let vote = new Vote({
            ...req.body,
            user:req.user._id
        });
        // TODO: remove currency and update it
        let saved = await vote.save();
        res.send(saved);
    }catch(e){
        res.status(400).send({error:e});
    }
})
.get(async(req,res)=>{
    try{
        //pagination
        let page = parseInt(req.query.page ? req.query.page : 0);
        let per_page = parseInt(req.query.per_page ? req.query.per_page: 20);
        //time vars
        let start = moment().utc(false).startOf("isoWeek").toDate();
        let end = moment().utc(false).endOf("isoWeek").toDate();
        //search ranking by group by idol
        let tipo = req.query.type ?req.query.type :"G";
        let from = tipo =="I"?"idols":"groups";
        let chain = tipo =="I"? "$idol":"$group";

        let search = await Vote.aggregate([
            { 
                $match: { 
                    createdAt:{$gte:start, $lte: end },
                    type: tipo,
                },
                
            },
            {
                $group: {
                  _id: chain,
                  total:{
                      $sum:"$votes"
                  },
                }
            },
            {
                $lookup: {
                    from: from,
                    localField: "_id",
                    foreignField: "_id",
                    as: "idol_docs"
                }
            },
            {
                $unwind: {
                    path: "$idol_docs",
                    preserveNullAndEmptyArrays: true
                }
            },
            { $sort: { total: -1 } },

        ])
        .skip(page*per_page)
        .limit(per_page)
        .exec();
        res.send(search);
    }catch(e){
        res.status(400).send({error:e});
    }
});





module.exports = router;