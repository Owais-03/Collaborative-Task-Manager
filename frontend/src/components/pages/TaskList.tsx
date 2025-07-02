import React, { useEffect, useState } from 'react';
import { fetchTasks, deleteTask, updateTask, updateTaskInfo } from '../../api/taskApi';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Spinner from 'react-bootstrap/Spinner';
import Container from 'react-bootstrap/Container';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';

const cellSx = {
    whiteSpace: 'pre-line',
    wordBreak: 'break-word',
    overflowWrap: 'break-word',
    maxWidth: 200,
    verticalAlign: 'top',
    padding: '12px 8px',
};

const descCellSx = {
    ...cellSx,
    maxWidth: 300,
};

const smallCellSx = {
    ...cellSx,
    maxWidth: 150,
};

const statusCellSx = {
    ...cellSx,
    maxWidth: 120,
};

const actionsCellSx = {
    ...cellSx,
    maxWidth: 120,
    padding: '12px 8px',
};

const TaskList = ({ tasks, setTasks }: any) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // For editing
    const [editOpen, setEditOpen] = useState(false);
    const [editTask, setEditTask] = useState<any>(null);

    useEffect(() => {
        const getTasks = async () => {
            try {
                const data = await fetchTasks();
                setTasks(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getTasks();
    }, [setTasks]);

    const handleDelete = async (id: string) => {
        await deleteTask(id);
        setTasks((prev: any[]) => prev.filter((task) => task._id !== id));
    };

    const handleStatusChange = async (id: string, status: string) => {
        await updateTask(id, { status });
        setTasks((prev: any[]) =>
            prev.map((task) =>
                task._id === id ? { ...task, status } : task
            )
        );
    };

    // Edit handlers
    const handleEditOpen = (task: any) => {
        setEditTask({ ...task });
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
        setEditTask(null);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = e.target as HTMLInputElement;
        setEditTask((prev: any) => ({
            ...prev,
            [name!]: value
        }));
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateTaskInfo(editTask._id, {
            title: editTask.title,
            description: editTask.description,
            assignee:editTask.assignee,
            assignedTo: editTask.assignedTo,
            status: editTask.status
        });
        setTasks((prev: any[]) =>
            prev.map((task) =>
                task._id === editTask._id ? { ...editTask } : task
            )
        );
        handleEditClose();
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading tasks...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-3">
                <Alert severity="error">Error: {error}</Alert>
            </Container>
        );
    }
    return (
        <>
            <Box sx={{ width: '100%' }}>
                {/* Desktop Table */}
                <TableContainer
                    component={Paper}
                    className="mt-4"
                    sx={{
                        display: { xs: 'none', md: 'block' }
                    }}
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ ...cellSx, fontWeight: 'bold' }}>Title</TableCell>
                                <TableCell sx={{ ...descCellSx, fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell sx={{ ...smallCellSx, fontWeight: 'bold' }}>Assigned By</TableCell>
                                <TableCell sx={{ ...smallCellSx, fontWeight: 'bold' }}>Assigned To</TableCell>
                                <TableCell sx={{ ...statusCellSx, fontWeight: 'bold' }}>Status</TableCell>
                                <TableCell sx={{ ...actionsCellSx, fontWeight: 'bold' }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tasks.map((task: any) => (
                                <TableRow key={task._id}>
                                    <TableCell sx={cellSx}>
                                        <Box sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                                            {task.title}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={descCellSx}>
                                        <Box sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                                            {task.description}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={smallCellSx}>
                                        <Box sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                                            {task.assignee}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={smallCellSx}>
                                        <Box sx={{ whiteSpace: 'pre-line', wordBreak: 'break-word' }}>
                                            {task.assignedTo}
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={statusCellSx}>
                                        <Select
                                            value={task.status}
                                            onChange={(e) => handleStatusChange(task._id, e.target.value as string)}
                                            size="small"
                                            fullWidth
                                            sx={{ minWidth: 100 }}
                                        >
                                            <MenuItem value="To Do">To Do</MenuItem>
                                            <MenuItem value="In Progress">In Progress</MenuItem>
                                            <MenuItem value="Done">Done</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell sx={actionsCellSx}>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                flexWrap: 'nowrap',
                                                gap: 1,
                                                justifyContent: 'center',
                                                flexDirection: 'row',
                                                minWidth: 0,
                                            }}
                                        >
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleEditOpen(task)}
                                                sx={{
                                                    minWidth: 0,
                                                    px: 1,
                                                    flexShrink: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => handleDelete(task._id)}
                                                sx={{
                                                    minWidth: 0,
                                                    px: 1.5,
                                                    flexShrink: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    whiteSpace: 'nowrap',
                                                }}
                                            >
                                                Delete
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Mobile Card View */}
                <Box
                    sx={{
                        display: { xs: 'flex', md: 'none' },
                        flexDirection: 'column',
                        gap: 2,
                        mt: 2,
                    }}
                >
                    {tasks.map((task: any) => (
                        <Paper key={task._id} sx={{ p: 2 }}>
                            <Box sx={{ fontWeight: 'bold', mb: 1 }}>{task.title}</Box>
                            <Box sx={{ mb: 1, color: 'text.secondary', fontSize: 14 }}>
                                {task.description}
                            </Box>
                            <Box sx={{ mb: 1 }}>
                                <strong>Assigned By:</strong> {task.assignee}
                            </Box>
                            <Box sx={{ mb: 1 }}>
                                <strong>Assigned To:</strong> {task.assignedTo}
                            </Box>
                            <Box sx={{ mb: 1 }}>
                                <FormControl fullWidth size="small">
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        value={task.status}
                                        label="Status"
                                        onChange={(e) => handleStatusChange(task._id, e.target.value as string)}
                                    >
                                        <MenuItem value="To Do">To Do</MenuItem>
                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                        <MenuItem value="Done">Done</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center', flexWrap: 'nowrap' }}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    size="small"
                                    onClick={() => handleEditOpen(task)}
                                    sx={{ minWidth: 36, flexShrink: 0, whiteSpace: 'nowrap' }}
                                >
                                    <EditIcon fontSize="small" />
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    size="small"
                                    onClick={() => handleDelete(task._id)}
                                    sx={{ minWidth: 36, flexShrink: 0, whiteSpace: 'nowrap' }}
                                >
                                    Delete
                                </Button>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            </Box>
            {/* Edit Task Modal */}
            <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
                <DialogTitle>Edit Task</DialogTitle>
                <DialogContent>
                    {editTask && (
                        <form onSubmit={handleEditSubmit}>
                            <Box className="text-justify" sx={{ mb: 2 }}>
                                <TextField
                                    margin="normal"
                                    label="Title"
                                    name="title"
                                    value={editTask.title}
                                    onChange={handleEditChange}
                                    fullWidth
                                    required
                                    slotProps={{
                                        input: {
                                            style: { textAlign: 'justify' }
                                        }
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    label="Description"
                                    name="description"
                                    value={editTask.description}
                                    onChange={handleEditChange}
                                    fullWidth
                                    multiline
                                    rows={3}
                                    required
                                    slotProps={{
                                        input: {
                                            style: { textAlign: 'justify' }
                                        }
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    label="Assigned By"
                                    name="assignee"
                                    value={editTask.assignee}
                                    onChange={handleEditChange}
                                    fullWidth
                                    required
                                    slotProps={{
                                        input: {
                                            style: { textAlign: 'justify' }
                                        }
                                    }}
                                />
                                <TextField
                                    margin="normal"
                                    label="Assigned To"
                                    name="assignedTo"
                                    value={editTask.assignedTo}
                                    onChange={handleEditChange}
                                    fullWidth
                                    required
                                    slotProps={{
                                        input: {
                                            style: { textAlign: 'justify' }
                                        }
                                    }}
                                />
                                <FormControl fullWidth margin="normal">
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                        name="status"
                                        value={editTask.status}
                                        label="Status"
                                        onChange={(e) => {
                                            const { name, value } = e.target as { name?: string; value: unknown };
                                            setEditTask((prev: any) => ({
                                                ...prev,
                                                [name!]: value
                                            }));
                                        }}
                                    >
                                        <MenuItem value="To Do">To Do</MenuItem>
                                        <MenuItem value="In Progress">In Progress</MenuItem>
                                        <MenuItem value="Done">Done</MenuItem>
                                    </Select>
                                </FormControl>
                                <Button type="submit" variant="contained" color="primary" className="mt-3">
                                    Save Changes
                                </Button>
                            </Box>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
};
export default TaskList;