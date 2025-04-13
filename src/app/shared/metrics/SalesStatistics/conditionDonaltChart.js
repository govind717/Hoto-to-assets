import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Typography, Box, Card, CardContent } from "@mui/material";

// Data with color
const conditionData = [
  { name: "Robust", value: 2900, color: "#22CAAD" },
  { name: "Semi-Damaged", value: 400, color: "#E78F5D" },
  // { name: "Missing / Not Found", value: 150, color: "#FDCF2A" },
  { name: "Damaged", value: 300, color: "#F55757" },
];

// Custom legend with color dot and value between dot and name
const CustomLegend = () => (
  <Box display="flex" justifyContent="center" gap={3} mt={1} flexWrap="wrap">
    {conditionData.map((item, index) => (
      <Box key={index} display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: item.color,
          }}
        />
        <Typography variant="body2" sx={{ color: "#000" }}>
        {item.value}
        </Typography>
        <Typography variant="body2" sx={{ color: "#000" }}>
          {item.name}
        </Typography>
      </Box>
    ))}
  </Box>
);

const ConditionStatusChart = () => {
  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
      <CardContent sx={{ paddingBottom: 1 }}>
        <Typography variant="h6" gutterBottom>
          Condition-wise Status Report
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={conditionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
            >
              {conditionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}`, `${name}`]}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Custom colored-dot legend */}
        <CustomLegend />
      </CardContent>
    </Card>
  );
};

export default ConditionStatusChart;
