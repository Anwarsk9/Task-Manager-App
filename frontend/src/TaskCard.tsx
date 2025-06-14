import axios from "axios";
import React, { type ChangeEvent } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
const API_URL = import.meta.env.VITE_API_URL;

interface TaskData {
  id?: string;
  task: string;
  description: string;
}

interface TaskCardProps {
  tasks: TaskData[];
  onDelete: () => void;
  btnStyle: string;
}

const TaskCard: React.FC<TaskCardProps> = ({ tasks, onDelete, btnStyle }) => {
  const handleDelete = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const id = event.target.dataset.id;
    console.log(event.target.dataset.id);
    try {
      await toast.promise(axios.delete(`${API_URL}/tasks/${id}`), {
        loading: "Deleting...",
        success: <b>Task Deleted!</b>,
        error: <b>Failed to Delete Task.</b>,
      });
      onDelete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <h1 className="my-4 text-4xl font-bold">Task List</h1>
      <hr className="opacity-40" />
      {tasks.map((value) => {
        return (
          <div key={uuid()}>
            <div className="flex mt-4">
              <h3 className="flex-1 text-xl font-semibold">{value.task}</h3>{" "}
              <Link to={`/edit/${value.id}`} className={`${btnStyle}`}>
                Edit
              </Link>
              <form onSubmit={handleDelete} data-id={value.id}>
                <button className={`text-red-500  ${btnStyle}`}>Delete</button>
              </form>
            </div>
            <p className="text-md">{value.description}</p>
            <hr className="mt-4 opacity-30" />
          </div>
        );
      })}
    </>
  );
};

export default TaskCard;
