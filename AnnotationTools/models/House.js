const mongoose=require("mongoose");
const Schema=mongoose.Schema;

// Create Schema
const HouseSchema=new Schema({
    hid:{
        type:Number,
        required:true
    },
    maxUserNum:{
        type:Number,
        required:true
    },
    curUserNum:{
        type:Number,
        required:true
    },
    users:{
        type:Array
    }
})

module.exports=Houses=mongoose.model("houses",HouseSchema);