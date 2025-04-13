import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

// Updated data
const data = [
  {
    district: "Varanasi",
    TotalAssets: 312,
    Working: 290,
    Damaged: 12,
    UnderRepair: 5,
    PendingHOTO: 5
  },
  {
    district: "Gorakhpur",
    TotalAssets: 298,
    Working: 270,
    Damaged: 10,
    UnderRepair: 8,
    PendingHOTO: 10
  },
  {
    district: "Azamgarh",
    TotalAssets: 284,
    Working: 240,
    Damaged: 15,
    UnderRepair: 10,
    PendingHOTO: 19
  }
  // Uncomment this to include Prayagraj
  // {
  //   district: "Prayagraj",
  //   TotalAssets: 315,
  //   Working: 298,
  //   Damaged: 7,
  //   UnderRepair: 5,
  //   PendingHOTO: 5
  // }
];

const StylishAssetHealthChart = () => {
  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          District-wise Asset Health Overview
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            barCategoryGap={20}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="district" />
            <YAxis />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Legend />
            <Bar dataKey="TotalAssets" fill="#53B8CA" />
            <Bar dataKey="Working" 
            fill="#22CAAD" 
            />
            <Bar dataKey="Damaged" fill="#F55757" />
            <Bar dataKey="UnderRepair" fill="#FDCF2A" />
            <Bar dataKey="PendingHOTO" fill="#E78F5D" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default StylishAssetHealthChart;
