import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Divider, Grid, Tab, Typography } from "@mui/material";
import Header from "app/layouts/shared/headers/Header";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import AssetDetailTable from "./AssetDetailTable/AssetDetailTable";
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
const WarehouseWiseItemDetail = () => {
  const { state } = useLocation();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <HotoHeader />
      <Box sx={{ p: 2 }}>
        <Grid container spacing={2} mb={2}>
          {/* Left column */}
          <Grid item xs={12} md={6}>
            <Typography>
              <strong>Block :</strong> {state?.block?.name || "-"}
            </Typography>
            <Typography>
              <strong>District :</strong> {state?.district?.name || "-"}
            </Typography>
            <Typography>
              <strong>POP Type :</strong> - Block
            </Typography>
            <Typography>
              <strong>Address :</strong> {state?.district?.name || "-"}
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
              <strong>Block Code :</strong> {state?.block_id || "-"}
            </Typography>
            <Typography>
              <strong>District Code :</strong> {state?.district_id || "-"}
            </Typography>
            <Typography>
              <strong>Landmark :</strong> -
            </Typography>
            <Typography>
              <strong>Lat & Long :</strong> {state?.latitude || "-"},{" "}
              {state?.longitude || "-"}
            </Typography>
          </Grid>
        </Grid>
        <AssetDetailTable data={state?.equipments} />
      </Box>
    </>
  );
};
export default WarehouseWiseItemDetail;
