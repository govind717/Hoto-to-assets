import React from "react";
import { Grid } from "@mui/material";
import DonutChartCard from "./DonutChartCard";

const ServeyStatus = () => {
  const chartConfigs = [
    {
      title: "GP HOTO Survey Status",
      completed: 56,
      pending: 44,
    },
    {
      title: "Block HOTO Survey Status",
      completed: 60,
      pending: 40,
    },
    {
      title: "RKM HOTO Survey Status",
      completed: 34,
      pending: 66,
    },
  ];

  return (
    <Grid container spacing={2}>
      {chartConfigs.map((config, index) => (
        <Grid item xs={12} md={4} key={index}>
          <DonutChartCard
            title={config.title}
            completed={config.completed}
            pending={config.pending}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ServeyStatus;