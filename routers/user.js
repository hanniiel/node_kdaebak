const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/user").Model;

router.route("/api/user")
.get(auth,async(req,res)=>{
    res.send(req.user);
})
.post(async(req,res)=>{
    try{
      var user = new User(req.body);
      var token = await user.genAuthToken();
      res.status(201).send({user,token});
    }catch(e){
        res.status(401).send({error:'Bad request '+e});
    }
});

router.post("/api/user/login",async (req,res)=>{
    try{
        let user = await User.findByCredentials(req.body.email,req.body.password);
        let token = await user.genAuthToken();

        res.status(200).send({user,token});
    }catch(e){
        res.status(401).send({error:'Bad request '+e});
    }
});
router.post("/api/user/logout",auth,async (req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token;
        });
        await req.user.save();
        res.status(200).send();
    }catch(e){
        res.status(401).send({error:'Bad request '+e});
    }
});

router.post("/api/user/logoutall",auth,async (req,res)=>{
    try{
        req.user.tokens = [];
        await req.user.save();
        res.status(200).send();
    }catch(e){
        res.status(401).send({error:'Bad request '+e});
    }
});

module.exports = router;