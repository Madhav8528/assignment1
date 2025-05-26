import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";

dotenv.config({
    path : "./.env"
})


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes declaration
import schoolRoutes from "./routes/school.routes.js"

app.use("/api/v1/school", schoolRoutes)

const port = process.env.PORT || 7000

app.listen(port, () => {
    console.log(`App is listening on the port ${port}`);
})