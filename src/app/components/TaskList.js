"use client";

import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { editTask, deleteTask } from "../store/taskSlice";

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

  const handleEditTask = (taskId) => {
    router.push(`/edit-task/${taskId}`);
  };

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleChangeState = (taskId, newState) => {
    dispatch(editTask({ id: taskId, state: newState }));
  };

  // Function to get badge styles
  const getBadgeStyles = (type, value) => {
    const styles = {
      priority: {
        Low: "bg-green-200 text-green-800",
        Medium: "bg-yellow-200 text-yellow-800",
        High: "bg-red-200 text-red-800",
      },
      state: {
        todo: "bg-blue-200 text-blue-800",
        doing: "bg-orange-200 text-orange-800",
        done: "bg-gray-200 text-gray-800",
      },
    };
    return styles[type][value] || "bg-gray-100 text-gray-600";
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Task List</h1>

      {/* Filters Section */}
      <div className="flex flex-col lg:flex-row lg:justify-between mb-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search tasks by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:w-1/3 px-4 py-2 mb-2 lg:mb-0 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Priority Filter */}
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="w-full lg:w-1/3 px-4 py-2 mb-2 lg:mb-0 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="w-full lg:w-1/3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Filter by State</option>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>

      {/* Add Task Button */}
      <button
        onClick={handleAddTask}
        className="w-full py-2 mb-6 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
      >
        Add Task
      </button>

      {/* Display filtered tasks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="p-6 border rounded-md shadow-lg bg-white flex flex-col transition-transform transform hover:scale-105 w-full"
            >
              {task.image && (
                <img
                  src={task.image}
                  alt={task.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <div className="flex-grow">
                <h2 className="text-xl font-semibold">{task.title}</h2>
                <p>{task.description}</p>
                <div className="flex items-center mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${getBadgeStyles("priority", task.priority)}`}>
                    {task.priority}
                  </span>
                  <span className={`inline-flex items-center px-2 py-1 ml-2 rounded-full text-sm font-medium ${getBadgeStyles("state", task.state)}`}>
                    {task.state}
                  </span>
                </div>

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

              {/* Edit and Delete Buttons */}
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEditTask(task.id)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteTask(task.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
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
