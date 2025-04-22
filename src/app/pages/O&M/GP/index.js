import React, { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SearchIcon from "@mui/icons-material/Search";
import HotoHeader from "app/pages/Hoto_to_Assets/HotoHeader";
import RectificationList from "./Rectification/RectificationList";
import {
  Container,
  Tabs,
  Tab,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  InputAdornment,
} from "@mui/material";
import Div from "@jumbo/shared/Div";
import ReplacementList from "./Replacement/ReplacementList";
import TransferList from "./Transfer/TransferList";
import ScrapList from "./Scrap/ScrapList";

const conditionColors = {
  "Semi-Damaged": "warning",
  Damaged: "error",
};

const GPOandM = () => {
  const [pageType, setPageType] = useState("Rectification");
  const [tabIndex, setTabIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const handleDropdownChange = (e) => setPageType(e.target.value);
  const handleTabChange = (_, newValue) => setTabIndex(newValue);

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={0}
        mb={0}
      >
        <h2>O&M</h2>
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

<FormControl size="small" sx={{ minWidth: 160 }}>
  <Select
    displayEmpty
    value={pageType}
    onChange={handleDropdownChange}
    renderValue={(selected) => {
      return selected || "Select Page";
    }}
  >
    <MenuItem value="Rectification">Rectification</MenuItem>
    <MenuItem value="Replacement">Replacement</MenuItem>
    <MenuItem value="Transfer">Transfer</MenuItem>
    <MenuItem value="Scrap">Scrap</MenuItem>
  </Select>
</FormControl>


          <Button variant="outlined" sx={{borderColor : "#B0BAC9", padding : "6px 20px" , color : "#000" , borderRadius : "5px"}} >
            Export
          </Button>
        </Box>
      </Box>
      {pageType==="Rectification" && 
        <RectificationList/>
      }
      {pageType==="Replacement" && 
        <ReplacementList/>
      }
      {pageType==="Transfer" && 
        <TransferList/>
      }
      {pageType==="Scrap" && 
        <ScrapList/>
      }
    </>
  );
};

export default GPOandM;
