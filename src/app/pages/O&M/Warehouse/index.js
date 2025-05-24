import { useState } from "react";

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

const conditionColors = {
  "Semi-Damaged": "warning",
  Damaged: "error",
};

const WarehouseOandM = () => {
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
        <h3 style={{ fontWeight: "500", color: "#000", fontSize: "20px" }}>
          O&M-Warehouse
        </h3>
        <Box display="flex" alignItems="center" gap={2}>
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

export default WarehouseOandM;
