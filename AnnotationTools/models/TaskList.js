const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const User=require("./User");

// Create Schema
const TaskListSchema=new Schema({
   
    hid:{
        type:Number,
        required:true
    },
    state:{
        type:Number,
        required:true
    },
    userCardID:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    date:{
        type:Date,
        default:Date.now
    },
})

module.exports=TaskList=mongoose.model("tasklists",TaskListSchema);