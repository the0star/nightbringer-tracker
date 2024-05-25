"use client";

import React, { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { TabPanel } from "@/components/TabPanel";

import DemonCard from "@/components/Card/DemonCard";
import MemoryCard from "@/components/Card/MemoryCard";

interface Props {
  character: string;
  user: {
    id: string;
    cards: string[];
  } | null;
}

export default function CardsPage({ character, user }: Props) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [cards, setCardList] = useState<
    | {
        name: string;
        type: string;
      }[]
    | null
  >(null);

  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

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

  const demonCards = cards?.filter((card) => card.type == "Demon");
  const memoryCards = cards?.filter((card) => card.type == "Memory");

  return (
    <>
      <Typography variant="h3" gutterBottom>
        {character}
      </Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            variant="fullWidth"
            aria-label="demon/memory card tabs"
          >
            <Tab label="Demon" value="1" />
            <Tab label="Memory" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {demonCards &&
                demonCards.map((card) => (
                  <Grid item xs={12} sm={6} md={4} key={card.name}>
                    <DemonCard card={card.name} user={user} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </TabPanel>
        <TabPanel value="2">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {memoryCards &&
                memoryCards.map((card) => (
                  <Grid item xs={12} sm={4} md={3} lg={2} key={card.name}>
                    <MemoryCard card={card.name} user={user} />
                  </Grid>
                ))}
            </Grid>
          </Box>
        </TabPanel>
      </TabContext>
    </>
  );
}
