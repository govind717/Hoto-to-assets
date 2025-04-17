import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Full dataset with new categories
const data = [
  {
    district: "Varanasi",
    Robust: 200,
    Damage: 50,
    SemiDamage: 80,
    Missing: 12,
  },
  {
    district: "Gorakhpur",
    Robust: 220,
    Damage: 40,
    SemiDamage: 65,
    Missing: 43,
  },
  {
    district: "Azamgarh",
    Robust: 210,
    Damage: 45,
    SemiDamage: 25,
    Missing: 33,
  },
  {
    district: "Prayagraj",
    Robust: 280,
    Damage: 20,
    SemiDamage: 40,
    Missing: 9,
  }
];

// Legend color mapping
const chartSeries = [
  { key: "Robust", color: "#22CAAD" },
  { key: "Damage", color: "#F55757" },
  { key: "SemiDamage", color: "#FDCF2A" },  // Swapped with Missing color
  { key: "Missing", color: "#E78F5D" },     // Swapped with SemiDamage color
];

// Custom legend component
const CustomLegend = () => (
  <Box display="flex" justifyContent="center" gap={3} mt={2} flexWrap="wrap">
    {chartSeries.map((item, index) => (
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
          {item.key.replace(/([A-Z])/g, " $1").trim()}
        </Typography>
      </Box>
    ))}
  </Box>
);

const StylishAssetHealthChart = () => {
  const [selectedDistrict, setSelectedDistrict] = useState(data[0].district);

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };

  const selectedData = data.find((d) => d.district === selectedDistrict);
  const chartData = selectedData ? [selectedData] : [];

  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
      <CardContent>
        {/* Top heading and dropdown */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">
            District-wise POP Health Overview
          </Typography>
          <FormControl size="small">
            <InputLabel id="district-select-label">District</InputLabel>
            <Select
              labelId="district-select-label"
              value={selectedDistrict}
              label="District"
              onChange={handleDistrictChange}
              sx={{ minWidth: 150 }}
            >
              {data.map((item, index) => (
                <MenuItem key={index} value={item.district}>
                  {item.district}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Bar chart with adjusted spacing */}
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
            barCategoryGap={20}
            barGap={35}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="district" />
            <YAxis />
            <Tooltip cursor={{ fill: "transparent" }} />
            
            {/* Control bar width using barSize */}
            <Bar dataKey="Robust" fill="#22CAAD" barSize={25} />
            <Bar dataKey="Damage" fill="#F55757" barSize={25} />
            <Bar dataKey="SemiDamage" fill="#FDCF2A" barSize={25} /> {/* Swapped color */}
            <Bar dataKey="Missing" fill="#E78F5D" barSize={25} />     {/* Swapped color */}
          </BarChart>
        </ResponsiveContainer>

        <CustomLegend />
      </CardContent>
    </Card>
  );
};

export default StylishAssetHealthChart;
