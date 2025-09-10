import { Box } from "@mui/material";
import TaskCard from "./TaskCard";

type Props = {
  tasks: Task[];
  onTaskDeleted?: (taskId: string) => void;
}

export default function TaskList({ tasks, onTaskDeleted }: Props) {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', gap: 3}}>
        {tasks.map(task => (
            <TaskCard key={task.id} task={task} onTaskDeleted={onTaskDeleted}/>
        ))}
    </Box>
  )
}