const mongoose=require("mongoose")

const userShema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },

    avatar:{
        type:String
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
    
})

module.exports=mongoose.model("User",userShema)
