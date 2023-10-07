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
        
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})


// RETRIEVE ALL STUDENTS

studentsRouter.get("/", async (req, res) => {
    try  {
        const result = await Student.find()
        res.json(result)
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
        res.json(result)
    } catch (error) {
        res.status(500).json(error)
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
        res.status(500).json(error)
    }
})


// MODIFY ALL STUDENTS BY SAME NAME

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
            res.status(404).json({message: "Student not found. Search by first name."})   
        } 
        // res.json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
        
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