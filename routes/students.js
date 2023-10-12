import express from "express";
import Student from "../models/Student.js";
import Token from "../models/Token.js";

const studentsRouter = express.Router()


// CREATE A NEW STUDENT

/*If the user sends a POST request, create a database document with:
name: “John”
first_name: “Doe”
email: “john@doe.com“*/

studentsRouter.post("/", async (req, res) => {
    try  {
        const {name, first_name, email} = req.body
        const result = await Student.create({name, first_name, email})

        const validateEmail = await Student.findOne({email: email})

        if (validateEmail){
            return res.status(422).json({ message: "Email already exists" });
        }
        
        res.status(201).json(result)

    } catch (error) {
        res.status(500).json(error)
    }
})


// TOKEN Middleware - routing level
const secure = ((req, res, next) => {
    const {token} = req.params

    if(token && token.length > 3){  //evaluate if token exists and if length is more than 3 characters
        next()
    } else {
        next({statusCode: 403, message: "Forbidden"}) 
    }

    // if(!token || secureToken !== token || token.length < 3){
    //     return res.status(403).json({message: "Forbidden"})
    // } else {
    //     next()
    // }
})


studentsRouter.post("/create-token/:userId", async (req, res) => {
    try  {
        const {tokenData} = req.body.token

        // save token to the database
        const token = await Token.create({value: tokenData})    
        
        if(!token){
            return res.status(403).json({message: "Token not created"})
        }
        res.status(201).json(token)

    } catch (error) {
        res.status(500).json(error)
    }
})


studentsRouter.get("/verify/:token", secure, async (req, res) => {
    try  {
        const result = await Student.find()
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})


// RETRIEVE ALL STUDENTS

studentsRouter.get("/", async (req, res) => {
    try  {
        const result = await Student.find()
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})


// RETRIEVE ONE STUDENT BY ID

studentsRouter.get("/:id", async (req, res) => {
    try  {
        const {id} = req.params
        const result = await Student.findById(id)

        if(!id){
            return res.status(404).json({message: "Student not found"})
        }
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})


// EDIT A STUDENT

studentsRouter.put("/:id", async (req, res) => {
    try  {
        const {id} = req.params
        const {name, first_name, email} = req.body
        const result = await Student.findByIdAndUpdate(id, {name, first_name, email}, {new: true})

        if(!result){
            res.status(404).json({message: "Student not found"})
        }
        res.status(201).json(result)
        
    } catch (error) {
        res.status(500).json(error)
    }
})


// MODIFY MANY STUDENTS BY NAME

studentsRouter.put("/updateMany/:first_name", async (req, res) => {
   
    try  {
        const {first_name} = req.params
        const {first_name_update} = req.body
        const result = await Student.updateMany({first_name}, {$set: { first_name: first_name_update}})
        console.log(result)

        if(result.modifiedCount > 0){
            const update = await Student.find({first_name: first_name_update})
            res.json(update)
        } else {
            res.status(404).json({message: "Student not updated"})   
        } 
        // res.json(result)
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})


// DELETE A STUDENT

studentsRouter.delete("/:id", async (req,res) => {
    const {id} = req.params

    try {
        const result = await Student.findByIdAndDelete(id)

        if(!result){
            res.status(404).json({message: "Student not found"})
        }
        res.status(201).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})


// DELETE ALL STUDENTS

studentsRouter.delete("/", async (req, res) => {
    try {
        const result = await Student.deleteMany({})
        res.status(201).json(result)
    } catch(error) {
        res.status(500).json(error)
    }
})

export default studentsRouter