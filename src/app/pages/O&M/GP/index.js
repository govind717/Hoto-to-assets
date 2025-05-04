import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import HotoHeader from "app/pages/Hoto_to_Assets/HotoHeader";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";

import {
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Box,

  InputAdornment,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import ReplacementList from "./Replacement/ReplacementList";
import TransferList from "./Transfer/TransferList";
import ScrapList from "./Scrap/ScrapList";
import MaintenanceList from "./Maintenance/MaintenanceList";

const conditionColors = {
  "Semi-Damaged": "warning",
  Damaged: "error",
};

const GPOandM = () => {
  const [pageType, setPageType] = useState("Maintenance");
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const handleDropdownChange = (e) => setPageType(e.target.value);
  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  return (
    <>
    <HotoHeader />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={0}
        mb={0}
      >
        <h3 style={{ fontWeight: "500", color: "#000",fontSize:"20px" }}>O&M-GP</h3>
        <Box display="flex" alignItems="center" gap={2}>
          {/* <TextField
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
          /> */}

          <FormControl size="small" sx={{ minWidth: 160 }}>
            <Select
              displayEmpty
              value={pageType}
              onChange={handleDropdownChange}
              renderValue={(selected) => {
                return selected || "Select Page";
              }}
            >
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Replacement">Replacement</MenuItem>
              <MenuItem value="Transfer">Transfer</MenuItem>
              {/* <MenuItem value="Scrap">Scrap</MenuItem> */}
            </Select>
          </FormControl>

          {/* <Button
            variant="outlined"
            sx={{
              borderColor: "#B0BAC9",
              padding: "6px 20px",
              color: "#000",
              borderRadius: "5px",
            }}
          >
            <CloudDownloadOutlinedIcon sx={{ mr: "10px" }} /> Export
          </Button> */}
        </Box>
      </Box>
      {pageType === "Maintenance" && <MaintenanceList />}
      {pageType === "Replacement" && <ReplacementList />}
      {pageType === "Transfer" && <TransferList />}
      {pageType === "Scrap" && <ScrapList />}
    </>
  );
};

export default GPOandM;
