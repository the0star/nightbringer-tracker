import Link from "next/link";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import { createClient } from "@/utils/supabase/server";
import LightSwitch from "@/components/LightSwitch";

async function App() {
  const supabase = createClient();
  const { data } = await supabase.auth.getSession();

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">TITLE</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Link href="/" passHref>
            <Button sx={{ color: "#fff" }}>Home</Button>
          </Link>
          <Link href="/about" passHref>
            <Button sx={{ color: "#fff" }}>About</Button>
          </Link>
        </Box>
        {data?.session ? (
          <>
            <Link href="/account" passHref>
              <Button sx={{ color: "#fff" }}>Account</Button>
            </Link>
            <form action="/auth/signout" method="post">
              <Button sx={{ color: "#fff" }} type="submit">
                Sign out
              </Button>
            </form>
          </>
        ) : (
          <Link href="/login" passHref>
            <Button sx={{ color: "#fff" }}>Login</Button>
          </Link>
        )}
        <LightSwitch />
      </Toolbar>
    </AppBar>
  );
}

export default App;
