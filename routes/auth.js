const express = require("express");
const userModel = require("../Model/userModel")
const brycpt = require("bcrypt")
const router = express.Router()
const jwt = require("jsonwebtoken")

router.post("/login" , async(req,res)=>{ 

    const user = await userModel.findOne({email: req.body.email})
    if(!user) return res.send("invalid email..")

    const passVerification = await brycpt.compare(req.body.password, user.password)
    if(!passVerification) return     res.send("Invalid Password");


    const token = jwt.sign({_id:user._id}, process.env.Web_token)
    res.send({
        body:{
            user:user,
            token:token
        }
    })


})


module.exports = router