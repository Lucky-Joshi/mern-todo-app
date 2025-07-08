// backend/controllers/todoController.js
const Todo = require('../models/Todo');

exports.createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.trashTodo = async (req, res) => {
  try {
    const trashed = await Todo.findByIdAndUpdate(req.params.id, { isTrashed: true }, { new: true });
    res.json(trashed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.restoreTodo = async (req, res) => {
  try {
    const restored = await Todo.findByIdAndUpdate(req.params.id, { isTrashed: false }, { new: true });
    res.json(restored);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
