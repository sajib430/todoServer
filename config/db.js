const mongoose=require("mongoose")

const connectBD=async()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI)

    console.log(`connect to mongodb ${conn.connection.host}`)

}

module.exports=connectBD

