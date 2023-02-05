const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const User=require("./User");
const House=require("./House");

// Create Schema
const ResultSchema=new Schema({
    uid:{
        type:Number,
    },
    hid:{
        type:Number,
    },
    tid:{
        type:Number,
    },
    verb:{
        type:String,
    },
    noun:{
        type:String,
    },
    cn:{
        type:String,
    },
    valid:{
        type:Boolean,
    },
    rlabel:{
        type:String,
    },
    checked:{
        type:Boolean,
    }
   
})

module.exports=Result=mongoose.model("result",ResultSchema);