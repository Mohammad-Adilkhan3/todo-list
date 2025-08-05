'use client'
import React, { useState } from "react";

interface Task {
  id: number;
  title: string;
  isEditing: boolean;
}

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState<string>("");

  const addTask = () => {
    if (input.trim() === "") return;
    const newTask: Task = {
      id: Date.now(),
      title: input,
      isEditing: false,
    };
    setTasks((prev) => [...prev, newTask]);
    setInput("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEdit = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : task
      )
    );
  };

  const updateTask = (id: number, newTitle: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, title: newTitle.trim(), isEditing: false }
          : task
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900">📝 To-Do List</h1>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="text"
            className="flex-1 px-3 py-2 border rounded-md text-gray-700"
            placeholder="Enter a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            onClick={addTask}
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-50 p-3 rounded-md border"
            >
              {task.isEditing ? (
                <input
                  type="text"
                  defaultValue={task.title}
                  onBlur={(e) => updateTask(task.id, e.target.value)}
                  autoFocus
                  className="flex-1 px-2 py-1 border rounded text-gray-800"
                />
              ) : (
                <span className="flex-1 text-gray-800">{task.title}</span>
              )}

              <div className="flex gap-2 justify-end sm:justify-start">
                {!task.isEditing && (
                  <button
                    onClick={() => startEdit(task.id)}
                    className="text-yellow-600 hover:underline"
                  >
                    Edit
                  </button>
                )}
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        {tasks.length === 0 && (
          <p className="text-center text-gray-400 mt-4">No tasks yet.</p>
        )}
      </div>
    </div>
  );
};

export default TodoList;
