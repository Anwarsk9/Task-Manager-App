import { useEffect, useState, type ChangeEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import TaskCard from "./TaskCard";
const API_URL = import.meta.env.VITE_API_URL;

type TasksType = {
  id?: string;
  task: string;
  description: string;
};
const Task = () => {
  const [tasks, setTasks] = useState<TasksType[]>([]);

  const init = () => {
    return { task: "", description: "" };
  };
  const [formData, setFormData] = useState<TasksType>(init);
  const [reRender, setReRende] = useState<number>(0);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await toast.promise(axios.post(`${API_URL}/tasks`, formData), {
        loading: "Task Adding...",
        success: <b>Task Added!</b>,
        error: <b>Failed to add task.</b>,
      });
      setFormData({ task: "", description: "" });
      setReRende((prev) => prev + 1);
    } catch (e) {
      console.log("Error while Submitting the Data: ", e);
    }
  };

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

        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
            <input
              type="text"
              name="task"
              placeholder="Task Name"
              onChange={handleChange}
              value={formData.task}
              className={`flex-1 ${style.inpStyle}`}
              required
            />
            <button className={`bg-blue-700 text-white  ${style.btnStyle} `}>
              Add Task
            </button>
          </div>
          <input
            type="text"
            name="description"
            onChange={handleChange}
            value={formData.description}
            placeholder="Description"
            className={`mt-4 w-full py-1 ${style.inpStyle}`}
            required
          />
        </form>

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
