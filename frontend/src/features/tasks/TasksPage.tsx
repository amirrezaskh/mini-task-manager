import {Typography} from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TaskList from "./TaskList";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  console.log(tasks);
  const loggedIn = (sessionStorage.getItem("userInfo") !== null)
  const navigate = useNavigate()

  const handleTaskDeleted = (taskId: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };
  
  useEffect(() => {
      if (!loggedIn) {
          navigate("/signin");
      }
  }, [loggedIn, navigate])

  useEffect(() => {
    (async () => {
      const userInfoStr = sessionStorage.getItem("userInfo");
      const token = userInfoStr ? JSON.parse(userInfoStr).token : "";
      const response = await fetch(`${BASE_URL}/api/tasks/`,{
          method: "GET",
          headers: {
              "Authorization": `Token ${token}`,
              "Content-Type": "application/json"
          }
      });
      const data = await response.json()
      setTasks(data);
    })();
  }, [])

  return (
    <>
      <Typography variant="h1">Tasks</Typography>
      <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted}/>
    </>
  )
}