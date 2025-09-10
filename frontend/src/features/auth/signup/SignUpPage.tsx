import { Box, Button, FormControl, FormLabel, Stack, styled, TextField, Typography } from "@mui/material";
import MuiCard from '@mui/material/Card';
import { useNavigate } from "react-router";
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export default function SignUpPage() {
  const navigate = useNavigate();

  async function handleSubmit(e: { preventDefault: () => void; }) {
    e.preventDefault();

    const username = document.getElementById('username') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    const requestData = {
      email: email.value,
      username: username.value,
      password: password.value
    };

    console.log("Sending signup request with data:", requestData);
    console.log("Request URL:", `${BASE_URL}/api/auth/signup/`);

    try {
      const response = await fetch(`${BASE_URL}/api/auth/signup/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      const responseData = await response.json();
      console.log("Response data:", responseData);

      if (response.status === 201) {
        console.log("Signup successful, navigating to signin");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Network or parsing error:", error);
      alert(`Error: ${error}`);
    }
  }

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

  const SignUpContainer = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing(4),
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
  return (
    <>
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                autoComplete="username"
                name="username"
                required
                fullWidth
                id="username"
                placeholder="You"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                autoComplete="email"
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
            >
              Sign up
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
