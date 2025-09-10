import { Box, Typography } from "@mui/material";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[];
  onTaskDeleted?: (taskId: string) => void;
}

export default function TaskList({ tasks, onTaskDeleted }: Props) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {tasks.length === 0 ? (
          <Typography variant="body1">No tasks available. Create a new one.</Typography>
        ) : (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} onTaskDeleted={onTaskDeleted}/>
          ))
        )}
    </Box>
  )
}