import { v4 as uuid } from "uuid";
import { taskArray } from "../utils/store.js";

const index = (req, res) => {
  res.send(taskArray);
};

const createTask = (req, res) => {
  const { task, description } = req.body;
  taskArray.push({ id: uuid(), task, description });
  res.status(200).send({ message: "Added Successfully" });
};

const sendTask = (req, res) => {
  const { id } = req.params;
  const task = taskArray.find((t) => t.id === id);
  if (!task) {
    return res.status(404).send({ message: "Task not found!" });
  }
  res.status(200).send(task);
};

const editTask = (req, res) => {
  const { id } = req.params;
  const { task, description } = req.body;

  const taskIdx = taskArray.findIndex((t) => t.id === id);
  if (taskIdx === -1) {
    return res.status(404).send({ message: "Task not found!" });
  }
  taskArray[taskIdx] = { ...taskArray[taskIdx], task, description };
  res.status(200).send({ message: "Updated Successfully!" });
};

const removeTask = (req, res) => {
  const { id } = req.params;

  const index = taskArray.findIndex((t) => t.id === id);
  if (index != -1) {
    taskArray.splice(index, 1);
    return res.status(200).send({ message: "Deleted Successfully!" });
  } else {
    return res.status(404).send({ message: "Task not Found!" });
  }
};

export { index, createTask, sendTask, editTask, removeTask };
