"use client";

import TaskForm from "../components/TaskForm";

const AddTaskPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold text-center mb-6">Add New Task</h1>
            <TaskForm />
        </div>
    );
};

export default AddTaskPage;
