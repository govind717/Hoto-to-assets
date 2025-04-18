import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
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

// ✅ Updated data with four fields
const assetConditionData = [
  {
    type: "RACK",
    Robust: 19,
    Damaged: 7,
    "Semi-Damaged": 6,
    Missing: 2,
  },
  {
    type: "CCU",
    Robust: 8,
    Damaged: 4,
    "Semi-Damaged": 6,
    Missing: 3,
  },
  {
    type: "SMPS", // Optional duplicate
    Robust: 12,
    Damaged: 6,
    "Semi-Damaged": 6,
    Missing: 8,
  },
  {
    type: "SPLITTER",
    Robust: 20,
    Damaged: 8,
    "Semi-Damaged": 7,
    Missing: 3,
  },
  {
    type: "OLT",
    Robust: 2,
    Damaged: 8,
    "Semi-Damaged": 7,
    Missing: 3,
  },
  {
    type: "SFP",
    Robust: 14,
    Damaged: 5,
    "Semi-Damaged": 4,
    Missing: 1,
  },
  {
    type: "FDMS",
    Robust: 14,
    Damaged: 5,
    "Semi-Damaged": 4,
    Missing: 1,
  },
  {
    type: "CABLE", // Optional duplicate
    Robust: 10,
    Damaged: 2,
    "Semi-Damaged": 3,
    Missing: 1,
  },
  {
    type: "SOLAR",
    Robust: 8,
    Damaged: 15,
    "Semi-Damaged": 6,
    Missing: 3,
  },
  {
    type: "UPS", // Optional duplicate
    Robust: 12,
    Damaged: 6,
    "Semi-Damaged": 6,
    Missing: 8,
  },
  {
    type: "BATTERY",
    Robust: 14,
    Damaged: 5,
    "Semi-Damaged": 4,
    Missing: 1,
  },
  {
    type: "PATCHCORDS",
    Robust: 14,
    Damaged: 5,
    "Semi-Damaged": 4,
    Missing: 1,
  },
];

// ✅ Updated legend for the new fields (color swap)
const CustomLegend = () => (
  <Box display="flex" justifyContent="center" gap={3} mt={1.5} flexWrap="wrap">
    {[
      { name: "Robust", color: "#22CAAD" },
      { name: "Damaged", color: "#F55757" },
      { name: "Semi-Damaged", color: "#FDCF2A" },  // Swapped color
      { name: "Missing", color: "#E78F5D" },        // Swapped color
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

const AssetConditionByTypeChart = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: "1rem" }} gutterBottom>
          Asset Condition by Type
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={assetConditionData}
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
            <Bar dataKey="Robust" stackId="a" fill="#22CAAD" barSize={30} />
            <Bar dataKey="Damaged" stackId="a" fill="#F55757" barSize={30} />
            <Bar dataKey="Semi-Damaged" stackId="a" fill="#FDCF2A" barSize={30} /> {/* Swapped color */}
            <Bar dataKey="Missing" stackId="a" fill="#E78F5D" barSize={30} /> {/* Swapped color */}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AssetConditionByTypeChart;
