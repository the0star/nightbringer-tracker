"use client";

import { useState } from "react";
import Link from "next/link";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { login } from "../actions";

export default function LoginView({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [showPassword, setShowPassword] = useState(false);
  const renderForm = (
    <form>
      <Stack spacing={3}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          type="email"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          id="password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          formAction={login}
        >
          Login
        </Button>
      </Stack>
    </form>
  );

  return (
    <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
      <Box
        sx={{
          p: 5,
          width: 1,
          maxWidth: 420,
        }}
      >
        <Typography variant="h4">Login</Typography>

        <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
          Don’t have an account? <Link href="/signup">Sign up</Link>
        </Typography>

        {renderForm}

        {searchParams?.message && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {searchParams.message}
          </Alert>
        )}
      </Box>
    </Stack>
  );
}
