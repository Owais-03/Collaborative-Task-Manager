import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    assignee:{
        type:String,
        required:true,
    },
    assignedTo:{
        type:String,
        required:true,
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'In Progress'
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

export default Task;