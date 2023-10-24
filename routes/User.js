const express = require("express")
const userModel = require("../Model/userModel")
const router = express.Router()
const mongoose = require("mongoose");

// localhost:3000/api/home

router.get("/home", (req , res)=>{
    // it will visible on console 
console.log("iam working");    

// is for responding to client requests and sending data back to the client.
// res.send("response delivered");


// res.json is an Express.js method that sends a JSON response to the client.
// The client will receive this JSON response, and it can then process the data as needed. This is a common way to send structured data in response to API requests.
res.json({

    body:{
        msg: "Home API"
    }
})

})

// Gettin all data from database
router.get("/All", async (req, res) => {
    try {
        // find() is  a mongoose method which gives all the data from data base
      const AllUsers = await userModel.find({});
      res.status(200).send(AllUsers); 
    } catch (error) {
      console.error("An error occurred.", error);
      res.status(500).json({ error: "An error occurred." });
    }
  });

 
 // Getting  user by id data from database
  router.get("/user/:id", async (req, res) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ error: "Invalid user ID format" });
      }
  
      const user = await userModel.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ error: "User not found, invalid ID" });
      }
  
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  });






// req.body represents the data sent in the request's body. In a POST request, clients often send data in the request body, and req.body allows you to access that data on the server

// In the first code block, a new userModel instance is created using the entire req.body object as an argument. This essentially means that the new user object will have all the properties contained in the request body.
// router.post("/add", (req,res)=>{
//     const user = new userModel(req.body)
//     res.json(user)
// })


// In the second code block, a userModel instance is created by explicitly specifying the properties to include, and each property is extracted from the req.body object. This code block gives you more control over which properties from the request body you want to include in the new user object.
router.post("/add", async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Log the request body
  
      const user = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
  
      const resp = await user.save();
      res.send(resp);
    } catch (err) {
      res.status(500).send(err);
    }
  });


// Delete Route
router.delete("/user/:id", async (req, res) => {
    try {
      const deletedUser = await userModel.findByIdAndDelete(req.params.id);
  
      if (!deletedHero) {
        return res.status(404).json({ error: "User not found, invalid ID" });
      }
  
      res.status(200).json({ msg: "Hero Removed", User: deletedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }    
  });




// if we are creating any thing in seprate file then we have to export it so that it can be accessible outside that file

module.exports = router 