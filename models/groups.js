const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name:String,
    hangul:String,
    avatar:String,
    debut:Date,
    active:Boolean,
    genre:String,
    members:[{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            unique:true,
            ref:"Idol"
        }]
});
var model = new mongoose.model("Group",schema);


exports.Model = model;
exports.Schema = schema;