import axios from "axios";
import React, { useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

type TasksType = {
  id?: string;
  task: string;
  description: string;
};
interface TaskFormProps {
  onTaskAdded: () => void;
  style: { inpStyle: string; btnStyle: string };
}
const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded, style }) => {
  const [formData, setFormData] = useState<TasksType>({
    task: "",
    description: "",
  });

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
      onTaskAdded();
    } catch (e) {
      console.log("Error while Submitting the Data: ", e);
    }
  };

  return (
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
  );
};

export default TaskForm;
