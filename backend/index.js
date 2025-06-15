import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import taskController from "./controllers/task.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//all route handlers
app.get("/tasks", taskController.index);
app.post("/tasks", taskController.createTask);
app.get("/tasks/:id", taskController.sendTask);
app.put("/tasks/:id", taskController.editTask);
app.delete("/tasks/:id", taskController.removeTask);

//global error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Internal Error!" } = err;
  res.status(statusCode).json({ success: false, message });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
