import express from "express";
import cors from 'cors'
import mongoose from 'mongoose'

import {userRouter} from './routes/users.js'

const app = express()

app.use(express.json()); //when you send data from  frontend to backend, it will be converted into json
app.use(cors());

app.use("/auth", userRouter);

mongoose.connect("");

app.listen(3001, () => console.log("SERVER STARTED!"));