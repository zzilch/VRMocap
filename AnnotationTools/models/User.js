const mongoose=require("mongoose");
const Schema=mongoose.Schema;

// Create Schema
const UserSchema=new Schema({
    cardID:{
        type:String,
        required:true
    },
    phoneNum:{
        type:String,
        required:true
    },
    height:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    sex:{
        type:String,
        required:true
    },
    identity:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports=User=mongoose.model("users",UserSchema);