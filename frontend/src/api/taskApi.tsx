import axios from 'axios';
import { TASK_API_END_POINT } from '../utils/constant';

export const fetchTasks = async (filters = {}) => {
    try {
        const response = await axios.get(TASK_API_END_POINT, { params: filters, withCredentials: true });
        return response.data;
    } catch (error:any) {
        throw new Error('Error fetching tasks: ' + error.message);
    }
};

export const createTask = async (task:any) => {
    try {
        const response = await axios.post(TASK_API_END_POINT, task, { withCredentials: true });
        return response.data;
    } catch (error:any) {
        throw new Error('Error creating task: ' + error.message);
    }
};

export const updateTask = async (taskId:any, updatedTask:any) => {
    try {
        const response = await axios.patch(`${TASK_API_END_POINT}/${taskId}`, updatedTask, { withCredentials: true });
        return response.data;
    } catch (error:any) {
        throw new Error('Error updating task: ' + error.message);
    }
};

export const updateTaskInfo = async (taskId: any, updatedTask: any) => {
    try {
        const response = await axios.patch(`${TASK_API_END_POINT}/${taskId}`, updatedTask, { withCredentials: true });
        return response.data;
    } catch (error: any) {
        throw new Error('Error updating task info: ' + error.message);
    }
};

export const deleteTask = async (taskId:any) => {
    try {
        await axios.delete(`${TASK_API_END_POINT}/${taskId}`, { withCredentials: true });
    } catch (error:any) {
        throw new Error('Error deleting task: ' + error.message);
    }
};