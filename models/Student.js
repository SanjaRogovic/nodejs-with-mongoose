import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
        minlength: 1,
        maxlength: 100,
        trim: true

    },

    first_name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
        trim: true
    },

    email: {
        type: String,
        required: [true, "Email required"],
        unique: true, 
        trim: true,
        minlength: 1,
        maxlength: 100
    }
})

const Student = mongoose.model("Student", StudentSchema)

export default Student