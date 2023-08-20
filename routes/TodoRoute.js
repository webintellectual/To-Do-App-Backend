import express from 'express'; // framework built on top of Node
import { deleteToDo, getToDo, postToDo, updateToDo } from '../controllers/controllers.js';

const router = express.Router(); // get the router from express to make requests

// params: path, callback fxn // '/' means main path i.e. domain_name.com/ or localhost:5000/
router.get('/',getToDo); // GET request API : baseUrl/
router.post('/save', postToDo); // POST request API : baseUrl/save
router.put('/todos/:id', updateToDo); // UPDATE request API : baseUrl/todos/{todo id}
router.delete('/todos/:id', deleteToDo); // DELETE request API : baseUrl/todos/{todo id}

export default router;
