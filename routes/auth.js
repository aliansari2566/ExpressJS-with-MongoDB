const express = require("express");
const userModel = require("../Model/userModel")
const brycpt = require("bcrypt")
const router = express.Router()


router.post("/login" , async(req,res)=>{ 

    const user = await userModel.findOne({email: req.body.email})
    if(!user) return res.send("invalid email..")

    const passVerification = await brycpt.compare(req.body.password, user.password)
    res.send(passVerification);

})


module.exports = router