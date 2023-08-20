import express from "express"; // framework build on top of Node.js
import mongoose from "mongoose"; // In this file it is used to connect our backend code to a MongoDB cluster
import cors from 'cors'; // for cross origin requests
import bodyParser from 'body-parser';

import routes from './routes/TodoRoute.js'; // To use requests defined in routes

import dotenv from 'dotenv'; // This is used to store variables in environment (.env file) to secure them
dotenv.config();

// Creating an app instance
const app = express(); 

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors()); // for cross origin requests

// We need a Port on which we can run our backend code that may be local (5000) or on cloud.
const PORT = process.env.port || 5000; // 5000 is for localhost and enviourment variable for hosting on web

// We need a url of our MongoDB database to connect this backend code to it
// const MONGODB_URL = "mongodb+srv://warriorak77:7sBF1Ve4lTslR3Xn@cluster0.fgi7k4x.mongodb.net/?retryWrites=true&w=majority";
// username: warriorak77 , password: 7sBF1Ve4lTslR3Xn
// URL consists of password, so to secure this url we create url in .env file

// Let's connect our backend code to the MongoDB cluster
mongoose.connect(process.env.MONGODB_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on ${PORT}`)))
    .catch((error) => console.log(error.message));

app.use(routes); // using route requests in our app instance
