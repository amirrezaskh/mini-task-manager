import {Typography} from "@mui/material"
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function TasksPage() {
  const loggedIn = (sessionStorage.getItem("userInfo") !== null)
  const navigate = useNavigate()

  useEffect(() => {
      if (!loggedIn) {
          navigate("/signin");
      }
  }, [loggedIn, navigate])

  return (
    <>
      <Typography variant="h1">Tasks</Typography>
    </>
  )
}