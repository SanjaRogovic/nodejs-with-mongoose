import express from "express";
import Student from "../models/Student.js";

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
        res.json(result)
    } catch (error) {
        res.status(500).res(error)
    }
})


// EDIT A STUDENT

studentsRouter.put("/:id", async (req, res) => {
    try  {
        const {id} = req.params
        const {name, first_name, email} = req.body
        const result = await Student.findByIdAndUpdate(id, {name, first_name, email})
        if(result.length === 0){
            res.status(404).json({message: "User not found"})
        }
        res.json(result)
    } catch (error) {
        res.status(500).res(error)
    }
})

export default studentsRouter