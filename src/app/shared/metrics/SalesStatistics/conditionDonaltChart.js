import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import JumboCardQuick from "@jumbo/components/JumboCardQuick";
import { Typography } from "@mui/material";

const conditionData = [
  { name: "Robust", value: 2900, color: "#22CAAD" },
  { name: "Semi-Damaged", value: 400, color: "#E78F5D" },
  // { name: "Missing / Not Found", value: 150, color: "#FDCF2A" },
  { name: "Damaged", value: 300, color: "#F55757" },
];

const ConditionStatusChart = () => {
  return (
    <JumboCardQuick>
      <Typography variant="h6" gutterBottom>
        Condition-wise Status Report
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
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
          <Legend
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            wrapperStyle={{ marginTop: 10 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </JumboCardQuick>
  );
};

export default ConditionStatusChart;
