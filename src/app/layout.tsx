import * as React from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { cookies } from "next/headers";

import { Box, Container } from "@mui/material";

import ThemeProvider from "@/theme/ThemeProvider";
import AppBar from "@/components/AppBar";

export default function RootLayout(props: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const theme = cookieStore.get("utheme")?.value === "light" ? "light" : "dark";

  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider value={theme}>
            <AppBar />
            <Container maxWidth="lg">
              <Box
                sx={{
                  my: 4,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {props.children}
              </Box>
            </Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
