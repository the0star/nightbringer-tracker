import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import NextLink from "next/link";
import ProTip from "@/components/ProTip";
import Copyright from "@/components/Copyright";

// import '@/app/globals.css';

export default function Home() {
  const characters = [
    "Lucifer",
    "Mammon",
    "Leviathan",
    "Satan",
    "Asmodeus",
    "Beelzebub",
    "Belphegor",
    "Diavolo",
    "Barbatos",
    "Luke",
    "Simeon",
    "Solomon",
    "Raphael",
    "Thirteen",
    "Mephistopheles",
    // "Little D.",
  ];

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1>Welcome to Nightbringer Tracker!</h1>

        <p>
          1.
          <Link href="/login" component={NextLink}>
            Sign up or login here
          </Link>
        </p>
        <>
          2. Go to character card pages to start adding cards:
          <ul>
            {characters.map((x) => (
              <li key={x}>
                <Link href={`/${x}/cards`} component={NextLink}>
                  {x}
                </Link>
              </li>
            ))}
          </ul>
        </>
        <p>
          3. Go to{" "}
          <Link href="/me" component={NextLink}>
            my cards page
          </Link>{" "}
          to see what you have.
        </p>
      </Box>
    </Container>
  );
}
