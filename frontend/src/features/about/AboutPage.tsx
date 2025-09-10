import { Box, Card, CardContent, Chip, Container, Divider, Stack, Typography } from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        About Mini Task Manager
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Overview
          </Typography>
          <Typography variant="body1" paragraph>
            Mini Task Manager is a modern, full-stack web application designed to help users organize 
            and manage their daily tasks efficiently. The application provides a clean, intuitive interface 
            for creating, viewing, updating, and deleting tasks with due date tracking and completion status.
          </Typography>
          
          <Typography variant="body1" paragraph>
            Built with modern web technologies, this application demonstrates best practices in full-stack 
            development, including secure authentication, RESTful API design, responsive UI components, 
            and efficient state management.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Key Features
          </Typography>
          <Box component="ul" sx={{ pl: 2 }}>
            <Typography component="li" variant="body1">User authentication with secure token-based login</Typography>
            <Typography component="li" variant="body1">Create, read, update, and delete tasks (CRUD operations)</Typography>
            <Typography component="li" variant="body1">Responsive design for desktop and mobile devices</Typography>
            <Typography component="li" variant="body1">Dark and light theme support</Typography>
          </Box>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" gutterBottom>
            Technology Stack
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Backend
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              <Chip label="Django" color="primary" />
              <Chip label="Django REST Framework" color="primary" />
              <Chip label="SQLite" color="primary" />
              <Chip label="Token Authentication" color="primary" />
            </Stack>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" component="h3" gutterBottom>
              Frontend
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
              <Chip label="React" color="secondary" />
              <Chip label="TypeScript" color="secondary" />
              <Chip label="Material-UI (MUI)" color="secondary" />
              <Chip label="React Router" color="secondary" />
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}