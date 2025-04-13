import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

// Sample data (you can modify as needed)
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

const AssetConditionByTypeChart = () => {
  return (
    <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Asset Condition by Type
        </Typography>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart
            data={assetConditionData}
            margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
          >
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                border: "1px solid #eee",
                borderRadius: "6px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)"
              }}
              cursor={{ fill: "transparent" }}
            />
            <Legend />
            <Bar dataKey="Working" stackId="a" fill="#22CAAD" />
            <Bar dataKey="Damaged" stackId="a" fill="#F55757" />
            <Bar dataKey="Under Repair" stackId="a" fill="#FDCF2A" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default AssetConditionByTypeChart;
