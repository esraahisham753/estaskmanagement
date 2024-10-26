"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { editTask } from "../store/taskSlice";

const TaskList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const router = useRouter();

  // Filter tasks based on search term, priority, and state
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = selectedPriority ? task.priority === selectedPriority : true;
    const matchesState = selectedState ? task.state === selectedState : true;
    return matchesSearch && matchesPriority && matchesState;
  });

  const handleAddTask = () => {
    router.push("/add-task");
  };

  const handleChangeState = (taskId, newState) => {
    dispatch(editTask({ id: taskId, state: newState }));
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task List</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Priority Filter */}
      <select
        value={selectedPriority}
        onChange={(e) => setSelectedPriority(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by Priority</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      {/* State Filter */}
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by State</option>
        <option value="todo">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
      </select>

      {/* Add Task Button */}
      <button
        onClick={handleAddTask}
        className="w-full py-2 mb-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
      >
        Add Task
      </button>

      {/* Display filtered tasks */}
      <div className="space-y-4">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border rounded-md shadow-sm bg-white flex items-start"
            >
              {task.image && (
                <img
                  src={task.image}
                  alt={task.title}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
              )}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p>{task.description}</p>
                <p className="text-sm text-gray-600">Priority: {task.priority}</p>
                <p className="text-sm text-gray-600">State: {task.state}</p>

                {/* State Change Dropdown */}
                <select
                  value={task.state}
                  onChange={(e) => handleChangeState(task.id, e.target.value)}
                  className="mt-2 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todo">To Do</option>
                  <option value="doing">Doing</option>
                  <option value="done">Done</option>
                </select>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
