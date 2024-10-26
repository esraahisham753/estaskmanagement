"use client"; // Make sure this is a client component

import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../store/taskSlice"; // Adjust the path if necessary
import { useRouter } from "next/navigation";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleEdit = (taskId) => {
    router.push(`/edit-task/${taskId}`); // Navigate to edit task page
  };

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId)); // Delete task from Redux store
  };

  const handleAddTask = () => {
    router.push("/add-task"); // Navigate to add task page
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Task List</h2>
      <button 
        onClick={handleAddTask} 
        className="bg-green-500 text-white py-2 px-4 rounded mb-4 hover:bg-green-600"
      >
        Add Task
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div key={task.id} className="border p-4 rounded shadow">
            <img src={task.image} alt={task.title} className="w-full h-32 object-cover mb-2" />
            <h3 className="text-xl font-semibold">{task.title}</h3>
            <p>{task.description}</p>
            <p className="font-bold">Priority: {task.priority}</p>
            <p className={`font-bold ${task.state === 'done' ? 'text-green-500' : task.state === 'doing' ? 'text-yellow-500' : 'text-red-500'}`}>
              State: {task.state}
            </p>
            <div className="mt-4 flex justify-between">
              <button 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" 
                onClick={() => handleEdit(task.id)}
              >
                Edit
              </button>
              <button 
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600" 
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
