const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

// GET / - Get all tasks for authenticated user
router.get('/', authMiddleware, getTasks);

// POST / - Create a new task
router.post('/', authMiddleware, createTask);

// PUT /:id - Update a specific task
router.put('/:id', authMiddleware, updateTask);

// DELETE /:id - Delete a specific task
router.delete('/:id', authMiddleware, deleteTask);

module.exports = router;