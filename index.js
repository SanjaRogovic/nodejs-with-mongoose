import express  from "express"
import "dotenv/config"
import client from "./db/db.js"
import studentsRouter from "./routes/students.js"

const app = express()

// Middleware
const secure = ((req, res, next) => {
    const {token} = req.body
    const secretToken = process.env.TOKEN

    if (!token || secretToken !== token) {
        res.status(403).json({message: "Unauthorized"})
    } else {
        next()
    }
})


app.use(express.json())

studentsRouter.use(secure)

app.use("/api/students", studentsRouter)


const port = process.env.PORT || 3000

client.on("connected", () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`)
    })
})



