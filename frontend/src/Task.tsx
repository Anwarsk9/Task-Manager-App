import { useEffect, useState } from "react";
import axios from "axios";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
const API_URL = import.meta.env.VITE_API_URL;

type TasksType = {
  id?: string;
  task: string;
  description: string;
};
const Task = () => {
  const [tasks, setTasks] = useState<TasksType[]>([]);

  const [reRender, setReRende] = useState<number>(0);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get<TasksType[]>(`${API_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [reRender]);

  const triggerRefresh = () => {
    setReRende((prev) => prev + 1);
  };
  const style = {
    btnStyle:
      "mx-2 px-4 py-1 font-bold  border-1 border-gray-500 rounded-sm hover:cursor-pointer",
    inpStyle: "px-2 border-2 border-zinc-400 rounded-md",
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-2xl px-6">
        <h1 className="mb-4 text-4xl font-bold">Add New Task</h1>

        <TaskForm onTaskAdded={triggerRefresh} style={style} />

        <TaskCard
          tasks={tasks}
          onDelete={triggerRefresh}
          btnStyle={style.btnStyle}
        />
      </div>
    </div>
  );
};

export default Task;
