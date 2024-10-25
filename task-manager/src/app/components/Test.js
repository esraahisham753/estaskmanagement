// app/components/Test.js
"use client"; // This should be at the top

import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../store/taskSlice";
import { useEffect } from "react";

const Test = () => {
    const dispatch = useDispatch();

    // Use useSelector directly to access tasks from Redux state
    const tasks = useSelector((state) => state.tasks.tasks);

    useEffect(() => {
        // Dispatch the action to add a task
        dispatch(addTask({ id: '1', title: "test task", image: "", description: "", priority: "Low", state: "todo" }));
    }, [dispatch]); // Add dispatch to dependencies array

    return (
        <div>
            {tasks.length > 0 ? (
                <h3>{tasks[0].title}</h3>
            ) : (
                <h3>No tasks available</h3>
            )}
        </div>
    );
};

export default Test;
