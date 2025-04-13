import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Typography, Box } from "@mui/material";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";

const DonutChartCard = ({ title, completed, pending }) => {
  const chartData = [
    { name: "Completed", value: completed, color: "#22CAAD" },
    { name: "Pending", value: pending, color: "#FDCF2A" },
  ];

  // Custom Legend Renderer
  const renderCustomLegend = () => (
    <Box display="flex" justifyContent="center" gap={3} mt={2}>
      {chartData.map((entry, index) => (
        <Box key={`legend-${index}`} display="flex" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: entry.color,
            }}
          />
          <Typography variant="body2" sx={{ color: "#000" }}>
            {entry.value}% {entry.name}
          </Typography>
        </Box>
      ))}
    </Box>
  );

  return (
    <JumboCardQuick>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={80}
            paddingAngle={3}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
          />
        </PieChart>
      </ResponsiveContainer>
      {renderCustomLegend()}
    </JumboCardQuick>
  );
};

export default DonutChartCard;
