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
});
var model = new mongoose.model("Idol",schema);


exports.Model = model;
exports.Schema = schema;