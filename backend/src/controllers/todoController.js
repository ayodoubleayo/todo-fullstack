const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, reminderTime } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });

    const newTodo = new Todo({
      title,
      reminderTime: reminderTime ? new Date(reminderTime) : null
    });

    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    if (Object.prototype.hasOwnProperty.call(payload, 'reminderTime')) {
      if (payload.reminderTime === null) {
        payload.reminderTime = null;
      } else if (payload.reminderTime) {
        payload.reminderTime = new Date(payload.reminderTime);
      }
    }

    const updated = await Todo.findByIdAndUpdate(id, payload, { new: true });
    if (!updated) return res.status(404).json({ error: 'Todo not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const removed = await Todo.findByIdAndDelete(id);
    if (!removed) return res.status(404).json({ error: 'Todo not found' });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
