const TaskModel = require("../Models/TaskModel");

const createTask = async (req, res) => {
    const data = req.body;
    try {
        const model = new TaskModel(data);
        await model.save();
        res.status(201).json({ message: 'Task is created', success: true, task: model });
    } catch (err) {
        console.error('Error creating task:', err); // More detailed logging
        res.status(500).json({ message: 'Failed to create task', success: false, error: err.message });
    }
}

const fetchAllTasks = async (req, res) => {
    try {
        const data = await TaskModel.find({});
        res.status(200).json({ message: 'All Tasks', success: true, data });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Failed to get all tasks', success: false, error: err.message });
    }
}

const updateTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        const obj = { $set: { ...body } };
        const updatedTask = await TaskModel.findByIdAndUpdate(id, obj, { new: true });

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task Updated', success: true, task: updatedTask });
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).json({ message: 'Failed to update task', success: false, error: err.message });
    }
}

const deleteTaskById = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedTask = await TaskModel.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }

        res.status(200).json({ message: 'Task is deleted', success: true });
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).json({ message: 'Failed to delete task', success: false, error: err.message });
    }
}

module.exports = {
    createTask,
    fetchAllTasks,
    updateTaskById,
    deleteTaskById
}

