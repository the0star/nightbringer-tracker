import { ReactNode } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

export default function Container({
  children,
  card,
  user,
}: {
  children: ReactNode;
  card: string;
  user: {
    id: string;
    cards: string[];
  } | null;
}) {
  return (
    <Card variant="outlined">
      <CardContent>
        {children}
        <Typography variant="subtitle1">{card}</Typography>
      </CardContent>
      {user && (
        <CardActions>
          {user.cards.includes(card) ? (
            <>
              <IconButton
                aria-label="delete"
                onClick={() => {
                  // todo: implement
                }}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                aria-label="add"
                onClick={() => {
                  // todo: implement
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </CardActions>
      )}
    </Card>
  );
}
