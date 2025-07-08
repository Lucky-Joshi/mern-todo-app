const express = require('express');
const router = express.Router();
const {
  createTodo,
  getTodos,
  updateTodo,
  trashTodo,
  restoreTodo
} = require('../controllers/todoController');

router.post('/', createTodo);
router.get('/', getTodos);
router.put('/:id', updateTodo);
router.delete('/:id', trashTodo);
router.put('/restore/:id', restoreTodo);

module.exports = router;
