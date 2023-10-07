import express from "express";
import Student from "../models/Student.js";

const studentsRouter = express.Router()


// Create new student

studentsRouter.post("/", async (req, res) => {
    try  {
        const {name, first_name, email} = req.body
        const result = await Student.create({name, first_name, email})
        res.json(result)
    } catch (error) {
        res.status(500).res(error)
    }
})


// Retrieve all students

studentsRouter.get("/", async (req, res) => {
    try  {
        const result = await Student.find()
        res.json(result)
    } catch (error) {
        res.status(500).res(error)
    }
})


// Retrieve one student by id

studentsRouter.get("/:id", async (req, res) => {
    try  {
        const {id} = req.params
        const result = await Student.findById(id)
        res.json(result)
    } catch (error) {
        res.status(500).res(error)
    }
})

export default studentsRouter