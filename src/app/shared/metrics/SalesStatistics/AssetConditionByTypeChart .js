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
  CartesianGrid // ✅ Correct import for grid lines
} from "recharts";

// Sample data (no changes in data)
const assetConditionData = [
  {
    type: "OLT",
    Working: 20,
    Damaged: 8,
    "Under Repair": 7
  },
  {
    type: "Rack",
    Working: 19,
    Damaged: 7,
    "Under Repair": 6
  },
  {
    type: "Battery",
    Working: 14,
    Damaged: 5,
    "Under Repair": 4
  },
  {
    type: "Other",
    Working: 16,
    Damaged: 7,
    "Under Repair": 6
  },
  {
    type: "Other", // Duplicate as shown in your image
    Working: 18,
    Damaged: 6,
    "Under Repair": 6
  }
];

// ✅ Custom Legend with circle dots and black label text
const CustomLegend = () => (
  <Box display="flex" justifyContent="center" gap={3} mt={1.5} flexWrap="wrap">
    {[
      { name: "Working", color: "#22CAAD" },
      { name: "Damaged", color: "#F55757" },
      { name: "Under Repair", color: "#FDCF2A" }
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
        <Typography variant="h6" sx={{marginBottom:"1rem"}} gutterBottom>
          Asset Condition by Type
        </Typography>
        <ResponsiveContainer width="100%" height={250} >
          <BarChart
            data={assetConditionData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="type" />
            <YAxis />
            <CartesianGrid stroke="#ccc" vertical={false} /> {/* ✅ Horizontal grid lines only */}
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #eee",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
              }}
              cursor={{ fill: "transparent" }}
            />
            <Legend content={<CustomLegend />} />
            <Bar dataKey="Working" stackId="a" fill="#22CAAD" barSize={30} />
            <Bar dataKey="Damaged" stackId="a" fill="#F55757" barSize={30} />
            <Bar dataKey="Under Repair" stackId="a" fill="#FDCF2A" barSize={30} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AssetConditionByTypeChart;
