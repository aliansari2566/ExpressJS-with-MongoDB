const express = require("express")
require("dotenv").config();
const app = express();
const userRoutes = require("./routes/User")

const connectDB = require("./db");

connectDB();

// app.use(express.json()) is middleware in an Express.js application is used to parse incoming requests with JSON payloads. It's a built-in middleware provided by Express that allows your application to handle and process JSON data sent in the request body.

// Parsing JSON Data: When a request with a Content-Type of "application/json" is received, this middleware automatically parses the JSON data in the request body and makes it accessible via req.body. It transforms the JSON data into a JavaScript object, which can be easily accessed and manipulated in your route handlers.
app.use(express.json())
// Using /api/ as a prefix or a route segment when using app.use('/api/', userRoutes) in your Express application is a common practice 
app.use('/api/users/',userRoutes)



// app.listen(3000 , () =>{

//     console.log("Server started on port 3000"  )
// }) 

const server = app.listen(process.env.PORT , () =>{

    console.log(`Server started on port ${process.env.PORT}`)
}) 
