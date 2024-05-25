import Box from "@mui/material/Box";
import Image from "@/components/Card/ImageWithFallback";
import CardContainer from "./CardContainer";

export default function DemonCard({
  card,
  user,
}: {
  card: string;
  user: {
    id: string;
    cards: string[];
  } | null;
}) {
  return (
    <CardContainer card={card} user={user}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ width: 1 / 2, pr: 1 / 2 }}>
          <Image name={card} type="original" />
        </Box>
        <Box sx={{ width: 1 / 2, pl: 1 / 2 }}>
          <Image name={card} type="bloomed" />
        </Box>
      </Box>
    </CardContainer>
  );
}
