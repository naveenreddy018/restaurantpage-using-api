const express = require("express")
const server = express()
port = 3000;
const fs = require("fs")
const cors = require("cors")

server.use(cors())

server.get("/restaurants",(req,res)=>{
              
    const data = fs.readFileSync("file.json","utf-8")
    res.json(JSON.parse(data))
})

server.listen(port,()=>{
    console.log("http://localhost:"+port)
})





