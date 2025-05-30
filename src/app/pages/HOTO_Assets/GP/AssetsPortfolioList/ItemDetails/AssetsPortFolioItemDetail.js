import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Divider, Grid, Tab, Typography } from "@mui/material";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import TranferTable from "./TranferTable/TranferTable";
import MaintenanceTable from "./MaintenanceTable/MaintenanceTable";
import ReplacementTable from "./ReplacementTable/ReplacementTable";
import DynamicQuestions from "./Components/DynamicQuestions";
import HotoHeader from "app/Components/HotoHeader";

const patternBoxStyle = {
  width: "100%",
  minHeight: "36px",
  maxHeight: "100px",
  display: "flex",
  alignItems: "center",
  paddingX: 1,
  paddingY: 0.5,
  border: "1px solid #aaa",
  borderRadius: "4px",
  backgroundColor: "transparent",
  color: "black",
  overflow: "auto",
  whiteSpace: "pre-wrap",
  wordBreak: "break-word",
};
const GpAssetsDetail = () => {
  const { state } = useLocation();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <HotoHeader />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2}>
          {/* Left column */}
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>GP :</strong>{" "}
              {state?.equipment_details?.location_name || "-"}
            </Typography>
            <Typography>
              <strong>Block :</strong>{" "}
              {state?.equipment_details?.block?.name || "-"}
            </Typography>
            <Typography>
              <strong>District :</strong>{" "}
              {state?.equipment_details?.district?.name || "-"}
            </Typography>
            <Typography>
              <strong>POP Type :</strong> - Block
            </Typography>
            <Typography>
              <strong>Address :</strong>{" "}
              {state?.equipment_details?.district?.name || "-"}
            </Typography>
          </Grid>

          {/* Vertical Divider */}
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", md: "block" } }}
          />

          {/* Right column */}
          <Grid item xs={12} md={5}>
            <Typography>
              <strong>GP Code :</strong>{" "}
              {state?.equipment_details?.location_code || "-"}
            </Typography>
            <Typography>
              <strong>Block Code :</strong>{" "}
              {state?.equipment_details?.block?.code || "-"}
            </Typography>
            <Typography>
              <strong>District Code :</strong>{" "}
              {state?.equipment_details?.district?.code || "-"}
            </Typography>
            <Typography>
              <strong>Landmark :</strong> -
            </Typography>
            <Typography>
              <strong>Lat & Long :</strong>{" "}
              {state?.equipment_details?.latitude || "-"},{" "}
              {state?.equipment_details?.longitude || "-"}
            </Typography>
          </Grid>
        </Grid>
        <DynamicQuestions data={state} />
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
              <Tab label="Transfer" value="1" />
              <Tab label="Maintenance" value="2" />
              <Tab label="Replacement" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1" sx={{ p: 0 }}>
            <TranferTable row={state} />
          </TabPanel>
          <TabPanel value="2" sx={{ p: 0 }}>
            <MaintenanceTable row={state} />
          </TabPanel>
          <TabPanel value="3" sx={{ p: 0 }}>
            <ReplacementTable row={state} />
          </TabPanel>
        </TabContext>
      </Box>
    </>
  );
};
export default GpAssetsDetail;
