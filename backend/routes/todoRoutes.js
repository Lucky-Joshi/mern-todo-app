const express = require('express');

const router = express.Router(); 
// Importing the controller functions for Todo operations
const {
  createTodo,
  getTodos,
  updateTodo,
  trashTodo,
  restoreTodo
} = require('../controllers/todoController');

router.post('/', createTodo); // Route to create a new todo item
router.get('/', getTodos); // Route to retrieve all todo items
router.put('/:id', updateTodo); // Route to update a specific todo item by ID
router.delete('/:id', trashTodo); // Route to move a todo item to the trash
router.put('/restore/:id', restoreTodo); // Route to restore a todo item from the trash

module.exports = router;
