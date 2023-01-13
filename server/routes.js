let express = require('express');
let router = express.Router();
const axios = require('axios')

const backendURL = process.env.MODE === "production"?process.env.NODE_APP_PROD : process.env.NODE_APP_DEV

router.post("/addUser",async(req,res,next)=>{
    const resp = await axios.post(`${backendURL}/addUser`,{...req.body})
    if(resp.data){
        res.send(resp.data)
    }else{
        res.send({message:"Response Not found"})
    }
})

router.get("/getAllUsers",async(req,res,next)=>{
    const resp = await axios.get(`${backendURL}/getAllUsers`)
    if(resp.data){
        res.send(resp.data)
    }else{
        res.send({message:"Response Not found"})
    }
})

module.exports = router