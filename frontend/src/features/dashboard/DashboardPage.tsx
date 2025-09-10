import {Box, Button, Typography} from "@mui/material"
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import TaskList from "../tasks/TaskList";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;


export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
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
      <Box display='flex' flexDirection='row' justifyContent='space-between' alignItems='center' mb={5}>
        <Typography variant="h2">Dashboard</Typography>
        <Button component={Link} to="/create" size="medium" variant="contained">Create Task</Button>
      </Box>
      
      <TaskList tasks={tasks} onTaskDeleted={handleTaskDeleted}/>
    </>
  )
}