import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Typography,
  Box,
  Card,
  CardContent,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const transferData = [
  { name: "Internal", value: 650, color: "#22CAAD" },
  { name: "External", value: 350, color: "#FDCF2A" },
];

const TransferChart = () => {
  const total = transferData.reduce((sum, item) => sum + item.value, 0);

  const enhancedData = [
    { name: `Total Transfer`, value: total, color: "#34D1D1" },
    ...transferData,
  ];

  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
      <CardContent sx={{ paddingBottom: 1 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="500" fontSize="15px">
            Transfer
          </Typography>
          <FormControl size="small">
            <Select defaultValue="count" sx={{ minWidth: 140 }}>
              <MenuItem value="count">Count</MenuItem>
              <MenuItem value="percentage">Percentage</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={transferData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
            >
              {transferData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value}`, `${name}`]}
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <Box display="flex" justifyContent="center" gap={3} mt={1} flexWrap="wrap">
          {enhancedData.map((item, index) => (
            <Box key={index} display="flex" alignItems="center" gap={1}>
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: item.color,
                }}
              />
              <Typography variant="body2">
                {item.name} – {item.value}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TransferChart;
