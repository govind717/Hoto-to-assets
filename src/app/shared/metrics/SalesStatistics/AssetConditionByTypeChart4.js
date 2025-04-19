import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

// Sample Data Structure with GP data
const districtData = {
  Meerut: {
    Block1: {
      Khanpur: [
        { type: "RACK", Robust: 5, Damaged: 2, "Semi-Damaged": 3, Missing: 0 },
        { type: "CCU", Robust: 6, Damaged: 1, "Semi-Damaged": 2, Missing: 1 },
        { type: "SMPS", Robust: 4, Damaged: 3, "Semi-Damaged": 2, Missing: 1 },
        { type: "SPLITTER", Robust: 5, Damaged: 0, "Semi-Damaged": 4, Missing: 1 },
        { type: "OLT", Robust: 8, Damaged: 1, "Semi-Damaged": 0, Missing: 1 },
        { type: "SFP", Robust: 7, Damaged: 2, "Semi-Damaged": 1, Missing: 0 },
        { type: "FDMS", Robust: 6, Damaged: 1, "Semi-Damaged": 2, Missing: 1 },
        { type: "CABLE", Robust: 4, Damaged: 2, "Semi-Damaged": 3, Missing: 1 },
        { type: "SOLAR", Robust: 3, Damaged: 3, "Semi-Damaged": 3, Missing: 1 },
        { type: "UPS", Robust: 5, Damaged: 1, "Semi-Damaged": 4, Missing: 0 },
      ],
      Baroda: [
        { type: "RACK", Robust: 4, Damaged: 1, "Semi-Damaged": 3, Missing: 2 },
        { type: "CCU", Robust: 7, Damaged: 0, "Semi-Damaged": 1, Missing: 1 },
        { type: "SMPS", Robust: 5, Damaged: 2, "Semi-Damaged": 2, Missing: 2 },
        { type: "SPLITTER", Robust: 6, Damaged: 3, "Semi-Damaged": 1, Missing: 0 },
        { type: "OLT", Robust: 9, Damaged: 0, "Semi-Damaged": 1, Missing: 0 },
        { type: "SFP", Robust: 8, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
        { type: "FDMS", Robust: 5, Damaged: 3, "Semi-Damaged": 2, Missing: 0 },
        { type: "CABLE", Robust: 4, Damaged: 2, "Semi-Damaged": 1, Missing: 1 },
        { type: "SOLAR", Robust: 6, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
        { type: "UPS", Robust: 7, Damaged: 0, "Semi-Damaged": 2, Missing: 1 },
      ],
    },
    Block2: {
      Bahadurpur: [
        { type: "RACK", Robust: 4, Damaged: 1, "Semi-Damaged": 2, Missing: 3 },
        { type: "CCU", Robust: 6, Damaged: 0, "Semi-Damaged": 4, Missing: 2 },
        { type: "SMPS", Robust: 5, Damaged: 2, "Semi-Damaged": 1, Missing: 3 },
        { type: "SPLITTER", Robust: 3, Damaged: 3, "Semi-Damaged": 2, Missing: 2 },
        { type: "OLT", Robust: 8, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
        { type: "SFP", Robust: 7, Damaged: 1, "Semi-Damaged": 3, Missing: 1 },
        { type: "FDMS", Robust: 4, Damaged: 2, "Semi-Damaged": 3, Missing: 0 },
        { type: "CABLE", Robust: 9, Damaged: 0, "Semi-Damaged": 1, Missing: 0 },
        { type: "SOLAR", Robust: 6, Damaged: 1, "Semi-Damaged": 3, Missing: 0 },
        { type: "UPS", Robust: 5, Damaged: 2, "Semi-Damaged": 1, Missing: 2 },
      ],
    },
  },
  Ghaziabad: {
    Block1: {
      Bawana: [
        { type: "RACK", Robust: 6, Damaged: 1, "Semi-Damaged": 3, Missing: 0 },
        { type: "CCU", Robust: 7, Damaged: 2, "Semi-Damaged": 1, Missing: 0 },
        { type: "SMPS", Robust: 5, Damaged: 3, "Semi-Damaged": 2, Missing: 1 },
        { type: "SPLITTER", Robust: 6, Damaged: 0, "Semi-Damaged": 3, Missing: 1 },
        { type: "OLT", Robust: 8, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
        { type: "SFP", Robust: 7, Damaged: 2, "Semi-Damaged": 2, Missing: 1 },
        { type: "FDMS", Robust: 5, Damaged: 3, "Semi-Damaged": 2, Missing: 1 },
        { type: "CABLE", Robust: 4, Damaged: 1, "Semi-Damaged": 4, Missing: 1 },
        { type: "SOLAR", Robust: 3, Damaged: 2, "Semi-Damaged": 3, Missing: 0 },
        { type: "UPS", Robust: 6, Damaged: 2, "Semi-Damaged": 1, Missing: 1 },
      ],
      Abupur: [
        { type: "RACK", Robust: 4, Damaged: 1, "Semi-Damaged": 3, Missing: 2 },
        { type: "CCU", Robust: 7, Damaged: 0, "Semi-Damaged": 1, Missing: 1 },
        { type: "SMPS", Robust: 5, Damaged: 2, "Semi-Damaged": 2, Missing: 2 },
        { type: "SPLITTER", Robust: 6, Damaged: 3, "Semi-Damaged": 1, Missing: 0 },
        { type: "OLT", Robust: 9, Damaged: 0, "Semi-Damaged": 1, Missing: 0 },
        { type: "SFP", Robust: 8, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
        { type: "FDMS", Robust: 5, Damaged: 3, "Semi-Damaged": 2, Missing: 0 },
        { type: "CABLE", Robust: 4, Damaged: 2, "Semi-Damaged": 1, Missing: 1 },
        { type: "SOLAR", Robust: 6, Damaged: 1, "Semi-Damaged": 2, Missing: 0 },
        { type: "UPS", Robust: 7, Damaged: 0, "Semi-Damaged": 2, Missing: 1 },
      ],
    },
  },
};



const CustomLegend = () => (
  <Box display="flex" justifyContent="center" gap={3} mt={1.5} flexWrap="wrap">
    {[
      { name: "Robust", color: "#22CAAD" },
      { name: "Damaged", color: "#F55757" },
      { name: "Semi-Damaged", color: "#FDCF2A" },
      { name: "Missing", color: "#E78F5D" },
    ].map((item, index) => (
      <Box key={index} display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: item.color,
          }}
        />
        <Typography variant="body2" sx={{ color: "#000" }}>
          {item.name}
        </Typography>
      </Box>
    ))}
  </Box>
);

const AssetConditionByTypeChart4 = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("Meerut");
  const [selectedBlock, setSelectedBlock] = useState("Block1");
  const [selectedGP, setSelectedGP] = useState("Khanpur");

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
    setSelectedBlock(Object.keys(districtData[event.target.value])[0]);
    setSelectedGP(Object.keys(districtData[event.target.value][Object.keys(districtData[event.target.value])[0]])[0]);
  };

  const handleBlockChange = (event) => {
    setSelectedBlock(event.target.value);
    setSelectedGP(Object.keys(districtData[selectedDistrict][event.target.value])[0]);
  };

  const handleGPChange = (event) => {
    setSelectedGP(event.target.value);
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Asset Condition by GP</Typography>
          <Box display="flex" gap={2}>
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>District</InputLabel>
              <Select
                value={selectedDistrict}
                label="District"
                onChange={handleDistrictChange}
              >
                {Object.keys(districtData).map((district) => (
                  <MenuItem key={district} value={district}>
                    {district}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Block</InputLabel>
              <Select
                value={selectedBlock}
                label="Block"
                onChange={handleBlockChange}
              >
                {Object.keys(districtData[selectedDistrict]).map((block) => (
                  <MenuItem key={block} value={block}>
                    {block}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Gram Panchayat</InputLabel>
              <Select
                value={selectedGP}
                label="Gram Panchayat"
                onChange={handleGPChange}
              >
                {Object.keys(districtData[selectedDistrict][selectedBlock]).map((gp) => (
                  <MenuItem key={gp} value={gp}>
                    {gp}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={districtData[selectedDistrict][selectedBlock][selectedGP]}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="type" />
            <YAxis />
            <CartesianGrid stroke="#ccc" vertical={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #eee",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
              cursor={{ fill: "transparent" }}
            />
            <Legend content={<CustomLegend />} />
            <Bar dataKey="Robust" stackId="a" fill="#22CAAD" barSize={25} />
            <Bar dataKey="Damaged" stackId="a" fill="#F55757" barSize={25} />
            <Bar dataKey="Semi-Damaged" stackId="a" fill="#FDCF2A" barSize={25} />
            <Bar dataKey="Missing" stackId="a" fill="#E78F5D" barSize={25} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AssetConditionByTypeChart4;
