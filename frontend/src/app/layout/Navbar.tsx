import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../../theme/ColorModelconDropdown";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function Navbar() {
  const [open, setOpen] = React.useState(false);
  const loggedIn = sessionStorage.getItem("userInfo") !== null;
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="absolute"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Box
        sx={{
          width: "100%",
          mx: "auto",
          px: 2,
          maxWidth: {
            xl: "lg",
            lg: "md",
          },
      }}>
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            <Box
              component={NavLink}
              to=""
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 3,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              <Typography
                variant="h6"
                color="textPrimary"
                sx={{
                  ml: 1,
                }}
              >
                Mini Task Manager
              </Typography>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex", } }}>
              <Button
                component={NavLink}
                to="/dashboard"
                variant="text"
                color="info"
                size="small"
              >
                Dashboard
              </Button>
              <Button
                component={NavLink}
                to="/create"
                variant="text"
                color="info"
                size="small"
              >
                Create
              </Button>
              <Button
                component={NavLink}
                to="/about"
                variant="text"
                color="info"
                size="small"
              >
                About
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            {loggedIn ? (
              <Button 
                color="primary" 
                variant="contained" 
                size="small"
                onClick={() => {
                  sessionStorage.removeItem("userInfo");
                  window.location.reload();
                }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Button component={NavLink} to='/signin' color="primary" variant="text" size="small">
                  Sign in
                </Button>
                <Button component={NavLink} to='/signup' color="primary" variant="contained" size="small">
                  Sign up
                </Button>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <Divider sx={{ my: 3 }} />
                {loggedIn ? (
                    <MenuItem>
                      <Button 
                        color="primary" 
                        variant="contained" 
                        fullWidth
                        onClick={() => {
                          sessionStorage.removeItem("userInfo");
                          window.location.reload();
                        }}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  ) : (
                    <>
                      <MenuItem>
                        <Button component={NavLink} to='/signup' color="primary" variant="contained" fullWidth>
                          Sign up
                        </Button>
                      </MenuItem>
                      <MenuItem>
                        <Button component={NavLink} to='/signin' color="primary" variant="outlined" fullWidth>
                          Sign in
                        </Button>
                      </MenuItem>
                    </>
                  )
                }
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Box>
    </AppBar>
  );
}
