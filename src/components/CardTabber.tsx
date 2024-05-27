import * as React from "react";

import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import { TabPanel } from "@/components/TabPanel";

export default function Tabber({
  demon,
  memory,
}: {
  demon: React.JSX.Element;
  memory: React.JSX.Element;
}) {
  const [value, setValue] = React.useState("1");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
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
        <Box sx={{ flexGrow: 1 }}>{demon}</Box>
      </TabPanel>
      <TabPanel value="2">
        <Box sx={{ flexGrow: 1 }}>{memory}</Box>
      </TabPanel>
    </TabContext>
  );
}
