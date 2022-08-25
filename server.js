
const express = require('express')
const dotenv=require("dotenv")
const connectBD=require("./config/db")

const app = express()

app.use(express.json({}))
app.use(express.json({
  extended:true
}))


dotenv.config({
  path:'./config/config.env'
})

connectBD()

app.use("/api/todo/auth",require("./routes/user"))


const PORT=process.env.PORT || 3000

app.listen(PORT,()=>{
  console.log(`server is listening on Port ${PORT}`)
})


