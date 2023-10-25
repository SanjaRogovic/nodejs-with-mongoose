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
    const {name, first_name, email} = req.body
    try  {
        const response = await Student.create({name, first_name, email})
        const validateEmail = await Student.findOne({email: email})

        if (validateEmail){
            return res.status(422).json({ message: "Email already exists" });
        }
        res.status(201).json(response)
    } catch (error) {
        if (err.code === 11000 && err.keyPattern && err.keyPattern.email) {
            return res.status(400).json({ error: 'Email already exists.' });
        }
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

    //const secretToken = process.env.TOKEN;
    // if(!token || secretToken !== token){
    //     return res.status(403).json({message: "Forbidden"})
    // } else {
    //     next()
    // }
})


studentsRouter.post("/create-token/:userId", async (req, res) => {
    const {tokenData} = req.body.token
    try  {
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
        const response = await Student.find()
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


// RETRIEVE ONE STUDENT BY ID

studentsRouter.get("/:id", async (req, res) => {
    const {id} = req.params
    try  {
        const response = await Student.findById(id)

        if(!id){
            return res.status(404).json({message: "Student not found"})
        }
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


// EDIT A STUDENT

studentsRouter.put("/oneStudent/:id", async (req, res) => {
    const {id} = req.params
    const {name, first_name, email} = req.body
    try  {
        const response = await Student.findByIdAndUpdate(id, {name, first_name, email}, {new: true})

        if(!response){
            res.status(404).json({message: "Student not found"})
        }
        res.status(201).json(response)
        
    } catch (error) {
        res.status(500).json(error)
    }
})


// MODIFY MANY STUDENTS BY NAME

studentsRouter.put("/manyStudents/:name", async (req, res) => {
    const {first_name} = req.params
    const {first_name_update} = req.body
    try  {
        const response = await Student.updateMany({first_name}, {$set: { first_name: first_name_update}})
        console.log(response)

        if(response.modifiedCount > 0){
            const updatedStudent = await Student.find({first_name: first_name_update})
            res.json(updatedStudent)
        } else {
            res.status(404).json({message: "Student not updated"})   
        } 
        // res.json(response)
    } catch (error) {
        // console.log(error)
        res.status(500).json(error)
    }
})


// DELETE A STUDENT

studentsRouter.delete("/:id", async (req,res) => {
    const {id} = req.params
    try {
        const response = await Student.findByIdAndDelete(id)

        if(!response){
            res.status(404).json({message: "Student not found"})
        }
        res.status(201).json(response)
    } catch (error) {
        res.status(500).json(error)
    }
})


// DELETE ALL STUDENTS

studentsRouter.delete("/", async (req, res) => {
    try {
        const response = await Student.deleteMany({})
        res.status(201).json(response)
    } catch(error) {
        res.status(500).json(error)
    }
})

export default studentsRouter