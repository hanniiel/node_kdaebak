const mongoose = require("mongoose");
const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    hangul:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        required:true
    },
    profession:{
        type:[String],
        enum: ['I','A','S'], //Idol, Actor,Singer
        required:true,
        //validate repeated value
    },//Idol actor or array
    birthday:{
        type:Date,
        required:true
    },
    debut:Date,
    active:{
        type:Boolean,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
},{ id:false, toJSON: { virtuals: true }, toObject: { virtuals: true }});

schema.virtual("group",{
    ref:"Group",
    localField:"_id",
    foreignField:"members",
    justOne: true,
});

//discography
//fandom




var model = new mongoose.model("Idol",schema);



exports.Model = model;
exports.Schema = schema;