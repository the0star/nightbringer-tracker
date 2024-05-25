import Image from "@/components/Card/ImageWithFallback";
import CardContainer from "./CardContainer";

export default function MemoryCard({
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
      <Image name={card} type="original" />
    </CardContainer>
  );
}
