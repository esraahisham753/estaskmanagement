// src/app/components/TaskList.js

import Link from "next/link";

// inside your TaskList component, add an edit button for each task
const TaskList = () => {
    // ... (other code)

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
            {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4 shadow">
                    <h2 className="text-xl font-semibold">{task.title}</h2>
                    <p>{task.description}</p>
                    <p className="text-gray-500">{task.priority}</p>
                    <p className="text-gray-500">{task.state}</p>
                    {task.image && <img src={task.image} alt={task.title} className="w-full h-32 object-cover mt-2 rounded" />}

                    <div className="mt-4 flex justify-between">
                        <Link href={`/edit-task/${task.id}`}>
                            <button className="px-4 py-2 bg-yellow-400 text-white rounded hover:bg-yellow-500">
                                Edit
                            </button>
                        </Link>
                        <button
                            onClick={() => handleDelete(task.id)}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
