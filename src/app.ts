import cors from 'cors';
import express from "express"

import { errorHandling } from "./middlewares/error-handling"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{
    
    res.send("Hello, world!")
})

app.use(errorHandling)

export {app}