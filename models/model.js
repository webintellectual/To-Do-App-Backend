import mongoose from "mongoose"; // This mongoose module is required to create database model

// Let's first define schema of our model
const schema = mongoose.Schema({
    text: String,
});

// use the schema to create model
const model = mongoose.model('ToDo', schema);

// Now export this model so that controllers can be written on it
export default model;