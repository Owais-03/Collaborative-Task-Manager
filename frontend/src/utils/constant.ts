export const USER_API_END_POINT = `${(import.meta as any).env.VITE_BACKEND_API_URL}/user` || "http://localhost:5000/api/v1/user";
export const TASK_API_END_POINT = `${(import.meta as any).env.VITE_BACKEND_API_URL}/task` || "http://localhost:5000/api/v1/task";

// Example object to send for user registration (without file upload)
export const exampleRegisterPayload = {
  fullname: "John Doe",
  email: "john@example.com",
  phoneNumber: "1234567890",
  password: "securePassword123"
};

// Example object for login
export const exampleLoginPayload = {
  email: "john@example.com",
  password: "securePassword123"
};

// Example object for task creation
export const exampleTaskPayload = {
  title: "Finish documentation",
  description: "Complete the API docs for the project",
  assignedTo: "John Doe",
  status: "To Do"
};