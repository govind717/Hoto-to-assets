import { useState } from "react";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";

import HotoHeader2 from "../Hoto_to_Assets/HotoHeader/HotoHeader2";
import AssetsList from "./AssetsList/AssetsList";
import InwardAssetsList from "./InwardAssetsList/InwardAssetsList";
import MaintainanceList from "./MaintenanceList";
import ReplacementList from "./Replacement";
import Transferlist from "./Transfer";


const Warehouse = () => {
  const [value, setValue] = useState("1");
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <HotoHeader2 />
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
        {/* <Box display="flex" alignItems="center" gap={2}>
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
        </Box> */}
      </Box>
      <Box sx={{ width: "100%", typography: "body1", mt: 1 }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginBottom: "10px",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {/* Left side tabs */}
              <Tab label="Assets" value="1" />
              <Tab label="Inward Assets" value="2" />
              {/* <Tab label="Warehouse" value="3" /> */}

              {/* Push next tab to the right using margin-left: auto */}
              <Tab label="Maintenance" value="4" sx={{ marginLeft: "auto" }} />
              <Tab label="Replacement" value="5" />
              <Tab label="Transfer" value="6" />
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: 0 }}>
            <AssetsList />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <InwardAssetsList />
          </TabPanel>
          {/* <TabPanel value="3" sx={{ p: 0 }}>
            <WarehouseList />
          </TabPanel> */}
          <TabPanel value="4" sx={{ p: 0 }}>
            <MaintainanceList />
          </TabPanel>
          <TabPanel value="5" sx={{ p: 0 }}>
            <ReplacementList />
          </TabPanel>
          <TabPanel value="6" sx={{ p: 0 }}>
            <Transferlist />
          </TabPanel>
        </TabContext>
      </Box>
    </Box>
  );
};

export default Warehouse;
