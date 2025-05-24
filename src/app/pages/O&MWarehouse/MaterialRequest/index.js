import { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import SearchIcon from "@mui/icons-material/Search";
import { Button, InputAdornment, TextField } from "@mui/material";
import HotoHeader from "app/Components/HotoHeader";
import OpenRequestList from "./OpenRequestList/OpenRequestList";
import RequestLogList from "./RequestLogList/RequestLogList";

const OandMMaterialRequest = () => {
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
          Material Request
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
              <Tab label="Open Request" value="1" />
              <Tab label="Request Log" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ p: 0 }}>
            <OpenRequestList />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <RequestLogList />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default OandMMaterialRequest;
