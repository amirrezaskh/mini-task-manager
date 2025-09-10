import {
  Box,
  Button,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import TaskIcon from "@mui/icons-material/Task";
import MuiCard from "@mui/material/Card";
import { AccessTime } from "@mui/icons-material";
import { formatDate } from "../../lib/util/util";
import { useState } from "react";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

type Props = {
  task: Task;
  onTaskDeleted?: (taskId: string) => void;
};

export default function TaskCard({ task, onTaskDeleted }: Props) {
  const [status, setStatus] = useState<{
    label: string;
    color:
      | "success"
      | "warning"
      | "default"
      | "primary"
      | "secondary"
      | "error"
      | "info";
  }>({
    label: task.is_completed ? "Completed" : "Not completed",
    color: task.is_completed ? "success" : "warning",
  });

  async function toggleComplete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    task.is_completed = !task.is_completed;
    setStatus({
      label: task.is_completed ? "Completed" : "Not completed",
      color: task.is_completed ? "success" : "warning",
    });
    const userInfoStr = sessionStorage.getItem("userInfo");
    const token = userInfoStr ? JSON.parse(userInfoStr).token : "";
    const response = await fetch(`${BASE_URL}/api/tasks/${task.id}/`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (response.status === 200) {
      console.log("The status of the task was successfully changed.");
    }
  }

  async function deleteTask(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const userInfoStr = sessionStorage.getItem("userInfo");
    const token = userInfoStr ? JSON.parse(userInfoStr).token : "";
    
    const response = await fetch(`${BASE_URL}/api/tasks/${task.id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (response.status === 204) {
      console.log("Task deleted successfully");
      if (onTaskDeleted) {
        onTaskDeleted(task.id);
      }
    } else {
      console.error("Failed to delete task:", response.status);
      alert("Failed to delete task. Please try again.");
    }
  }

  const Container = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(2),
    },
    "&::before": {
      content: '""',
      display: "block",
      position: "absolute",
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

  const Card = styled(MuiCard)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(3),
    gap: theme.spacing(1),
    boxShadow:
      "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    ...theme.applyStyles("dark", {
      boxShadow:
        "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
    }),
  }));

  return (
    <Container>
      <Card elevation={3} sx={{ borderRadius: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <CardHeader
            avatar={<TaskIcon sx={{ height: 50, width: 50 }} />}
            title={task.title}
            titleTypographyProps={{
              fontWeight: "bold",
              fontSize: 20,
            }}
          ></CardHeader>
          <Box display="flex" flexDirection={"column"} gap={2} mr={2}>
            <Chip
              label={status.label}
              color={status.color}
              sx={{ borderRadius: 2, py: 2 }}
            />
            <Box display={"flex"} flexGrow={0} alignItems={"center"}>
              <AccessTime sx={{ mr: 1 }} />
              <Typography variant="body2" noWrap>
                {formatDate(task.due_date)}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ my: 2 }} />
        <CardContent
          sx={{ display: "flex", justifyContent: "space-between", pb: 2 }}
        >
          <Typography variant="body2">{task.description}</Typography>
          <Box display="flex" flexDirection="row" gap={1}>
            <Button
              size="medium"
              onClick={toggleComplete}
              variant="contained"
              sx={{ display: "flex", justifySelf: "self-end", borderRadius: 2 }}
            >
              Toggle Complete
            </Button>
            <Button
              size="medium"
              onClick={deleteTask}
              variant="contained"
              color="error"
              sx={{ display: "flex", justifySelf: "self-end", borderRadius: 2 }}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
