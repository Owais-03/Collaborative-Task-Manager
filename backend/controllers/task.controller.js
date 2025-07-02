import Task from '../models/task.model.js';

// Create a new task 
const createTask = async (req, res) => {
    const { title, description, assignee, assignedTo, status } = req.body;
    try {
        if (!title || !description || !assignee || !assignedTo || !status ) {
            return res.status(400).json({
                message: "Some fields are missing.",
                success: false,
            });
        }
        const newTask = new Task({ title, description, assignee, assignedTo, status });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tasks with optional filters
const getTasks = async (req, res) => {
    const { status, assignee } = req.query;
    try {
        const query = {};
        if (status) query.status = status;
        if (assignee) query.assignee = assignee;

        const tasks = await Task.find(query);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a task's info (title, description, assignedTo, status)
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, assignee, assignedTo, status } = req.body;
    try {
        // Only update fields that are provided in the request body
        const updateFields = {};
        if (title !== undefined) updateFields.title = title;
        if (description !== undefined) updateFields.description = description;
        if (assignee !== undefined) updateFields.assignee = assignee;
        if (assignedTo !== undefined) updateFields.assignedTo = assignedTo;
        if (status !== undefined) updateFields.status = status;

        const updatedTask = await Task.findByIdAndUpdate(id, updateFields, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) 
        return res.status(404).json({ message: 'Task not found' });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTasksByStatus = async (req, res) => {
    const { status } = req.params;
    try {
        const tasks = await Task.find({ status });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getTasksByAssignee = async (req, res) => {
    const { assignee } = req.params;
    try {
        const tasks = await Task.find({ assignee: assignee });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { createTask, getTasks, deleteTask, updateTask, getTasksByAssignee, getTasksByStatus }