const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Create task
router.post('/', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update task (mark done or edit)
router.put('/:id', async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Soft delete (move to trash)
router.delete('/:id', async (req, res) => {
  try {
    const trashed = await Todo.findByIdAndUpdate(req.params.id, { isTrashed: true }, { new: true });
    res.json(trashed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Restore from trash
router.put('/restore/:id', async (req, res) => {
  try {
    const restored = await Todo.findByIdAndUpdate(req.params.id, { isTrashed: false }, { new: true });
    res.json(restored);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
