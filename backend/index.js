import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  createTask,
  editTask,
  index,
  removeTask,
  sendTask,
} from "./controllers/task.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/tasks", index);

app.post("/tasks", createTask);

app.get("/tasks/:id", sendTask);

app.put("/tasks/:id", editTask);

app.delete("/tasks/:id", removeTask);

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Internal Error!" } = err;
  res.status(statusCode).json({ success: false, message });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
