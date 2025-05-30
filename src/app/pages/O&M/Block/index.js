import { useEffect, useState } from "react";

import {
  Box,
  FormControl,
  MenuItem,
  Select
} from "@mui/material";
import HotoHeader from "app/Components/HotoHeader";
import MaintenanceList from "./Maintenance/MaintenanceList";
import ReplacementList from "./Replacement/ReplacementList";
import ScrapList from "./Scrap/ScrapList";
import TransferList from "./Transfer/TransferList";


const BlockOandM = () => {
  
  const [pageType, setPageType] = useState(
    sessionStorage.getItem("blockPageType") || "Maintenance"
  ); 
  
  const handleDropdownChange = (e) => {
    setPageType(e.target.value);
    sessionStorage.setItem("blockPageType", e.target.value);
  };

  useEffect(()=>{
    return ()=>{
      sessionStorage.removeItem("blockPageType");
      sessionStorage.removeItem('oandmBlockMaintenanceTab');
      sessionStorage.removeItem("oandmBlockReplacementTab");
      sessionStorage.removeItem("oandmBlockTransferTab");
    };
  },[])
  return (
    <>
      <HotoHeader/>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={0}
        mb={0}
      >
        <h3 style={{ fontWeight: "500", color: "#000", fontSize: "20px" }}>
          O&M-Block
        </h3>
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

export default BlockOandM;
