import React from 'react';
import { Card, CardContent, Typography, Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';

interface Task {
    _id: string;
    title: string;
    description: string;
    assignee:string,
    assignedTo: string;
    status: string;
}

interface TaskItemProps {
    task: Task;
    onUpdateStatus: (id: string, status: string) => void;
    onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onUpdateStatus, onDelete }) => {
    const handleStatusChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        onUpdateStatus(task._id, e.target.value as string);
    };

    const handleDelete = () => {
        onDelete(task._id);
    };

    return (
        <Card className="mb-3">
            <CardContent>
                <Typography variant="h6" className="mb-2">{task.title}</Typography>
                <Typography variant="body2" className="mb-2">{task.description}</Typography>
                <Typography variant="body2" className="mb-2">Assigned To: {task.assignedTo}</Typography>
                <FormControl fullWidth className="mb-2">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={task.status}
                        label="Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete
                </Button>
            </CardContent>
        </Card>
    );
};

export default TaskItem;