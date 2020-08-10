const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name:String,
    avatar:String,
    hangul:String,
    type:String,
    birthday:Date,
    debut:Date,
    active:Boolean,
    genre:String
},{ id:false, toJSON: { virtuals: true }, toObject: { virtuals: true }});

schema.virtual("group",{
    ref:"Group",
    localField:"_id",
    foreignField:"members",
    justOne: true,
});




var model = new mongoose.model("Idol",schema);



exports.Model = model;
exports.Schema = schema;