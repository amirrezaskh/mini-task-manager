import { Box, Button, FormControl, FormLabel, Stack, styled, TextField, Typography } from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import MuiCard from '@mui/material/Card';
import { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router";
import { Dayjs } from 'dayjs';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const Container = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function TaskForm() {
  const [task, changeTask] = useReducer(
    (task, e) => ({
      ...task,
      [e.target.name]: e.target.value
    }), {
      title: "",
      description: ""
    }
  )
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const loggedIn = (sessionStorage.getItem("userInfo") !== null)
  const navigate = useNavigate()

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();

    const formattedDueDate = dueDate ? dueDate.format('YYYY-MM-DD HH:mm:ss') : null;

    const requestData = {
      title: task.title,
      description: task.description,
      due_date: formattedDueDate,
      is_completed: false
    };

    const userInfoStr = sessionStorage.getItem("userInfo");
    const token = userInfoStr ? JSON.parse(userInfoStr).token : "";
    
    const response = await fetch(`${BASE_URL}/api/tasks/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Token ${token}`
        },
        body: JSON.stringify(requestData),
    });

    if (response.status === 201) {
      console.log("Task created successfully");
      navigate("/dashboard");
    }
  }

  useEffect(() => {
      if (!loggedIn) {
        navigate("/signin");
      }
  }, [loggedIn, navigate])

  return (
    <>
      <Container direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h2"
            variant="h5"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Create Task
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: 2,
              width: "100%",
              overflow: 'visible',
            }}
          >
            <FormControl>
              <FormLabel htmlFor="title ">Title</FormLabel>
              <TextField
                value={task.title}
                autoComplete="title"
                name="title"
                required
                fullWidth
                id="title"
                placeholder="Task 1"
                onChange={changeTask}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextField
                value={task.description}
                autoComplete="description"
                name="description"
                required
                fullWidth
                multiline
                rows={5}
                maxRows={10}
                onChange={changeTask}
                id="description"
                placeholder="Enter task description..."
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: 'auto',
                    alignItems: 'flex-start',
                  },
                  '& .MuiOutlinedInput-input': {
                    resize: 'vertical',
                  }
                }}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="due_date">Due Date</FormLabel>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select date & time"
                  value={dueDate}
                  onChange={(newValue) => setDueDate(newValue)}
                  sx={{ width: '100%' }}
                />
              </LocalizationProvider>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Create Task
            </Button>
          </Box>
        </Card>
      </Container>
    </>
  )
}