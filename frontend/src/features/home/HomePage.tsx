import { Typography } from "@mui/material"

export default function HomePage() {
  return (
    <>
      <Typography variant="h2" mb={10}> Welcome to the Mini Task Manager</Typography>
      <Typography fontSize={25}>After logging in, please head to the dashboard for task operations.</Typography>
    </>
  )
}