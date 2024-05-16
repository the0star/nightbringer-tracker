import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

import Image from "@/components/Card/ImageWithFallback";

export default function MediaCard({ card }: { card: string }) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Image name={card} type="original" />
        <Typography variant="subtitle1">{card}</Typography>
      </CardContent>
      {/* <CardActions>
        <IconButton aria-label="add">
          <AddIcon fontSize="small"/>
        </IconButton>
      </CardActions> */}
    </Card>
  );
}
