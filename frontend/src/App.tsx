import { Route, Routes } from "react-router-dom";
import Task from "./Task";
import EditTask from "./EditTask";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Task />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </>
  );
};

export default App;
