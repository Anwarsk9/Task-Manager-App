import { v4 as uuid } from "uuid";
export let taskArray = [
  {
    id: uuid(),
    task: "Task 1",
    description: "Description 1",
  },
  { id: uuid(), task: "Task 2", description: "Description 2" },
  { id: uuid(), task: "Task 3", description: "Description 3" },
];
