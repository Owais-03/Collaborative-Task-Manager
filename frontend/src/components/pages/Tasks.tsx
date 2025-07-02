import { useEffect, useState } from 'react'
import { fetchTasks } from '../../api/taskApi'
import TaskFilter from './TaskFilter'
import TaskList from './TaskList'
import Footer from '../shared/Footer'
import Navbar from '../shared/Navbar'
import AddIcon from '@mui/icons-material/Add'
import TaskForm from './TaskForm'

type Task = {
    id: string
    title: string
    description: string
    status: string
    assignee: string
    [key: string]: any
}

function Tasks() {
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [filter, setFilter] = useState<{ status: string; assignee: string }>({ status: '', assignee: '' });
    const [open, setOpen] = useState(false);

    // Fetch all tasks once
    const fetchAllTasks = async () => {
        const data = await fetchTasks();
        setAllTasks(data);
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    useEffect(() => {
        let filtered = allTasks;
        if (filter.status) filtered = filtered.filter(task => task.status === filter.status);
        // If an assignee filter is set, filter tasks by assignee name
        if (filter.assignee) {
            // Split the search string into lowercase words
            const searchWords = filter.assignee.toLowerCase().split(/\s+/).filter(Boolean);

            // Optimize: Use Set for faster lookup instead of nested loops
            filtered = filtered.filter(task => {
            if (!task.assignee) return false;

            // Split the task's assignee into lowercase words and store in a Set
            const assigneeWordsSet = new Set(task.assignee.toLowerCase().split(/\s+/));

            // Check if any search word exists in the assignee's words
            return searchWords.some(searchWord => assigneeWordsSet.has(searchWord));
            });
        }
        setFilteredTasks(filtered);
    }, [filter, allTasks]);

    const handleTaskCreated = async () => {
        await fetchAllTasks();
        setOpen(false);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Navbar />
            <div className="container my-5">
                <div className="card shadow" style={{margin: '0 auto' }}>
                    <div className="card-body p-4">
                        <TaskFilter filter={filter} setFilter={setFilter} />
                        <div className="mt-4">
                            <TaskList tasks={filteredTasks} setTasks={setAllTasks} />
                        </div>
                    </div>
                </div>
            </div>
            {/* Floating Action Button */}
            <button
                type="button"
                className="btn btn-primary rounded-circle shadow"
                style={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                    width: 56,
                    height: 56,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 24,
                    zIndex: 1300
                }}
                onClick={handleOpen}
                aria-label="Add"
            >
                <AddIcon />
            </button>
            {/* Modal for TaskForm */}
            <div className={`modal fade${open ? ' show d-block' : ''}`} tabIndex={-1} style={open ? { backgroundColor: 'rgba(0,0,0,0.5)' } : {}} role="dialog">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Create New Task</h5>
                            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <TaskForm onTaskCreated={handleTaskCreated} />
                        </div>
                    </div>
                </div>
            </div>
            {open && <div className="modal-backdrop fade show"></div>}
            <Footer />
        </>
    )
}

export default Tasks;