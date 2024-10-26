import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
    tasks: []
};

const taskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTask: (state, action) => {
            const newTask = { id: uuidv4(), ...action.payload };
            state.tasks.push(newTask);
        },
        editTask: (state, action) => {
            const { id, updatedTask } = action.payload;
            const existingTask = state.tasks.find((task) => task.id === id);
            if (existingTask) {
                Object.assign(existingTask, updatedTask);
            }
        },
        deleteTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        updateTaskState: (state, action) => {
            const { id, newState } = action.payload;
            const existingTask = state.tasks.find((task) => task.id === id);
            if (existingTask) {
                existingTask.state = newState;
            }
        }
    }
});

// Export actions for use in components
export const { addTask, editTask, deleteTask, updateTaskState } = taskSlice.actions;

// Export the reducer to include in the store
export default taskSlice.reducer;
