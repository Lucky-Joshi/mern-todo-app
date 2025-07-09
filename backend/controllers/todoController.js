const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => { // Create a new todo item
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodos = async (req, res) => { // Retrieve all todo items
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => { // Update a specific todo item by ID
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.trashTodo = async (req, res) => { // Move a todo item to the trash
  try {
    const trashed = await Todo.findByIdAndUpdate(req.params.id, { isTrashed: true }, { new: true });
    res.json(trashed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.restoreTodo = async (req, res) => { // Restore a todo item from the trash
  try {
    const restored = await Todo.findByIdAndUpdate(req.params.id, { isTrashed: false }, { new: true });
    res.json(restored);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
