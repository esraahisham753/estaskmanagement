"use client";

import TaskForm from "../../components/TaskForm";
import { useParams } from "next/navigation";

const EditTaskPage = () => {
    const { id } = useParams();

    return (
        <div className="container mx-auto p-4">
            <TaskForm taskId={id} />
        </div>
    );
};

export default EditTaskPage;
