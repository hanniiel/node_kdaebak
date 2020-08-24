const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name:String,
    hangul:String,
    avatar:String,
    debut:Date,
    active:Boolean,
    gender:String,
    members:[{
        member:{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
            unique:false,
            ref:"Idol"
        },
        joined:Date
        }],
   exmembers:[{
        member:{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
            unique:false,
            ref:"Idol",
        },
        left:Date,
        reason:String,
    }]
});
var model = new mongoose.model("Group",schema);


exports.Model = model;
exports.Schema = schema;