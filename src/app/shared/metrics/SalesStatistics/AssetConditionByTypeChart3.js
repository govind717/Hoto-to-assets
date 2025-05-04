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

const districtData = {
    Meerut: [
      { type: "Block-1", Robust: 19, Damaged: 7, "Semi-Damaged": 6, Missing: 2 },
      { type: "Block-2", Robust: 8, Damaged: 4, "Semi-Damaged": 6, Missing: 3 },
      { type: "Block-3", Robust: 12, Damaged: 6, "Semi-Damaged": 6, Missing: 8 },
      { type: "Block-4", Robust: 20, Damaged: 8, "Semi-Damaged": 7, Missing: 3 },
      { type: "Block-5", Robust: 2, Damaged: 8, "Semi-Damaged": 7, Missing: 3 },
      { type: "Block-6", Robust: 14, Damaged: 5, "Semi-Damaged": 4, Missing: 1 },
      { type: "Block-7", Robust: 14, Damaged: 5, "Semi-Damaged": 4, Missing: 1 },
      { type: "Block-8", Robust: 10, Damaged: 2, "Semi-Damaged": 3, Missing: 1 },
    ],
    Ghaziabad: [
      { type: "Block-1", Robust: 15, Damaged: 7, "Semi-Damaged": 5, Missing: 3 },
      { type: "Block-2", Robust: 11, Damaged: 4, "Semi-Damaged": 6, Missing: 2 },
      { type: "Block-3", Robust: 13, Damaged: 6, "Semi-Damaged": 5, Missing: 7 },
      { type: "Block-4", Robust: 10, Damaged: 5, "Semi-Damaged": 4, Missing: 4 },
      { type: "Block-5", Robust: 16, Damaged: 3, "Semi-Damaged": 7, Missing: 2 },
      { type: "Block-6", Robust: 14, Damaged: 8, "Semi-Damaged": 6, Missing: 3 },
      { type: "Block-7", Robust: 12, Damaged: 7, "Semi-Damaged": 5, Missing: 1 },
      { type: "Block-8", Robust: 8, Damaged: 9, "Semi-Damaged": 4, Missing: 2 },
    ],
    Noida: [
      { type: "Block-1", Robust: 19, Damaged: 4, "Semi-Damaged": 6, Missing: 2 },
      { type: "Block-2", Robust: 12, Damaged: 7, "Semi-Damaged": 5, Missing: 3 },
      { type: "Block-3", Robust: 15, Damaged: 6, "Semi-Damaged": 4, Missing: 5 },
      { type: "Block-4", Robust: 10, Damaged: 6, "Semi-Damaged": 7, Missing: 2 },
      { type: "Block-5", Robust: 11, Damaged: 3, "Semi-Damaged": 6, Missing: 4 },
      { type: "Block-6", Robust: 18, Damaged: 4, "Semi-Damaged": 5, Missing: 3 },
      { type: "Block-7", Robust: 17, Damaged: 5, "Semi-Damaged": 5, Missing: 2 },
      { type: "Block-8", Robust: 9, Damaged: 8, "Semi-Damaged": 5, Missing: 1 },
    ],
    Agra: [
      { type: "Block-1", Robust: 20, Damaged: 4, "Semi-Damaged": 6, Missing: 3 },
      { type: "Block-2", Robust: 10, Damaged: 7, "Semi-Damaged": 5, Missing: 3 },
      { type: "Block-3", Robust: 13, Damaged: 5, "Semi-Damaged": 6, Missing: 4 },
      { type: "Block-4", Robust: 16, Damaged: 5, "Semi-Damaged": 5, Missing: 2 },
      { type: "Block-5", Robust: 9, Damaged: 6, "Semi-Damaged": 7, Missing: 3 },
      { type: "Block-6", Robust: 14, Damaged: 4, "Semi-Damaged": 6, Missing: 1 },
      { type: "Block-7", Robust: 18, Damaged: 4, "Semi-Damaged": 7, Missing: 2 },
      { type: "Block-8", Robust: 12, Damaged: 6, "Semi-Damaged": 4, Missing: 5 },
    ],
    Aligarh: [
      { type: "Block-1", Robust: 14, Damaged: 5, "Semi-Damaged": 7, Missing: 1 },
      { type: "Block-2", Robust: 19, Damaged: 3, "Semi-Damaged": 6, Missing: 2 },
      { type: "Block-3", Robust: 8, Damaged: 7, "Semi-Damaged": 5, Missing: 3 },
      { type: "Block-4", Robust: 15, Damaged: 6, "Semi-Damaged": 4, Missing: 2 },
      { type: "Block-5", Robust: 12, Damaged: 5, "Semi-Damaged": 6, Missing: 3 },
      { type: "Block-6", Robust: 18, Damaged: 4, "Semi-Damaged": 5, Missing: 2 },
      { type: "Block-7", Robust: 17, Damaged: 6, "Semi-Damaged": 6, Missing: 1 },
      { type: "Block-8", Robust: 11, Damaged: 7, "Semi-Damaged": 4, Missing: 3 },
    ],
    // Add similar data for the remaining districts (Moradabad, Muzaffarnagar, Saharanpur, etc.)
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

const AssetConditionByTypeChart3 = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("Meerut");

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Asset Condition Overview Across Block</Typography>
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
        </Box>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={districtData[selectedDistrict]}
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

export default AssetConditionByTypeChart3;
