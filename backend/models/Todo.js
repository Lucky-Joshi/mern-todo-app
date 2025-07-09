const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: {
    type: String,
    enum: ["High", "Medium", "Low", "Lowest"],
    default: "Medium"
  },
  isCompleted: { type: Boolean, default: false }, 
  isTrashed: { type: Boolean, default: false },
}, { timestamps: true });


module.exports = mongoose.model('Todo', TodoSchema); 
