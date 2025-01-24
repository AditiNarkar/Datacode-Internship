const express = require('express')
const cors = require('cors')
const router = require('./routes/routes.js')
const dotenv = require('dotenv')
dotenv.config()

const connectDB = require('./config/db.js')
connectDB()

const app = express()

app.use(express.json());

app.use(cors())

const PORT = process.env.PORT
console.log(PORT)
app.use("/api/", router)

app.listen(PORT, () => {
    console.log("Running at", PORT)
})