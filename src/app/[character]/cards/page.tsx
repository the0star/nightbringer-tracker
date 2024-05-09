"use client";
import { notFound } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import MediaCard from "@/components/Card/MediaCard";

function CardsPage({ character }: { character: string }) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [cards, setCardList] = useState<
    | {
        name: string;
        type: string;
      }[]
    | null
  >(null);

  const getCards = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("cards")
        .select("name, type")
        .contains("characters", [character])
        .order("id", { ascending: false });

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setCardList(data);
      }
    } catch (error) {
      alert("Error loading card data!");
    } finally {
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    getCards();
  }, [getCards]);

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {character}
      </Typography>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {cards &&
            cards.map((card) => (
              <Grid item xs={12} sm={6} md={4} key={card.name}>
                <MediaCard card={card.name} />
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}

export default function Page({ params }: { params: { character: string } }) {
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
    "Little D.",
  ];
  if (!characters.includes(params.character)) {
    notFound();
  }
  return <CardsPage character={params.character} />;
}
