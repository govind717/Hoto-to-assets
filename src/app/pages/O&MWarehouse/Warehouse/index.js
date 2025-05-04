import React, { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import HotoHeader from "app/pages/Hoto_to_Assets/HotoHeader";
import { Button, InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import DailyStockList from "./DailyStockList/DailyStockList";
import StockList from "./StockList/StockList";
import VirtualStockList from "./VirtualStockList/VirtualStockList";

const OandMWarehouse = () => {
  const [value, setValue] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <HotoHeader />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={0}
        mb={0}
      >
        <h3 style={{ fontWeight: "500", color: "#000", fontSize: "20px" }}>
          Warehouse
        </h3>
        <Box display="flex" alignItems="center" gap={2}>
          <TextField
            id="search"
            type="search"
            label="Search"
            value={searchTerm}
            size="small"
            onChange={(e) => {
              setSearchTerm(e.target.value);
              // your dispatch logic
            }}
            sx={{ width: 300 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ cursor: "pointer" }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="outlined"
            sx={{
              borderColor: "#B0BAC9",
              padding: "6px 20px",
              color: "#000",
              borderRadius: "5px",
            }}
          >
            <CloudDownloadOutlinedIcon sx={{ mr: "10px" }} /> Export
          </Button>
        </Box>
      </Box>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginBottom: "10px",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Daily Log" value="1" />
              <Tab label="Stock" value="2" />
              <Tab label="Virtual Stock" value="3" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <DailyStockList />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <StockList />
          </TabPanel>
          <TabPanel value="3" sx={{ p: 0 }}>
            <VirtualStockList />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default OandMWarehouse;
