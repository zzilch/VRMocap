const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const User=require("./User");
const House=require("./House");


// Create Schema
const TakeSchema=new Schema({
   
    userCardID:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'User'
    },
    hid:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'House'
    },
    tid:{
        type:Number,
    },
    regionIndex:{
        type:Number,
    },
    regionLabel:{
        type:String,
    }
    // startdate:{
    //     type:Date,
    //     default:Date.now
    // },
})

module.exports=Take=mongoose.model("takes",TakeSchema);