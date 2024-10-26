"use client";

import TaskList from "./components/TaskList";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-4xl font-bold mb-8">Task Management App</h1>
            <TaskList />
        </main>
    );
}
