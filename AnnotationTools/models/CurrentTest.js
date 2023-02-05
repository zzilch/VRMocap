const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const User=require("./User");
const House=require("./House");
const TaskList=require("./TaskList");


// Create Schema
const CurrentTestSchema=new Schema({
    userCardID:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    hid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    status:{
       type:Number
    },
   
})

module.exports=CurrentTest=mongoose.model("currentTests",CurrentTestSchema);