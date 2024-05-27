import * as React from "react";
import Link from "next/link";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

import LoadingButton from "@mui/lab/LoadingButton";

import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

import { addCard, removeCard } from "./actions";

export default function Container({
  children,
  card,
  user,
}: {
  children: React.ReactNode;
  card: string;
  user: {
    id: string;
    cards: string[];
  } | null;
}) {
  const [isOwned, setIsOwned] = React.useState(user?.cards.includes(card));
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const manageCard = async () => {
    setIsLoading(true);
    try {
      if (isOwned) {
        await removeCard(card);
      } else {
        await addCard(card);
      }
    } catch (e) {
      console.error(e);
      return;
    }

    setIsOwned(!isOwned);
    setIsLoading(false);
  };

  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardContent>
          {children}
          <Typography variant="subtitle1">{card}</Typography>
        </CardContent>
        <CardActions>
          <LoadingButton
            size="small"
            loading={isLoading}
            onClick={user ? manageCard : handleClickOpen}
            startIcon={
              isOwned ? (
                <CheckIcon fontSize="small" />
              ) : (
                <AddIcon fontSize="small" />
              )
            }
            sx={{
              minWidth: "32px",
              "&. MuiButton-startIcon": {
                mx: 0,
              },
            }}
          />
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Add card to collection
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Please log in to use this feature.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Link href="/login" passHref>
            <Button>Login</Button>
          </Link>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
