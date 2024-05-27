"use client";
import styles from "./styles.module.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Tabber from "@/components/CardTabber";

export default function Page({
  cards,
  ownedCards,
}: {
  cards:
    | {
        name: string;
        type: string;
      }[]
    | null;
  ownedCards: string[];
}) {
  const demonCards = cards?.filter((card) => card.type == "Demon");
  const memoryCards = cards?.filter((card) => card.type == "Memory");

  return (
    <>
      <h1>My Cards</h1>
      <Tabber
        demon={
          <Grid container spacing={1}>
            {demonCards ? (
              demonCards.map((card, i) => (
                <Grid item xs={3} sm={2} md={1} key={i}>
                  <Image
                    src={`https://obeymewiki.com/wiki/Special:Redirect/file/${card.name}_Mini.png`}
                    alt={card.name}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    width={1}
                    height={1}
                    className={
                      ownedCards.includes(card.name) ? "" : styles.notowned
                    }
                  />
                </Grid>
              ))
            ) : (
              <>No cards to display.</>
            )}
          </Grid>
        }
        memory={
          <Grid container spacing={1}>
            {memoryCards ? (
              memoryCards.map((card, i) => (
                <Grid item xs={3} sm={2} md={1} key={i}>
                  <Image
                    src={`https://obeymewiki.com/wiki/Special:Redirect/file/${card.name}_Mini.png`}
                    alt={card.name}
                    sizes="100vw"
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                    width={1}
                    height={1}
                    className={
                      ownedCards.includes(card.name) ? "" : styles.notowned
                    }
                  />
                </Grid>
              ))
            ) : (
              <>No cards to display.</>
            )}
          </Grid>
        }
      />
    </>
  );
}
