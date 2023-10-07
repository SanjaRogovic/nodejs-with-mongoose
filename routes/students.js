import express from "express";
import Student from "../models/Student.js";
import {body, checkSchema, validationResult} from "express-validator"

const studentsRouter = express.Router()

// STUDENT VALIDATION

const oneStudentEdit = [
    body("name").isString().notEmpty().optional(),
    body("first_name").isString().notEmpty().optional(),
    body("email").isString().notEmpty().optional()
]

/*const newStudentValidator = [
    body("name").isString().notEmpty(),
    body("first_name").isString().notEmpty(),
    body("email").isString().notEmpty()
]*/


// CREATE A NEW STUDENT

/*If the user sends a POST request, create a database document with:
name: “John”
first_name: “Doe”
email: “john@doe.com“*/

studentsRouter.post("/", async (req, res) => {
    try  {
        const {name, first_name, email} = req.body
        const result = await Student.create({name, first_name, email})
        res.json(result)
    } catch (error) {
        res.status(500).res(error)
    }
})


// RETRIEVE ALL STUDENTS

studentsRouter.get("/", async (req, res) => {
    try  {
        const result = await Student.find()
        res.json(result)
    } catch (error) {
        res.status(500).res(error)
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
        res.json(result)
    } catch (error) {
        res.status(500).res(error)
    }
})


// EDIT A STUDENT

studentsRouter.put("/:id", oneStudentEdit, async (req, res) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({"EDIT INVALID": errors.array()})
    }

    try  {
        const {id} = req.params
        const {name, first_name, email} = req.body
        const result = await Student.findByIdAndUpdate(id, {name, first_name, email})

        if(result.length === 0){
            res.status(404).json({message: "Student not found"})
        }
        res.json(result)
    } catch (error) {
        res.status(500).res(error)
    }
})


// MODIFY ALL STUDENTS BY NAME

studentsRouter.put("/updateMany/:first_name", async (req, res) => {
   
    try  {
        const {first_name} = req.params
        const result = await Student.updateMany({first_name},  { first_name: "Bob"})
        console.log(result)

        if(result.modifiedCount.length > 0){
            const update = await Student.find({first_name: "Bob"})
            res.json(update)
        } else {
            res.status(404).json({message: "Student not found. Search by first name."})   
        } 
        
    } catch (error) {
        console.log(error)
        res.status(500).res(error)
        
    }
})


// DELETE A STUDENT

studentsRouter.delete("/:id", async (req,res) => {
    const {id} = req.params

    try {
        const result = await Student.findByIdAndDelete(id)
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }

})

export default studentsRouter