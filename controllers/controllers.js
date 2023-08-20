// Actual logic (fxn) is written in controllers on the mongoose model(s)

import mongoose from 'mongoose';
import DB_model from '../models/model.js'; // import of DB model

// GET request's controller
export const getToDo = async (req,res) => {
    try {
        const toDo = await DB_model.find(); // finding data in model
        res.status(200).json(toDo);  // returning data in response
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

// POST request's controller
export const postToDo = async (req,res) => {
    const toDo = req.body; // req variable has new data to be added
    const newToDo = new DB_model(toDo); // adding this new data using model
    try {
        await newToDo.save(); // saving it to data base
        res.status(201).json(newToDo);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

// UPDATE request's controller
export const updateToDo = async (req,res) => {
    const { id } = req.params;
    const { text } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No toDo with this id");
    try{
        const updatedToDo = await DB_model.findByIdAndUpdate(id, { text }, {new: true});
        res.json({message: "ToDo updated successfully", updatedToDo});
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

// DELETE request's controller
export const deleteToDo = async (req,res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No toDo with this id`);

    try {
        const deletedToDo = await DB_model.findByIdAndDelete(id);
        if(!deletedToDo){
            return res.status(404).send("No ToDo found with this id");
        }
        res.json({message: "ToDo deleted successfully", deletedToDo});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}