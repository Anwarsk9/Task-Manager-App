import axios from "axios";
import { useEffect, useState, type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

type TasksType = {
  id?: string;
  task: string;
  description: string;
};

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fecthData = async () => {
      try {
        const res = await axios.get(`${API_URL}/tasks/${id}`);
        setFormData(init(res.data.task, res.data.description));
      } catch (err) {
        console.error(err);
      }
    };
    fecthData();
  }, []);

  const init = (t = "", d = "") => {
    return { task: t, description: d };
  };
  const [formData, setFormData] = useState<TasksType>(init);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await toast.promise(
        axios.put(`${API_URL}/tasks/${id}`, formData),
        {
          loading: "Updating Task!",
          success: <b>Task updated Successfully!</b>,
          error: <b>Failed to update the Task!</b>,
        }
      );
      if (res.status === 200) {
        navigate("/");
      }
    } catch (e) {
      console.log("Error while Submitting the Data: ", e);
    }
  };

  const style = {
    btnStyle:
      "mx-2 px-4 py-1 font-bold  border-1 border-gray-500 rounded-sm hover:cursor-pointer",
    inpStyle: "px-2 border-2 border-zinc-400 rounded-md",
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-2xl px-6">
        <h1 className="mb-4 text-4xl font-bold">Edit Task: </h1>

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
            <button className={`bg-blue-700 text-white ${style.btnStyle} `}>
              Update
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
      </div>
    </div>
  );
};

export default EditTask;
