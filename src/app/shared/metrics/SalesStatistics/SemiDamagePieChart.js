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

const semiDamagedData = [
  { name: "Repaired", value: 1200, color: "#22CAAD" },
  { name: "Pending", value: 2200, color: "#FDCF2A" },
];

const SemiDamagedChart = () => {
  const total = semiDamagedData.reduce((sum, item) => sum + item.value, 0);
  const enhancedData = [
    { name: "Total", value: total, color: "#34D1D1" },
    ...semiDamagedData,
  ];

  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" fontWeight="500" fontSize="15px">
            Semi-Damaged
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
              data={semiDamagedData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
            >
              {semiDamagedData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
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

export default SemiDamagedChart;
