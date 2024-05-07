"use client";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { ColorModeContext } from "@/theme/ThemeProvider";
import Cookies from "js-cookie";

function App() {
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  function onToggle() {
    const t = theme.palette.mode === "dark" ? "light" : "dark";
    Cookies.set("utheme", t);
    toggleColorMode();
    return;
  }

  const activateName = useMemo(
    () => (theme.palette.mode === "dark" ? "Light" : "Dark"),
    [theme],
  );

  return (
    <>
      <Tooltip title={`Activate ${activateName} Mode`}>
        <IconButton sx={{ ml: 1 }} onClick={onToggle} color="inherit">
          {theme.palette.mode === "dark" ? (
            <LightModeOutlined />
          ) : (
            <DarkModeOutlined />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
}

export default App;
