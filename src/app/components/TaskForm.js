// src/app/components/TaskForm.js

"use client";

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../store/taskSlice";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const TaskForm = () => {
    const dispatch = useDispatch();
    const router = useRouter(); // Initialize router
    const [imagePreview, setImagePreview] = useState(null);

    const validationSchema = yup.object().shape({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
        priority: yup.string().required("Priority is required"),
        state: yup.string().required("State is required"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        const newTask = {
            id: uuidv4(),
            title: data.title,
            description: data.description,
            priority: data.priority,
            state: data.state,
            image: imagePreview,
        };

        dispatch(addTask(newTask));

        // Redirect to the home page after submission
        router.push("/");
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 shadow-lg rounded-lg bg-white space-y-6">
            <h1 className="text-2xl font-semibold text-gray-800 text-center">Add New Task</h1>
            
            <div className="mb-4">
                <label className="block font-medium text-gray-700">Title</label>
                <input type="text" {...register("title")} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block font-medium text-gray-700">Description</label>
                <textarea {...register("description")} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block font-medium text-gray-700">Priority</label>
                <select {...register("priority")} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select Priority</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                {errors.priority && <p className="text-red-500 text-sm">{errors.priority.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block font-medium text-gray-700">State</label>
                <select {...register("state")} className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Select State</option>
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
                {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
            </div>

            <div className="mb-4">
                <label className="block font-medium text-gray-700">Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full mt-1 text-sm text-gray-500 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100" />
                {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 h-20 w-20 object-cover rounded" />}
            </div>

            <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition">
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
