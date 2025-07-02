import React, { useState } from 'react';
import { createTask } from '../../api/taskApi'; // fixed import path
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';

interface TaskFormProps {
    onTaskCreated: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskCreated }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [assignee, setAssignee] = useState('');
    const [status, setStatus] = useState('To Do');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const newTask = { title, description, assignee, assignedTo,  status };
        await createTask(newTask); // <-- Actually create the task
        onTaskCreated();
        setTitle('');
        setDescription('');
        setAssignee('');
        setAssignedTo('');
        setStatus('To Do');
    };

    return (
        <Box className="container mt-4" maxWidth="sm">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Assigned By"
                        variant="outlined"
                        fullWidth
                        value={assignee}
                        onChange={(e) => setAssignee(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <TextField
                        label="Assigned To"
                        variant="outlined"
                        fullWidth
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="To Do">To Do</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Done">Done</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <Button variant="contained" color="primary" type="submit" className="w-100">
                    Create Task
                </Button>
            </form>
        </Box>
    );
};

export default TaskForm;