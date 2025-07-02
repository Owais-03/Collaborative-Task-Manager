import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';

interface TaskFilterProps {
    filter: {
        status: string;
        assignee: string;
    };
    setFilter: (filter: { status: string; assignee: string }) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ filter, setFilter }) => {
    const handleStatusChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setFilter({ ...filter, status: e.target.value as string });
    };

    const handleAssigneeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter({ ...filter, assignee: e.target.value });
    };

    return (
        <Paper elevation={3} className="p-4 mb-4 mt-3">
            <Typography variant="h6" gutterBottom>
                Filter Tasks
            </Typography>
            <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={2}>
                <FormControl fullWidth className="mb-3 mb-sm-0 me-sm-3">
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={filter.status}
                        label="Status"
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="To Do">To Do</MenuItem>
                        <MenuItem value="In Progress">In Progress</MenuItem>
                        <MenuItem value="Done">Done</MenuItem>
                    </Select>
                </FormControl>
                <TextField
                    label="Assignee"
                    value={filter.assignee}
                    onChange={handleAssigneeChange}
                    placeholder="Enter assignee name"
                    fullWidth
                />
            </Box>
        </Paper>
    );
};

export default TaskFilter;