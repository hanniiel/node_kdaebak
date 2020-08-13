const mongoose = require("mongoose");
const schema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    gender:{
        type:String,
        required:true,
        enum:['M','F','O']
    },
    type:{
        type:String,
        required:true,
        enum:['I','G','A'] //Idol,Group,Acting,Model,etc...
    },
    idol:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Idol"
    },
    group:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Group"
    },
    votes:{
        type:Number,
        required:true
    }

},{
    timestamps:true
});
const model = mongoose.model("Vote",schema);



exports.Model = model;