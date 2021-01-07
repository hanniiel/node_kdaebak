const express = require('express');
const router = express.Router();
const authFire = require('../middleware/authFire');

const Favorite = require('../models/favorites').Model;


router.get('/api/favorite/:sourceId/:postId',async(req,res)=>{
    try{
        if(!req.params.sourceId || !req.params.postId){
            res.status(400).send({error:'source & post not specified'});
        }
        let count = await Favorite.countDocuments({source:req.params.sourceId,post:req.params.postId}).exec();
        res.send({count});
    }catch(e){
        res.status(400).send({error:e.message});
    }
});

router.route('/api/favorite/user')
.get(authFire,async(req,res)=>{
    try{
        let query = {
            ...req.body,
            user:req.user_.id
        };
        let result = await Favorite.find(query);
        res.send(result);
    }catch(e){
        res.status(400).send(e);
    }
})
.post(authFire,async(req,res)=>{
    try{
        //source
        //postId
        let exists = await Favorite.findOne({
            ...req.body,
            user:req.user._id
        });
        if(exists){
            res.send(exists);
        }else{
            let fave = new Favorite({
                ...req.body,
                user:req.user._id
            });
            let result = await fave.save();
            res.send(result);
        }
        
    }catch(e){
        res.send({'error':e.message});
    }
});

module.exports = router;