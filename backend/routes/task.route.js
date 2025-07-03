import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, getTasksByAssignee, getTasksByStatus } from '../controllers/task.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.route("/status/:status")
  .get(isAuthenticated, getTasksByStatus);

router.route("/assignee/:assignee")
  .get(isAuthenticated, getTasksByAssignee);

router.route("/")
  .get(getTasks) // <-- Remove isAuthenticated for GET only
  .post(isAuthenticated, createTask);

router.route("/:id")
  .patch(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;