const mongoose=require("mongoose");

const TodoSchema=new mongoose.Schema({
    titleee:{
        type:String,
        require:true
    },
    description:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    finished:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

});

module.exports=Todo=mongoose.model("todo",TodoSchema);

