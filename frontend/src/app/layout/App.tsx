import { Outlet } from "react-router";
import { Box, CssBaseline } from "@mui/material";
import "./styles.css";
import AppTheme from "../../theme/AppTheme";
import Navbar from "./Navbar";

export default function App() {
  return (
    <>
      <AppTheme>
        <CssBaseline enableColorScheme />
        <Navbar />
        <Box
          id="hero"
          sx={(theme) => ({
            width: '100%',
            backgroundRepeat: 'no-repeat',
            
            backgroundImage:
              'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
            ...theme.applyStyles('dark', {
              backgroundImage:
                'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
            }),
          })}
        >
          <Box
            sx={{
              maxWidth: {
                xl: "xl", // up to md → maxWidth = md
                lg: "md", // from lg up → maxWidth = lg
              },
              mx: 'auto',
              pt: { xs: 14, sm: 20 },
              pb: { xs: 8, sm: 12 },
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </AppTheme>
    </>
  );
}
