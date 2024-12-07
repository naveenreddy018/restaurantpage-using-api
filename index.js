const express = require("express")
const server = express()
port = 3000;
const bcrypt = require("bcrypt")
const fs = require("fs")

server.use(express.json())

server.post("/register",async(req,res)=>{
    // res.send({
      
    //     body : req.body
    // })


    var salt = 10;
    hashed_password = await bcrypt.hash(req.body.password,salt)

   user = {
    username : req.body.name,
    password : hashed_password
   }



    fs.writeFile("index.json",JSON.stringify(user),(err)=>{
        if(err){
            res.send("err")
            console.log("err occured")
        }
        else{
            res.send(user)
        }
    })

    


})


server.post("/login", async(req,res)=>{

       try{
        var data = fs.readFileSync("index.json","utf-8")
       user = JSON.parse(data)
                
       console.log(user)
        match = await bcrypt.compare(req.body.password,user.password)

        if(user.username === req.body.name && match){
            res.send({
                message : "login successfull",
                  user
            })
        }else{
            res.send("lodin unsuccesfull")
        }

       }
        catch(error){
            
            console.log("error occured" , err)
            res.status(500).send("Error file reading ")
        }


})








server.listen(port,()=>{
    console.log("http://localhost:"+port)
})