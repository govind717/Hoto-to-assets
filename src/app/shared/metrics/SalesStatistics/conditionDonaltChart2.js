import React, { useState } from "react";
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
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const districtData = {
  Meerut: {
    Block1: {
      Khanpur: [
        { name: "Robust", value: 2000, color: "#22CAAD" },
        { name: "Damaged", value: 500, color: "#F55757" },
        { name: "Semi-Damaged", value: 300, color: "#FDCF2A" },
        { name: "Missing", value: 200, color: "#E78F5D" },
      ],
      Baroda: [
        { name: "Robust", value: 2500, color: "#22CAAD" },
        { name: "Damaged", value: 400, color: "#F55757" },
        { name: "Semi-Damaged", value: 600, color: "#FDCF2A" },
        { name: "Missing", value: 100, color: "#E78F5D" },
      ],
    },
    Block2: {
      Bahadurpur: [
        { name: "Robust", value: 1800, color: "#22CAAD" },
        { name: "Damaged", value: 700, color: "#F55757" },
        { name: "Semi-Damaged", value: 400, color: "#FDCF2A" },
        { name: "Missing", value: 100, color: "#E78F5D" },
      ],
    },
  },
  Ghaziabad: {
    Block1: {
      Bawana: [
        { name: "Robust", value: 3000, color: "#22CAAD" },
        { name: "Damaged", value: 200, color: "#F55757" },
        { name: "Semi-Damaged", value: 500, color: "#FDCF2A" },
        { name: "Missing", value: 300, color: "#E78F5D" },
      ],
      Abupur: [
        { name: "Robust", value: 2700, color: "#22CAAD" },
        { name: "Damaged", value: 350, color: "#F55757" },
        { name: "Semi-Damaged", value: 500, color: "#FDCF2A" },
        { name: "Missing", value: 150, color: "#E78F5D" },
      ],
    },
  },
};


const CustomLegend = ({ total, data }) => (
  <Box display="flex" justifyContent="center" gap={3} mt={1} flexWrap="wrap">
    <Box display="flex" alignItems="center" gap={1}>
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          backgroundColor: "#53B8CA",
        }}
      />
      <Typography variant="body2" sx={{ color: "#000" }}>{total}</Typography>
      <Typography variant="body2" sx={{ color: "#000" }}>Total Assets</Typography>
    </Box>
    {data.map((item, index) => (
      <Box key={index} display="flex" alignItems="center" gap={1}>
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: item.color,
          }}
        />
        <Typography variant="body2" sx={{ color: "#000" }}>{item.value}</Typography>
        <Typography variant="body2" sx={{ color: "#000" }}>{item.name}</Typography>
      </Box>
    ))}
  </Box>
);

const ConditionStatusChart2 = () => {
  const [selectedDistrict, setSelectedDistrict] = useState("Meerut");
  const [selectedBlock, setSelectedBlock] = useState("Block1");
  const [selectedGP, setSelectedGP] = useState("Khanpur");

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    const firstBlock = Object.keys(districtData[district])[0];
    const firstGP = Object.keys(districtData[district][firstBlock])[0];

    setSelectedDistrict(district);
    setSelectedBlock(firstBlock);
    setSelectedGP(firstGP);
  };

  const handleBlockChange = (event) => {
    const block = event.target.value;
    const firstGP = Object.keys(districtData[selectedDistrict][block])[0];
    setSelectedBlock(block);
    setSelectedGP(firstGP);
  };

  const handleGPChange = (event) => setSelectedGP(event.target.value);

  const originalData =
    districtData[selectedDistrict][selectedBlock][selectedGP];

  const total = originalData.reduce((sum, item) => sum + item.value, 0);

  const conditionData = originalData.map((item) => ({
    ...item,
    percentage: ((item.value / total) * 100).toFixed(1),
  }));

  return (
    <Card sx={{ boxShadow: 4, borderRadius: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Typography variant="h6">Total Assets</Typography>
          <Box display="flex" gap={2}>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>District</InputLabel>
              <Select value={selectedDistrict} label="District" onChange={handleDistrictChange}>
                {Object.keys(districtData).map((district) => (
                  <MenuItem key={district} value={district}>{district}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Block</InputLabel>
              <Select value={selectedBlock} label="Block" onChange={handleBlockChange}>
                {Object.keys(districtData[selectedDistrict]).map((block) => (
                  <MenuItem key={block} value={block}>{block}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: 130 }}>
              <InputLabel>Gram Panchayat</InputLabel>
              <Select value={selectedGP} label="Gram Panchayat" onChange={handleGPChange}>
                {Object.keys(districtData[selectedDistrict][selectedBlock]).map((gp) => (
                  <MenuItem key={gp} value={gp}>{gp}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={conditionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={0}
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

        <CustomLegend total={total} data={originalData} />
      </CardContent>
    </Card>
  );
};

export default ConditionStatusChart2;
